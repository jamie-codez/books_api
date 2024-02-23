import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth_service/dto/auth.dto';
import { UserExistsGuard } from './core/guards/does.user.exist.guard';
import { AUTH_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @UseGuards(UserExistsGuard)
  @Post('signup')
  async create(@Body() userDto: RegisterDto) {
    return this.authClient.send({ cmd: 'register' }, userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = this.authClient.send({ cmd: 'login' }, loginDto);
    return { token };
  }
}
