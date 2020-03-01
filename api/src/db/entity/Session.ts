import { Entity, BaseEntity, PrimaryColumn, Column, Index } from 'typeorm';

// This entity is created for "connect-pg-simple" to store session.
// SQL definition is here:
// https://github.com/voxpelli/node-connect-pg-simple/blob/master/table.sql
@Entity()
export class Session extends BaseEntity {
  @PrimaryColumn()
  sid: string;

  @Column('json')
  sess: JSON;

  @Index()
  @Column('timestamp', { precision: 6 })
  expire: number;
}
