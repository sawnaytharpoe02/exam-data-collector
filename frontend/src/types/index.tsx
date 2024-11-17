export type Section = "JP" | "MM";
export type Status =
  | "open"
  | "in progress"
  | "done"
  | "double checked"
  | "failed";

export interface IExamData {
  id: number;
  exam_type: string;
  description: string;
  section: Section | null;
}


export interface ISection {
  id: number;
  name: string;
}

export interface TCustomer {
  _id: string;
  prometric_id: string;
  prometric_password: string;
  name: string;
  email: string;
  dob: Date | string;
  exam_type: string;
  section: Section | null;
  status: Status;
  month: Date | string;
  date: Date | string;
}

