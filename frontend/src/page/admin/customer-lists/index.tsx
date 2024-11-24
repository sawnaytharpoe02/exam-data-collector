import { useCustomers } from "@/services/features/customers/customer.queries";
// import { faker } from "@faker-js/faker";
import { CustomersTable } from "./customers-table";
import { CustomersTableColumns } from "./customers-table-columns";

// async function getCustomersData(): Promise<TCustomer[]> {
//   const users = [];
//   const count = 100;

//   for (let i = 1; i <= count; i++) {
//     const user = {
//       _id: i.toString(),
//       name: faker.person.firstName().toLowerCase(),
//       dob: faker.date.birthdate().toISOString().split("T")[0], // formatted as YYYY-MM-DD
//       prometric_id: `JP${faker.number.int({ min: 100000, max: 999999 })}`,
//       prometric_password: faker.number
//         .int({ min: 100000, max: 999999 })
//         .toString(),
//       email: faker.internet.email(),
//       exam_type: faker.helpers.arrayElement(["FOOD", "KAIGO/NURSING", "JFT"]),
//       section: faker.helpers.arrayElement([null, "JP", "MM"]),
//       status: faker.helpers.arrayElement([
//         "in progress",
//         "done",
//         "failed",
//         "double checked",
//         "open",
//       ]),
//       month: faker.date.month({ abbreviated: true }).toString(),
//       date: faker.number.int({ min: 1, max: 31 }).toString(),
//     };
//     users.push(user);
//   }

//   return users;
// }

const CustomerListsPage = () => {
  // const [data, setData] = useState<TCustomer[]>([]);
  const { data: customers } = useCustomers();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getCustomersData();
  //     setData(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers service lists</h1>
      <CustomersTable columns={CustomersTableColumns} data={customers || []} />
    </div>
  );
};

export default CustomerListsPage;
