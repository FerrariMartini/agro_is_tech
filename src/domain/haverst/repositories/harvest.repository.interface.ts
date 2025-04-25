import { BaseRepository } from '@/shared/base.repository';
import { Harvest } from '../entities/harvest.entity';

export const HARVEST_REPOSITORY = Symbol('HARVEST_REPOSITORY');

export type HarvestRepository = BaseRepository<Harvest>;
