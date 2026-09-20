import { ApiResponse, CanvasData, User } from '@/types/canvas';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Helper to get auth header
const getAuthHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('glazia_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Generic request wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Request failed with status ${response.status}`,
        errors: data.errors || [data.message || 'An unexpected error occurred'],
      };
    }

    return data as ApiResponse<T>;
  } catch (error: any) {
    console.error(`[API Request Error] ${endpoint}:`, error);
    return {
      success: false,
      message: error.message || 'Failed to connect to backend server. Make sure the server is running on port 5000.',
      errors: [error.message || 'Network connection failed'],
    };
  }
}

// Canvas API endpoints
export async function getCanvases(): Promise<ApiResponse<CanvasData[]>> {
  return request<CanvasData[]>('/canvases', { method: 'GET' });
}

export async function getCanvas(id: string): Promise<ApiResponse<CanvasData>> {
  return request<CanvasData>(`/canvases/${id}`, { method: 'GET' });
}

export async function createCanvas(data: Partial<CanvasData>): Promise<ApiResponse<CanvasData>> {
  return request<CanvasData>('/canvases', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCanvas(id: string, data: Partial<CanvasData>): Promise<ApiResponse<CanvasData>> {
  return request<CanvasData>(`/canvases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCanvas(id: string): Promise<ApiResponse<{ id: string }>> {
  return request<{ id: string }>(`/canvases/${id}`, {
    method: 'DELETE',
  });
}

// Authentication API endpoints
export async function loginUser(email: string, password: string): Promise<ApiResponse<User>> {
  return request<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(name: string, email: string, password: string): Promise<ApiResponse<User>> {
  return request<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return request<User>('/auth/me', { method: 'GET' });
}

export async function updateUserProfile(data: { name?: string; password?: string }): Promise<ApiResponse<User>> {
  return request<User>('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
