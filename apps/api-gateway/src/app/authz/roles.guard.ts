import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterResponse, UserMgmtServiceClient, UserRequest, USER_MGMT_SERVICE_NAME } from '../user-mgmt/user-mgmt.pb';

@Injectable()
export class RolesGuard implements CanActivate {
  private userMgmtSvc: UserMgmtServiceClient;

  @Inject(USER_MGMT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.userMgmtSvc = this.client.getService<UserMgmtServiceClient>(USER_MGMT_SERVICE_NAME);
  }
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    let jwt = request.headers.authorization.split(' ')[1].split('.')[1];
    let jwtInfo = JSON.parse(Buffer.from(jwt, 'base64').toString());
    let email = null;
    try {
      email = jwtInfo.email;
    } catch {
      return false;
    }
    // email = 'PM';

    let userRole = null;

    let userDataReq = this.userMgmtSvc.findByUsername({ email });

    try {
      userRole = (await lastValueFrom(userDataReq)).user.role;
    } catch {
      return false;
    }

    return roles.includes(userRole);
  }
}
