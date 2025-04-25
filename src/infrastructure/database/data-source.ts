import { DataSource } from 'typeorm';
import { resolve } from 'path';
import 'dotenv/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [resolve(__dirname, './typeorm/entities/*.{ts,js}')],
  migrations: [resolve(__dirname, './migrations/*.{ts,js}')],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});
