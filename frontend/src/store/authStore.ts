import { create } from "zustand";

type IAuth = {
  user_id: string;
  user_name: string;
  email: string;
  token: string;
}

type AuthState = {
  auth: IAuth | null;
  isAuthenticated: boolean;
  setAuth: (data: IAuth) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  isAuthenticated: false,
  setAuth: (data: IAuth) => set({ auth: data, isAuthenticated: !!data.token }),
  clearAuth: () => set({ auth: null, isAuthenticated: false }),
}));
