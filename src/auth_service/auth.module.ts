import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceController } from './auth.controller';
import { rolesRepoProvider } from '../user_service/user.repo.provider';
import { UserServiceModule } from '../user_service/user.module';
import { DatabaseModule } from '../core/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { LocalStrategy } from '../core/strategies/local.strategy';

@Module({
  controllers: [AuthServiceController],
  providers: [AuthService, ...rolesRepoProvider, JwtStrategy, LocalStrategy],
  imports: [
    UserServiceModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthServiceModule {}
