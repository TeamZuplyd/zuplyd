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

  // registration of a company
  async register(
    id: string,
    createCompanyDto: CreateCompanyDto
  ): Promise<Company> {
    let registeredCompany = null;
    if (id == null) {
      registeredCompany = await this.companyModel.create(createCompanyDto);
    } else {
      registeredCompany = await this.companyModel.findByIdAndUpdate(
        id,
        createCompanyDto
      );
    }

    return registeredCompany;
  }

  // find a company by id
  async findOne(id: string): Promise<Company> {
    return this.companyModel.findById({ _id: id }).exec();
  }

  // find all companies
  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }
}
