import { useAuthStore } from "@/store/authStore";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";


interface LoginResponse{
  token: string;
}
