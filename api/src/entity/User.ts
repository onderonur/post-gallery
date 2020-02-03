import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User extends BaseAbstractEntity {
  @Column({ unique: true })
  googleProfileId: string;

  // We need to specify the "type" for columns with
  // "... | null" type.
  // Otherwise it throws an error.
  // (At least for PostgreSQL)
  @Column({ type: 'varchar', nullable: true })
  firstName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @IsEmail()
  email?: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    this.validateAndThrowIfHasErrors();
  }

  static findOneByGoogleProfileId(googleProfileId: string) {
    return this.findOne({ where: { googleProfileId } });
  }
}
