import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY, USER_REPOSITORY } from '../constants';
import { Role, User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { CreateUserDto, LoginUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    @Inject(ROLES_REPOSITORY) private rolesRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(user: CreateUserDto) {
    // assign the user role to the user
    const userRole = await this.rolesRepository.findOne({
      where: { name: 'user' },
    });
    const newUser = await this.userRepository.save({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(newUser)
      .add(userRole);
    return newUser;
  }

  async login(loginUser: LoginUserDto) {
    const dbUser = await this.userRepository.findOne({
      where: { email: loginUser.email },
    });
    if (!dbUser && bcrypt.compareSync(loginUser.password, dbUser.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    return await this.generateToken(loginUser.email);
  }

  async generateToken(email: string) {
    return this.jwtService.sign({ email });
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
