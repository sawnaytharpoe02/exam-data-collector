import { cn } from "@/lib/utils";
import { IExamType, ISection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateCustomer } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/schemas";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import dayjs from "dayjs";

const FormPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prometric_id: "",
      password: "",
      name: "",
      dob: undefined,
      exam_type: "",
      section: null,
      month: "",
      date: undefined,
    },
  });

  const _exam_type = form.watch("exam_type");
  const createCustomerMutation = useCreateCustomer();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      prometric_id: values.prometric_id,
      password: values.password,
      name: values.name,
      dob: dayjs(values.dob).format("YYYY-MM-DD"),
      exam_type: values.exam_type,
      section: !_exam_type.includes("Kaigo / Nursing")
        ? (values.section = null)
        : values.section,
      date: dayjs(values.date).date().toString(),
      month: values.month,
      role: "user",
    };

    console.log("Submit value", payload);
    createCustomerMutation.mutate(payload);
  };

  const examTypes: IExamType[] = [
    { id: 1, name: "Japan Foundation Test for Basic Japanese(JFT-Basic)" },
    {
      id: 2,
      name: "Kaigo / Nursing care Japanese language evaluation test",
    },
    { id: 3, name: "Food service industry Specified Skilled Worker (i) test" },
  ];
  const sections: ISection[] = [
    { id: 1, name: "JP" },
    { id: 3, name: "MM" },
  ];
  const availableMonths: string[] = ["Jan", "Nov", "March"];
  const availableDates: string[] = ["01", "02", "03", "23", "28"];

  return (
    <div className="p-5 md:max-w-lg">
      <div className="my-5 flex justify-center flex-col text-center items-center">
        <h3 className="text-xl md:text-2xl font-semibold">
          Prometric Examination Form
        </h3>
        <p className="max-w-sm text-sm md:text-md text-zinc-500 mt-2">
          We offer comprehensive services to help you confidently prepare for
          and ace your Japanese language exam
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Prometric Id */}
          <FormField
            control={form.control}
            name="prometric_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prometric ID</FormLabel>
                <FormControl>
                  <Input placeholder="JP1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Examer Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="James" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select prefer date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      hideCaptionLabel
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Exam Type */}
          <FormField
            control={form.control}
            name="exam_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes?.map((val) => (
                        <SelectItem key={val.id} value={val.name}>
                          {val.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Section */}
          {_exam_type.includes("Kaigo / Nursing") && (
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sections </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      className="flex flex-col space-y-1">
                      {sections.map((val) => (
                        <FormItem
                          key={val.id}
                          className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={val.name} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {val.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Available Months */}
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Months</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMonths?.map((val, i) => (
                        <SelectItem key={i} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Available Dates */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Available Dates</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select prefer date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const dayString = date
                          .getDate()
                          .toString()
                          .padStart(2, "0"); // Format date as DD
                        return !availableDates.includes(dayString); // Check for availability
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={createCustomerMutation.isPending}>
            {createCustomerMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormPage;
