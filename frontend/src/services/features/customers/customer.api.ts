import api from "@/services/axios";
import { CustomerRequest, CustomerResponse } from "./customer.types";

export const fetchCustomers = async (): Promise<CustomerRequest[]> => {
  try {
    return (await api.get<CustomerResponse[]>(`/customers/get_all_customers`))
      .data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error
  }
};

export const fetchCustomer = async (id: string): Promise<CustomerResponse> => {
  try {
    return (await api.get<CustomerResponse>(`/customers/${id}/get_customer`))
      .data;
  } catch (error) {
    console.error("Error fetching customer", error);
    throw error
  }
};

export const createCustomer = async (
  data: CustomerRequest
): Promise<CustomerResponse> => {
  try {
    return (
      await api.post<CustomerResponse>("/customers/create_customer", data)
    ).data;
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};

export const updateCustomer = async (
  id: string,
  data: CustomerRequest
): Promise<CustomerResponse> => {
  try {
    return (
      await api.put<CustomerResponse>(`/customers/${id}/update_customer`, data)
    ).data;
  } catch (error) {
    console.error("Error updating customer", error);
    throw error;
  }
};

export const deleteCustomers = async (data: string[]): Promise<string> => {
  try {
    return (await api.delete<string>(`/customers/delete_customers`, { data }))
      .data;
  } catch (error) {
    console.error("Error deleting customers", error);
    throw error;
  }
};
