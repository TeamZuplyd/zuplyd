import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { SetupManagersModule } from './setup-managers/setup-managers.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:nESDm2LrDARJWLfs@cluster0.m7waswd.mongodb.net/?retryWrites=true&w=majority'), CompaniesModule, SetupManagersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
