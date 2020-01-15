import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import nanoid from 'nanoid';

export class BaseAbstractEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @BeforeInsert()
  generateNanoId() {
    this.id = nanoid();
  }
}
