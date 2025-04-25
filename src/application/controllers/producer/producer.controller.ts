import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseCrudController } from '../base.crud.controller';
import { Producer } from '@/domain/producer/entities/producer.entity';
import {
  CreateProducerResponseDto,
  ProducerResponseDto,
  UpdateProducerResponseDto,
} from '@/domain/producer/dto/producer.response.dto';
import { ProducerService } from '@/application/services/producer/producer.service';
import { CreateProducerDto } from '@/domain/producer/dto/create.producer.dto';
import { UpdateProducerDto } from '@/domain/producer/dto/update.producer.dto';

@Controller('producers')
export class ProducerController extends BaseCrudController<
  Producer,
  CreateProducerResponseDto,
  UpdateProducerResponseDto,
  ProducerResponseDto,
  CreateProducerDto,
  UpdateProducerDto
> {
  constructor(service: ProducerService) {
    super(service);
  }

  @Post()
  async create(
    @Body() dto: CreateProducerDto,
  ): Promise<CreateProducerResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Omit<UpdateProducerDto, 'id'>,
  ): Promise<UpdateProducerResponseDto> {
    return this.service.update({ ...dto, id });
  }
}
