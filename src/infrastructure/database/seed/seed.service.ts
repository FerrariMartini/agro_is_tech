import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateProducerDto } from '@/domain/producer/dto/create.producer.dto';
import { CreatePropertyDto } from '@/domain/property/dto/create.property.dto';
import { CreateCropDto } from '@/domain/crop/dto/create.crop.dto';
import { ProducerService } from '@/application/services/producer/producer.service';
import { PropertyService } from '@/application/services/property/property.service';
import { HarvestService } from '@/application/services/harvest/harvest.service';
import { CropService } from '@/application/services/crop/crop.service';
import { faker } from '@faker-js/faker';
import { CreateHarvestDto } from '@/domain/haverst/dto/create.harvest.dto';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly producerService: ProducerService,
    private readonly propertyService: PropertyService,
    private readonly harvestService: HarvestService,
    private readonly cropService: CropService,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'dev') return;

    const producers = await this.producerService.findAll({
      limit: 10,
      page: 1,
      orderBy: 'ASC',
    });
    if (producers.data.length > 0) {
      console.log(
        '>>>>>>>>>>>>>>>>>>> Database already seeded <<<<<<<<<<<<<<<<<<<<',
      );
      return;
    }

    console.log('>>>>>>>>>>>>>>>>>>> SEEDING DB <<<<<<<<<<<<<<<<<<<<');
    await this.populateDatabase();
  }

  private async populateDatabase() {
    for (let i = 0; i < 5; i++) {
      const producer = await this.createProducer();

      for (let j = 0; j < 3; j++) {
        const property = await this.createProperty(producer.id);

        for (let k = 0; k < 10; k++) {
          const harvest = await this.createHarvest(property.id);

          await this.createCrops(harvest.id);
        }
      }
    }

    console.log(
      '>>>>>>>>>>>>>>>>>>> Database seeded successfully! <<<<<<<<<<<<<<<<<<<<',
    );
  }

  private async createProducer() {
    const dto: CreateProducerDto = {
      taxId: this.generateFakeCpf(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    const producer = await this.producerService.create(dto);
    console.log(`Created Producer: ${producer.name}`);
    return producer;
  }

  private async createProperty(producerId: string) {
    const city = faker.location.city();
    const state = 'SP';

    const arableArea = parseFloat(
      faker.number.float({ min: 30, max: 400 }).toFixed(2),
    );
    const vegetationArea = parseFloat(
      faker.number.float({ min: 5, max: 100 }).toFixed(2),
    );

    const baseArea = arableArea + vegetationArea;

    const totalArea = parseFloat(
      (baseArea + faker.number.float({ min: 10, max: 100 })).toFixed(2),
    );

    const dto: CreatePropertyDto = {
      name: `Property ${city} ${faker.number.int({ min: 1, max: 100 })}`,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
    };

    const property = await this.propertyService.create(dto);
    console.log(
      `  Created Property: ${property.name} (Total Area: ${totalArea} | Arable: ${arableArea} | Vegetation: ${vegetationArea})`,
    );
    return property;
  }

  private async createHarvest(propertyId: string) {
    const dto: CreateHarvestDto = {
      year: faker.number.int({ min: 2000, max: 2025 }),
      description: `Harvest ${faker.lorem.words(2)}`,
      propertyId,
    };

    const harvest = await this.harvestService.create(dto);
    console.log(`    Created Harvest: ${harvest.year}`);
    return harvest;
  }

  private async createCrops(harvestId: string) {
    const crops = [
      'Café',
      'Soja',
      'Milho',
      'Grão de Bico',
      'Ervilha',
      'Feijão',
    ];

    const randomCrop = faker.helpers.arrayElement(crops);

    const dto: CreateCropDto = {
      description: `Crop of ${randomCrop}`,
      seed: randomCrop,
      harvestId,
    };

    const crop = await this.cropService.create(dto);
    console.log(`      Created Crop: ${crop.seed}`);
  }

  private generateFakeCpf(): string {
    const cpf = Array.from({ length: 11 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
  }
}
