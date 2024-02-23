import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @MessagePattern('createBook')
  async create(@Payload() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @MessagePattern('findAllBook')
  async findAll(@Payload() pagination: { page: number; size: number }) {
    return await this.bookService.findAll(pagination.page, pagination.size);
  }

  @MessagePattern('findOneBook')
  async findOne(@Payload() id: number) {
    return await this.bookService.findOne(id);
  }

  @MessagePattern('searchBook')
  async search(@Payload() data: { term: string; page: number; size: number }) {
    return await this.bookService.search(data.term, data.page, data.size);
  }

  @MessagePattern('lendBook')
  async lendBook(
    @Payload() data: { recipientId: number; lenderId: number; bookId: number },
  ) {
    const { recipientId, lenderId, bookId } = data;
    return await this.bookService.lendBook(recipientId, lenderId, bookId);
  }

  @MessagePattern('updateBook')
  async update(@Payload() data: { id: number; updateBookDto: UpdateBookDto }) {
    return await this.bookService.update(data.id, data.updateBookDto);
  }

  @MessagePattern('deleteBook')
  async delete(@Payload() id: number) {
    return await this.bookService.delete(id);
  }
}
