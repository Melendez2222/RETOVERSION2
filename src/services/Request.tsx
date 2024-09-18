import axios from "axios";
import jwt_decode from 'jwt-decode';
import { Client, Detalle_Factura, FacturaI, Loginuser, Product } from "../components/BODY/Interfaces";
import LoginModal from "../components/BODY/LoginModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = 'https://localhost:7296/'
let token: string | null = localStorage.getItem('token');
let idUser: string;
// const navigate = useNavigate(); 
export const setToken= (newToken: string) => {
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
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      token = null;
      alert('Tu sesión ha caducado. Por favor, vuelve a iniciar sesión.');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);
export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('validate-token');
    return response.status === 200;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
export const LoginUsers = async (loginuser:Loginuser): Promise<any> => {

  try {
    const response = await apiClient.post(`${API_URL}Auth/login`,loginuser,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    token = response.data;
    localStorage.setItem('token', response.data.token);
    return response.status;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
export const listAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}PRODUCT/ListAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const ListClient = async () => {
  
    try {
      const response = await apiClient.get(`${API_URL}CLIENT/ListAll`, {
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
    const response = await apiClient.get(`${API_URL}RECEIPT/LastFactura`, {
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
    const response = await apiClient.put(`${API_URL}CLIENT/Update`, clientdata, {
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
    const response = await apiClient.post(`${API_URL}CLIENT/Create`, clientdata, {
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
    const response = await apiClient.put(`${API_URL}PRODUCT/Update`, producttdata, {
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
    const response = await apiClient.post(`${API_URL}PRODUCT/Create`, producttdata, {
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
    response = await apiClient.post(`${API_URL}RECEIPT/CreateFactura`, factura, {
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
    response = await apiClient.post(`${API_URL}INVOICE_DETAIL/CreateDetalleFactura`, detallefactura, {
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

export default apiClient;


