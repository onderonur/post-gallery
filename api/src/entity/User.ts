import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User extends BaseAbstractEntity {
  @Column({ unique: true })
  googleProfileId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    this.validateAndThrowIfHasErrors();
  }

  static findByGoogleProfileId(googleProfileId: string) {
    return this.findOne({ where: { googleProfileId } });
  }
}
