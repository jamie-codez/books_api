import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UpdateBookDto } from './book_service/dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './book_service/dto/create-book.dto';
import { BOOKS_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from './core/guards/jwt.guard';
import { RolesGuard } from './core/guards/roles.guard';

@ApiTags('Books')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(
    @Inject(BOOKS_SERVICE) private readonly booksClient: ClientProxy,
  ) {}
  @SetMetadata('roles', ['admin'])
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksClient.send({ cmd: 'createBook' }, createBookDto);
  }
  @SetMetadata('roles', ['admin'])
  @Get()
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    return this.booksClient.send({ cmd: 'findAllBook' }, { page, size });
  }
  @SetMetadata('roles', ['admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksClient.send({ cmd: 'findOneBook' }, id);
  }
  @SetMetadata('roles', ['admin'])
  @Get()
  search(
    @Query('search') term: string,
    @Query('page') page: number = 1,
    @Query('limit') size: number = 20,
  ) {
    return this.booksClient.send({ cmd: 'searchBook' }, { term, page, size });
  }

  @SetMetadata('roles', ['admin'])
  @Post('lendBook')
  lendBook(
    @Body() data: { recipientId: number; lenderId: number; bookId: number },
  ) {
    return this.booksClient.send({ cmd: 'lendBook' }, data);
  }

  @SetMetadata('roles', ['admin'])
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksClient.send({ cmd: 'updateBook' }, { id, updateBookDto });
  }

  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksClient.send({ cmd: 'deleteBook' }, id);
  }
}
