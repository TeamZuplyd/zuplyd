import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './schemas/company.schema';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  // @Post('register')
  // async register(@Body() data: any) {
  //   return await this.companyService.registerInit(data['comp_data']);
  // }

  @Post('register')
  async registerSteps(@Body() data: any) {
    if (data.step == 1) {
      let registeredCompany = await this.companyService.registerInit(
        data.comp_data
      );
      console.log(registeredCompany);
      return registeredCompany['_id'].valueOf();
    } else {
      let registeredCompany = await this.companyService.registerStepUpdate(
        data.id,
        data.comp_data
      );
      console.log(registeredCompany);
      return registeredCompany['_id'].valueOf();
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Company> {
    let company = await this.companyService.findOne(id);
    return company;
  }
}
