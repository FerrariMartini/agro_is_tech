import { OmitType } from '@nestjs/swagger';
import { ProducerDto } from './producer.dto';

export class CreateProducerDto extends OmitType(ProducerDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
