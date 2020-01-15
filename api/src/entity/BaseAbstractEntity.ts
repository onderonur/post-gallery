import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import nanoid from 'nanoid';

export class BaseAbstractEntity extends BaseEntity {
  @PrimaryColumn('varchar', { default: () => `'${nanoid()}'` })
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
