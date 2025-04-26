import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseCrudController } from '@/application/controllers/base.crud.controller';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';
import {
  CreateHarvestResponseDto,
  HarvestResponseDto,
  UpdateHarvestResponseDto,
} from '@/domain/haverst/dto/harvest.response.dto';
import { HarvestService } from '@/application/services/harvest/harvest.service';
import { CreateHarvestDto } from '@/domain/haverst/dto/create.harvest.dto';
import { UpdateHarvestDto } from '@/domain/haverst/dto/update.harvest.dto';
import {
  ApiCreateEndpoint,
  ApiDeleteEndpoint,
  ApiFindAllEndpoint,
  ApiFindOneEndpoint,
  ApiUpdateEndpoint,
} from '@/shared/swagger/api.endpoints.decorator';

@Controller('harvests')
export class HarvestController extends BaseCrudController<
  Harvest,
  CreateHarvestResponseDto,
  UpdateHarvestResponseDto,
  HarvestResponseDto
> {
  constructor(service: HarvestService) {
    super(service);
  }

  @Post()
  @ApiCreateEndpoint({
    body: CreateHarvestResponseDto,
    response: CreateHarvestResponseDto,
    conflict: true,
  })
  async create(
    @Body() dto: CreateHarvestDto,
  ): Promise<CreateHarvestResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiUpdateEndpoint({
    body: UpdateHarvestDto,
    response: UpdateHarvestResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHarvestDto,
  ): Promise<UpdateHarvestResponseDto> {
    return this.service.update({ ...dto, id });
  }

  @Get()
  @ApiFindAllEndpoint({ response: HarvestResponseDto })
  async findAll(): Promise<HarvestResponseDto[]> {
    return super.findAll();
  }

  @Get(':id')
  @ApiFindOneEndpoint({ response: HarvestResponseDto })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HarvestResponseDto> {
    return super.findById(id);
  }

  @Delete(':id')
  @ApiDeleteEndpoint()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return super.delete(id);
  }
}
