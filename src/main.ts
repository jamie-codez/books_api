import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { ValidateInputPipe } from './pipes/validate.pipes';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

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

config();
async function seed() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();

  const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();

  await client.query(sql);

  await client.end();
}

seed().catch((err) => console.error(err));
