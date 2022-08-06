import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>
  ) {}

  async register(createCompanyDto: CreateCompanyDto): Promise<Company> {
    console.log(createCompanyDto);
    const registeredCompany = await this.companyModel.create(createCompanyDto);

    return registeredCompany;
  }
}
