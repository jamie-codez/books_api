import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    const createBookDto = new CreateBookDto();
    const book = new Book();
    jest.spyOn(service, 'create').mockImplementation(async () => book);
    expect(await controller.create(createBookDto)).toBe(createBookDto);
  });

  it('should throw an error when creating a book fails', async () => {
    const createBookDto = new CreateBookDto();
    jest
      .spyOn(service, 'create')
      .mockImplementation(() =>
        Promise.reject(new Error('Failed to create book')),
      );
    await expect(controller.create(createBookDto)).rejects.toThrow(
      'Failed to create book',
    );
  });

  it('should find all books', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);
    expect(await controller.findAll({ page: 1, size: 20 })).toEqual(result);
  });

  it('should throw an error when finding all books fails', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() =>
        Promise.reject(new Error('Failed to find all books')),
      );
    await expect(controller.findAll({ page: 1, size: 20 })).rejects.toThrow(
      'Failed to find all books',
    );
  });

  it('should find one book', async () => {
    const result = new Book();
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);
    expect(await controller.findOne(1)).toBe(result);
  });

  it('should throw an error when finding one book fails', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() =>
        Promise.reject(new Error('Failed to find book')),
      );
    await expect(controller.findOne(1)).rejects.toThrow('Failed to find book');
  });

  it('should update a book', async () => {
    const updateBookDto = new UpdateBookDto();
    updateBookDto.author = 'Test author';
    const updateResults: UpdateResult = {
      generatedMaps: [],
      raw: undefined,
    };
    jest.spyOn(service, 'update').mockImplementation(async () => updateResults);
    expect(
      await controller.update({ id: 1, updateBookDto: updateBookDto }),
    ).toBe(updateBookDto);
  });

  it('should throw an error when updating a book fails', async () => {
    const updateBookDto = new UpdateBookDto();
    jest
      .spyOn(service, 'update')
      .mockImplementation(() =>
        Promise.reject(new Error('Failed to update book')),
      );
    await expect(
      controller.update({ id: 1, updateBookDto: updateBookDto }),
    ).rejects.toThrow('Failed to update book');
  });

  it('should remove a book', async () => {
    const mockDeleteResults: DeleteResult = {
      raw: undefined,
      affected: 1,
    };
    jest
      .spyOn(service, 'delete')
      .mockImplementation(async () => mockDeleteResults);
    expect(await controller.remove(1)).toBeUndefined();
  });

  it('should throw an error when removing a book fails', async () => {
    jest
      .spyOn(service, 'delete')
      .mockImplementation(() =>
        Promise.reject(new Error('Failed to remove book')),
      );
    await expect(controller.remove(1)).rejects.toThrow('Failed to remove book');
  });
});
