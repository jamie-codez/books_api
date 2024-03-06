import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksRepoProvider } from './books.repo.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, ...booksRepoProvider],
  exports: [BooksService, ...booksRepoProvider],
  imports: [DatabaseModule],
})
export class BooksModule {}
