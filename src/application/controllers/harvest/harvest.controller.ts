import {
  Body,
  Controller,
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
  async create(
    @Body() dto: CreateHarvestDto,
  ): Promise<CreateHarvestResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Omit<UpdateHarvestDto, 'id'>,
  ): Promise<UpdateHarvestResponseDto> {
    return this.service.update({ ...dto, id });
  }
}
