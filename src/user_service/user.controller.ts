import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userServiceService: UserService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserServiceDto: CreateUserDto) {
    return this.userServiceService.create(createUserServiceDto);
  }

  @MessagePattern('findAllUser')
  async findAll(@Payload() pagination: { page: number; size: number }) {
    return await this.userServiceService.findAll(
      pagination.page,
      pagination.size,
    );
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: number) {
    return await this.userServiceService.findOne(id);
  }

  @MessagePattern('searchUsers')
  async search(
    @Payload() pagination: { term: string; page: number; size: number },
  ) {
    return await this.userServiceService.search(
      pagination.term,
      pagination.page,
      pagination.size,
    );
  }

  @MessagePattern('updateUser')
  async update(@Payload() data: { id: number; updateUserDto: UpdateUserDto }) {
    return await this.userServiceService.update(data.id, data.updateUserDto);
  }

  @MessagePattern('deleteUser')
  async delete(@Payload() id: number) {
    return await this.userServiceService.delete(id);
  }
}
