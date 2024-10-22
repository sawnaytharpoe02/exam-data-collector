import { useAuthStore } from "@/store/authStore";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface LoginResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axios.post(
    `${process.env.VITE_AUTH_API_ENDPOINT}/login`,
    credentials
  );
  return response.data;
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  AxiosError,
  LoginCredentials
> => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation<LoginResponse, AxiosError, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      setToken(data.token);
    },
    onError: (error: AxiosError) => {
      console.error("Login Failed:", error.response?.data || error.message);
    },
  });
};
