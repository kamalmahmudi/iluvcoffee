import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      const error =
        typeof exceptionResponse === 'string'
          ? { statusCode, message: exceptionResponse }
          : (exceptionResponse as object)
      return response.status(statusCode).send(error)
    }
    const request = ctx.getRequest<Request>()
    const exceptionLog = {
      timestamp: new Date(),
      path: request.path,
      message: exception['message'] || 'Unknown error',
      stack: exception['stack'],
      detail: { ...exception }
    }
    console.log(exceptionLog)
    console.log('==========')
    console.log(exceptionLog.message)
    response.status(500).send({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error'
    })
  }
}
