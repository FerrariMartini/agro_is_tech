import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from '@/application/controllers/harvest/harvest.controller';
import { HarvestService } from '@/application/services/harvest/harvest.service';
import { CreateHarvestDto } from '@/domain/haverst/dto/create.harvest.dto';
import {
  CreateHarvestResponseDto,
  UpdateHarvestResponseDto,
} from '@/domain/haverst/dto/harvest.response.dto';
import { UpdateHarvestDto } from '@/domain/haverst/dto/update.harvest.dto';

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: HarvestService;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        {
          provide: HarvestService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(HarvestController);
    service = module.get(HarvestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a harvest', async () => {
    const dto: CreateHarvestDto = {
      year: 2025,
      description: 'Safra 1',
      propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
    };

    const expected: CreateHarvestResponseDto = {
      id: 'f3122e96-ceb7-40bb-a970-c819847dd31f',
      year: 2025,
      description: 'Safra 1',
      propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
      createdAt: new Date(),
    };

    mockService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should update a harvest', async () => {
    const id = 'uuid';

    const dto: Omit<UpdateHarvestDto, 'id'> = {
      year: 2024,
      description: 'Safra 1 - Year updated',
      propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
    };

    const expected: UpdateHarvestResponseDto = {
      id: 'f3122e96-ceb7-40bb-a970-c819847dd31f',
      year: 2024,
      description: 'Safra 1 - Year updated',
      propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockService.update.mockResolvedValue(expected);

    const result = await controller.update(id, dto);

    expect(service.update).toHaveBeenCalledWith({ ...dto, id });
    expect(result).toEqual(expected);
  });
});
