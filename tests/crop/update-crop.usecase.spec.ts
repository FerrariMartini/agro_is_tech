import { NotFoundException } from '@nestjs/common';
import { UpdateCropUseCase } from '@/domain/crop/usercase/update.crop.usecase';
import { Crop } from '@/domain/crop/entities/crop.entity';
import { UpdateCropDto } from '@/domain/crop/dto/update.crop.dto';

describe('UpdateCropUseCase', () => {
  const mockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const useCase = new UpdateCropUseCase(mockRepository as any);

  const generatedId = 'generated-uuid';
  const description = 'Soja pura na Safra 2021 no campo 7';
  const harvestId = '94740606-d4c3-4879-8df2-6cd44b84c306';
  const seed = 'Soja';

  const existing = new Crop(
    generatedId,
    description,
    seed,
    harvestId,
    new Date(),
    new Date(),
    null,
  );

  const updateDto: UpdateCropDto = {
    id: generatedId,
    description,
    harvestId,
    seed,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update crop successfully', async () => {
    mockRepository.findById.mockResolvedValue(existing);
    mockRepository.update.mockImplementation(async (property) => property);

    const result = await useCase.execute(updateDto);

    expect(mockRepository.findById).toHaveBeenCalledWith(updateDto.id);

    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.harvestId).toBe(updateDto.harvestId);
    expect(result.seed).toBe(updateDto.seed);
    expect(result.description).toBe(updateDto.description);
  });

  it('should throw NotFoundException if crop not found', async () => {
    mockRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute(updateDto)).rejects.toThrow(NotFoundException);
  });
});
