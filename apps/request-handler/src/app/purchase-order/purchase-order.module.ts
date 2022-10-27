import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';

@Module({
  providers: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
