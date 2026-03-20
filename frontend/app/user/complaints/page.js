"use client";
import Navbar from "@/app/components/user/navbar";
import React, { useState } from "react";
import Link from "next/link";
import Complaint from "../../components/user/complaint.js";
import { useEffect } from "react";
export default function Page() {
  const [complaints, setComplaints] = useState();
  useEffect(() => {
    getComplaints();
  }, []);
  const getComplaints = async () => {
    const response = await fetch("/api/complaint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data.complaints);
    setComplaints(() => data.complaints);
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-8  flex">
        <div>
          <div className="flex space-x-4">
            <button className="text-black px-4 py-2 rounded-lg">
              Filters:{" "}
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              All
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              New
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-300">
              Top
            </button>
          </div>
        </div>
        <div className="grow">
          <div className="flex flex-row-reverse">
            <Link
              href="/user/raise-complaint"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Raise a Complaint
            </Link>
          </div>
        </div>
      </div>
      {complaints
        ? complaints.map((complaint) => (
            <Complaint
              title={complaint.summary}
              description={complaint.complaint}
              raisedBy={complaint.raisedby}
              ministry={complaint.category}
              status={complaint.status}
              date={complaint.date}
            />
          ))
        : null}
    </div>
  );
}
