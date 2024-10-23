import { Customer, IReqCustomer } from "@/types";
import axiosInstance from "./axios";

export const getCustomers = async () => {
  return (await axiosInstance.get<Customer[]>(`/api/customers`)).data;
};

export const getCustomer = async (id: string) => {
  return (await axiosInstance.get<Customer>(`/api/customers/${id}`)).data;
};

export const createCustomer = async (data: IReqCustomer) => {
  await axiosInstance.post("service", data);
};

export const updateCustomer = async (id: string, data: IReqCustomer) => {
  await axiosInstance.put(`/api/customers/${id}`, data);
};

export const deleteCustomer = async (id: string) => {
  await axiosInstance.delete(`/api/customers/${id}`);
};
