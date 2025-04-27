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
import {
  ApiCreateEndpoint,
  ApiDeleteEndpoint,
  ApiFindAllEndpoint,
  ApiFindOneEndpoint,
  ApiUpdateEndpoint,
} from '@/shared/swagger/api.endpoints.decorator';
import { PaginatedResponseDto } from '@/shared/dto/paginated.response.dto';
import { RequestPaginateQueryDto } from '@/shared/dto/paginate.query.request';

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
  @ApiCreateEndpoint({
    body: CreateCropDto,
    response: CreateCropResponseDto,
    conflict: true,
  })
  async create(@Body() dto: CreateCropDto): Promise<CreateCropResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiUpdateEndpoint({
    body: UpdateCropDto,
    response: UpdateCropResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCropDto,
  ): Promise<UpdateCropResponseDto> {
    return this.service.update({ ...dto, id });
  }

  @Get()
  @ApiFindAllEndpoint({ response: CropResponseDto })
  async findAll(
    @Query() queryParams: RequestPaginateQueryDto,
  ): Promise<PaginatedResponseDto<CropResponseDto>> {
    return super.findAll(queryParams);
  }

  @Get(':id')
  @ApiFindOneEndpoint({ response: CropResponseDto })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CropResponseDto> {
    return super.findById(id);
  }

  @Delete(':id')
  @ApiDeleteEndpoint()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return super.delete(id);
  }
}
