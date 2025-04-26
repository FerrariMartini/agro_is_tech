import { OmitType } from '@nestjs/swagger';
import { ProducerDto } from './producer.dto';

export class UpdateProducerDto extends OmitType(ProducerDto, [
  'createdAt',
  'updatedAt',
  'taxId',
]) {}
