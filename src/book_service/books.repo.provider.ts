import {
  BOOKS_REPOSITORY,
  DATABASE_CONNECTION,
  LEND_REPOSITORY,
} from '../constants';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { Lend } from './entities/lend.dto';

export const booksRepoProvider = [
  {
    provide: BOOKS_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Book),
    inject: [DATABASE_CONNECTION],
  },
];

export const lendingRepoProvider = [
  {
    provide: LEND_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Lend),
    inject: [DATABASE_CONNECTION],
  },
];
