import { QUERY_KEY } from "@/constants/data";
import { useLoadingOverlay } from "@/store/loadingOverlayStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createCustomer,
  deleteCustomers,
  updateCustomer,
} from "./customer.api";
import { type CustomerRequest } from "./customer.types";
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerRequest) => createCustomer(data),
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
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CUSTOMERS],
        });
      }
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CustomerRequest }) =>
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
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CUSTOMERS],
        });
      }
    },
  });
};

export const useDeleteCustomers = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useLoadingOverlay();

  return useMutation({
    mutationFn: (data: string[]) => deleteCustomers(data),

    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      console.log("delete customers success");
    },
    onError: (error: AxiosError) => {
      setIsLoading(false);
      console.log("delete customers failed", error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("Error", error.message);
      } else {
        setIsLoading(false);
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CUSTOMERS],
        });
      }
    },
  });
};
