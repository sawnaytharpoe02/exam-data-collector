import { Input } from "@/components/ui/input";
import { statuses } from "@/constants/data";
import { Table } from "@tanstack/react-table";
import { CustomersTableFacetedFilter } from "./customers-table-faceted-filter";

interface CustomersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function CustomersTableToolbar<TData>({
  table,
}: CustomersTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter customers..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <CustomersTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
      </div>
    </div>
  );
}

export default CustomersTableToolbar;
