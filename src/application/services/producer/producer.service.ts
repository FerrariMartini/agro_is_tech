import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../base.crud.service';
import { Producer } from '@/domain/producer/entities/producer.entity';
import {
  CreateProducerResponseDto,
  ProducerResponseDto,
  UpdateProducerResponseDto,
} from '@/domain/producer/dto/producer.response.dto';
import { ProducerUseCaseFactory } from '@/domain/producer/usecase/producer.usecase.factory';
import { ProducerMapper } from '@/application/mappers/producer.mapper';

@Injectable()
export class ProducerService extends BaseCrudService<
  Producer,
  CreateProducerResponseDto,
  UpdateProducerResponseDto,
  ProducerResponseDto
> {
  constructor(
    factory: ProducerUseCaseFactory,
    private readonly mapper: ProducerMapper,
  ) {
    super(
      factory.create(),
      factory.update(),
      factory.findById(),
      factory.findAll(),
      factory.delete(),
    );
  }

  protected override mapCreate(entity: Producer): CreateProducerResponseDto {
    return this.mapper.toCreateResponse(entity);
  }

  protected override mapUpdate(entity: Producer): UpdateProducerResponseDto {
    return this.mapper.toResponse(entity);
  }

  protected override map(entity: Producer): ProducerResponseDto {
    return this.mapper.toResponse(entity);
  }
}
