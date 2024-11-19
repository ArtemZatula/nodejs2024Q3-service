import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './helpers/env';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(getPort());
}
bootstrap();
