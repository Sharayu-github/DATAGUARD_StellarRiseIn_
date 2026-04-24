import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  walletAddress?: string;
  isEmailVerified: boolean;
  role: 'user' | 'admin';
  profile: {
    avatar?: string;
    bio?: string;
    organization?: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      browser: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
  errors?: any[];
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  identifier: string; // email or username
  password: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  profile?: {
    bio?: string;
    organization?: string;
  };
  preferences?: {
    notifications?: {
      email?: boolean;
      browser?: boolean;
    };
    theme?: 'light' | 'dark' | 'auto';
  };
}

class AuthService {
  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success && response.data.data) {
        // Store token and user data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', loginData);
      
      if (response.data.success && response.data.data) {
        // Store token and user data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      
      if (response.data.success && response.data.data) {
        const user = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(profileData: UpdateProfileData): Promise<AuthResponse> {
    try {
      const response = await api.put('/users/profile', profileData);
      
      if (response.data.success && response.data.data) {
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Link wallet address
  async linkWallet(walletAddress: string): Promise<AuthResponse> {
    try {
      const response = await api.put('/auth/wallet', { walletAddress });
      
      if (response.data.success && response.data.data) {
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Unlink wallet address
  async unlinkWallet(): Promise<AuthResponse> {
    try {
      const response = await api.delete('/auth/wallet');
      
      if (response.data.success && response.data.data) {
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Get stored user data
  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  // Get stored token
  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear all auth data
  clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Handle API errors
  private handleError(error: any): Error {
    if (error.response?.data) {
      const errorData = error.response.data;
      
      if (errorData.errors && Array.isArray(errorData.errors)) {
        // Validation errors
        const messages = errorData.errors.map((err: any) => err.msg || err.message).join(', ');
        return new Error(messages);
      }
      
      return new Error(errorData.message || 'An error occurred');
    }
    
    if (error.request) {
      return new Error('Network error - please check your connection');
    }
    
    return new Error(error.message || 'An unexpected error occurred');
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'OK';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
export default authService;