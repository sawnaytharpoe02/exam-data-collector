export interface IReqAvailableExam {
  dates: string[];
  exam_type: string;
  months: string[];
}

export interface IResAvailableExams {
  _id: string;
  created_at: string;
  dates: string[];
  exam_type: Examtype;
  months: string[];
  updated_at: string;
}

interface Examtype {
  _id: string;
  exam_type: string;
  section: string[];
}
