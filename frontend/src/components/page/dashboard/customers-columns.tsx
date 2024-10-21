import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Customer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import {
  ArrowUpDown,
  CheckCircle,
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

const statusBadgeMapping = {
  open: {
    text: "Open",
    icon: Circle,
    classNames: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  inProgress: {
    text: "In Progress",
    icon: Clock,
    classNames: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  done: {
    text: "Done",
    icon: CheckCircle,
    classNames: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  doubleChecked: {
    text: "Checked",
    icon: CheckCircle2,
    classNames: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
  failed: {
    text: "Failed",
    icon: XCircle,
    classNames: "bg-red-100 text-red-800 hover:bg-red-200",
  },
};

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dob
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "prometric_id",
    header: "Prometric Id",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "exam_type",
    header: "Exam Type",
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) =>
      row.getValue("section") === null ? "N/A" : row.getValue("section"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") || null;
      const badgeInfo =
        statusBadgeMapping[status as keyof typeof statusBadgeMapping] || null;

      if (!badgeInfo) {
        return null;
      }

      const IconComponent = badgeInfo.icon;
      return (
        <Badge
          variant="secondary"
          className={cn(badgeInfo.classNames, "rounded-full")}>
          <IconComponent
            className={clsx("w-4 h-4 mr-1", {
              "fill-current": badgeInfo.text === "Open",
            })}
          />
          {badgeInfo.text}
        </Badge>
      );
    },
  },
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
