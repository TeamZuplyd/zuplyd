import { Module } from '@nestjs/common';
import { UserMgmtService } from './user-mgmt.service';
import { UserMgmtController } from './user-mgmt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_MGMT_PACKAGE_NAME, USER_MGMT_SERVICE_NAME } from './user-mgmt.pb';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_MGMT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: USER_MGMT_PACKAGE_NAME,
          protoPath: 'node_modules\\zuplyd-proto\\proto\\user-mgmt.proto',
          loader: { keepCase: true },
        },
      },
    ]),
  ],
  providers: [UserMgmtService],
  controllers: [UserMgmtController],
  exports: [UserMgmtService],
})
export class UserMgmtModule {}
