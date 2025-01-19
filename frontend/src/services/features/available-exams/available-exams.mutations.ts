import { QUERY_KEY } from '@/constants/data';
import { useLoadingOverlay } from '@/store/loadingOverlayStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createAvailableExam, deleteAvailableExam } from './available-exams.api';
import { IReqAvailableExam } from './available-exams.types';

export const useCreateAvailableExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IReqAvailableExam) => createAvailableExam(data),
    onSuccess: () => {
      console.log('create available exams success');
    },
    onError: (error: AxiosError) => {
      console.log('create available exams failed', error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log('Error', error.message);
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.AVAILABLE_EXAMS],
        });
      }
    },
  });
};

export const useDeleteAvailableExams = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useLoadingOverlay();

  return useMutation({
    mutationFn: (id: string) => deleteAvailableExam(id),

    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      console.log('delete available exams success');
    },
    onError: (error: AxiosError) => {
      setIsLoading(false);
      console.log('delete available exams failed', error.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log('Error', error.message);
      } else {
        setIsLoading(false);
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.AVAILABLE_EXAMS],
        });
      }
    },
  });
};
