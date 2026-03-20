"use client";

import Link from "next/link";
import Image from "next/image";
import logo2 from "../../public/img/logo2.png";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { Description } from "@headlessui/react/dist/components/description/description";

const Complaint = ({
  title,
  description,
  raisedBy,
  ministry,
  date,
  status,
}) => {
  const router = useRouter();
  const [username, setUsername] = useState();

  // constaints name and link
  const navigation = [
    "Home",
    "Complaints",
    "Services",
    "About Us",
    "Contact Us",
  ];

  useEffect(() => {
    setUsername(localStorage.getItem("name").split(" ")[0]);
  }, []);
  return (
    <div className="p-10 pb-2">
      <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-xl bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800">
          <li className="me-2">
            <p
              id="about-tab"
              aria-selected="true"
              className="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 font-extrabold"
            >
              {date}
            </p>
          </li>

          <li className="me-2">
            <p
              id="services-tab"
              className="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 font-extrabold"
            >
              {ministry}
            </p>
          </li>
          <li className="me-2">
            <p
              id="statistics-tab"
              className="inline-block p-4 text-red-500 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 b-3 font-extrabold"
            >
              Status : {status}
            </p>
          </li>
        </ul>

        <div id="defaultTabCo ntent">
          <div
            className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">{description}</p>
            <div className="flex justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
                <h2 className="text-blue-700 font-bold">250 Upvotes</h2>
              </div>

              <div>
                <h2
                  id="services-tab"
                  className="inline-block p-4 text-blue-600 rounded-ss-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500 font-bold"
                >
                  {raisedBy}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
