import {
  Entity,
  OneToMany,
  Column,
  OneToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Reaction } from './Reaction';
import { Comment as CommentEntity } from './Comment';
import { Post as PostEntity } from './Post';

export enum ReactableType {
  Post = 'POST',
  Comment = 'COMMENT',
}

@Entity()
// TODO: If we have more type of Reactable entities, this check constraint will be unmaintainable.
// So, we will change it with a much more "smart" one.
// Also check if only one of these fk's is not null and others are null.
@Check(
  `(type = '${ReactableType.Comment}' AND "commentId" IS NOT NULL) OR (type = '${ReactableType.Post}' AND "postId" IS NOT NULL)`,
)
export class Reactable extends BaseAbstractEntity {
  @Column({ type: 'enum', enum: ReactableType })
  type: ReactableType;

  @OneToMany(() => Reaction, (reaction) => reaction.reactable)
  reactions: Reaction[];

  @OneToOne(() => PostEntity, (post) => post.reactable, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: PostEntity;

  @OneToOne(() => CommentEntity, (comment) => comment.reactable, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  comment: CommentEntity;
}
