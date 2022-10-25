import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IssuesService } from './issues.service';
import axios from 'axios';
import { IssueActionDto } from './dto/issue-action.dto';
import { IssueClass } from './schemas/issue.schema';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get('userIssue/:company_id/:user_id')
  async findAllById(@Param('company_id') comp_id: string, @Param('user_id') user_id: string): Promise<IssueClass[]> {
    let issue = await this.issuesService.findUserIssues(comp_id, user_id);
    return issue;
  }

  @Get('allUnsolvedIssues/:company_id')
  async findAllUnsolved(@Param('company_id') comp_id: string): Promise<IssueClass[]> {
    let issue = await this.issuesService.findAllunsolved(comp_id);
    console.log('issue');
    console.log(issue);

    return issue;
  }

  @Get('allSolvedIssues/:company_id')
  async findAllSolved(@Param('company_id') comp_id: string): Promise<IssueClass[]> {
    let issue = await this.issuesService.findAllsolved(comp_id);
    return issue;
  }

  @Post('create')
  async raiseIssue(@Body() issueActionDto: IssueActionDto) {
    let issueBody = await this.issuesService.createIssue(issueActionDto);
    return issueBody;
  }

  @Post('update')
  async solveIssue(@Body() data: any) {
    let issueBody = await this.issuesService.updateIssue(data.id, data.body);
    return issueBody;
  }
}
