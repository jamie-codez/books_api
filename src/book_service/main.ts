import { NestFactory } from '@nestjs/core';
import { BookServiceModule } from './books.module';

async function bootstrap() {
  const app = await NestFactory.create(BookServiceModule);
  await app.listen(5003);
}
bootstrap();
