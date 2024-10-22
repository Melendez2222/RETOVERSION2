import { Base_Api } from "../route";

export const Roles_Base_Url = `${Base_Api}/RolesControllercs`;

export const Roles_Endpoint = {
  ASSIGN: `${Roles_Base_Url}/assign`,
  CREATE: `${Roles_Base_Url}/create`,
};