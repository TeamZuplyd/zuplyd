import { Module } from '@nestjs/common';
import { ProcurementService } from './procurement.service';
import { ProcurementController } from './procurement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ITEM_SERVICE_NAME, PROCUREMENT_PACKAGE_NAME } from './procurement.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ITEM_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: PROCUREMENT_PACKAGE_NAME,
          protoPath: 'node_modules\\zuplyd-proto\\proto\\procurement.proto',
          loader: { keepCase: true },
        },
      },
    ]),
  ],
  providers: [ProcurementService],
  controllers: [ProcurementController],
})
export class ProcurementModule {}
