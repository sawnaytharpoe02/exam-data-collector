import { Customer, IReqCustomer } from "@/types";
import axiosInstance from "./axios";

export const getCustomers = async () => {
  return (await axiosInstance.get<Customer[]>(`/customers/get_all_customers`))
    .data;
};

export const getCustomer = async (id: string) => {
  return (await axiosInstance.get<Customer>(`/customers/${id}/get_customer`)).data;
};

export const createCustomer = async (data: IReqCustomer) => {
  await axiosInstance.post("/customers/create_customer", data);
};

export const updateCustomer = async (id: string, data: IReqCustomer) => {
  await axiosInstance.put(`/customers/${id}/update_customer`, data);
};

export const deleteCustomer = async () => {
  await axiosInstance.delete(`/customers/delete_customer`);
};
