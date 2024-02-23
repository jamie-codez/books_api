import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { rolesRepoProvider, userRepoProvider } from './user.repo.provider';
import { DatabaseModule } from '../core/database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userRepoProvider, ...rolesRepoProvider],
  exports: [UserService, ...userRepoProvider, ...rolesRepoProvider],
  imports: [DatabaseModule],
})
export class UserServiceModule {}
