import { QUERY_KEY } from '@/constants/data';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createCustomer, fetchCustomers } from './customer.api';
import { CustomerRequest } from './customer.types';

export const useCustomers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CUSTOMERS],
    queryFn: fetchCustomers,
    staleTime: 20 * 1000,
    gcTime: 60 * 1000,
  });
};

export const useCreateCustomer = async () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerRequest) => createCustomer(data),
    onSuccess: () => {
      console.log('create customer exam form success');
    },
    onError: (error: AxiosError) => {
      console.log('create customer exam form failed', error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log('Error', error.message);
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CUSTOMERS],
        });
      }
    },
  });
};
