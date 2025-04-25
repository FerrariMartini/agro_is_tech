import { BaseRepository } from '@/shared/base.repository';
import { Property } from '../entities/property.entity';

export const PROPERTY_REPOSITORY = Symbol('PROPERTY_REPOSITORY');

export type PropertyRepository = BaseRepository<Property>;
