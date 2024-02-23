import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './user_service/dto/create-user.dto';
import { UpdateUserDto } from './user_service/dto/update-user.dto';
import { USER_SERVICE } from './constants';
import { UserExistsGuard } from './core/guards/does.user.exist.guard';
import { JwtGuard } from './core/guards/jwt.guard';
import { RolesGuard } from './core/guards/roles.guard';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  @SetMetadata('roles', ['admin', 'user'])
  @UseGuards(UserExistsGuard)
  @Post()
  async create(@Body() createUserServiceDto: CreateUserDto) {
    return this.userClient.send({ cmd: 'createUser' }, createUserServiceDto);
  }

  @SetMetadata('roles', ['admin'])
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
  ) {
    return this.userClient.send(
      { cmd: 'findAllUser' },
      { page: page, size: size },
    );
  }

  @SetMetadata('roles', ['admin', 'user'])
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userClient.send({ cmd: 'findOneUser' }, id);
  }

  @SetMetadata('roles', ['admin'])
  @Get('search')
  async search(
    @Query('search') term: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.userClient.send({ cmd: 'searchUsers' }, { term, page, limit });
  }

  @SetMetadata('roles', ['admin', 'user'])
  @Put(':id')
  async update(@Param('id') id: number, updateUserDto: UpdateUserDto) {
    return this.userClient.send({ cmd: 'updateUser' }, { id, updateUserDto });
  }

  @SetMetadata('roles', ['admin'])
  @Delete()
  async delete(@Param('id') id: number) {
    return this.userClient.send({ cmd: 'deleteUser' }, id);
  }
}
