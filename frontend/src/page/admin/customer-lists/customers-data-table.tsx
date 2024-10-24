import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomerStore } from "@/store/customerStore";
import { PinBottomIcon, TrashIcon } from "@radix-ui/react-icons";
import CustomersTableToolbar from "./customers-table-toolbar";
import { CustomersTableViewOptions } from "./customers-table-view-options";

interface CustomerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CustomerDataTable<TData, TValue>({
  columns,
  data,
}: CustomerDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { selectedCustomerIds } = useCustomerStore();
  console.log("stored selected customer ids", selectedCustomerIds);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
  });

  return (
    <>
      {/* Data Table Navigation Filtering and Searching */}
      <div className="flex lg:items-center flex-col lg:flex-row justify-between mb-4 gap-2">
        <CustomersTableToolbar table={table} />
        <div className="space-x-2 flex items-center">
          {/* Toggle table col view */}
          <CustomersTableViewOptions table={table} />

          {/* Delete customers row */}
          <Button
            variant={"destructive"}
            disabled={selectedCustomerIds.length === 0}
            size={"sm"}>
            <TrashIcon className="mr-2" /> Delete
          </Button>

          {/* Export csv file for customers data  */}
          <Button variant={"outline"} size={"sm"}>
            <PinBottomIcon className="mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Show Customers Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Select Count and Pagination Section */}
      <div className="my-5">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </>
  );
}
