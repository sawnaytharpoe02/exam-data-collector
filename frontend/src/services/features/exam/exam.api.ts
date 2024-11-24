import axiosInstance from "../../axios";
import { IResExams } from "./exam.types";

export const getExams = async () => {
  return (await axiosInstance.get<IResExams[]>("/exams/get_all_exams")).data;
};
