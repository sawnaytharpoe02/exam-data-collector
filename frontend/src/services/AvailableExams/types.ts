export interface IResAvailableExams {
  _id: string;
  dates: string[];
  exam_type: string;
  months: string[];
  created_at: string;
  updated_at: string;
}

export interface IReqAvailableExam {
  dates: string[];
  exam_type: string;
  months: string[];
}
