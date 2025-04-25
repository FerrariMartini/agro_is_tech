import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { errorsMap } from '../errors.map';

export function GenericUnauthorizedException(): never {
  throw new UnauthorizedException({
    error: 'Unauthorized',
    message: [errorsMap.INVALID_CREDENTIAL],
  });
}

export function GenericNotFoundException(): never {
  throw new NotFoundException({
    error: 'Not Found',
    message: [errorsMap.GENERIC_VALIDATION],
  });
}
