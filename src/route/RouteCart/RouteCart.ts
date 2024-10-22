import { Base_Api } from "../route";

export const Cart_Base_Url = `${Base_Api}/CartUser`;

export const Cart_Endpoint = {
  GETCART: `${Cart_Base_Url}/get-cartdetail`,
  CREATE: `${Cart_Base_Url}/add-to-cart`,
  INCREMENT: `${Cart_Base_Url}/increment-product`,
  DECREMENT: `${Cart_Base_Url}/decrement-product`,
  DELETE: `${Cart_Base_Url}/delete-product`,
};
