export class CreatShopWarehouseReqDto {
  readonly brand: string;
  readonly item_code: string;
  readonly name: string;
  readonly quantity: string;
  readonly request: boolean;
  readonly requested_by: string;
  readonly requested_date: string;
  readonly required_by: string;
  readonly sentRequest: boolean;
  readonly status: string;
  readonly warehouse_id: string;
  readonly company_id: number;
}
