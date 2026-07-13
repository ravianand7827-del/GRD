import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  googleLogin: (data: { googleId: string; email: string; name: string; avatar: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('grd_token', data.token);
        set({ user: data.user, token: data.token, isAuthenticated: true });
      },

      register: async (name, email, password, phone) => {
        const { data } = await api.post('/auth/register', { name, email, password, phone });
        localStorage.setItem('grd_token', data.token);
        set({ user: data.user, token: data.token, isAuthenticated: true });
      },

      googleLogin: async (googleData) => {
        const { data } = await api.post('/auth/google', googleData);
        localStorage.setItem('grd_token', data.token);
        set({ user: data.user, token: data.token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('grd_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user, token) => {
        localStorage.setItem('grd_token', token);
        set({ user, token, isAuthenticated: true });
      },
    }),
    { name: 'grd-auth', partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }) }
  )
);
