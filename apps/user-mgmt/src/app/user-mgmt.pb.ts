/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'userMgmt';

/** Register */
export interface RegisterRequest {
  email: string;
  role: string;
  company_name: string;
  company_id: string;
  managing_id: string;
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
export interface UserByComp {
  company_id: string;
}

export interface UserByCompRole {
  company_id: string;
  role: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  company_name: string;
  company_id: string;
  managing_id: string;
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

  findAllByComp(request: UserByComp): Observable<UserList>;

  findAllByCompRole(request: UserByCompRole): Observable<UserList>;

  findByUsername(request: UserRequest): Observable<RegisterResponse>;

  delete(request: UserRequest): Observable<RegisterResponse>;

  update(request: User): Observable<RegisterResponse>;
}

export interface UserMgmtServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  findAllByComp(request: UserByComp): Promise<UserList> | Observable<UserList> | UserList;

  findAllByCompRole(request: UserByCompRole): Promise<UserList> | Observable<UserList> | UserList;

  findByUsername(request: UserRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  delete(request: UserRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  update(request: User): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
}

export function UserMgmtServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'findAllByComp', 'findAllByCompRole', 'findByUsername', 'delete', 'update'];
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
