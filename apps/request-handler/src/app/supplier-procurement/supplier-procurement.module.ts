import { Module } from '@nestjs/common';
import { SupplierProcurementService } from './supplier-procurement.service';
import { SupplierProcurementController } from './supplier-procurement.controller';

@Module({
  providers: [SupplierProcurementService],
  controllers: [SupplierProcurementController],
})
export class SupplierProcurementModule {}
