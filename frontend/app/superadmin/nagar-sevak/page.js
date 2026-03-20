"use client";
import Navbar from "@/app/components/super-admin/navbar";
import { React, useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [nagarSevak, setNagarSevak] = useState([{}]);

  useEffect(() => {
    fetchNagarSevak();
  }, []);

  const fetchNagarSevak = async () => {
    const res = await fetch("http://localhost:3000/api/superadmin/nagar-sevak");
    const data = await res.json();
    setNagarSevak(data);
  };

  // [
  //     {
  //       id: 3,
  //       fullname: 'Sarthak Jadhav',
  //       email: 'sarthak@gmail.com',
  //       pass: 'sarthak',
  //       phone: '8888132593',
  //       state: 'Maharastra',
  //       city: 'Pune',
  //       address: 'Mahatma Phule Ward, Tiklak Chowk',
  //       ward_no: '1',
  //       role: 'corporator'
  //     },
  //     {
  //       id: 5,
  //       fullname: 'as',
  //       email: 'asdsda@gmail.com',
  //       pass: '1234',
  //       phone: '08625032593',
  //       state: 'Maharashtra',
  //       city: 'Washim',
  //       address: 'Chintamani Nagar ',
  //       ward_no: '4',
  //       role: 'corporator'
  //     }
  //   ]

  return (
    <div>
      <Navbar />

      <div className="container mx-auto w-3/4 mb-3 flex">
        <div></div>
        <div className="grow">
          <div className="flex flex-row-reverse">
            <Link
              href="/superadmin/add-nagar-sevak"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add Nagar Sevak
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto w-3/4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Word No.
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nagar Savek
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {nagarSevak.map((nagarSevak, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-6 py-4 text-center font-medium text-gray-900">
                    {nagarSevak.id}
                  </th>
                  <td className="px-6 text-center py-4">{nagarSevak.ward_no}</td>
                  <td className="px-6 py-4 text-center">{nagarSevak.fullname}</td>
                  <td className="px-6 py-4 text-center">{nagarSevak.address}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table to display the list of nagar savak */}
    </div>
  );
}
