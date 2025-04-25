import { CreateHarvestUseCase } from '@/domain/haverst/usecase/create.harvest.usecase';
import { CreateHarvestDto } from '@/domain/haverst/dto/create.harvest.dto';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';

describe('CreateHarvestUseCase', () => {
  const mockRepository = {
    create: jest.fn(),
  };

  const useCase = new CreateHarvestUseCase(mockRepository as any);

  const dto: CreateHarvestDto = {
    year: 2025,
    description: 'Safra 1',
    propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create harvest successfully', async () => {
    const expected = new Harvest(
      'generated-uuid',
      2025,
      '94740606-d4c3-4879-8df2-6cd44b84c306',
      'Safra 1',
      new Date(),
      new Date(),
      null,
    );

    mockRepository.create.mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(mockRepository.create).toHaveBeenCalled();
    expect(result.description).toBe(dto.description);
    expect(result.year).toBe(dto.year);
    expect(result.propertyId).toBe(dto.propertyId);
  });
});
