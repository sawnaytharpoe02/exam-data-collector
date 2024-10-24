import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
