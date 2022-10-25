import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import axios from 'axios';

// Importing DTOs
import { CreateCompanyDto } from './dto/create-company.dto';
import { ManagersDto } from './dto/managers.dto';

// Importing Schemas
import { Company } from './schemas/company.schema';
import { Managers } from './schemas/managers.schema';

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
    console.log(data);

    let registeredCompany = await this.companyService.register(data.comp_id, data.comp_data);

    const ret = { comp_id: registeredCompany['id'] };
    return ret;
  }

  @Get('find/:compId')
  async findById(@Param('compId') id: string): Promise<Company> {
    let company = await this.companyService.findOne(id);
    return company;
  }

  @Get('findByMail/:mail')
  async findByMail(@Param('mail') mail: string): Promise<any> {
    let res = await axios.get('http://localhost:7000/api/user-mgmt/find/' + mail, { responseType: 'json' });
    const compId = res.data.user.company_id;
    let companyData = await axios.get('http://localhost:3333/api/companies/find/' + compId, { responseType: 'json' });

    return companyData.data;
  }

  @Get('findAll')
  async findAll(): Promise<Company[]> {
    let companies = await this.companyService.findAll();
    return companies;
  }

  @Delete('delete/:compId')
  async delete(@Param('compId') id: string): Promise<Company[]> {
    let res = await this.companyService.deleteById(id);
    return res;
  }

  async regManager(body): Promise<any> {
    return await axios.post('http://localhost:7000/api/user-mgmt/register', body);
  }

  @Post('setupManagers')
  async setupManagers(@Body() managersDto: ManagersDto): Promise<any> {
    console.log(managersDto);

    let company = await this.companyService.findOne(managersDto.company_id);
    if (company) {
      console.log(company.company_name);

      const body = {
        email: '',
        role: '',
        company_name: company.company_name,
        company_id: managersDto.company_id,
        managing_id: null, // TODO: create relevant warehouses or shops and assign that id here
      };

      const errBody = {
        p_managers: [],
        w_managers: [],
        s_managers: [],
      };

      let p_managers = managersDto.p_managers;
      let w_managers = managersDto.w_managers;
      let s_managers = managersDto.s_managers;

      // Handling proc_mngr
      for (const email of p_managers) {
        body.email = email;
        body.role = 'proc_mngr';
        let res = await this.regManager(body);
      }

      // Handling wh_mngr
      for (const email of w_managers) {
        body.email = email;
        body.role = 'wh_mngr';
        let res = await this.regManager(body);
      }

      // Handling sh_mngr
      for (const email of s_managers) {
        body.email = email;
        body.role = 'sh_mngr';
        let res = await this.regManager(body);
      }

      const emailsBody = {
        comp_name: company.company_name,
        p_managers: managersDto.p_managers,
        w_managers: managersDto.w_managers,
        s_managers: managersDto.s_managers,
      };
      console.log(emailsBody);

      let res = await axios.post('http://localhost:3500/api/notification/bulk', emailsBody);
      return true;
    }
    return false;
  }
}
