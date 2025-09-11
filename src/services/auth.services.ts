import { AuthResponse, LoginCredentials, User } from '@/types/auth.types';

const AUTH_TOKEN_KEY = 'financial_dashboard_token';
const AUTH_USER_KEY = 'financial_dashboard_user';

export const authService = {
  // Simular login - substitua pela sua API real
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular validação - substitua pela sua lógica
    if (credentials.email === 'admin@test.com' && credentials.password === '123456') {
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Administrador',
        },
        token: 'mock_jwt_token_' + Date.now()
      };
      return mockResponse;
    }

    throw new Error('Credenciais inválidas');
  },

  // Salvar dados de autenticação no localStorage
  saveAuthData: (authData: AuthResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authData.user));
    }
  },

  // Recuperar token do localStorage
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  // Recuperar usuário do localStorage
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(AUTH_USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  // Limpar dados de autenticação
  clearAuthData: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  // Verificar se token existe e é válido
  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    const user = authService.getUser();
    
    return !!(token && user);
  }
};