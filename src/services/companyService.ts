
import { apiRequest } from './api';
import { EmpresaCreateDto } from '../types';

export const companyService = {
  /**
   * Cria uma nova empresa vinculada ao usuário logado (ou cria novo cadastro dependendo da API).
   * Endpoint: POST /api/v1/Empresa
   */
  create: async (data: EmpresaCreateDto): Promise<void> => {
    return await apiRequest<void>('/Empresa', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};
