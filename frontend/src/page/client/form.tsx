import { cn } from '@/lib/utils';
import { ISection } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QUERY_KEY } from '@/constants/data';
import { formSchema } from '@/schemas';
import { fetchAvailableExams } from '@/services/features/available-exams/available-exams.api';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';

const FormPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prometric_id: '',
      prometric_password: '',
      name: '',
      email: '',
      dob: undefined,
      exam_type: '',
      section: null,
      month: '',
      date: undefined,
    },
  });
  const _exam_type = form.watch('exam_type');
  const _ava_month = form.watch('month');

  const { data } = useQuery({
    queryKey: [QUERY_KEY.AVAILABLE_EXAMS],
    queryFn: fetchAvailableExams,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      prometric_id: values.prometric_id,
      prometric_password: values.prometric_password,
      name: values.name,
      email: values.email,
      dob: dayjs(values.dob).format('YYYY-MM-DD'),
      exam_type: values.exam_type,
      section: !_exam_type.includes('Kaigo / Nursing')
        ? (values.section = null)
        : values.section,
      date: dayjs(values.date).date().toString(),
      month: values.month,
    };

    console.log('Submit value', payload);
    // createCustomerMutation.mutate(payload);
  };

  const sections: ISection[] = [
    { id: 1, name: 'JP' },
    { id: 3, name: 'MM' },
  ];

  const availableExams = data?.map((data) => data.exam_type);
  const availableMonths = data
    ?.filter((v: any) => v.exam_type._id === _exam_type)
    .map((c) => c.months);
  const availableDates = data
    ?.filter((v: any) => v.exam_type._id === _exam_type)
    .map((c) => c.dates);
  const flattenedAvailableMonths = availableMonths?.flatMap(
    (months) => months || []
  );
  const flattenedAvailableDates = availableDates?.flatMap(
    (dates) => dates || []
  );

  console.log('flat map', flattenedAvailableDates);

  console.log('flat month', flattenedAvailableMonths);
  console.log('ava date', availableDates);

  const isDateDisabled = useCallback(
    (date: Date) => {
      const dayString = date.getDate().toString().padStart(1, '0'); // Format date as 'D' or 'DD'
      return !flattenedAvailableDates?.includes(dayString); // Check availability
    },
    [flattenedAvailableDates]
  );

  useEffect(() => {
    form.setValue('month', '');
  }, [_exam_type]);

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
            name="prometric_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prometric Password</FormLabel>
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

          {/* Examer Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="james@gmail.com" {...field} />
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
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(field.value, 'PPP')
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

          <div>
            <ul className="list-disc text-sm pl-5 space-y-2 text-red-500">
              <li>First, please choose an available exam type.</li>
              <li>Then, you will see the months you need to choose from.</li>
              <li>Finally, select the date you prefer.</li>
            </ul>
          </div>

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
                      {availableExams?.map((v: any) => (
                        <SelectItem key={v._id} value={v._id}>
                          {v.exam_type}
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
          {_exam_type.includes('Kaigo / Nursing') && (
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sections </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value || ''}
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
          {availableMonths?.length !== 0 && (
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
                        {flattenedAvailableMonths?.map((month, i) => (
                          <SelectItem key={i} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Available Dates */}
          {_ava_month && (
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
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Select prefer date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        key={Math.random() * Date.now()}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isDateDisabled}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">
            {/* {createCustomerMutation.isPending ? "Submitting..." : "Submit"} */}
            submit
          </Button>
        </form>
      </Form>
    </div>
    // <div>form page</div>
  );
};

export default FormPage;
