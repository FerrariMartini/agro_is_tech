import { errorsMap } from '@/shared/errors/errors.map';
import { NotFoundException } from '@nestjs/common';

export function HarvestNotFoundException(): never {
  throw new NotFoundException({
    error: 'Not Found',
    message: [errorsMap.HARVEST_NOT_FOUND],
  });
}
