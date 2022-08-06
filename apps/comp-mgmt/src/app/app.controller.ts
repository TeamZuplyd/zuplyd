import { Controller, Get, Post, Request } from '@nestjs/common';
import { CompaniesService } from './companies/companies.service';

@Controller()
export class AppController {
  constructor(private readonly companyService: CompaniesService) {}
}
