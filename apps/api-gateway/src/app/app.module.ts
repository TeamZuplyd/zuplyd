import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMgmtModule } from './user-mgmt/user-mgmt.module';
import { AuthzModule } from './authz/authz.module';
import { ProcurementModule } from './procurement/procurement.module';
import { InventoryService } from './inventory/inventory.service';
import { InventoryController } from './inventory/inventory.controller';

@Module({
  imports: [UserMgmtModule, AuthzModule, ProcurementModule],
  controllers: [AppController, InventoryController],
  providers: [AppService, InventoryService],
})
export class AppModule {}
