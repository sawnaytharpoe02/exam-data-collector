import { Customer } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./customers-columns";
import { CustomerDataTable } from "./customers-data-table";

async function getCustomersData(): Promise<Customer[]> {
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
      status: "in progress",
      month: "Oct",
      date: "34",
    },
    {
      id: "2",
      name: "janedoe",
      dob: "1992-11-15",
      prometric_id: "JP123456",
      password: "janedoe2023",
      exam_type: "TOEFL",
      section: null,
      status: "in progress",
      month: "Sep",
      date: "34",
    },
    {
      id: "3",
      name: "michaelsmith",
      dob: "1988-05-10",
      prometric_id: "JP123456",
      password: "mikeSecure!88",
      exam_type: "SAT",
      section: null,
      status: "double checked",
      month: "Nov",
      date: "38",
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
      month: "Aug",
      date: "42",
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
      month: "Jul",
      date: "47",
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
      month: "Jun",
      date: "40",
    },
    {
      id: "7",
      name: "chrisjohnson",
      dob: "1985-10-18",
      prometric_id: "JP65432",
      password: "chrisPass#123",
      exam_type: "MCAT",
      section: null,
      status: "in progress",
      month: "Dec",
      date: "35",
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
      month: "May",
      date: "44",
    },
    {
      id: "9",
      name: "tomwilliams",
      dob: "1997-03-28",
      prometric_id: "JP65432",
      password: "tomWilliams98",
      exam_type: "OET",
      section: "JP",
      status: "double checked",
      month: "Apr",
      date: "49",
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
      month: "Mar",
      date: "42",
    },
  ];
}

const CustomerListsPage = () => {
  const [data, setData] = useState<Customer[]>([]);

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
