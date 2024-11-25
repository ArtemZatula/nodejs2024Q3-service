import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const { method, originalUrl, query, body } = req;

    const startTime = Date.now();
    this.loggingService.log(`[Request]: ${method} ${originalUrl}`);
    this.loggingService.log(`[Query Params]: ${JSON.stringify(query)}`);
    this.loggingService.log(`[Body]: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap(() => {
        const res = ctx.getResponse();
        const { statusCode } = res;
        const elapsedTime = Date.now() - startTime;

        this.loggingService.log(
          `Response Status: ${statusCode} (Time Taken: ${elapsedTime}ms)`,
        );
      }),
    );
  }
}
