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
}
