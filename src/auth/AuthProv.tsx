import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../components/BODY/Interfaces';
import { useNavigate } from 'react-router-dom';
import { clearToken, setTokenSR } from './../Redux/tokenSlice'
import { setToken, getToken, removeToken, setExpires, getExpires, removeExpires, clearStorage, setUsernameLT, setPasswordLT, removePasswordLT, removeUsernameLT, clearCartItemStorage } from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import { clearCart, setCartItems, setUserCredentials, updateCartItems } from '../Redux/cartSlice';
import { GetCartItem } from '../services/Request';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const storedToken = await getToken();
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [expiration, setExpiresState] = useState<Date | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const history = useNavigate();

  useEffect(() => {
    const storedToken = getToken();
    const storedExpires = getExpires();
    if (storedToken && storedExpires) {
      const expirationDate = new Date(storedExpires);
      if (expirationDate > new Date()) {
        setExpiresState(expirationDate);
        setIsAuthenticated(true);
      } else {
        handle401();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (expiration) {
      const now = new Date();
      const timeUntilExpiration = new Date(expiration).getTime() - now.getTime();

      if (timeUntilExpiration > 0) {
        const timeoutId = setTimeout(() => {
          handle401();
        }, timeUntilExpiration);

        return () => clearTimeout(timeoutId);
      } else {
        handle401();
      }
    }
  }, [expiration]);

  const handle401 = () => {
    setIsAuthenticated(false);
    setExpiresState(null);
    dispatch(clearToken());
    removeToken();
    removeExpires();
    removePasswordLT();
    removeUsernameLT();
    clearStorage();
    alert('AUTORIZACIÓN EXPIRADA O NO EXISTENTE!!!');
    history('/');
  };

  const login = async (newToken: string, expirationDate: string, userUsername: string, userPassword: string) => {
    setIsAuthenticated(true);
    setExpiresState(new Date(expirationDate));
    dispatch(setTokenSR(newToken))

    dispatch(setUserCredentials({ userName: userUsername, userPassword: userPassword }))
    await Promise.all([
      setToken(newToken),
      setExpires(new Date(expirationDate)),
      setUsernameLT(userUsername),
      setPasswordLT(userPassword)
    ]);
    // await GetCartItem({UserName: username, UserPassword: password  });
    try {
      const cartDetails = await GetCartItem();
      const mappedCartItems = cartDetails.map((item: any) => ({
          id_Product: item.productId,
          productName: item.productName,
          productCode: item.productCode, 
          price: item.price,
          stock: 0, 
          productActive: true, 
          category: '', 
          createdAt: '', 
          qty: item.quantity,
      }));
      dispatch(setCartItems(mappedCartItems));
  } catch (error) {
      console.error('Error al obtener los detalles del carrito:', error);
  }

  };

  const logout = () => {
    setIsAuthenticated(false);
    setExpiresState(null);
    dispatch(clearToken());
    dispatch(clearCart());
    removeToken();
    removeExpires();
    removePasswordLT();
    removeUsernameLT();
    clearStorage();
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, handle401 }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};