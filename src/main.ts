import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import {
  TimeoutInterceptor,
  WrapResponseInterceptor
} from './common/interceptors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new WrapResponseInterceptor()
  )
  await app.listen(5000)
}
bootstrap()
