import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Isuru:isuru123@cluster0.nl9umpk.mongodb.net/?retryWrites=true&w=majority'), IssuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
