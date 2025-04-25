import {
  Body,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BaseCrudService } from '../services/base.crud.service';

export abstract class BaseCrudController<
  TEntity,
  TCreateResponse = TEntity,
  TUpdateResponse = TEntity,
  TResponse = TEntity,
  TCreateDto = any,
  TUpdateDto = any,
> {
  constructor(
    protected readonly service: BaseCrudService<
      TEntity,
      TCreateResponse,
      TUpdateResponse,
      TResponse,
      TCreateDto,
      TUpdateDto
    >,
  ) {}

  @Post()
  async create(@Body() dto: TCreateDto): Promise<TCreateResponse> {
    return await this.service.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TUpdateDto,
  ): Promise<TUpdateResponse> {
    return await this.service.update({ ...dto, id });
  }

  @Get()
  async findAll(): Promise<TResponse[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<TResponse> {
    return await this.service.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
