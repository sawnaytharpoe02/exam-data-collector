import { QUERY_KEY } from "@/constants/data";
import { fetchCustomers } from "@/services/Customer/api";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.customers],
    queryFn: fetchCustomers,
  });
};
