import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { UserExistsGuard } from '../guards/does.user.exist.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(UserExistsGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const { password, ...results } = user;
    return results;
  }

  @SetMetadata('roles', ['admin'])
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return await this.userService.findAll(page, limit);
  }

  @SetMetadata('roles', ['admin', 'user'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @SetMetadata('roles', ['admin'])
  @Get('search')
  async search(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return await this.userService.search(search, page, limit);
  }

  @SetMetadata('roles', ['admin', 'user'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
