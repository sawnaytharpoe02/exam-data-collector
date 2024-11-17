import { Status } from "@/types";

export interface IReqCustomer {
  prometric_id: string;
  prometric_password: string;
  name: string;
  email: string;
  dob: string;
  exam_type: string;
  section: string | null;
  month: string;
  date: string;
}

export interface IResCustomer extends IReqCustomer {
  _id: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
