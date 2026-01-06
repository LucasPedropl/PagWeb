
import { apiRequest } from './api';
import { UserLoginDto, LoginResponse, UserRegisterDto } from '../types';

// Função auxiliar para gerar ID aleatório conforme solicitado
const generateRandomId = () => Math.floor(Math.random() * 9000) + 1000;

export const authService = {
  /**
   * Realiza o login do usuário (Admin ou Cliente)
   * Endpoint: POST /api/v1/User/login
   */
  login: async (credentials: UserLoginDto): Promise<LoginResponse> => {
    return await apiRequest<LoginResponse>('/User/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Cadastra um novo Usuário (Admin ou Comum)
   * Endpoint: POST /api/v1/User/register?tipo=X&idEmpresa=Y
   * @param data Dados do formulário
   * @param tipo 0 para usuário comum, 1 para admin/proprietário (default 1 para cadastro público)
   */
  registerUser: async (data: UserRegisterDto, tipo: number = 1): Promise<void> => {
    // Gera um ID de empresa aleatório conforme solicitado para o fluxo inicial
    const idEmpresa = generateRandomId();
    
    // Constrói a URL com query params
    const endpoint = `/User/register?tipo=${tipo}&idEmpresa=${idEmpresa}`;

    return await apiRequest<void>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Recupera os dados do usuário logado (exemplo)
   */
  getMe: async (token: string): Promise<any> => {
    return { name: 'Admin', role: 'Admin' }; 
  }
};