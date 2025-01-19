import api from '@/services/axios';
import { IReqAvailableExam, IResAvailableExams } from './available-exams.types';

export const fetchAvailableExams = async (): Promise<IResAvailableExams[]> => {
  try {
    return (
      await api.get<IResAvailableExams[]>(
        '/available_exams/get_all_available_exams'
      )
    ).data;
  } catch (error) {
    console.error('Error fetching available exams', error);
    throw error;
  }
};

export const createAvailableExam = async (
  data: IReqAvailableExam
): Promise<IResAvailableExams> => {
  try {
    return (
      await api.post<IResAvailableExams>(
        '/available_exams/create_available_exam',
        data
      )
    ).data;
  } catch (error) {
    console.error('Error creating available exam.', error);
    throw error;
  }
};

export const deleteAvailableExam = async (id: string): Promise<string> => {
  try {
    return (await api.delete<string>(
      `/available_exams/${id}/delete_available_exam`
    )).data;
  } catch (error) {
    console.error('Error deleting available exam.', error);
    throw error;
  }
};
