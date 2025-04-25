import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errorsMap } from './errors.map';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
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

    response.status(status).json({
      error,
      messages: formattedMessages,
    });
  }
}
