import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';
import { ROLES_REPOSITORY, USER_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepo: Repository<User>,
    @Inject(ROLES_REPOSITORY) private rolesRepo: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    // Assign default user role
    const userRole = await this.rolesRepo.findOne({
      where: { name: 'user' },
    });
    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(userRole);
    return user;
  }

  async findAll(page: number, size: number) {
    return await this.userRepo.find({
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
      skip: (page - 1) * size,
      take: size,
    });
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
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
  }

  async findOneByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async search(search: string, page: number, limit: number) {
    return await this.userRepo
      .createQueryBuilder('user')
      .select([
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
      ])
      .where('user.username LIKE :search', { search: `%${search}%` })
      .orWhere('user.firstName LIKE :search', { search: `%${search}%` })
      .orWhere('user.lastName LIKE :search', { search: `%${search}%` })
      .orWhere('user.email LIKE :search', { search: `%${search}%` })
      .orWhere('user.phoneNumber LIKE :search', { search: `%${search}%` })
      .offset((page - 1) * limit)
      .limit(limit)
      .getMany();
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }
}
