import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { Managers, ManagersSchema } from './schemas/managers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Managers.name, schema: ManagersSchema },
    ]),
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService],
})
export class CompaniesModule {}
