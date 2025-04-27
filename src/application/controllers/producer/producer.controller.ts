import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
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
import {
  ApiCreateEndpoint,
  ApiDeleteEndpoint,
  ApiFindAllEndpoint,
  ApiFindOneEndpoint,
  ApiUpdateEndpoint,
} from '@/shared/swagger/api.endpoints.decorator';
import { PaginatedResponseDto } from '@/shared/dto/paginated.response.dto';
import { RequestPaginateQueryDto } from '@/shared/dto/paginate.query.request';

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
  @ApiCreateEndpoint({
    body: CreateProducerDto,
    response: CreateProducerResponseDto,
    conflict: true,
  })
  async create(
    @Body() dto: CreateProducerDto,
  ): Promise<CreateProducerResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiUpdateEndpoint({
    body: UpdateProducerDto,
    response: UpdateProducerResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProducerDto,
  ): Promise<UpdateProducerResponseDto> {
    return this.service.update({ ...dto, id });
  }

  @Get()
  @ApiFindAllEndpoint({ response: ProducerResponseDto })
  async findAll(
    @Query() queryParams: RequestPaginateQueryDto,
  ): Promise<PaginatedResponseDto<ProducerResponseDto>> {
    return super.findAll(queryParams);
  }

  @Get(':id')
  @ApiFindOneEndpoint({ response: ProducerResponseDto })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProducerResponseDto> {
    return super.findById(id);
  }

  @Delete(':id')
  @ApiDeleteEndpoint()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return super.delete(id);
  }
}
