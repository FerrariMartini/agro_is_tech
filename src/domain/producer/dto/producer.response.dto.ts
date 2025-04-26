import { OmitType } from '@nestjs/swagger';
import { ProducerDto } from './producer.dto';

export class ProducerResponseDto extends ProducerDto {}

export class CreateProducerResponseDto extends OmitType(ProducerDto, [
  'updatedAt',
]) {}

export class UpdateProducerResponseDto extends ProducerDto {}
