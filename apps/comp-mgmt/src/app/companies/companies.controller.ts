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
  async register(@Body() data: any) {
    data.comp_data.init_completed = data.step != 4 ? false : true;

    let registeredCompany = await this.companyService.register(
      data.comp_id,
      data.comp_data
    );

    const ret = { comp_id: registeredCompany['id'] };
    return ret;
  }

  @Get(':compId')
  async findById(@Param('compId') id: string): Promise<Company> {
    let company = await this.companyService.findOne(id);
    return company;
  }

  @Get()
  async findAll(): Promise<Company[]> {
    let companies = await this.companyService.findAll();
    return companies;
  }
}
