import { AnalyticsController } from '@/application/modules/analytics/controllers/analytics.controller';
import { AnalyticsService } from '@/application/modules/analytics/services/analytics.service';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: AnalyticsService;

  const mockService = {
    getTotalProperties: jest.fn(),
    getTotalArea: jest.fn(),
    getPropertiesByState: jest.fn(),
    getPropertiesByCrop: jest.fn(),
    getAreaUsage: jest.fn(),
  };

  beforeEach(() => {
    service = mockService as any;
    controller = new AnalyticsController(service);
  });

  it('should return total properties', async () => {
    mockService.getTotalProperties.mockResolvedValue({ totalProperties: 10 });
    const result = await controller.getTotalProperties();
    expect(result).toEqual({ totalProperties: 10 });
  });

  it('should return total area', async () => {
    mockService.getTotalArea.mockResolvedValue({ totalArea: 5000 });
    const result = await controller.getTotalArea();
    expect(result).toEqual({ totalArea: 5000 });
  });

  it('should return properties by state', async () => {
    const states = [{ state: 'SP', total: 5 }];
    mockService.getPropertiesByState.mockResolvedValue(states);
    const result = await controller.getPropertiesByState();
    expect(result).toEqual(states);
  });

  it('should return properties by crop', async () => {
    const crops = [{ name: 'Soy', total: 8 }];
    mockService.getPropertiesByCrop.mockResolvedValue(crops);
    const result = await controller.getPropertiesByCrop();
    expect(result).toEqual(crops);
  });

  it('should return area usage', async () => {
    const usage = { arableArea: 3000, vegetationArea: 2000 };
    mockService.getAreaUsage.mockResolvedValue(usage);
    const result = await controller.getAreaUsage();
    expect(result).toEqual(usage);
  });
});
