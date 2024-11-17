import axiosInstance from "../axios";
import { IReqAvailableExam, IResAvailableExams } from "./types";

export const getAvailableExams = async () => {
  return (
    await axiosInstance.get<IResAvailableExams[]>(
      "/available_exams/get_all_available_exams"
    )
  ).data;
};

export const createAvailableExam = async (data: IReqAvailableExam) => {
  await axiosInstance.post("/available_exams/create_available_exam", data);
};
