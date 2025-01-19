import { QUERY_KEY } from '@/constants/data';
import { useQuery } from '@tanstack/react-query';
import { fetchAvailableExams } from './available-exams.api';


export const useAvailableExams = () => {
  return useQuery({
    queryKey: [QUERY_KEY.AVAILABLE_EXAMS],
    queryFn: fetchAvailableExams,
  });
};
