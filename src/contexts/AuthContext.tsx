'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, LoginCredentials, User } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.services';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificar autenticação ao carregar
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedToken = authService.getToken();
        const savedUser = authService.getUser();

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const authData = await authService.login(credentials);
      
      authService.saveAuthData(authData);
      setToken(authData.token);
      setUser(authData.user);
      
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!(token && user);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}