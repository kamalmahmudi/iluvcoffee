import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable, map } from 'rxjs'

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        data
      }))
    )
  }
}
