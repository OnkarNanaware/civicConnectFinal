"use client";

import Link from "next/link";
import Image from "next/image";
import logo2 from "../../public/img/logo2.png";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState();

  const navigation = ["Home", "Complaints", "Nagar Sevak", "Water", "Electricity", "About Us", "Contact"];

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setUsername(localStorage.getItem("name").split(" ")[0]);
    }
  }, []);
  return (
    <div>
      <nav className="container relative flex flex-wrap items-center justify-between p-5 mx-auto lg:justify-between ">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/superadmin">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src={logo2}
                        alt="जनहित Connect"
                        width={90}
                        height={90}
                      />
                    </span>
                    <span>जनहित Connect</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={
                          item === "Home" ? "/superadmin" : 
                          item === "About Us" ? "/about-us" :
                          item === "Contact" ? "/contact" :
                          `/superadmin/${item.toLowerCase().replace(" ", "-")}`
                        }
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {item}
                      </Link>
                    ))}
                  </>
                  <div className="flex flex-col mt-4 border-t pt-4">
                    <p className="text-gray-900 dark:text-white mb-4">Welcome {username}!</p>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("name");
                        localStorage.removeItem("role");
                        router.push("/");
                      }}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Logout
                    </button>
                  </div>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={
                    menu === "Home" ? "/superadmin" : 
                    menu === "About Us" ? "/about-us" :
                    menu === "Contact" ? "/contact" :
                    `/superadmin/${menu.toLowerCase().replace(" ", "-")}`
                  }
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-2 lg:flex nav__item items-center whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <p className="text-gray-900 dark:text-white text-sm">Welcome {username}!</p>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("name");
                localStorage.removeItem("role");
                router.push("/");
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
