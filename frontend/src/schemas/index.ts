import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date part

export const formSchema = z.object({
  prometric_id: z
    .string()
    .nonempty({ message: "Prometric Id is required." })
    .min(2, {
      message: "Prometric id must be at least 2 characters.",
    }),
  prometric_password: z.string().nonempty({ message: "Password is required." }).min(2, {
    message: "Password must be at least 2 characters.",
  }),
  name: z.string().nonempty({ message: "Name is required." }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  dob: z.date().refine(
    (dob) => {
      const dobDate = new Date(dob);
      dobDate.setHours(0, 0, 0, 0); // Reset time for comparison
      return dobDate.getTime() < today.getTime(); // Ensure dob is not today's date
    },
    {
      message: "Date of birth cannot be today's date.",
    }
  ),
  exam_type: z.string().nonempty({ message: "Please select an exam type." }),
  section: z.string().nullable(),
  month: z.string().nonempty({ message: "Month is required." }),
  date: z.date(),
});
