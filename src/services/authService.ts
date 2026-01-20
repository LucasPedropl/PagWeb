
import { apiRequest } from './api';
import { UserLoginDto, LoginResponse, UserRegisterDto, UserActivateDto } from '../types';

export const authService = {
  /**
   * Realiza o login do usuário.
   * Endpoint: POST /api/v1/User/login
   * Payload: { email, password, adminLogin: false }
   */
  login: async (credentials: UserLoginDto): Promise<LoginResponse> => {
    // Força adminLogin como false conforme solicitado
    const payload = {
      ...credentials,
      adminLogin: false
    };

    return await apiRequest<LoginResponse>('/User/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Cadastra um novo Usuário.
   * Endpoint: POST /api/v1/User/register
   */
  registerUser: async (data: UserRegisterDto): Promise<void> => {
    return await apiRequest<void>('/User/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Ativa a conta do usuário via Token.
   * Endpoint: POST /api/v1/User/activate
   */
  activateUser: async (data: UserActivateDto): Promise<void> => {
    return await apiRequest<void>('/User/activate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Recupera os dados do usuário logado (exemplo)
   */
  getMe: async (token: string): Promise<any> => {
    return { name: 'Usuário', role: 'User' }; 
  }
};
