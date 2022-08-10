/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'auth';

/** Register */
export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  _id: string;
  username: string;
  password: string;
  role: string;
}

/** Login */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

/** Find All */
export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  __v: number;
}

export interface UserList {
  users: User[];
}

export interface UserRequest {
  username: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  findAll(request: Empty): Observable<UserList>;

  findByUsername(request: UserRequest): Observable<User>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;

  login(
    request: LoginRequest
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  findAll(request: Empty): Promise<UserList> | Observable<UserList> | UserList;

  findByUsername(request: UserRequest): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'login',
      'findAll',
      'findByUsername',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
