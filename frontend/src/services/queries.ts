import { useQuery } from "@tanstack/react-query";
import { getExams, getAvailableExams } from "./api";

export const useAvailableExams = () => {
  return useQuery({
    queryKey: ["availableExams"],
    queryFn: getAvailableExams,
  });
};

export const useExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: getExams,
  });
};

// export const useCustomer = (id: string) => {
//   return useQuery({
//     queryKey: ["customer", id],
//     queryFn: () => getCustomer(id),
//   });
// };

// export const useCustomers = () => {
//   return useQuery({
//     queryKey: ["customers"],
//     queryFn: getCustomers,
//     refetchInterval: 60000, // refetch every minute
//     staleTime: 1000 * 60 * 5, // cache for 5 minutes
//     retry: 3, // retry 3 times
//   });
// };
