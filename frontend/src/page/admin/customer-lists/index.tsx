import { TCustomer } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./customers-columns";
import { CustomerDataTable } from "./customers-data-table";

async function getCustomersData(): Promise<TCustomer[]> {
  // Fetch data from your API here.
  return [
    {
      _id: "1",
      name: "johndoe",
      dob: "1990-04-23",
      prometric_id: "JP123456",
      prometric_password: "prometric_password123",
      email: "james@gmail.com",
      exam_type: "GRE",
      section: null,
      status: "in progress",
      month: "Oct",
      date: "34",
    },
    {
      _id: "2",
      name: "janedoe",
      dob: "1992-11-15",
      prometric_id: "JP123456",
      prometric_password: "janedoe2023",
      email: "james@gmail.com",
      exam_type: "TOEFL",
      section: null,
      status: "in progress",
      month: "Sep",
      date: "34",
    },
    {
      _id: "3",
      name: "michaelsmith",
      dob: "1988-05-10",
      prometric_id: "JP123456",
      prometric_password: "mikeSecure!88",
      email: "james@gmail.com",
      exam_type: "SAT",
      section: null,
      status: "double checked",
      month: "Nov",
      date: "38",
    },
    {
      _id: "4",
      name: "annawatson",
      dob: "1995-12-05",
      prometric_id: "JP123456",
      prometric_password: "annaprometric_password1",
      email: "james@gmail.com",
      exam_type: "IELTS",
      section: "JP",
      status: "failed",
      month: "Aug",
      date: "42",
    },
    {
      _id: "5",
      name: "petergreen",
      dob: "1980-02-20",
      prometric_id: "JP123456",
      prometric_password: "peterRockstar80",
      email: "james@gmail.com",
      exam_type: "GMAT",
      section: null,
      status: "open",
      month: "Jul",
      date: "47",
    },
    {
      _id: "6",
      name: "emilybrown",
      dob: "1998-06-12",
      prometric_id: "JP65432",
      prometric_password: "emilySecure@99",
      email: "james@gmail.com",
      exam_type: "ACT",
      section: "MM",
      status: "open",
      month: "Jun",
      date: "40",
    },
    {
      _id: "7",
      name: "chrisjohnson",
      dob: "1985-10-18",
      prometric_id: "JP65432",
      prometric_password: "chrisPass#123",
      email: "james@gmail.com",
      exam_type: "MCAT",
      section: null,
      status: "in progress",
      month: "Dec",
      date: "35",
    },
    {
      _id: "8",
      name: "samanthalee",
      dob: "1993-09-07",
      prometric_id: "JP65432",
      prometric_password: "samleePass123",
      email: "james@gmail.com",
      exam_type: "LSAT",
      section: null,
      status: "failed",
      month: "May",
      date: "44",
    },
    {
      _id: "9",
      name: "tomwilliams",
      dob: "1997-03-28",
      prometric_id: "JP65432",
      prometric_password: "tomWilliams98",
      email: "james@gmail.com",
      exam_type: "OET",
      section: "JP",
      status: "double checked",
      month: "Apr",
      date: "49",
    },
    {
      _id: "10",
      name: "aliceroberts",
      dob: "1991-08-01",
      prometric_id: "JP65432",
      prometric_password: "aliceSecure$1",
      email: "james@gmail.com",
      exam_type: "PTE",
      section: null,
      status: "done",
      month: "Mar",
      date: "42",
    },
  ];
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
