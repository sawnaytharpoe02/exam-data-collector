// export default axiosInstance;
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export declare type AuthResponse = {
  _id: string;
  created_at: string;
  email: string;
  password: string;
  token: string;
  updated_at: string;
  user_name: string;
};

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log("api token", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const email = useAuthStore.getState().email;
        console.log("refresh token email", email);
        // const response = await api.post<AuthResponse>("/admins/refresh_token", {
        //   email,
        // });
        // const responseData = response.data;

        // console.log("responseData", responseData);

        // useAuthStore.getState().setAuth(responseData);
        // originalRequest.headers.Authorization = `Bearer ${responseData.token}`;

        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
