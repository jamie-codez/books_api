import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthService) {}

  @MessagePattern('register')
  async create(@Payload() registerDto: RegisterDto) {
    return await this.authServiceService.register(registerDto);
  }

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto) {
    const token = await this.authServiceService.login(loginDto);
    return { auth_token: token };
  }
}
