import axiosInstance from '../../axios';
import { IResExams } from './exam.types';

export const getExams = async (): Promise<IResExams[]> => {
  try {
    return (await axiosInstance.get<IResExams[]>('/exams/get_all_exams')).data;
  } catch (error) {
    console.error('Error fetching exams', error);
    throw error;
  }
};
