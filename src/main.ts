import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { ValidateInputPipe } from './pipes/validate.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The Books API for the book store')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
