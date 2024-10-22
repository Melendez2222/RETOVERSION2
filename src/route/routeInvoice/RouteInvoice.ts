
import { Base_Api } from "../route";

export const Invoice_Base_Url = `${Base_Api}/Invoice`;

export const Invoice_Endpoint = {
  GET_ID: `${Invoice_Base_Url}/`,
  CREATE: `${Invoice_Base_Url}/create`,
  LIST: `${Invoice_Base_Url}/list`,
  UPDATE: `${Invoice_Base_Url}/update/`,
  DELETE: `${Invoice_Base_Url}/delete/`,
};