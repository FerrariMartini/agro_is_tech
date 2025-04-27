import { AnalyticsService } from '@/application/modules/analytics/services/analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  const mockGetTotalPropertiesUseCase = {
    execute: jest.fn(),
  };

  const mockGetTotalAreaUseCase = {
    execute: jest.fn(),
  };

  const mockGetPropertiesByStateUseCase = {
    execute: jest.fn(),
  };

  const mockGetPropertiesByCropUseCase = {
    execute: jest.fn(),
  };

  const mockGetAreaUsageUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    service = new AnalyticsService(
      mockGetTotalPropertiesUseCase as any,
      mockGetTotalAreaUseCase as any,
      mockGetPropertiesByStateUseCase as any,
      mockGetPropertiesByCropUseCase as any,
      mockGetAreaUsageUseCase as any,
    );
  });

  it('should return total properties', async () => {
    mockGetTotalPropertiesUseCase.execute.mockResolvedValue(10);
    const result = await service.getTotalProperties();
    expect(result).toEqual({ totalProperties: 10 });
  });

  it('should return total area', async () => {
    mockGetTotalAreaUseCase.execute.mockResolvedValue(5000);
    const result = await service.getTotalArea();
    expect(result).toEqual({ totalArea: 5000 });
  });

  it('should return properties by state', async () => {
    const states = [{ state: 'SP', total: 5 }];
    mockGetPropertiesByStateUseCase.execute.mockResolvedValue(states);
    const result = await service.getPropertiesByState();
    expect(result).toEqual(states);
  });

  it('should return properties by crop', async () => {
    const crops = [{ name: 'Soy', total: 8 }];
    mockGetPropertiesByCropUseCase.execute.mockResolvedValue(crops);
    const result = await service.getPropertiesByCrop();
    expect(result).toEqual(crops);
  });

  it('should return area usage', async () => {
    const usage = { arableArea: 3000, vegetationArea: 2000 };
    mockGetAreaUsageUseCase.execute.mockResolvedValue(usage);
    const result = await service.getAreaUsage();
    expect(result).toEqual(usage);
  });
});
