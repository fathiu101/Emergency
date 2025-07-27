import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  users: User[]; // <- Track registered users here
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          await mockDelay(1000);

          const user = get().users.find(u => u.email === email && u.password === password);
          if (!user) {
            throw new Error('Invalid email or password');
          }

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          await mockDelay(1000);

          const existingUser = get().users.find(u => u.email === email);
          if (existingUser) {
            throw new Error('Email already in use');
          }

          const newUser: User = {
            id: crypto.randomUUID(),
            name,
            email,
            password,
          };

          const updatedUsers = [...get().users, newUser];

          set({
            users: updatedUsers,
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          await mockDelay(1000);

          const user = get().users.find(u => u.email === email);
          if (!user) {
            throw new Error('User not found');
          }

          // Normally send email. Skipping in mock.
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        users: state.users, // <- Persist registered users too
      }),
    }
  )
);
