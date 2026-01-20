
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { UserLoginDto, LoginResponse } from '../types';

interface AuthContextData {
  user: { token: string; tipo: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: UserLoginDto) => Promise<LoginResponse>;
  signInGuest: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ token: string; tipo: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = () => {
      const storedToken = localStorage.getItem('@PagWeb:token');
      const storedTipo = localStorage.getItem('@PagWeb:tipo');

      if (storedToken && storedTipo) {
        setUser({ token: storedToken, tipo: storedTipo });
      }
      setIsLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (credentials: UserLoginDto): Promise<LoginResponse> => {
    try {
      const response = await authService.login(credentials);
      
      const { token, tipo } = response;

      localStorage.setItem('@PagWeb:token', token);
      localStorage.setItem('@PagWeb:tipo', tipo);

      setUser({ token, tipo });
      
      // Retornamos a resposta para que o componente de Login possa decidir a rota
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signInGuest = () => {
    const token = 'guest-token';
    const tipo = 'Guest';
    localStorage.setItem('@PagWeb:token', token);
    localStorage.setItem('@PagWeb:tipo', tipo);
    setUser({ token, tipo });
  };

  const signOut = () => {
    localStorage.removeItem('@PagWeb:token');
    localStorage.removeItem('@PagWeb:tipo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, signIn, signInGuest, signOut }}>
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
