import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const isPostMethod = req.method;
    const isStatusCodeCreate = res.statusCode === HttpStatus.OK;

    return next.handle().pipe(
      map((data) => {
        if (isPostMethod && isStatusCodeCreate)
          res.status(data.status || context.switchToHttp().getResponse().statusCode);
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          reqId: context.switchToHttp().getRequest().reqId,
          message: data?.message || '',
          data: data,
        };
      }),
    );
  }
}
