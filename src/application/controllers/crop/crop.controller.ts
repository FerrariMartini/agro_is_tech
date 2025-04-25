import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseCrudController } from '@/application/controllers/base.crud.controller';
import { Crop } from '@/domain/crop/entities/crop.entity';
import {
  CreateCropResponseDto,
  CropResponseDto,
  UpdateCropResponseDto,
} from '@/domain/crop/dto/crop.response.dto';
import { CropService } from '@/application/services/crop/crop.service';
import { CreateCropDto } from '@/domain/crop/dto/create.crop.dto';
import { UpdateCropDto } from '@/domain/crop/dto/update.crop.dto';

@Controller('crops')
export class CropController extends BaseCrudController<
  Crop,
  CreateCropResponseDto,
  UpdateCropResponseDto,
  CropResponseDto
> {
  constructor(service: CropService) {
    super(service);
  }

  @Post()
  async create(@Body() dto: CreateCropDto): Promise<CreateCropResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Omit<UpdateCropDto, 'id'>,
  ): Promise<UpdateCropResponseDto> {
    return this.service.update({ ...dto, id });
  }
}
