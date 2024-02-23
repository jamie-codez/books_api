import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserServiceModule } from './user_service/user.module';
import { BookServiceModule } from './book_service/books.module';
import { AuthServiceModule } from './auth_service/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, BOOKS_SERVICE, USER_SERVICE } from './constants';

@Module({
  imports: [
    UserServiceModule,
    BookServiceModule,
    AuthServiceModule,
    DatabaseModule,
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5001,
        },
      },
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5002,
        },
      },
      {
        name: BOOKS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5003,
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, UserController, BooksController],
  providers: [AppService],
})
export class AppModule {}
