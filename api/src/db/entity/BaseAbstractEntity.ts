import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import nanoid from 'nanoid';
import { validate } from 'class-validator';
import { getValidationErrorMessage } from './utils';
import { ApolloError } from 'apollo-server-express';

export class BaseAbstractEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  private generateNanoId() {
    if (!this.id) {
      this.id = nanoid();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await this.validateAndThrowIfHasErrors();
  }

  private async validateAndThrowIfHasErrors() {
    const errors = await validate(this);
    if (errors.length) {
      const message = getValidationErrorMessage(errors);
      throw new ApolloError(message);
    }
  }
}