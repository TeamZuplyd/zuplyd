/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'notification';

export interface EmailRequest {
  subject: string;
  body: string;
  toEmail: string;
}

export interface EmailResponse {
  status: boolean;
}

export const NOTIFICATION_PACKAGE_NAME = 'notification';

export interface NotificationServiceClient {
  sendEmail(request: EmailRequest): Observable<EmailResponse>;
}

export interface NotificationServiceController {
  sendEmail(request: EmailRequest): Promise<EmailResponse> | Observable<EmailResponse> | EmailResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sendEmail'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('NotificationService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('NotificationService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = 'NotificationService';
