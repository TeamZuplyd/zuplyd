/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Transport } from '@nestjs/microservices';
import { INestMicroservice, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AUTH_PACKAGE_NAME } from './app/user_mgmt.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: AUTH_PACKAGE_NAME,
        protoPath: 'node_modules\\zuplyd-proto\\proto\\user_mgmt.proto',
        loader: { keepCase: true },
      },
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    }
  );

  Logger.log(`🚀 Application is running`);

  await app.listen();
}

bootstrap();
