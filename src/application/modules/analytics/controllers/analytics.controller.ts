import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { TotalPropertiesResponseDto } from '@/domain/analytics/dto/total.properties.response.dto';
import { TotalAreaResponseDto } from '@/domain/analytics/dto/total.area.response.dto';
import { PropertiesByStateResponseDto } from '@/domain/analytics/dto/properties.by.state.response.dto';
import { PropertiesByCropResponseDto } from '@/domain/analytics/dto/properties.by.crop.response.dto';
import { AreaUsageResponseDto } from '@/domain/analytics/dto/area.usage.response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiResponse({
    status: 200,
    description: 'Total number of registered properties (farms)',
    type: TotalPropertiesResponseDto,
  })
  @Get('total-properties')
  async getTotalProperties(): Promise<TotalPropertiesResponseDto> {
    return this.analyticsService.getTotalProperties();
  }

  @ApiResponse({
    status: 200,
    description: 'Total registered area (hectares) across all properties.',
    type: TotalAreaResponseDto,
  })
  @Get('total-area')
  async getTotalArea(): Promise<TotalAreaResponseDto> {
    return this.analyticsService.getTotalArea();
  }

  @ApiResponse({
    status: 200,
    description: 'Number of properties grouped by state.',
    type: [PropertiesByStateResponseDto],
  })
  @Get('properties-by-state')
  async getPropertiesByState(): Promise<PropertiesByStateResponseDto[]> {
    return this.analyticsService.getPropertiesByState();
  }

  @ApiResponse({
    status: 200,
    description: 'Number of crops planted (e.g., soy, corn, coffee).',
    type: [PropertiesByCropResponseDto],
  })
  @Get('properties-by-crop')
  async getPropertiesByCrop(): Promise<PropertiesByCropResponseDto[]> {
    return this.analyticsService.getPropertiesByCrop();
  }

  @ApiResponse({
    status: 200,
    description:
      'Distribution of land usage between arable area and vegetation area.',
    type: AreaUsageResponseDto,
  })
  @Get('area-usage')
  async getAreaUsage(): Promise<AreaUsageResponseDto> {
    return this.analyticsService.getAreaUsage();
  }
}
