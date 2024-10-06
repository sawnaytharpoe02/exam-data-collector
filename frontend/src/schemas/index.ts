import { z } from "zod";

export const formSchema = z.object({
  prometric_id: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  exam_type: z.string(),
  exam_language: z.string(),
  // month: z.array(z.string()).min(1, {
  //   message: "Please select at least one month.",
  // }),
  // date: z.array(z.string()).min(1, {
  //   message: "Please select at least one dates.",
  // }),
  month: z.string(),
  date: z.date().max(new Date(), {
    message: "Please select a valid date.",
  }),
});
