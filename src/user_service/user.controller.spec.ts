import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserServiceController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should throw an error when creating a user fails', async () => {
    const dto = new CreateUserDto();
    jest.spyOn(service, 'create').mockImplementation(() => {
      throw new Error('Create user failed');
    });
    await expect(controller.create(dto)).rejects.toThrow('Create user failed');
  });

  it('should throw an error when finding all users fails', async () => {
    const pagination = { page: 1, size: 10 };
    jest.spyOn(service, 'findAll').mockImplementation(() => {
      throw new Error('Find all users failed');
    });
    await expect(controller.findAll(pagination)).rejects.toThrow(
      'Find all users failed',
    );
  });

  it('should throw an error when finding one user fails', async () => {
    const id = 1;
    jest.spyOn(service, 'findOne').mockImplementation(() => {
      throw new Error('Find one user failed');
    });
    await expect(controller.findOne(id)).rejects.toThrow(
      'Find one user failed',
    );
  });

  it('should throw an error when updating a user fails', async () => {
    const data = new UpdateUserDto();
    jest.spyOn(service, 'update').mockImplementation(() => {
      throw new Error('Update user failed');
    });
    await expect(
      controller.update({ id: 1, updateUserDto: data }),
    ).rejects.toThrow('Update user failed');
  });

  it('should throw an error when deleting a user fails', async () => {
    const id = 1;
    jest.spyOn(service, 'delete').mockImplementation(() => {
      throw new Error('Delete user failed');
    });
    await expect(controller.delete(id)).rejects.toThrow('Delete user failed');
  });
});
