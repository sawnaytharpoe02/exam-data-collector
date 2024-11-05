import {
  IReqAvailableExam,
  IReqCustomer,
  IResAvailableExams,
  IResExams,
} from "@/types";
import axiosInstance from "./axios";

export const getAvailableExams = async () => {
  return (
    await axiosInstance.get<IResAvailableExams[]>(
      "/available_exams/get_all_available_exams"
    )
  ).data;
};

export const createAvailableExam = async (data: IReqAvailableExam) => {
  await axiosInstance.post("/available_exams/create_available_exam", data);
};

export const getExams = async () => {
  return (await axiosInstance.get<IResExams[]>("/exams/get_all_exams")).data;
};

// export const getCustomers = async () => {
//   return (await axiosInstance.get<Customer[]>(`/customers/get_all_customers`))
//     .data;
// };

// export const getCustomer = async (id: string) => {
//   return (await axiosInstance.get<Customer>(`/customers/${id}/get_customer`))
//     .data;
// };

export const createCustomer = async (data: IReqCustomer) => {
  await axiosInstance.post("/customers/create_customer", data);
};

export const updateCustomer = async (id: string, data: IReqCustomer) => {
  await axiosInstance.put(`/customers/${id}/update_customer`, data);
};

export const deleteCustomer = async () => {
  await axiosInstance.delete(`/customers/delete_customer`);
};
