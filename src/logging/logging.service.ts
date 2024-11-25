import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogLevel } from './log-level.enum';
import { getLogLevel } from 'src/helpers/env';
import { join } from 'path';
import { appendFile, mkdir } from 'fs/promises';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logLevel: LogLevel = getLogLevel();
  private logDir = './logs';
  private logFile = `app-${new Date().toISOString().split('T')[0]}.log`;

  constructor() {
    super();
    this.ensureLogDirExists();
  }

  private async ensureLogDirExists(): Promise<void> {
    try {
      await mkdir(this.logDir, { recursive: true });
    } catch (error) {
      super.error(`Failed to create log directory: ${error}`);
    }
  }

  async writeLogToFile(msg: string): Promise<void> {
    const logFilePath = join(this.logDir, this.logFile);
    try {
      await appendFile(logFilePath, msg);
    } catch (error) {
      this.error(error);
    }
  }

  private logToFileBasedOnLevel(logType: LogLevel, message: any) {
    const logMethods = {
      [LogLevel.ERROR]: 'error',
      [LogLevel.WARN]: 'warn',
      [LogLevel.LOG]: 'log',
      [LogLevel.VERBOSE]: 'verbose',
    } as const;

    if (this.logLevel >= logType) {
      const method = logMethods[logType];
      super[method](message);

      const msg =
        new Date().toISOString() + ` ${method.toUpperCase()} ` + message + '\n';
      this.writeLogToFile(msg);
    }
  }

  verbose(message: any): void {
    this.logToFileBasedOnLevel(LogLevel.VERBOSE, message);
  }

  error(message: any): void {
    this.logToFileBasedOnLevel(LogLevel.ERROR, message);
  }

  log(message: any): void {
    this.logToFileBasedOnLevel(LogLevel.LOG, message);
  }

  warn(message: any): void {
    this.logToFileBasedOnLevel(LogLevel.WARN, message);
  }
}
