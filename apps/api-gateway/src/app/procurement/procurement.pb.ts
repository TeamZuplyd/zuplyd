/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'procurement';

/** Item */
export interface Item {
  item_name: string;
  category_name: string;
  brand_name: string;
  unitOfMeasure: string;
  min_release_quantity: number;
  min_release_quantity_unit: string;
  output_rule: string;
  output_rule_unit: string;
  output_rule_type: string;
  company_id: string;
  company_name: string;
  suppliers: Supplier[];
  batch_no: string;
  attributes_array: string[];
}

export interface Supplier {
  supplierName: string;
  id: string;
}

export interface ItemWithID {
  _id: string;
  item_name: string;
  category_name: string;
  brand_name: string;
  unitOfMeasure: string;
  min_release_quantity: number;
  min_release_quantity_unit: string;
  output_rule: string;
  output_rule_unit: string;
  output_rule_type: string;
  company_id: string;
  company_name: string;
  suppliers: Supplier[];
  batch_no: string;
  attributes_array: string[];
  __v: number;
}

export interface ItemResponse {
  item: ItemWithID | undefined;
  error: string | undefined;
}

export interface ItemIDRequest {
  id: string;
}

export interface FindAllRequest {}

export interface FindAllResponse {
  items: ItemWithID[];
}

export interface ItemCategory {
  company_id: string;
  categoryArr: string;
}

export interface findByCompanyIDRes {
  itemCategory: ItemCategoryWithID | undefined;
  error: string | undefined;
}

export interface ItemCategoryWithID {
  _id: string;
  company_id: string;
  categoryArr: string[];
  __v: number;
}

export interface companyIDReq {
  companyId: string;
}

export const PROCUREMENT_PACKAGE_NAME = 'procurement';

export interface ItemServiceClient {
  create(request: Item): Observable<ItemResponse>;

  update(request: ItemWithID): Observable<ItemResponse>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  findByIdPublic(request: ItemIDRequest): Observable<ItemResponse>;

  delete(request: ItemIDRequest): Observable<ItemResponse>;
}

export interface ItemServiceController {
  create(request: Item): Promise<ItemResponse> | Observable<ItemResponse> | ItemResponse;

  update(request: ItemWithID): Promise<ItemResponse> | Observable<ItemResponse> | ItemResponse;

  findAll(request: FindAllRequest): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  findByIdPublic(request: ItemIDRequest): Promise<ItemResponse> | Observable<ItemResponse> | ItemResponse;

  delete(request: ItemIDRequest): Promise<ItemResponse> | Observable<ItemResponse> | ItemResponse;
}

export function ItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'update', 'findAll', 'findByIdPublic', 'delete'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ItemService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ItemService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_SERVICE_NAME = 'ItemService';

export interface ItemCategoryServiceClient {
  createCategory(request: ItemCategory): Observable<ItemCategoryWithID>;

  findByCompanyID(request: companyIDReq): Observable<findByCompanyIDRes>;
}

export interface ItemCategoryServiceController {
  createCategory(request: ItemCategory): Promise<ItemCategoryWithID> | Observable<ItemCategoryWithID> | ItemCategoryWithID;

  findByCompanyID(request: companyIDReq): Promise<findByCompanyIDRes> | Observable<findByCompanyIDRes> | findByCompanyIDRes;
}

export function ItemCategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createCategory', 'findByCompanyID'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ItemCategoryService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ItemCategoryService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_CATEGORY_SERVICE_NAME = 'ItemCategoryService';
