import {
  Column,
  ManyToOne,
  In,
  Entity,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Post } from './Post';
import { ID } from '../types';
import { Media } from './Media';
import { validate } from 'class-validator';
import { getValidationErrorMessage } from '../utils';
import { ApolloError } from 'apollo-server-express';

@Entity()
export class PostMedia extends BaseAbstractEntity {
  @ManyToOne(
    () => Post,
    post => post.postMedias,
    { onDelete: 'CASCADE', nullable: false },
  )
  post: Post;

  // https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
  @Column()
  postId: ID;

  @OneToOne(() => Media, {
    eager: true,
    // Default value for "nullable" is "false" for columns.
    // But to make the "one-to-one" relationship mandatory,
    // we need to set this here.
    // Otherwise, it accepts "null" values.
    // Another solution might be writing the join column separately like;
    // @Column()
    // mediaId: ID;
    nullable: false,
  })
  @JoinColumn()
  media: Media;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length) {
      const message = getValidationErrorMessage(errors);
      throw new ApolloError(message);
    }
  }

  static findByPostId(postId: ID) {
    return this.find({ where: { postId } });
  }

  static findByPostIds(postIds: ID[]) {
    return this.find({ where: { postId: In(postIds) } });
  }
}
