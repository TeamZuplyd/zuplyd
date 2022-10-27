export class SupplerRequestDto {
  readonly brand: string;
  readonly item_code: string;
  readonly name: string;
  readonly quantity: string;
  readonly requested_date: string;
  readonly required_by: string;
  readonly sentRequest: boolean;
  readonly status: string;
  readonly proc_man_id: string;
  readonly supplier_id: number;
}
