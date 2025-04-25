import { CreateCropUseCase } from '@/domain/crop/usercase/create.crop.usecase';
import { CreateCropDto } from '@/domain/crop/dto/create.crop.dto';
import { Crop } from '@/domain/crop/entities/crop.entity';

describe('CreateCropUseCase', () => {
  const mockRepository = {
    create: jest.fn(),
  };

  const useCase = new CreateCropUseCase(mockRepository as any);

  const description = 'Soja pura na Safra 2021 no campo 7';
  const harvestId = '94740606-d4c3-4879-8df2-6cd44b84c306';
  const seed = 'Soja';

  const dto: CreateCropDto = {
    description,
    harvestId,
    seed,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create crop successfully', async () => {
    const expected = new Crop(
      'generated-uuid',
      description,
      seed,
      harvestId,
      new Date(),
      new Date(),
      null,
    );

    mockRepository.create.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(mockRepository.create).toHaveBeenCalled();
    expect(result.description).toBe(dto.description);
    expect(result.seed).toBe(dto.seed);
    expect(result.harvestId).toBe(dto.harvestId);
  });
});
