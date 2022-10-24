import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMgmtModule } from './user-mgmt/user-mgmt.module';
import { AuthzModule } from './authz/authz.module';
import { ProcurementModule } from './procurement/procurement.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UserMgmtModule, AuthzModule, ProcurementModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
