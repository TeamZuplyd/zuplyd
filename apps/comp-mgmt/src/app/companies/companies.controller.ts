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

  @Post('register')
  async register(@Body() data: any) {
    data.comp_data.init_completed = data.step != 4 ? false : true;

    let registeredCompany = await this.companyService.register(data.comp_id, data.comp_data);

    const ret = { comp_id: registeredCompany['id'] };
    return ret;
  }

  @Get('find/:compId')
  async findById(@Param('compId') id: string): Promise<any> {
    let company = await this.companyService.findOne(id);
    if (company == null) return { error: 'no_such_company' };
    return company;
  }

  @Get('findByMail/:mail')
  async findByMail(@Param('mail') mail: string): Promise<any> {
    let res = await axios.get('http://localhost:7000/api/user-mgmt/find/' + mail, { responseType: 'json' });
    const compId = res.data.user.company_id;
    let companyData = await axios.get('http://localhost:2525/api/companies/find/' + compId, { responseType: 'json' });

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

  async updateManager(body): Promise<any> {
    return await axios.post('http://localhost:7000/api/user-mgmt/update', body);
  }

  async createWarehouse(body): Promise<any> {
    return await axios.post('http://localhost:1234/api/warehouses/createWarehouse', body);
  }

  async createShop(body): Promise<any> {
    return await axios.post('http://localhost:4321/api/shops/createShop', body);
  }

  @Post('setupManagers')
  async setupManagers(@Body() managersDto: ManagersDto): Promise<any> {
    let company = await this.companyService.findOne(managersDto.company_id);
    if (company) {
      const body = {
        email: '',
        role: '',
        company_name: company.company_name,
        company_id: managersDto.company_id,
        managing_id: null, // TODO: create relevant warehouses or shops and assign that id here
      };

      const warehouseBody = {
        company_id: managersDto.company_id,
        location: '',
        manager_id: '',
        contact_no: [],
        address: '',
      };

      const shopBody = {
        company_id: managersDto.company_id,
        location: '',
        manager_id: '',
        contact_no: [],
        address: '',
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
        let res = await this.regManager(body).then((result) => {
          warehouseBody.manager_id = result.data.user?._id || '';
        });

        if (warehouseBody.manager_id != '') {
          let res2 = await this.createWarehouse(warehouseBody);

          let updateManagerData = {
            _id: warehouseBody.manager_id,
            managing_id: res2.data.newWarehouse._id,
          };

          let res3 = await this.updateManager(updateManagerData);

          warehouseBody.manager_id = '';
        }
      }

      // Handling sh_mngr
      for (const email of s_managers) {
        body.email = email;
        body.role = 'sh_mngr';
        let res = await this.regManager(body).then((result) => {
          shopBody.manager_id = result.data.user?._id || '';
        });

        if (shopBody.manager_id != '') {
          let res2 = await this.createShop(shopBody);
          let updateManagerData = {
            _id: shopBody.manager_id,
            managing_id: res2.data.newShop._id,
          };

          let res3 = await this.updateManager(updateManagerData);

          shopBody.manager_id = '';
        }
      }

      const emailsBody = {
        comp_name: company.company_name,
        p_managers: managersDto.p_managers,
        w_managers: managersDto.w_managers,
        s_managers: managersDto.s_managers,
      };

      let res = await axios.post('http://localhost:3500/api/notification/bulk', emailsBody);
      return true;
    }
    return false;
  }
}
