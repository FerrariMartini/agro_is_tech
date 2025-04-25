import { errorsMap } from '@/shared/errors/errors.map';
import { NotFoundException } from '@nestjs/common';

export function CropNotFoundException(): never {
  throw new NotFoundException({
    error: 'Not Found',
    message: [errorsMap.CROP_NOT_FOUND],
  });
}
