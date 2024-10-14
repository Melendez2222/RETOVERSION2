import axios from "axios";
import { CartDetailDto, CartItemDetail, Client, Detalle_Factura, FacturaI, GetCartItemDetail, Loginuser, Product, ProductUpdate } from "../components/BODY/Interfaces";
//import Store ,{ RootState} from "./../Redux/Store";
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
// apiClient.interceptors.response.use(

//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {

//       localStorage.removeItem('token');
//       const { handle401 } = useAuth();
//       const navigate = useNavigate();
//       useEffect(() => {
//         const tokenData = JSON.parse(localStorage.getItem('tokenData') || '{}');
//         const expirationTime = new Date(tokenData.expires).getTime();
//         const currentTime = new Date().getTime();
//         const timeUntilExpiration = expirationTime - currentTime;

//         if (timeUntilExpiration > 0) {
//           const timer = setTimeout(() => {
//             handle401();
//             navigate('/');
//           }, timeUntilExpiration);

//           return () => clearTimeout(timer);
//         } else {
//           handle401();
//           navigate('/');
//         }
//       }, [handle401, navigate]);

//     }
//     return Promise.reject(error);
//   }
// );
export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('validate-token');
    return response.status === 200;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
// export const LoginUsers = async (loginuser: Loginuser, login: (token: string,username:string,password:string, expires: string) => void): Promise<any> => {
  
//   try {
//     const response = await apiClient.post(`${API_URL}Auth/login`, loginuser, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const { token, iduser, expires, role } = response.data;
//     login(token, expires,loginuser.username,loginuser.password);
//     return { iduser, expires, role };
//   } catch (error) {
//     throw error;
//   }
// } 
export const LoginUsers = async (loginuser: Loginuser, login: (token: string, username: string, password: string, expires: string, cartDetails: CartDetailDto[]) => void): Promise<any> => {
  try {
    const response = await apiClient.post(`${API_URL}api/Auth/login`, loginuser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { token, userId, expires, role, cartDetails } = response.data;
    login(token, expires, loginuser.username, loginuser.password, cartDetails);
    return { userId, expires, role, cartDetails };
  } catch (error) {
    throw error;
  }
}
export const listAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const ListCategory = async () => {
  
  
  try {
    const response = await axios.get(`${API_URL}CATEGORY/ListAll`, {
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
    const response = await fetch(`${API_URL}Cart/CartItems`, {
        method: 'POST',
        headers: {
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
  const response = await fetch(`${API_URL}Cart/DecreaseCartItem`, {
      method: 'POST',
      headers: {
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
  const response = await fetch(`${API_URL}Cart/RemoveCartItem`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemDetail),
  });

  if (!response.ok) {
      throw new Error('Error al agregar el producto al carrito');
  }

  return response.json();
};
export const GetCartItem = async (cartItemDetail: GetCartItemDetail) => {
  const response = await fetch(`${API_URL}Cart/CartUser`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItemDetail),
  });

  if (response.status!=200) {
      throw new Error('Error al agregar el producto al carrito');
  }

  return response.json();
};
export default apiClient;


