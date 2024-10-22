import { Base_Api } from "../route";

export const Product_Base_Url = `${Base_Api}/Product`;

export const Product_Endpoint = {
  GET_ID: `${Product_Base_Url}/`,
  CREATE: `${Product_Base_Url}/create`,
  LIST: `${Product_Base_Url}/list`,
  UPDATE: `${Product_Base_Url}/update/`,
  DELETE: `${Product_Base_Url}/delete/`,
};