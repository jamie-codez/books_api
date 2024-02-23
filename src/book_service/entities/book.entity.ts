import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lend } from './lend.dto';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;
  @Column({ name: 'description', type: 'text' })
  description: string;
  @Column({ name: 'author', type: 'varchar', length: 50 })
  author: string;
  @Column({ name: 'isbn', type: 'varchar', length: 13 })
  ISBN: string;
  @Column({ name: 'publication_date', type: 'date' })
  publicationDate: Date;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @OneToMany(() => Lend, (lend) => lend.book)
  lends: Lend[];
}
