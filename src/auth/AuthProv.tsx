import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../components/BODY/Interfaces';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [expires, setExpires] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpires = localStorage.getItem('expires');

    if (storedToken && storedExpires) {
      const expirationDate = new Date(storedExpires);
      if (expirationDate > new Date()) {
        setToken(storedToken);
        setExpires(expirationDate);
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
    setToken(null);
    setExpires(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    alert('AUTORIZACION EXPIRADA O NO EXISTENTE!!!');
    history('/');
  };

  const login = (newToken: string, expirationDate: string) => {
    setIsAuthenticated(true);
    setToken(newToken);
    setExpires(new Date(expirationDate));
    localStorage.setItem('token', newToken);
    localStorage.setItem('expires', expirationDate);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setExpires(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, handle401 }}>
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
