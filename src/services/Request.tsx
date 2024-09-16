import axios from "axios";
import { Client, Detalle_Factura, FacturaI, Product } from "../components/BODY/Interfaces";
const API_URL = 'https://localhost:7270/'
let token: string | null = localStorage.getItem('token');
let idUser: string;
export const setToken = (newToken: string) => {
  token = newToken;
};
export const getToken = () => {
  return token;
};
export const setIdUser = (newidUser: string) => {
  idUser = newidUser;
};
export const getIdUser = () => {
  return idUser;
};
export const LoginUsers = async (usuario: string, password: string): Promise<any> => {

  try {
    const response = await axios.post(`${API_URL}Auth/login?usuario=${usuario}&password=${password}`);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token);
    return response.status;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
export const listAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}Product/ListAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const ListClient = async () => {
  try {
    const response = await axios.get(`${API_URL}CLIENT/ClientAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const LastFactureid = async () => {
  try {
    const response = await axios.get(`${API_URL}RECEIPT/LastFactura`, {
      headers: {
        Authorization: `Bearer ${token}`
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
    const response = await axios.put(`${API_URL}CLIENT/UpdateClient`, clientdata, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const response = await axios.post(`${API_URL}CLIENT/CreateClient`, clientdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};
export const UpdateProduct = async (producttdata: Product) => {
  try {
    const response = await axios.put(`${API_URL}PRODUCT/UpdateProduct`, producttdata, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const response = await axios.post(`${API_URL}PRODUCT/CreateProduct`, producttdata, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    response = await axios.post(`${API_URL}RECEIPT/CreateFactura`, factura, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    response = await axios.post(`${API_URL}INVOICE_DETAIL/CreateDetalleFactura`, detallefactura, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}
