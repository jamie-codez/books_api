import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ROLES_REPOSITORY, USER_REPOSITORY } from '../constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    @Inject(ROLES_REPOSITORY) private roleRepository: Repository<Role>,
  ) {
    this.seedRoles().then(() => {
      this.logger.log('Roles table seeded');
    });
    this.seed().then(() => {
      this.logger.log('User table seeded');
    });
  }

  async seedRoles() {
    const adminRole = await this.roleRepository.findOne({
      where: { name: 'admin' },
    });
    if (!adminRole) {
      this.logger.log('Seeding the roles table');
      await this.roleRepository.save({ name: 'admin', description: 'Admin' });
      await this.roleRepository.save({ name: 'user', description: 'User' });
    }
  }

  async seed() {
    const user = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!user) {
      this.logger.log('Seeding the user table');
      const adminRole = await this.roleRepository.findOne({
        where: { name: 'admin' },
      });
      const admin = await this.userRepository.save({
        username: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        password: await bcrypt.hash('admin', 10),
        email: 'admin@dev.com',
        phoneNumber: '1234567890',
      });
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(admin)
        .add(adminRole);
    }
    this.logger.log('User table seeded');
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    // Assign user role to the user
    const userRole = await this.roleRepository.findOne({
      where: { name: 'user' },
    });
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(user)
      .add(userRole);
    return user;
  }

  async findAll(page: number, limit: number) {
    return await this.userRepository.find({
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
      ],
      take: limit,
      skip: page * limit,
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
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

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async search(search: string, page: number, limit: number) {
    return await this.userRepository
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
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
