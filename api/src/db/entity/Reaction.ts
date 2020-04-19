import { Entity, ManyToOne, Column, Index } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Reactable } from './Reactable';
import { User } from './User';
import { ViewerReactionType } from '../../generated/graphql';
import { ID } from '../../types';

export interface ReactableReactions {
  reactableId: ID;
  likeCount: number;
  dislikeCount: number;
}

@Entity()
@Index(['reactableId', 'userId'], { unique: true })
export class Reaction extends BaseAbstractEntity {
  @Column()
  reactableId: ID;

  @ManyToOne(
    () => Reactable,
    reactable => reactable.reactions,
    { onDelete: 'CASCADE' },
  )
  reactable: Reactable;

  @ManyToOne(
    () => User,
    user => user.reactions,
  )
  user: User;

  @Column()
  userId: ID;

  @Column({ type: 'enum', enum: ViewerReactionType })
  type: ViewerReactionType;

  static async findReactionsByReactableIds(
    reactableIds: ID[],
  ): Promise<ReactableReactions[]> {
    const { Like, Dislike } = ViewerReactionType;
    const reactionTypes = [
      { columnName: 'likeCount', type: Like },
      { columnName: 'dislikeCount', type: Dislike },
    ];

    const queryBuilder = this.createQueryBuilder('reaction').select(
      `reaction.reactableId`,
      'reactableId',
    );
    // Creating a subquery for each reaction type
    for (let i = 0; i < reactionTypes.length; i++) {
      const reactionType = reactionTypes[i];
      queryBuilder.addSelect(
        subQuery =>
          subQuery
            .select('COUNT(likeReaction.id)', 'likeCount')
            .from(this, 'likeReaction')
            .where('likeReaction.reactableId = reaction.reactableId')
            // Parameters should have unique names accros query.
            // So, we need to name "type" as "likeType" and "dislikeType".
            // Any unique name works.
            .andWhere(`likeReaction.type = :type${i}`, {
              [`type${i}`]: reactionType.type,
            }),
        reactionType.columnName,
      );
    }
    const groupedReactions: ReactableReactions[] = await queryBuilder
      .where('reaction.reactableId IN (:...reactableIds)', {
        reactableIds,
      })
      .groupBy('reaction.reactableId')
      .getRawMany();
    return groupedReactions;
  }
}
