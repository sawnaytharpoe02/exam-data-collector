import { Customer } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./customers-columns";
import { CustomerDataTable } from "./customers-data-table";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "johndoe",
      dob: "1990-04-23",
      prometric_id: "JP123456",
      password: "password123",
      exam_type: "GRE",
      section: null,
      status: "inProgress",
      month: "2024-10",
      date: "2024-10-01",
    },
    {
      id: "2",
      name: "janedoe",
      dob: "1992-11-15",
      prometric_id: "JP123456",
      password: "janedoe2023",
      exam_type: "TOEFL",
      section: null,
      status: "inProgress",
      month: "2024-09",
      date: "2024-09-15",
    },
    {
      id: "3",
      name: "michaelsmith",
      dob: "1988-05-10",
      prometric_id: "JP123456",
      password: "mikeSecure!88",
      exam_type: "SAT",
      section: null,
      status: "doubleChecked",
      month: "2024-11",
      date: "2024-11-08",
    },
    {
      id: "4",
      name: "annawatson",
      dob: "1995-12-05",
      prometric_id: "JP123456",
      password: "annaPassword1",
      exam_type: "IELTS",
      section: "JP",
      status: "failed",
      month: "2024-08",
      date: "2024-08-22",
    },
    {
      id: "5",
      name: "petergreen",
      dob: "1980-02-20",
      prometric_id: "JP123456",
      password: "peterRockstar80",
      exam_type: "GMAT",
      section: null,
      status: "open",
      month: "2024-07",
      date: "2024-07-17",
    },
    {
      id: "6",
      name: "emilybrown",
      dob: "1998-06-12",
      prometric_id: "JP65432",
      password: "emilySecure@99",
      exam_type: "ACT",
      section: "MM",
      status: "open",
      month: "2024-06",
      date: "2024-06-30",
    },
    {
      id: "7",
      name: "chrisjohnson",
      dob: "1985-10-18",
      prometric_id: "JP65432",
      password: "chrisPass#123",
      exam_type: "MCAT",
      section: null,
      status: "inProgress",
      month: "2024-12",
      date: "2024-12-05",
    },
    {
      id: "8",
      name: "samanthalee",
      dob: "1993-09-07",
      prometric_id: "JP65432",
      password: "samleePass123",
      exam_type: "LSAT",
      section: null,
      status: "failed",
      month: "2024-05",
      date: "2024-05-14",
    },
    {
      id: "9",
      name: "tomwilliams",
      dob: "1997-03-28",
      prometric_id: "JP65432",
      password: "tomWilliams98",
      exam_type: "OET",
      section: "JP",
      status: "doubleChecked",
      month: "2024-04",
      date: "2024-04-19",
    },
    {
      id: "10",
      name: "aliceroberts",
      dob: "1991-08-01",
      prometric_id: "JP65432",
      password: "aliceSecure$1",
      exam_type: "PTE",
      section: null,
      status: "done",
      month: "2024-03",
      date: "2024-03-12",
    },
  ];
}

const CustomerListsPage = () => {
  const [data, setData] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-1 lg:p-4">
      <CustomerDataTable columns={columns} data={data} />
    </div>
  );
};

export default CustomerListsPage;
