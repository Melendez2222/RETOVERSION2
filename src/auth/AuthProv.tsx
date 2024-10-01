import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../components/BODY/Interfaces';
import { useNavigate } from 'react-router-dom';
import { clearToken, setTokenSR} from './../Redux/tokenSlice'
import { setToken, getToken, removeToken, setExpires, getExpires, removeExpires, clearStorage, setUsernameLT, setPasswordLT, removePasswordLT, removeUsernameLT } from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../Redux/cartSlice';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const storedToken = await getToken();
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [expires, setExpiresState] = useState<Date | null>(null);
  
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
    if (expires) {
      const now = new Date();
      const timeUntilExpiration = new Date(expires).getTime() - now.getTime();

      if (timeUntilExpiration > 0) {
        const timeoutId = setTimeout(() => {
          handle401();
        }, timeUntilExpiration);

        return () => clearTimeout(timeoutId);
      } else {
        handle401();
      }
    }
  }, [expires]);

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

  // const login = async (newToken: string, expirationDate: string,username:string,password:string) => {
  //   setIsAuthenticated(true);
  //   setExpiresState(new Date(expirationDate));
  //   dispatch(setTokenSR(newToken))
    
  //   dispatch(setUserCredentials({userName:username,userPassword:password}))
  //   await setToken(newToken);
  //   await setExpires(new Date(expirationDate));
  //   await setUsernameLT(username);
  //   await setPasswordLT(password);
  // };
  const login = async (newToken: string, expirationDate: string, username: string, password: string, cartDetails: CartDetailDto[]) => {
    setIsAuthenticated(true);
    setExpiresState(new Date(expirationDate));
    dispatch(setTokenSR(newToken));
    dispatch(setUserCredentials({ userName: username, userPassword: password }));
    dispatch(setCartDetails(cartDetails)); // Asumiendo que tienes una acción para esto
    await setToken(newToken);
    await setExpires(new Date(expirationDate));
    await setUsernameLT(username);
    await setPasswordLT(password);
};
  const logout = () => {
    setIsAuthenticated(false);
    setExpiresState(null);
    dispatch(clearToken());
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