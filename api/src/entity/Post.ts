import { Column, OneToMany, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { PostFile } from './PostFile';
import { MinLength, validate, IsNotEmpty } from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { getValidationErrorMessage } from '../utils';

@Entity()
export class Post extends BaseAbstractEntity {
  @Column({ length: 200 })
  @IsNotEmpty()
  title: string;

  @OneToMany(
    () => PostFile,
    postFile => postFile.post,
    {
      // To save the postFiles with post entities
      cascade: true,
    },
  )
  @MinLength(1)
  postFiles: PostFile[];

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
