import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @SetMetadata('roles', ['admin'])
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @SetMetadata('roles', ['admin'])
  @Post('addByIsbn')
  addByIsbn(@Query('isbn') isbn: string) {
    return this.booksService.addByIsbn(isbn);
  }

  @SetMetadata('roles', ['admin'])
  @Post('{id}/lend')
  lend(@Query('id') id: number, @Query('userId') userId: string) {
    return this.booksService.lend(id, +userId);
  }

  @SetMetadata('roles', ['admin'])
  @SetMetadata('roles', ['admin'])
  @Post('{id}/return')
  return(@Query('id') id: number) {
    return this.booksService.return(id);
  }

  @SetMetadata('roles', ['admin'])
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.booksService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @SetMetadata('roles', ['admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
