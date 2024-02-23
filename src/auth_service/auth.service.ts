import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UpdateAuthServiceDto } from './dto/update-auth.dto';
import { ROLES_REPOSITORY, USER_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { Role, User } from '../user_service/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepo: Repository<User>,
    @Inject(ROLES_REPOSITORY) private roleRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userRole = await this.roleRepo.findOne({ where: { name: 'user' } });
    const user = new User();
    const splitName = registerDto.fullName.split(' ');
    user.firstName = splitName[0];
    user.lastName = splitName[1];
    user.email = registerDto.email;
    user.password = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userRepo.save(user);
    await this.userRepo
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(newUser)
      .add(userRole);
    return newUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException('User does not exists.');
    }
    if (bcrypt.compareSync(loginDto.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    return await this.generateJwtToken(user.email);
  }

  async generateJwtToken(email: string) {
    return this.jwtService.sign({ email });
  }
}
