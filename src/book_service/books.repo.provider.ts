import { BOOKS_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';

export const booksRepoProvider = [
  {
    provide: BOOKS_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Book),
    inject: [DATABASE_CONNECTION],
  },
];
