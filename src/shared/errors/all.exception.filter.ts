import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorsMap } from './errors.map';
import { ErrorLogOrmEntity } from '@/infrastructure/database/typeorm/entities/error.logs.orm.entity';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @InjectRepository(ErrorLogOrmEntity)
    private readonly errorLogRepository: Repository<ErrorLogOrmEntity>,
  ) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse =
      exception instanceof HttpException ? exception.getResponse() : {};
    const message =
      typeof rawResponse === 'string'
        ? [rawResponse]
        : rawResponse['message'] || ['Unexpected error'];
    const error =
      rawResponse['error'] || exception.name || 'Internal Server Error';

    const formattedMessages = Array.isArray(message)
      ? message.map((msg) =>
          typeof msg === 'object'
            ? msg
            : errorsMap[msg] || {
                key: 'validation.generic',
                defaultMessage: msg,
              },
        )
      : [
          typeof message === 'string' && errorsMap[message]
            ? errorsMap[message]
            : {
                key: 'error.generic',
                defaultMessage: message,
              },
        ];

    await this.errorLogRepository.save(
      this.errorLogRepository.create({
        path: request.url,
        method: request.method,
        statusCode: status,
        error,
        message: JSON.stringify(formattedMessages),
        stack: exception.stack,
        payload: request.body,
        headers: request.headers,
      }),
    );

    response.status(status).json({
      error,
      messages: formattedMessages,
    });
  }
}
