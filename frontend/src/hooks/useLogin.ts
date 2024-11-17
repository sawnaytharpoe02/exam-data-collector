import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IResAuth {
  _id: string;
  user_name: string;
  email: string;
  password: string;
  token: string;
  created_at: string;
  updated_at: string;
}

interface IReqAuth {
  email: string;
  password: string;
}

const login = async (credentials: IReqAuth) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/admins/login`,
    credentials
  );

  return response.data;
};

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: IReqAuth) => login(credentials),
    onSuccess: (data: IResAuth) => {
      setAuth({
        user_id: data._id,
        user_name: data.user_name,
        email: data.email,
        token: data.token,
      });
      navigate("/dashboard");
    },
  });
};
