import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Comment } from './Comment';
import { Reaction } from './Reaction';
import { Post } from './Post';

@Entity()
export class User extends BaseAbstractEntity {
  @Column({ unique: true })
  googleProfileId: string;

  @Column()
  displayName: string;

  // We need to specify the "type" for columns with
  // "... | null" type.
  // Otherwise it throws an error.
  // (At least for PostgreSQL)
  @Column({ type: 'varchar', nullable: true })
  @IsEmail()
  email?: string | null;

  @Column({ type: 'varchar', nullable: true })
  thumbnailUrl?: string | null;

  @OneToMany(
    () => Reaction,
    reaction => reaction.user,
  )
  reactions: Reaction[];

  @OneToMany(
    () => Post,
    post => post.user,
  )
  posts: Post[];

  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.displayName = this.displayName.trim();
  }

  static findOneByGoogleProfileId(googleProfileId: string) {
    return this.findOne({ where: { googleProfileId } });
  }
}
