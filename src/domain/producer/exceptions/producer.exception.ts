import { errorsMap } from '@/shared/errors/errors.map';
import { ConflictException, NotFoundException } from '@nestjs/common';

export function DuplicateTaxIdException(): never {
  throw new ConflictException({
    error: 'Conflict',
    message: [errorsMap.TAX_ID_CONFLICT],
  });
}

export function ProducerNotFoundException(): never {
  throw new NotFoundException({
    error: 'Not Found',
    message: [errorsMap.PRODUCER_NOT_FOUND],
  });
}
