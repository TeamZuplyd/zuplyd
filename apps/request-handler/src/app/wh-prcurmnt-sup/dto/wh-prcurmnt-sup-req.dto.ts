export class WhPrcurmntSupReqDto {
  readonly brand: string;
  readonly item_code: string;
  readonly name: string;
  readonly quantity: string;
  readonly request: boolean;
  readonly requested_by: string;
  readonly requestedDate: string;
  readonly required_by: string;
  readonly sentRequest: boolean;
  readonly assigned: boolean;
  readonly status: number;
  readonly warehouse_id: string;
  readonly company_id: number;
  readonly suppliers: [];
}
