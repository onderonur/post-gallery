import { Entity, Column, OneToOne, JoinColumn, In } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Image } from './Image';
import { Post } from './Post';
import { ID } from '../../types';

@Entity()
export class Media extends BaseAbstractEntity {
  @Column(() => Image)
  thumbnail: Image;

  @Column(() => Image)
  smallImage: Image;

  @Column(() => Image)
  standardImage: Image;

  @OneToOne(
    () => Post,
    post => post.media,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  post: Post;

  @Column({ nullable: true })
  postId: ID;

  static async findByPostIds(postIds: ID[]) {
    const medias = await this.find({ where: { postId: In(postIds) } });
    return medias;
  }
}
