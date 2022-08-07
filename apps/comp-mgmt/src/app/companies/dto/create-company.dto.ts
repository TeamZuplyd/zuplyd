export class CreateCompanyDto {
  name: string;
  address: string;
  contact_nums: string[];
  distribution_struct: number;
  tier: number;
  w_managers: string[];
  s_managers: string[];
  init_completed: boolean;
}
