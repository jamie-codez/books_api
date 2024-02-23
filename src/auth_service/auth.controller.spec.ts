import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

describe('AuthServiceController', () => {
  let controller: AuthServiceController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthServiceController>(AuthServiceController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto = new RegisterDto();
    await controller.create(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = new LoginDto();
    await controller.login(dto);
    expect(service.login).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when registering a user fails', async () => {
    const dto = new RegisterDto();
    jest.spyOn(service, 'register').mockImplementation(() => {
      throw new Error('Register user failed');
    });
    await expect(controller.create(dto)).rejects.toThrow(
      'Register user failed',
    );
  });

  it('should throw an error when login fails', async () => {
    const dto = new LoginDto();
    jest.spyOn(service, 'login').mockImplementation(() => {
      throw new Error('Login failed');
    });
    await expect(controller.login(dto)).rejects.toThrow('Login failed');
  });
});
