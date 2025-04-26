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
import {
  ApiCreateEndpoint,
  ApiDeleteEndpoint,
  ApiFindAllEndpoint,
  ApiFindOneEndpoint,
  ApiUpdateEndpoint,
} from '@/shared/swagger/api.endpoints.decorator';

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
  @ApiCreateEndpoint({
    body: CreatePropertyDto,
    response: CreatePropertyResponseDto,
    conflict: true,
  })
  async create(
    @Body() dto: CreatePropertyDto,
  ): Promise<CreatePropertyResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiUpdateEndpoint({
    body: UpdatePropertyDto,
    response: UpdatePropertyResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePropertyDto,
  ): Promise<UpdatePropertyResponseDto> {
    return this.service.update({ ...dto, id });
  }

  @Get()
  @ApiFindAllEndpoint({ response: PropertyResponseDto })
  async findAll(): Promise<PropertyResponseDto[]> {
    return super.findAll();
  }

  @Get(':id')
  @ApiFindOneEndpoint({ response: PropertyResponseDto })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PropertyResponseDto> {
    return super.findById(id);
  }

  @Delete(':id')
  @ApiDeleteEndpoint()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return super.delete(id);
  }
}
