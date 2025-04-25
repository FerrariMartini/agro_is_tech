import { UpdateHarvestUseCase } from '@/domain/haverst/usecase/update.harvest.usecase';
import { Harvest } from '@/domain/haverst/entities/harvest.entity';
import { UpdateHarvestDto } from '@/domain/haverst/dto/update.harvest.dto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateHarvestUseCase', () => {
  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const useCase = new UpdateHarvestUseCase(mockRepository as any);

  const existing = new Harvest(
    'generated-uuid',
    2025,
    '94740606-d4c3-4879-8df2-6cd44b84c306',
    'Safra 1',
    new Date(),
    new Date(),
    null,
  );

  const updateDto: UpdateHarvestDto = {
    id: 'property-uuid',
    year: 2024,
    description: 'Safra 1 - Year updated',
    propertyId: '94740606-d4c3-4879-8df2-6cd44b84c306',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update harvest successfully', async () => {
    mockRepository.findById.mockResolvedValue(existing);
    mockRepository.update.mockImplementation(async (property) => property);

    const result = await useCase.execute(updateDto);

    expect(mockRepository.findById).toHaveBeenCalledWith(updateDto.id);

    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.propertyId).toBe(updateDto.propertyId);
    expect(result.year).toBe(updateDto.year);
    expect(result.description).toBe(updateDto.description);
  });

  it('should throw NotFoundException if harvest not found', async () => {
    mockRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute(updateDto)).rejects.toThrow(NotFoundException);
  });
});
