import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPort } from './helpers/env';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(getPort());

  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (err: Error) => {
    loggingService.error(`Uncaught Exception: ${err.message}`);
    loggingService.error(err.stack || 'No stack trace available');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    loggingService.error(`Unhandled Rejection at Promise: ${promise}`);
    loggingService.error(`Reason: ${reason}`);
    process.exit(1);
  });
}
bootstrap();
