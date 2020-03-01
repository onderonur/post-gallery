import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

// This is an embedded entity to reduce duplication of fields,
// and increase reusability.
// It doesn't have a table.
// It just "groups" some fields under it.
export class Image {
  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  @IsNotEmpty()
  Url: string;
}
