import { Body, Controller, Inject, Post, Get, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { RegisterRequest, RegisterResponse, UserMgmtServiceClient, UserRequest, USER_MGMT_SERVICE_NAME, User } from './user-mgmt.pb';

@Controller('user-mgmt')
export class UserMgmtController {
  private svc: UserMgmtServiceClient;

  @Inject(USER_MGMT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UserMgmtServiceClient>(USER_MGMT_SERVICE_NAME);
  }

  @Post('register')
  private async register(@Body() userData: RegisterRequest): Promise<any> {
    return this.svc.register(userData).pipe(
      map((res) => {
        const response: RegisterResponse = {
          user: res.user,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('findall')
  private async findAll(): Promise<any> {
    return await this.svc.findAll({});
  }

  @Get('find/:email')
  private async findByUsername(@Param() userRequest: UserRequest): Promise<any> {
    return await this.svc.findByUsername(userRequest).pipe(
      map((res) => {
        const response: RegisterResponse = {
          user: res.user,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('delete/:email')
  private async delete(@Param() userRequest: UserRequest): Promise<any> {
    return await this.svc.delete(userRequest).pipe(
      map((res) => {
        const response: RegisterResponse = {
          user: res.user,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('update')
  private async update(@Body() userData: User): Promise<any> {
    return await this.svc.update(userData).pipe(
      map((res) => {
        const response: RegisterResponse = {
          user: res.user,
          error: res.error,
        };
        return response;
      })
    );
  }
}
