import { Column, ManyToOne, In, Entity } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Post } from './Post';
import { ID } from '../types';

@Entity()
export class PostFile extends BaseAbstractEntity {
  @Column()
  filename: string;

  @Column()
  filepath: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;

  @ManyToOne(
    () => Post,
    post => post.postFiles,
    { onDelete: 'CASCADE' },
  )
  post: Post;

  // https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation
  @Column()
  postId: ID;

  static findByPostId(postId: ID) {
    return this.find({ where: { postId } });
  }

  static findByPostIds(postIds: ID[]) {
    return this.find({ where: { postId: In(postIds) } });
  }
}
