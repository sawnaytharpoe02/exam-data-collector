import { QUERY_KEY } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getCustomer, getCustomers } from "./api";


export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.customers, id],
    queryFn: () => getCustomer(id),
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.customers],
    queryFn: getCustomers,
    refetchInterval: 60000, // refetch every minute
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 3, // retry 3 times
  });
};
