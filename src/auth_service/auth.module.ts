import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceController } from './auth.controller';
import { UserService } from '../user_service/user.service';
import { rolesRepoProvider } from '../user_service/user.repo.provider';

@Module({
  controllers: [AuthServiceController],
  providers: [AuthService, ...rolesRepoProvider],
  imports: [UserService],
})
export class AuthServiceModule {}
