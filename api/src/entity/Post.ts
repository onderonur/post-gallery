import { Column, OneToMany, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { PostMedia } from './PostMedia';
import {
  validate,
  IsNotEmpty,
  ArrayMaxSize,
  ArrayNotEmpty,
} from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { getValidationErrorMessage } from '../utils';

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
    const errors = await validate(this);
    if (errors.length) {
      const message = getValidationErrorMessage(errors);
      throw new ApolloError(message);
    }
  }
}
