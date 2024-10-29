import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

/* 

UNCOMMENT THIS AFTER AUTHENTICATION SETUP IS FINISHED 

*/


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore((state) => state.token);

//     if (token) {
//       config.headers["authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
