import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto, LoginUserDto } from '../user/dto/create-user.dto';
import { UserExistsGuard } from '../guards/does.user.exist.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserExistsGuard)
  @Post('signup')
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signUp(userDto);
    const { password, ...results } = user;
    return results;
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Get('email')
  async findOne(@Query('email') email: string) {
    return await this.authService.findOne(email);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
