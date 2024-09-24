import axios from "axios";
import { Client, Detalle_Factura, FacturaI, Loginuser, Product, ProductUpdate } from "../components/BODY/Interfaces";
import { useAuth } from "./../auth/AuthProv"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const API_URL = 'https://localhost:7296/'

// declare global {
//   var token: string | null;
// }
// globalThis.token = localStorage.getItem('token');
let idUser: string;
// const navigate = useNavigate(); 
// export const setToken = (newToken: string) => {
//   token = newToken;
// };
// export const getToken = () => {
//   return token;
// };
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
// apiClient.interceptors.request.use(
  
//   config => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );
apiClient.interceptors.response.use(

  response => response,
  error => {
    if (error.response && error.response.status === 401) {

      localStorage.removeItem('token');
      const { handle401 } = useAuth();
      const navigate = useNavigate();
      useEffect(() => {
        const tokenData = JSON.parse(localStorage.getItem('tokenData') || '{}');
        const expirationTime = new Date(tokenData.expires).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration > 0) {
          const timer = setTimeout(() => {
            handle401();
            navigate('/');
          }, timeUntilExpiration);

          return () => clearTimeout(timer);
        } else {
          handle401();
          navigate('/');
        }
      }, [handle401, navigate]);

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
export const LoginUsers = async (loginuser: Loginuser, login: (token: string, expires: string) => void): Promise<any> => {
  
  try {
    const response = await apiClient.post(`${API_URL}Auth/login`, loginuser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { token, iduser, expires, role } = response.data;
    login(token, expires);
    return { iduser, expires, role };
  } catch (error) {
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
export const ListCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}CATEGORY/ListAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const ListClient = async () => {
  const { token } = useAuth();
  try {
    const response = await apiClient.get(`${API_URL}USER/ListAll `, {
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
  const { token } = useAuth();
  try {
    const response = await apiClient.get(`${API_URL}INVOICE/LastFactura`, {
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
  const { token } = useAuth();
  try {
    const response = await apiClient.put(`${API_URL}USER/Update`, clientdata, {
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
  const { token } = useAuth();
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
export const UpdateProduct = async (producttdata: ProductUpdate,token:string|null) => {
  
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
  const { token } = useAuth();
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
  const { token } = useAuth();
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
  const { token } = useAuth();
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


