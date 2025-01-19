import { QUERY_KEY } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "./customer.api";

export const useCustomers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CUSTOMERS],
    queryFn: fetchCustomers,
  });
};
