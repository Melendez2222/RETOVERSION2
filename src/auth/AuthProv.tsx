import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../components/BODY/Interfaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../Redux/tokenSlice';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [expires, setExpires] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpires = localStorage.getItem('expires');

    if (storedToken && storedExpires) {
      const expirationDate = new Date(storedExpires);
      if (expirationDate > new Date()) {
        dispatch(setToken(storedToken));
        setExpires(expirationDate);
        setIsAuthenticated(true);
      } else {
        handle401();
      }
    }
    setLoading(false);
  }, [dispatch]);

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
    setExpires(null);
    dispatch(clearToken());
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    alert('AUTORIZACION EXPIRADA O NO EXISTENTE!!!');
    history('/');
  };

  const login = (newToken: string, expirationDate: string) => {
    setIsAuthenticated(true);
    setExpires(new Date(expirationDate));
    dispatch(setToken(newToken));
    localStorage.setItem('token', newToken);
    localStorage.setItem('expires', expirationDate);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setExpires(null);
    dispatch(clearToken());
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
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
