import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';
import { NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE_NAME } from './notification.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: 'node_modules\\zuplyd-proto\\proto\\notification.proto',
          loader: { keepCase: true },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
