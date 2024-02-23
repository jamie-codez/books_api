import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { User } from '../../user_service/entities/user.entity';

@Entity()
export class Lend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.lends)
  user: User;

  @ManyToOne(() => User, (user) => user.lends)
  admin: User;

  @ManyToOne(() => Book, (book) => book.lends)
  book: Book;

  @Column()
  lendDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
