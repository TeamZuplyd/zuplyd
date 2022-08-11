import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AUTH_SERVICE_NAME, LoginRequest } from './user_mgmt.pb';

@Controller()
export class AppController {
  // constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  async login(req: LoginRequest) {
    console.log(req);
    return this.service.login(req);
  }
}
