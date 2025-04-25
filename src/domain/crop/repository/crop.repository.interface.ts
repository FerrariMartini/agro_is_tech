import { BaseRepository } from '@/shared/base.repository';
import { Crop } from '../entities/crop.entity';

export const CROP_REPOSITORY = Symbol('CROP_REPOSITORY');

export type CropRepository = BaseRepository<Crop>;
