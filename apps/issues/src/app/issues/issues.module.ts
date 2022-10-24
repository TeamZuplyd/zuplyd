import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IssueClass, IssueSchema } from './schemas/issue.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: IssueClass.name, schema: IssueSchema }])],
  providers: [IssuesService],
  controllers: [IssuesController],
})
export class IssuesModule {}
