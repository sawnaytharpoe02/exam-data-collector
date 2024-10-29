import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useExams } from "@/services/queries";
import { IResExams } from "@/types";
import { useState } from "react";

const monthsList = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

const GenerateFormPage = () => {
  const [selectedExam, setSelectedExam] = useState<string>();
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);

  const { data: exams } = useExams();

  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((n) => n !== date) : [...prev, date]
    );
  };

  const handleGenerate = () => {
    const payload = {
      exam_type: selectedExam,
      months: selectedMonths,
      dates: selectedDates,
    };

    console.log(payload);
  };

  console.log("exam lists", exams);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Generate months and dates</h1>

      <div className="max-w-2xl flex flex-col gap-4 items-start">
        <div>
          <Label htmlFor="months">Exam Type</Label>
          <Select
            onValueChange={(value) => setSelectedExam(value)}
            value={selectedExam}>
            <SelectTrigger className="w-[300px] md:w-[350px] mt-3">
              <SelectValue placeholder="Select Exam Type" />
            </SelectTrigger>
            <SelectContent className="w-[300px] md:w-[350px]">
              {exams?.map((exam: IResExams) => (
                <SelectItem key={exam._id} value={exam._id}>
                  {exam.exam_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exam Available Months */}
        <div>
          <Label htmlFor="months">Months</Label>
          <MultiSelect
            id="months"
            options={monthsList}
            onValueChange={setSelectedMonths}
            defaultValue={selectedMonths}
            placeholder="Select Available Months"
            variant="inverted"
            maxCount={3}
            className="w-[300px] md:w-[350px] mt-3"
          />
        </div>
        {/* End Exam Available Months */}

        {/* Exam Available Date */}
        <div className="max-w-fit">
          <Label htmlFor="dates">Dates</Label>
          <div className="grid grid-cols-7 gap-3 mt-3">
            {[...Array(31)].map((_, index) => {
              const date = index + 1;
              const isSelected = selectedDates.includes(date.toString());
              return (
                <button
                  key={date}
                  onClick={() => toggleDate(date.toString())}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    "focus:outline-none",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  )}
                  aria-pressed={isSelected}>
                  {date}
                </button>
              );
            })}
          </div>
        </div>
        {/* End Exam Available Date */}

        <Button type="submit" onClick={handleGenerate} className="mt-4">
          Generate
        </Button>
      </div>
    </div>
  );
};

export default GenerateFormPage;
