import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map, Observable } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserRequest,
  User,
} from './user_mgmt.pb';

@Controller('auth')
export class AuthController {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(@Body() body: RegisterRequest): Promise<any> {
    return await this.svc.register(body).pipe(
      map((res) => {
        const response: RegisterResponse = {
          _id: res._id,
          username: res.username,
          password: res.password,
          role: res.role,
        };
        return response;
      })
    );
  }

  @Put('login')
  private async login(@Body() body: LoginRequest): Promise<any> {
    return await this.svc.login(body).pipe(
      map((res) => {
        const response: LoginResponse = {
          access_token: res.access_token,
        };
        return response;
      })
    );
  }

  @Get('findall')
  private async findAll(): Promise<any> {
    console.log(this.svc.findAll({}));
    return await this.svc.findAll({});
  }

  @Get(':username')
  private async findByUsername(
    @Param() userRequest: UserRequest
  ): Promise<any> {
    return await this.svc.findByUsername(userRequest).pipe(
      map((res) => {
        const response: User = {
          _id: res._id,
          username: res.username,
          password: res.password,
          role: res.role,
          __v: res.__v,
        };
        return response;
      })
    );
  }
}
