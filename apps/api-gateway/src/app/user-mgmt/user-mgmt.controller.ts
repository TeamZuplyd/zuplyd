import { Body, Controller, Inject, Post, Get, Param, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { map } from 'rxjs';
import { Roles } from '../authz/roles.decorator';
import { RolesGuard } from '../authz/roles.guard';
import { RegisterRequest, RegisterResponse, UserMgmtServiceClient, UserRequest, USER_MGMT_SERVICE_NAME, User, UserByComp, UserByCompRole } from './user-mgmt.pb';

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

  //@UseGuards(AuthGuard('jwt'))
  @Get('findAllByComp')
  private async findAllByComp(@Body() searchQuery: UserByComp): Promise<any> {
    return this.svc.findAllByComp(searchQuery);
  }

  @Get('findAllByCompRole')
  private async findAllByCompRole(@Body() searchQuery: UserByCompRole): Promise<any> {
    return this.svc.findAllByCompRole(searchQuery);
  }

  /*
  Following 2 lines that are commented are used for API endpoint protection
  If Authorization is required both lines must be there before an endpoint definition

  @Roles('comp_admin') defines the actors that can use this endpoint
  For multiple actors use => @Roles('comp_admin', 'wh_mngr')

  @UseGuards(AuthGuard('jwt'), RolesGuard) defines the guards that needed to be used in this route
  Two guards used here are AuthGuard('jwt'), RolesGuard. They do what their name suggests

  Order is not important but prefered order is 
  @Roles('comp_admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)

  If Authorization is not required do not use these decorators with endpoints.

  */

  // @Roles('comp_admin')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('find/:email')
  private async findByUsername(@Param() userRequest: UserRequest): Promise<any> {
    return this.svc.findByUsername(userRequest).pipe(
      map((res) => {
        const response: RegisterResponse = {
          user: res.user,
          error: res.error,
        };
        return response;
      })
    );
  }

  @Get('find')
  private async emptyFind(@Param() userRequest: UserRequest): Promise<any> {
    return {
      error: 'not_logged_in',
    };
  }

  @Get('delete/:email')
  private async delete(@Param() userRequest: UserRequest): Promise<any> {
    return this.svc.delete(userRequest).pipe(
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
    return this.svc.update(userData).pipe(
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
