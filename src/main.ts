import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './helpers/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(getPort());
}
bootstrap();
