import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserServiceController } from './user.controller';
import { rolesRepoProvider, userRepoProvider } from './user.repo.provider';

@Module({
  controllers: [UserServiceController],
  providers: [UserService, ...userRepoProvider, ...rolesRepoProvider],
  exports: [UserService, ...userRepoProvider, ...rolesRepoProvider],
})
export class UserServiceModule {}
