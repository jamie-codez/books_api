import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from '../user_service/entities/user.entity';
import { Lend } from './entities/lend.dto';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepo: Repository<Book>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userRepo: Repository<User>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lendRepo: Repository<Lend>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Lend),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    lendRepo = module.get<Repository<Lend>>(getRepositoryToken(Lend));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const dto = new CreateBookDto();
    await service.create(dto);
    expect(bookRepo.save).toHaveBeenCalledWith(dto);
  });

  it('should find all books', async () => {
    const pagination = { page: 1, size: 10 };
    await service.findAll(pagination.page, pagination.size);
    expect(bookRepo.find).toHaveBeenCalledWith({
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });
  });

  it('should find one book', async () => {
    const id = 1;
    await service.findOne(id);
    expect(bookRepo.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a book', async () => {
    const data = { id: 1, updateBookDto: { title: 'Updated Book' } };
    await service.update(data.id, data.updateBookDto);
    expect(bookRepo.update).toHaveBeenCalledWith(data.id, data.updateBookDto);
  });

  it('should delete a book', async () => {
    const id = 1;
    await service.delete(id);
    expect(bookRepo.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when creating a book fails', async () => {
    const dto = new CreateBookDto();
    jest.spyOn(bookRepo, 'save').mockImplementation(() => {
      throw new Error('Create book failed');
    });
    await expect(service.create(dto)).rejects.toThrow('Create book failed');
  });

  it('should throw an error when finding all books fails', async () => {
    const pagination = { page: 1, size: 10 };
    jest.spyOn(bookRepo, 'find').mockImplementation(() => {
      throw new Error('Find all books failed');
    });
    await expect(
      service.findAll(pagination.page, pagination.size),
    ).rejects.toThrow('Find all books failed');
  });

  it('should throw an error when finding one book fails', async () => {
    const id = 1;
    jest.spyOn(bookRepo, 'findOne').mockImplementation(() => {
      throw new Error('Find one book failed');
    });
    await expect(service.findOne(id)).rejects.toThrow('Find one book failed');
  });

  it('should throw an error when updating a book fails', async () => {
    const data = { id: 1, updateBookDto: { title: 'Updated Book' } };
    jest.spyOn(bookRepo, 'update').mockImplementation(() => {
      throw new Error('Update book failed');
    });
    await expect(service.update(data.id, data.updateBookDto)).rejects.toThrow(
      'Update book failed',
    );
  });

  it('should throw an error when deleting a book fails', async () => {
    const id = 1;
    jest.spyOn(bookRepo, 'delete').mockImplementation(() => {
      throw new Error('Delete book failed');
    });
    await expect(service.delete(id)).rejects.toThrow('Delete book failed');
  });
});
