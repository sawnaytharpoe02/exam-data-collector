import { getCustomer, getCustomers } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    refetchInterval: 60000, // refetch every minute
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 3, // retry 3 times
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
  });
};
