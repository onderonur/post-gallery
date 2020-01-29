import { Column, OneToMany, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { PostMedia } from './PostMedia';
import { IsNotEmpty, ArrayMaxSize, ArrayNotEmpty } from 'class-validator';

@Entity()
export class Post extends BaseAbstractEntity {
  @Column({ length: 200 })
  @IsNotEmpty()
  title: string;

  @OneToMany(
    () => PostMedia,
    postMedia => postMedia.post,
    {
      // To save the postMedias with post entities
      cascade: true,
    },
  )
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  postMedias: PostMedia[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    this.title = this.title.trim();
    this.validateAndThrowIfHasErrors();
  }
}
