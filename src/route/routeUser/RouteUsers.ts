import { Base_Api } from "../route";

export const Users_Base_Url = `${Base_Api}/Users`;

export const Users_Endpoint = {
  GET_ID: `${Users_Base_Url}/getuserid`,
  CREATE: `${Users_Base_Url}/create`,
  ALL: `${Users_Base_Url}/all`,
};