import { Injectable } from '@nestjs/common';
import { GetTotalPropertiesUseCase } from '../usecases/get.total.properties.usecase';
import { TotalPropertiesResponseDto } from '@/domain/analytics/dto/total.properties.response.dto';
import { TotalAreaResponseDto } from '@/domain/analytics/dto/total.area.response.dto';
import { GetTotalAreaUseCase } from '../usecases/get.total.area.usecase';
import { GetPropertiesByStateUseCase } from '../usecases/get.properties.by.state.usecase';
import { GetPropertiesByCropUseCase } from '../usecases/get.properties.by.crop.usecase';
import { GetAreaUsageUseCase } from '../usecases/get.area.usage.usecase';
import { PropertiesByStateResponseDto } from '@/domain/analytics/dto/properties.by.state.response.dto';
import { PropertiesByCropResponseDto } from '@/domain/analytics/dto/properties.by.crop.response.dto';
import { AreaUsageResponseDto } from '@/domain/analytics/dto/area.usage.response.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly getTotalPropertiesUseCase: GetTotalPropertiesUseCase,
    private readonly getTotalAreaUseCase: GetTotalAreaUseCase,
    private readonly getPropertiesByStateUseCase: GetPropertiesByStateUseCase,
    private readonly getPropertiesByCropUseCase: GetPropertiesByCropUseCase,
    private readonly getAreaUsageUseCase: GetAreaUsageUseCase,
  ) {}

  async getTotalProperties(): Promise<TotalPropertiesResponseDto> {
    const total = await this.getTotalPropertiesUseCase.execute();
    return { totalProperties: total };
  }

  async getTotalArea(): Promise<TotalAreaResponseDto> {
    const area = await this.getTotalAreaUseCase.execute();
    return { totalArea: area };
  }

  async getPropertiesByState(): Promise<PropertiesByStateResponseDto[]> {
    return this.getPropertiesByStateUseCase.execute();
  }

  async getPropertiesByCrop(): Promise<PropertiesByCropResponseDto[]> {
    return this.getPropertiesByCropUseCase.execute();
  }

  async getAreaUsage(): Promise<AreaUsageResponseDto> {
    return this.getAreaUsageUseCase.execute();
  }
}
