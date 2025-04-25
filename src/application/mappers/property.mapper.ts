import { Injectable } from '@nestjs/common';
import { Property } from '@/domain/property/entities/property.entity';
import {
  CreatePropertyResponseDto,
  PropertyResponseDto,
  UpdatePropertyResponseDto,
} from '@/domain/property/dto/property.response.dto';

@Injectable()
export class PropertyMapper {
  toCreateResponse(property: Property): CreatePropertyResponseDto {
    return {
      id: property.id,
      name: property.name,
      city: property.city,
      state: property.state,
      totalArea: property.totalArea,
      arableArea: property.arableArea,
      vegetationArea: property.vegetationArea,
      producerId: property.producerId,
      createdAt: property.createdAt,
    };
  }

  toUpdateResponse(property: Property): UpdatePropertyResponseDto {
    return {
      ...this.toCreateResponse(property),
      updatedAt: property.updatedAt,
    };
  }

  toResponse(property: Property): PropertyResponseDto {
    return {
      ...this.toUpdateResponse(property),
    };
  }

  toResponseList(properties: Property[]): PropertyResponseDto[] {
    return properties.map((p) => this.toResponse(p));
  }
}
