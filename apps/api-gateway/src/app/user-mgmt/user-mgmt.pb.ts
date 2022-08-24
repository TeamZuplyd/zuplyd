/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'userMgmt';

/** Register */
export interface RegisterRequest {
  email: string;
  role: string;
  company_name: string;
  company_id: string;
}

export interface RegisterResponse {
  user: User | undefined;
  error: string | undefined;
}

export interface FindByUsernameResponse {
  user: User | undefined;
  error: string | undefined;
}

/** Find All */
export interface User {
  _id: string;
  email: string;
  role: string;
  company_name: string;
  company_id: string;
  __v: number;
}

export interface UserList {
  users: User[];
}

export interface UserRequest {
  email: string;
}

export const USER_MGMT_PACKAGE_NAME = 'userMgmt';

export interface UserMgmtServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  findAll(request: Empty): Observable<UserList>;

  findByUsername(request: UserRequest): Observable<RegisterResponse>;

  delete(request: UserRequest): Observable<RegisterResponse>;

  update(request: User): Observable<RegisterResponse>;
}

export interface UserMgmtServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  findAll(request: Empty): Promise<UserList> | Observable<UserList> | UserList;

  findByUsername(request: UserRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  delete(request: UserRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  update(request: User): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
}

export function UserMgmtServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'findAll', 'findByUsername', 'delete', 'update'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('UserMgmtService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('UserMgmtService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_MGMT_SERVICE_NAME = 'UserMgmtService';
