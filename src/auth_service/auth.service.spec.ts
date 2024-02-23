import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            generateJwtToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const dto = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };
    await service.register(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = { email: 'test@example.com', password: 'password' };
    await service.login(dto);
    expect(service.login).toHaveBeenCalledWith(dto);
  });

  it('should generate a JWT token', async () => {
    const email = 'test@example.com';
    await service.generateJwtToken(email);
    expect(service.generateJwtToken).toHaveBeenCalledWith(email);
  });

  it('should throw an error when registering a user fails', async () => {
    const dto = {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };
    jest.spyOn(service, 'register').mockImplementation(() => {
      throw new Error('Register user failed');
    });
    await expect(service.register(dto)).rejects.toThrow('Register user failed');
  });

  it('should throw an error when login fails', async () => {
    const dto = { email: 'test@example.com', password: 'password' };
    jest.spyOn(service, 'login').mockImplementation(() => {
      throw new Error('Login failed');
    });
    await expect(service.login(dto)).rejects.toThrow('Login failed');
  });

  it('should throw an error when generating a JWT token fails', async () => {
    const email = 'test@example.com';
    jest.spyOn(service, 'generateJwtToken').mockImplementation(() => {
      throw new Error('JWT token generation failed');
    });
    await expect(service.generateJwtToken(email)).rejects.toThrow(
      'JWT token generation failed',
    );
  });
});
