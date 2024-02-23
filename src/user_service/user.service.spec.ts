import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = new CreateUserDto();
    await service.create(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    const pagination = { page: 1, size: 10 };
    await service.findAll(pagination.page, pagination.size);
    expect(repo.find).toHaveBeenCalledWith({
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'isActive',
      ],
      relations: ['roles'],
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });
  });

  it('should find one user', async () => {
    const id = 1;
    await service.findOne(id);
    expect(repo.findOne).toHaveBeenCalledWith({
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
      ],
      where: { id },
      relations: ['roles'],
    });
  });

  it('should update a user', async () => {
    const data = new UpdateUserDto();
    const id = 1;
    await service.update(id, data);
    expect(repo.update).toHaveBeenCalledWith(id, data);
  });

  it('should delete a user', async () => {
    const id = 1;
    await service.delete(id);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
