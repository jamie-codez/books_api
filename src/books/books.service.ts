import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BOOKS_REPOSITORY, LENDS_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { Book, Lend } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject(BOOKS_REPOSITORY) private booksRepository: Repository<Book>,
    @Inject(LENDS_REPOSITORY) private lendsRepository: Repository<Lend>,
  ) {
    this.seedBooks().then(() => {
      console.log('Books table seeded');
    });
  }

  async seedBooks() {
    const book = await this.booksRepository.findOne({
      where: { title: 'The Great Gatsby' },
    });
    if (!book) {
      await this.booksRepository.save({
        title: 'The Great Gatsby',
        description:
          'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
        author: 'F. Scott Fitzgerald',
        publisher: "Charles Scribner's Sons",
        ISBN: '978-3-16-148410-0',
        publicationDate: new Date('1925-04-10'),
      });
    }
  }

  async create(createBookDto: CreateBookDto) {
    return this.booksRepository.create(createBookDto);
  }

  async addByIsbn(isbn: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GOOGLE_BOOKS_API_KEY}`,
    };
    const response = await fetch('https://api2.isbndb.com/book/' + isbn, {
      headers,
    });
    if (response.status !== 200) {
      throw new Error('Book not found');
    }
    const book = await response.json();
    return this.booksRepository.create(book);
  }

  async lend(id: number, userId: number) {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new Error('Book not found');
    }
    const lendDto = new Lend();
    lendDto.bookId = book.id;
    lendDto.userId = userId;
    lendDto.lentAt = new Date();
    lendDto.returnedAt = null;
    const lend = this.lendsRepository.create(lendDto);
    return this.lendsRepository.save(lend);
  }

  async return(id: number) {
    const lend = await this.lendsRepository.findOne({
      where: { bookId: id, returnedAt: null },
    });
    if (!lend) {
      throw new Error('Book not found');
    }
    lend.returnedAt = new Date();
    return this.lendsRepository.save(lend);
  }

  async findAll(page: number, limit: number) {
    return this.booksRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async findOne(id: number) {
    return await this.booksRepository.findOne({
      where: { id },
    });
  }

  async search(search: string, page: number, limit: number) {
    return await this.booksRepository
      .createQueryBuilder('book')
      .where('book.title LIKE :search', { search: `%${search}%` })
      .orWhere('book.author LIKE :search', { search: `%${search}%` })
      .orWhere('book.publisher LIKE :search', { search: `%${search}%` })
      .orWhere('book.isbn LIKE :search', { search: `%${search}%` })
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return await this.booksRepository.delete(id);
  }
}
