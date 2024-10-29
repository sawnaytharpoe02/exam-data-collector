import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinBottomIcon } from "@radix-ui/react-icons";
import * as XLSX from "xlsx";

interface ExcelExportButtonProps {
  exams: any[];
}

const ExcelExportButton = ({ exams }: ExcelExportButtonProps) => {
  const handleExcelExport = (examType: string) => {
    console.log("clicked");
    const workbook = XLSX.utils.book_new();

    if (examType.includes("JFT")) {
      const data = exams.filter((exam) => exam.exam_type.includes("JFT"));
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, ws, "Kaigo");
    } else if (examType.includes("KAIGO/NURSING")) {
      const data = exams.filter((exam) =>
        exam.exam_type.includes("KAIGO/NURSING")
      );
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, ws, "Nursing");
    } else if (examType.includes("JFT")) {
      const data = exams.filter((exam) => exam.exam_type.includes("JFT"));
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, ws, "JFT");
    } else {
      const ws = XLSX.utils.json_to_sheet(exams);
      XLSX.utils.book_append_sheet(workbook, ws, "Customers");
    }

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam-data-${examType}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const examTypes = ["ALL", "JFT", "KAIGO/NURSING", "JFT/ADULT"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <PinBottomIcon className="mr-2" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Exam Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {examTypes.map((exam, index) => (
          <DropdownMenuItem key={index} onClick={() => handleExcelExport(exam)}>
            {exam.toLocaleUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExcelExportButton;
