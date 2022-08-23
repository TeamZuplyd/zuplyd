import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { EmailDto } from './notifications/email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  sendEmail(@Body('email') email, @Body('name') name) {
    console.log(email);
    this.appService.sendEmail(email, name);
  }

  @Post('bulk')
  sendEmailBulk(@Body('comp_name') comp_name, @Body('p_managers') p_managers, @Body('w_managers') w_managers, @Body('s_managers') s_managers) {
    this.appService.sendEmailBulk(comp_name, 'Procurement Manager', p_managers);
    this.appService.sendEmailBulk(comp_name, 'Warehouse Manager', w_managers);
    this.appService.sendEmailBulk(comp_name, 'Shop Manager', s_managers);
  }
}
