import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('DB_HOST');
  const port = parseInt(configService.get<string>('DB_PORT') as string, 10);
  const username = configService.get<string>('DB_USER') as string;
  const password = configService.get<string>('DB_PASSWORD') as string;
  const dbName = configService.get<string>('DB_NAME') as string;

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database: dbName,
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  };
};
