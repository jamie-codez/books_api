import {
  BOOKS_REPOSITORY,
  DATABASE_CONNECTION,
  LENDS_REPOSITORY,
} from '../constants';
import { DataSource } from 'typeorm';
import { Book, Lend } from './entities/book.entity';

export const booksRepoProvider = [
  {
    provide: BOOKS_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Book),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: LENDS_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Lend),
    inject: [DATABASE_CONNECTION],
  },
];
