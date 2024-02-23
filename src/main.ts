import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PREFIX, SWAGGER_API_ROOT } from './constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipes/valiation.pipe';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(APP_PREFIX);
  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The book API for the library')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
