export type Section = "JP" | "MM";
export type Status =
  | "open"
  | "inProgress"
  | "done"
  | "doubleChecked"
  | "failed";

export interface IExamData {
  id: number;
  exam_type: string;
  description: string;
  section: Section | null;
}

export interface IExamType {
  id: number;
  name: string;
}

export interface ISection {
  id: number;
  name: string;
}

export type Customer = {
  id: string;
  name: string;
  dob: Date | string;
  prometric_id: string;
  password: string;
  exam_type: string;
  section: Section | null;
  status: Status;
  month: Date | string;
  date: Date | string;
};

export interface IReqCustomer {
  prometric_id: string;
  password: string;
  name: string;
  dob: string;
  exam_type: string;
  section: string | null;
  date: string;
  month: string;
  role: string;
}
