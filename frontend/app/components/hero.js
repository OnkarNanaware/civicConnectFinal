"use client";
import Image from "next/image";
import Container from "./container";

import heroImg from "../public/img/hero.jpg";
import finance from "../public/img/Ministry/finance.png";
import health from "../public/img/Ministry/health.png";
import education from "../public/img/Ministry/education.png";
import home from "../public/img/Ministry/home.png";
import railway from "../public/img/Ministry/railway.png";
import water from "../public/img/Ministry/water.png";
import road from "../public/img/Ministry/road.png";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  useEffect(() => {
    const uname = localStorage.getItem("username");
    console.log(uname);
    if (uname !== undefined) {
      setUsername(() => uname);
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function handleRegisterComplaint() {
    const username = localStorage.getItem("username");

    console.log(isLoggedIn, username, "adashgdjgasjdgjasgdj");
    if (isLoggedIn) {
      router.push("/raise-complaint");
    } else {
      router.push("/login");
    }
  }
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              हर समस्या का हल, जनहित कनेक्ट के साथ आओ, मिलकर बदले ज़िंदगी!
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Janhit helps to connect the peoples problems with the responsible
              department.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                onClick={handleRegisterComplaint}
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
              >
                Register complaint
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Monitored by <span className="text-indigo-600">all</span> Ministries
            of government of India
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Image
                src={finance}
                width="200"
                height="100"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <Image
                src={education}
                width="200"
                height="100"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
            <div className="text-gray-400 dark:text-gray-400">
              <Image
                src={health}
                width="200"
                height="100"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
            <div className="pt-1 text-gray-400 dark:text-gray-400">
              <Image
                src={road}
                width="200"
                height="100"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Image
                src={water}
                width="200"
                height="100"
                className={"object-cover"}
                alt="Hero Illustration"
                loading="eager"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
