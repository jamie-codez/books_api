import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

@Entity({ name: 'lends' })
export class Lend {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'book_id', type: 'int' })
  bookId: number;
  @Column({ name: 'user_id', type: 'int' })
  userId: number;
  @Column({ name: 'lent_at', type: 'timestamp' })
  lentAt: Date;
  @Column({ name: 'returned_at', type: 'timestamp' })
  returnedAt: Date;
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
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;
}
