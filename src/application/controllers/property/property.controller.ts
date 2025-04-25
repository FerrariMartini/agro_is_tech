import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Property } from '@/domain/property/entities/property.entity';
import { BaseCrudController } from '@/application/controllers/base.crud.controller';
import {
  CreatePropertyResponseDto,
  PropertyResponseDto,
  UpdatePropertyResponseDto,
} from '@/domain/property/dto/property.response.dto';
import { PropertyService } from '@/application/services/property/property.service';
import { CreatePropertyDto } from '@/domain/property/dto/create.property.dto';
import { UpdatePropertyDto } from '@/domain/property/dto/update.property.dto';

@Controller('properties')
export class PropertyController extends BaseCrudController<
  Property,
  CreatePropertyResponseDto,
  UpdatePropertyResponseDto,
  PropertyResponseDto
> {
  constructor(service: PropertyService) {
    super(service);
  }

  @Post()
  async create(
    @Body() dto: CreatePropertyDto,
  ): Promise<CreatePropertyResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Omit<UpdatePropertyDto, 'id'>,
  ): Promise<UpdatePropertyResponseDto> {
    return this.service.update({ ...dto, id });
  }
}
