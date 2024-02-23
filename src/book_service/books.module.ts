import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookController } from './books.controller';
import { booksRepoProvider } from './books.repo.provider';
import { UserService } from '../user_service/user.service';

@Module({
  controllers: [BookController],
  providers: [BooksService, ...booksRepoProvider],
  exports: [BooksService, ...booksRepoProvider],
  imports: [UserService],
})
export class BookServiceModule {}
