import { TCustomer } from "@/types";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { columns } from "./customers-columns";
import { CustomerDataTable } from "./customers-data-table";

async function getCustomersData(): Promise<TCustomer[]> {
  // Fetch data from your API here.
  const users = [];
  const count = 100;

  for (let i = 1; i <= count; i++) {
    const user = {
      _id: i.toString(),
      name: faker.person.firstName().toLowerCase(),
      dob: faker.date.birthdate().toISOString().split("T")[0], // formatted as YYYY-MM-DD
      prometric_id: `JP${faker.number.int({ min: 100000, max: 999999 })}`,
      prometric_password: faker.number.int({ min: 100000, max: 999999 }).toString(),
      email: faker.internet.email(),
      exam_type: faker.helpers.arrayElement(["FOOD", "KAIGO", "JFT"]),
      section: null,
      status: faker.helpers.arrayElement([
        "in progress",
        "done",
        "failed",
        "double checked",
        "open",
      ]),
      month: faker.date.month({ abbreviated: true }).toString(),
      date: faker.number.int({ min: 1, max: 31 }).toString(),
    };
    users.push(user);
  }

  return users;
}

const CustomerListsPage = () => {
  const [data, setData] = useState<TCustomer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomersData();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-1 lg:px-4">
      <CustomerDataTable columns={columns} data={data} />
    </div>
  );
};

export default CustomerListsPage;
