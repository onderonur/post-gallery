import { Column, OneToMany, Entity } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { PostFile } from './PostFile';

@Entity()
export class Post extends BaseAbstractEntity {
  @Column({ length: 200 })
  title: string;

  @OneToMany(
    () => PostFile,
    postFile => postFile.post,
    {
      // To save the postFiles with post entities
      cascade: true,
    },
  )
  postFiles: PostFile[];
}
