/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestMicroservice, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { PROCUREMENT_PACKAGE_NAME } from './app/procurement.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: PROCUREMENT_PACKAGE_NAME,
      protoPath: 'node_modules\\zuplyd-proto\\proto\\procurement.proto',
      loader: { keepCase: true },
    },
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  Logger.log(`🚀 Procurement Microservice is running`);

  await app.listen();
}

bootstrap();
