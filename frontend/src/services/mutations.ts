import { IReqCustomer } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCustomer, updateCustomer } from "./api";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IReqCustomer) => createCustomer(data),
    onSuccess: () => {
      console.log("create customer success");
    },
    onError: (error: AxiosError) => {
      console.log("create customer failed", error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("Error", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["customers"] });
      }
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IReqCustomer }) =>
      updateCustomer(id, data),
    onSuccess: () => {
      console.log("update customer success");
    },
    onError: (error: AxiosError) => {
      console.log("update customer failed", error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("Error", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["customers"] });
      }
    },
  });
};
