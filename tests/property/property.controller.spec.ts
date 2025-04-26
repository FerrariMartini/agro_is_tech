import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from '@/application/controllers/property/property.controller';
import { PropertyService } from '@/application/services/property/property.service';
import { CreatePropertyDto } from '@/domain/property/dto/create.property.dto';
import {
  CreatePropertyResponseDto,
  UpdatePropertyResponseDto,
} from '@/domain/property/dto/property.response.dto';
import { UpdatePropertyDto } from '@/domain/property/dto/update.property.dto';

describe('PropertyController', () => {
  let controller: PropertyController;
  let service: PropertyService;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(PropertyController);
    service = module.get(PropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a property', async () => {
    const dto: CreatePropertyDto = {
      name: 'Fazenda Nova America',
      city: 'Assis',
      state: 'SP',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      producerId: 'userId-1',
    };

    const expected: CreatePropertyResponseDto = {
      id: 'f3122e96-ceb7-40bb-a970-c819847dd31f',
      name: 'Fazenda Nova America',
      city: 'Assis',
      state: 'SP',
      totalArea: 1000,
      arableArea: 600,
      vegetationArea: 400,
      producerId: '94740606-d4c3-4879-8df2-6cd44b84c306',
      createdAt: new Date(),
    };

    mockService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should update a property', async () => {
    const id = 'f3122e96-ceb7-40bb-a970-c819847dd31f';

    const dto: UpdatePropertyDto = {
      id,
      name: 'Fazenda Nova America',
      city: 'Assis',
      state: 'SP',
      totalArea: 2000,
      arableArea: 1500,
      vegetationArea: 500,
      producerId: '94740606-d4c3-4879-8df2-6cd44b84c306',
    };

    const expected: UpdatePropertyResponseDto = {
      id,
      name: 'Fazenda Nova America',
      city: 'Assis',
      state: 'SP',
      totalArea: 2000,
      arableArea: 1500,
      vegetationArea: 500,
      producerId: '94740606-d4c3-4879-8df2-6cd44b84c306',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockService.update.mockResolvedValue(expected);

    const result = await controller.update(id, dto);

    expect(service.update).toHaveBeenCalledWith({ ...dto, id });
    expect(result).toEqual(expected);
  });
});
