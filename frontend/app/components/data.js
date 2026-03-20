"use client";
import logo2 from "../public/img/logo2.png";
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  DocumentIcon,
  BanknotesIcon,
  EyeDropperIcon,
  BookmarkIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

import sarkar from "../public/img/Banner.jpg";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Services provided",
  desc: "जनहित connects as the name suggest provides a platform to connect the peoples problem with the responsible department. It is a platform where you can register your complaint and a quick action will be taken by the responsible department.",
  image: sarkar,
  bullets: [
    {
      title: "Complaint Box",
      desc: "where you can register your complaint and get a quick action.",
      icon: <CogIcon />,
    },
    {
      title: "Water dispersion",
      desc: "At which time water will be dispersed in your area.",
      icon: <CogIcon />,
    },
    {
      title: "Electricity cutoffs",
      desc: "At which time electricity will be cut off in your area.",
      icon: <CogIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
