import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { IsNotEmpty, validate } from 'class-validator';
import { ApolloError } from 'apollo-server-express';
import { getValidationErrorMessage } from '../utils';

@Entity()
export class Media extends BaseAbstractEntity {
  @Column()
  thumbnailWidth: number;

  @Column()
  thumbnailHeight: number;

  @Column()
  // @IsNotEmpty()
  thumbnailURL: string;

  @Column()
  smallWidth: number;

  @Column()
  smallHeight: number;

  @Column()
  @IsNotEmpty()
  smallURL: string;

  @Column()
  standardWidth: number;

  @Column()
  standardHeight: number;

  @Column()
  @IsNotEmpty()
  standardURL: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length) {
      const message = getValidationErrorMessage(errors);
      throw new ApolloError(message);
    }
  }
}
