//To use enums, import them into the component and use them as follows:
//import { ROLES } from './config/Roles';
//console.log(ROLES.comp_admin);

export enum ROLE {
  comp_admin = 'Company Admin',
  wh_mngr = 'Warehouse Manager',
  sh_mngr = 'Shop Manager',
  supl = 'Supplier',
  proc_mngr = 'Procurement Manager',
}
