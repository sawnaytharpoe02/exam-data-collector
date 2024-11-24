export type BaseCustomer<T extends object = {}> = {
  prometric_id: string;
  prometric_password: string;
  name: string;
  email: string;
  dob: string;
  exam_id: string;
  day: string;
  month: string;
} & T;

export type CustomerRequest = BaseCustomer;
export type CustomerResponse = BaseCustomer<{
  _id: string;
  status: string;
  created_at: string;
  updated_at: string;
}>;
