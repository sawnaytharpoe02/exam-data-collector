import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { AuthResponse } from "./axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>(
        "/admins/login",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      setAuth(data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};


