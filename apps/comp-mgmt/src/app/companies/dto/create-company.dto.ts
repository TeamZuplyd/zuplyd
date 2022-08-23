export class CreateCompanyDto {
  company_name: string;
  address: string;
  contact_nums: string[];
  distribution_struct: number;
  tier: number;
  w_managers: string[];
  s_managers: string[];
  p_managers: string[];
  init_completed: boolean;
}
