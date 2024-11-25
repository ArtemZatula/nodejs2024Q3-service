import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string, trace?: string) {
    console.error(`[ERROR]: ${message}`, trace);
  }
}
