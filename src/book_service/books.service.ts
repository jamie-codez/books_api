import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  BOOKS_REPOSITORY,
  LEND_REPOSITORY,
  USER_REPOSITORY,
} from '../constants';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { User } from '../user_service/entities/user.entity';
import { Lend } from './entities/lend.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_REPOSITORY) private readonly booksRepo: Repository<Book>,
    @Inject(USER_REPOSITORY) private readonly userRepo: Repository<User>,
    @Inject(LEND_REPOSITORY) private readonly lendRepo: Repository<Lend>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksRepo.save(createBookDto);
  }

  async findAll(page: number, size: number) {
    return this.booksRepo.find({
      skip: (page - 1) * size,
      take: size,
    });
  }

  async search(term: string, page: number, size: number) {
    return await this.booksRepo
      .createQueryBuilder('book')
      .where('book.title LIKE :term', { search: `%${term}%` })
      .orWhere('book.author LIKE :term', { search: `%${term}%` })
      .orWhere('book.publisher LIKE :term', { search: `%${term}%` })
      .orWhere('book.isbn LIKE :term', { search: `%${term}%` })
      .take(size)
      .skip((page - 1) * size)
      .getMany();
  }

  async findOne(id: number) {
    return await this.booksRepo.findOne({ where: { id } });
  }

  async lendBook(recipientId: number, lenderId: number, bookId: number) {
    const recipient = await this.userRepo.findOne({
      where: { id: recipientId },
    });
    const admin = await this.userRepo.findOne({ where: { id: lenderId } });
    const book = await this.booksRepo.findOne({ where: { id: bookId } });
    const lend = new Lend();
    lend.user = recipient;
    lend.admin = admin;
    lend.book = book;
    return this.lendRepo.save(lend);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.booksRepo.update(id, updateBookDto);
  }

  async delete(id: number) {
    return await this.booksRepo.delete(id);
  }
}
