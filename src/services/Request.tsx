import axios from "axios";
import { CartDetailDto, CartItemDetail, Client, Detalle_Factura, FacturaI, GetCartItemDetail, Loginuser, Product, ProductUpdate } from "../components/BODY/Interfaces";
import { getToken } from "../utils/localStorage";
const API_URL = 'https://localhost:7209/'



let idUser: string;

export const setIdUser = (newidUser: string) => {
  idUser = newidUser;
};

export const getIdUser = () => {
  return idUser;
};
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('validate-token');
    return response.status === 200;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
export const LoginUsers = async (loginuser: Loginuser, login: (token: string, userUsername: string, userPassword: string, expiration: string, cartDetails: CartDetailDto[]) => void): Promise<any> => {
  try {
    const response = await apiClient.post(`${API_URL}api/Auth/login`, loginuser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { token, userId, expiration, role, cartDetails } = response.data;
    login(token, expiration, loginuser.userUsername, loginuser.userPassword, cartDetails);
    return { userId, expiration, role, cartDetails };
  } catch (error) {
    throw error;
  }
}
export const listAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}Product/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const ListCategory = async () => {
  
  
  try {
    const response = await axios.get(`${API_URL}api/Category/list`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error LIST caTEGORY', error);
    throw error;
  }
};
export const ListClient = async () => {
  
  try {
    const response = await apiClient.get(`${API_URL}USER/ListAll `, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', getToken());
    throw error;
  }

};

export const LastFactureid = async () => {
 
  try {
    const response = await apiClient.get(`${API_URL}INVOICE/LastFactura`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const UpdateClient = async (clientdata: Client) => {

  try {
    const response = await apiClient.put(`${API_URL}USER/Update`, clientdata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const CreateClient = async (clientdata: Omit<Client, 'iD_CLIENTE' | 'fecha_Creacion' | 'qty' | 'activo'>) => {
 
  try {
    const response = await apiClient.post(`${API_URL}CLIENT/Create`, clientdata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};
export const UpdateProduct = async (producttdata: ProductUpdate) => {
  
  try {
    const response = await apiClient.put(`${API_URL}PRODUCT/Update`, producttdata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const CreateProduct = async (producttdata: Omit<Product, 'iD_PRODUCTO' | 'fecha_Creacion' | 'qty' | 'activo'>) => {
 
  try {
    const response = await apiClient.post(`${API_URL}PRODUCT/Create`, producttdata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};
export const CreateFactura = async (factura: FacturaI) => {

  let response;
  try {
    response = await apiClient.post(`${API_URL}RECEIPT/CreateFactura`, factura, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}
export const CreateDetalleFactura = async (detallefactura: Detalle_Factura) => {

  let response;
  try {
    response = await apiClient.post(`${API_URL}INVOICE_DETAIL/CreateDetalleFactura`, detallefactura, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}
export const addCartItem = async (cartItemDetail: CartItemDetail) => {
    const response = await fetch(`${API_URL}api/CartUser/add-to-cart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemDetail),
    });

    if (!response.ok) {
        throw new Error('Error al agregar el producto al carrito');
    }

    return response.json();
};
export const DecreaseCartItem = async (cartItemDetail: CartItemDetail) => {
  const response = await fetch(`${API_URL}api/CartUser/decrement-product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemDetail),
  });

  if (!response.ok) {
      throw new Error('Error al agregar el producto al carrito');
  }

  return response.json();
};
export const DeleteeCartItem = async (cartItemDetail: CartItemDetail) => {
  const response = await fetch(`${API_URL}api/CartUser/delete-product`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemDetail),
  });

  if (!response.ok) {
      throw new Error('Error al agregar el producto al carrito');
  }

  return response.json();
};
export const GetCartItem = async () => {
  const response = await fetch(`${API_URL}api/CartUser/get-cartdetail`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
      }
  });

  if (response.status!=200) {
      throw new Error('Error al agregar el producto al carrito');
  }

  return response.json();
};
export default apiClient;


