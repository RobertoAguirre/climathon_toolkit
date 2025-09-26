// Configuración de la aplicación
export const config = {
  // URLs del backend
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Endpoints
  endpoints: {
    health: '/api/health',
    chat: '/api/chat/message',
    chatHistory: '/api/chat/history',
    chatSuggestions: '/api/chat/suggestions',
    tools: '/api/tools',
    admin: '/api/admin'
  },
  
  // Configuración del chat
  chat: {
    defaultSessionId: 'default',
    maxRetries: 3,
    timeout: 30000 // 30 segundos
  }
};

// Función helper para construir URLs completas
export function getApiUrl(endpoint: string): string {
  return `${config.apiBaseUrl}${endpoint}`;
}

// Función helper para hacer requests al API
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = getApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  const response = await fetch(url, mergedOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
