import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

// Mock API response delay
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await mockDelay(1000);
          
          // Simplified login logic for demo
          if (password !== 'password123') {
            throw new Error('Invalid credentials');
          }
          
          const user = MOCK_USERS.find(u => u.email === email);
          if (!user) {
            throw new Error('User not found');
          }
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'An error occurred' 
          });
        }
      },
      
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await mockDelay(1000);
          
          // Check if user already exists
          const existingUser = MOCK_USERS.find(u => u.email === email);
          if (existingUser) {
            throw new Error('Email already in use');
          }
          
          // Generate new user (in real app, this would be done by the server)
          const newUser: User = {
            id: String(MOCK_USERS.length + 1),
            name,
            email,
          };
          
          // In a real app, we would save this to the database
          // For demo, we just set the state
          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'An error occurred' 
          });
        }
      },
      
      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await mockDelay(1000);
          
          // Check if user exists
          const user = MOCK_USERS.find(u => u.email === email);
          if (!user) {
            throw new Error('User not found');
          }
          
          // In a real app, we would send an email with password reset link
          // For demo, we just resolve the promise
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'An error occurred' 
          });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);