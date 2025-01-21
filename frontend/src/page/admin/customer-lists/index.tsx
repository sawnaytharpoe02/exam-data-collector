import { useCustomers } from '@/services/features/customers/customer.queries';
// import { faker } from "@faker-js/faker";
import { CustomersTable } from './customers-table';
import { CustomersTableColumns } from './customers-table-columns';

const CustomerListsPage = () => {
  const { data: customers } = useCustomers();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers service lists</h1>
      <CustomersTable columns={CustomersTableColumns} data={customers || []} />
    </div>
  );
};

export default CustomerListsPage;
