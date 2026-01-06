
export const API_URL = 'https://lojas.vlks.com.br/api/v1';

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `Erro na requisição: ${response.status}`);
  }

  // Se o status for 204 (No Content), retorna null
  if (response.status === 204) {
    return null as T;
  }

  try {
    return await response.json();
  } catch (error) {
    // Caso a resposta não seja JSON válido (ex: endpoint retorna apenas texto ou vazio)
    return null as T;
  }
}
