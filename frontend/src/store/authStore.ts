import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user_id: string | null;
  user_name: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setAuth: (data: any) => void;
  clearAuth: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user_id: null,
      user_name: null,
      email: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (data: any) => {
        try {
          set({
            user_id: data._id,
            user_name: data.user_name,
            email: data.email,
            token: data.token,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          set({
            error: "Invalid auth format",
            isAuthenticated: false,
          });
        }
      },

      clearAuth: () => {
        set({
          user_id: null,
          user_name: null,
          email: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setError: (error: string | null) => set({ error }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user_name: state.user_name,
        email: state.email,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
