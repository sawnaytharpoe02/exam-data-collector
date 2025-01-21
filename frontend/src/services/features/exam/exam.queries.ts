import { QUERY_KEY } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { getExams } from "./exam.api";

export const useExams = () => {
  return useQuery({
    queryKey: [QUERY_KEY.EXAMS],
    queryFn: getExams,
  });
}