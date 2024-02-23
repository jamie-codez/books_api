import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksRepoProvider, lendingRepoProvider } from './books.repo.provider';
import { UserServiceModule } from '../user_service/user.module';
import { DatabaseModule } from '../core/database/database.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...booksRepoProvider, ...lendingRepoProvider],
  exports: [BooksService, ...booksRepoProvider, ...lendingRepoProvider],
  imports: [UserServiceModule, DatabaseModule],
})
export class BookServiceModule {}
