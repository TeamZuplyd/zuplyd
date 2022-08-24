export class CreateItemTypeDto {
  readonly item_name: string;
  readonly category_name: string;
  readonly brand_name: string;
  readonly min_release_quantity: number;
  readonly min_release_quantity_unit: string;
  readonly output_rule: string;
  readonly output_rule_unit: string;
  readonly company_id: string;
  readonly company_name: string;
  readonly attributes_array: string[];
}
