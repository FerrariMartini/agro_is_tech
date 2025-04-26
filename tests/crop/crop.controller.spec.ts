import { CropController } from '@/application/controllers/crop/crop.controller';
import { CropService } from '@/application/services/crop/crop.service';
import { CreateCropDto } from '@/domain/crop/dto/create.crop.dto';
import {
  CreateCropResponseDto,
  UpdateCropResponseDto,
} from '@/domain/crop/dto/crop.response.dto';
import { UpdateCropDto } from '@/domain/crop/dto/update.crop.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('CropController', () => {
  let controller: CropController;
  let service: CropService;

  const description = 'Soja pura na Safra 2021 no campo 7';
  const harvestId = '94740606-d4c3-4879-8df2-6cd44b84c306';
  const seed = 'Soja';
  const generatedId = 'generated-uuid';

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        {
          provide: CropService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(CropController);
    service = module.get(CropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a crop', async () => {
    const dto: CreateCropDto = {
      description,
      harvestId,
      seed,
    };

    const expected: CreateCropResponseDto = {
      id: generatedId,
      description,
      harvestId,
      seed,
      createdAt: new Date(),
    };

    mockService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should update a crop', async () => {
    const dto: UpdateCropDto = {
      id: generatedId,
      description,
      seed,
      harvestId,
    };

    const expected: UpdateCropResponseDto = {
      id: generatedId,
      description,
      seed,
      harvestId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockService.update.mockResolvedValue(expected);

    const result = await controller.update(generatedId, dto);

    expect(service.update).toHaveBeenCalledWith({ ...dto, id: generatedId });
    expect(result).toEqual(expected);
  });
});
