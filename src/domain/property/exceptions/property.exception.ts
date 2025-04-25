import { errorsMap } from '@/shared/errors/errors.map';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export function PropertyNotFoundException(): never {
  throw new NotFoundException({
    error: 'Not Found',
    message: [errorsMap.PROPERTY_NOT_FOUND],
  });
}

export function PropertyAreaIssueException(): never {
  throw new BadRequestException({
    error: 'Bad Request',
    message: [errorsMap.PROPERTY_AREA_ISSUE],
  });
}
