import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-Version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Agro API')
    .setDescription('Documentação da API de produtores rurais')
    .setVersion('1.0')
    .addServer(
      '/api',
      'API com prefixo e versionamento por header X-API-Version',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
