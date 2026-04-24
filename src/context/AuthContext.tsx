import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, RegisterData, LoginData, UpdateProfileData } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  register: (userData: RegisterData) => Promise<boolean>;
  login: (loginData: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (profileData: UpdateProfileData) => Promise<boolean>;
  linkWallet: (walletAddress: string) => Promise<boolean>;
  unlinkWallet: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToast } = useToast();

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is stored locally
      const storedUser = authService.getStoredUser();
      const token = authService.getStoredToken();
      
      if (storedUser && token) {
        // Verify token with server
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear local data
          authService.clearAuthData();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      authService.clearAuthData();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        addToast('Registration successful! Welcome to DataGuard.', 'success');
        return true;
      } else {
        addToast(response.message || 'Registration failed', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      addToast(error.message || 'Registration failed', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(loginData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        addToast(`Welcome back, ${response.data.user.firstName}!`, 'success');
        return true;
      } else {
        addToast(response.message || 'Login failed', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      addToast(error.message || 'Login failed', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      addToast('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      addToast('Logged out', 'success');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: UpdateProfileData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.updateProfile(profileData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        addToast('Profile updated successfully', 'success');
        return true;
      } else {
        addToast(response.message || 'Profile update failed', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      addToast(error.message || 'Profile update failed', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const linkWallet = async (walletAddress: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.linkWallet(walletAddress);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        addToast('Wallet linked successfully', 'success');
        return true;
      } else {
        addToast(response.message || 'Wallet linking failed', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Wallet linking error:', error);
      addToast(error.message || 'Wallet linking failed', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unlinkWallet = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.unlinkWallet();
      
      if (response.success && response.data) {
        setUser(response.data.user);
        addToast('Wallet unlinked successfully', 'success');
        return true;
      } else {
        addToast(response.message || 'Wallet unlinking failed', 'error');
        return false;
      }
    } catch (error: any) {
      console.error('Wallet unlinking error:', error);
      addToast(error.message || 'Wallet unlinking failed', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateProfile,
    linkWallet,
    unlinkWallet,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;