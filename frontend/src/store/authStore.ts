import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>(() => ({
  token: null,
  isAuthenticated: false,
  setToken: (token: string) => ({ token, isAuthenticated: !!token }),
  clearToken: () => ({ token: null, isAuthenticated: false }),
}));
