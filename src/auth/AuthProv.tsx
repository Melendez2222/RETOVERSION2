import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../components/BODY/Interfaces';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const handle401 = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    alert('AUTORIZACION EXPIRADA O NO EXISTENTE!!!');
  }
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,handle401  }}>
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
