const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Custom API error class
export class ApiError extends Error {
  code: number;
  httpStatus: number;
  httpError: boolean;

  constructor(message: string, code: number, httpStatus: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.httpStatus = httpStatus;
    this.httpError = httpStatus >= 400;
  }
}

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  // Check if response contains an error (even with HTTP 200)
  if (data.code === 403 || data.error === 'Forbidden') {
    console.error('[ApiError] 403 Forbidden:', { url: response.url, status: response.status, data });
    throw new ApiError(data.error || 'Forbidden', 403, response.status);
  }

  if (data.error) {
    console.error('[ApiError] API error:', { url: response.url, status: response.status, data });
    throw new ApiError(data.error, data.code || response.status, response.status);
  }

  if (!response.ok) {
    console.error('[ApiError] HTTP error:', { url: response.url, status: response.status, data });
    throw new ApiError(data.error || `HTTP ${response.status}`, response.status, response.status);
  }

  return data as T;
}

// Get auth token from localStorage
function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

// API headers
function getHeaders(includeAuth: boolean = false): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

// Auth API
export const authApi = {
  login: async (phone: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ phone, password }),
    });
    return handleResponse<{ token: string; user: any }>(response);
  },

  register: async (data: { fullName: string; phone: string; email?: string; password: string; role: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<{ token: string; user: any }>(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(true),
    });
    return handleResponse<any>(response);
  },

  updateProfile: async (data: { fullName?: string; phone?: string; avatarUrl?: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(response);
  },
};

// Listings API
export const listingsApi = {
  getAll: async (filters?: {
    city?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/listings?${params.toString()}`, {
      headers: getHeaders(),
    });
    return handleResponse<{ listings: any[]; pagination: any }>(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<any>(response);
  },

  create: async (data: {
    title: string;
    propertyType: string;
    bedrooms?: number;
    rentPrice: number;
    city: string;
    area: string;
    description?: string;
    amenities?: string[];
    images?: string[];
    contactPhone?: string;
    contactWhatsapp?: string;
    latitude?: number;
    longitude?: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({
        ...data,
        property_type: data.propertyType,
        rent_price: data.rentPrice,
        contact_phone: data.contactPhone,
        contact_whatsapp: data.contactWhatsapp,
      }),
    });
    return handleResponse<any>(response);
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse<any>(response);
  },

  getMyListings: async () => {
    const response = await fetch(`${API_BASE_URL}/listings/landlord/my-listings`, {
      headers: getHeaders(true),
    });
    return handleResponse<{ listings: any[] }>(response);
  },
};

// Favorites API
export const favoritesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      headers: getHeaders(true),
    });
    return handleResponse<{ favorites: any[] }>(response);
  },

  add: async (listingId: string) => {
    const response = await fetch(`${API_BASE_URL}/favorites/${listingId}`, {
      method: 'POST',
      headers: getHeaders(true),
    });
    return handleResponse<any>(response);
  },

  remove: async (listingId: string) => {
    const response = await fetch(`${API_BASE_URL}/favorites/${listingId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse<any>(response);
  },

  check: async (listingId: string) => {
    const response = await fetch(`${API_BASE_URL}/favorites/check/${listingId}`, {
      headers: getHeaders(true),
    });
    return handleResponse<{ isFavorite: boolean }>(response);
  },
};

// Reports API
export const reportsApi = {
  create: async (data: {
    listingId: string;
    reason: string;
    otherReason?: string;
    description?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({
        listingId: data.listingId,
        reason: data.reason,
        otherReason: data.otherReason,
        description: data.description,
      }),
    });
    return handleResponse<any>(response);
  },

  getAll: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    const response = await fetch(`${API_BASE_URL}/reports?${params.toString()}`, {
      headers: getHeaders(true),
    });
    return handleResponse<{ reports: any[]; pagination: any }>(response);
  },

  update: async (id: string, data: { status?: string; adminNotes?: string }) => {
    const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    return handleResponse<any>(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse<any>(response);
  },
};
