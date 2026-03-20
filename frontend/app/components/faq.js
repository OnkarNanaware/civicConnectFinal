"use client";

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What is the procedure to file a complaint?",
    answer: "Create a account and then in the complaint section add complaint.",
  },
  {
    question: "Is this a authentic government platform?",
    answer: "Yes, this ia an official platform by government of india .",
  },
  {
    question: "How will the water timmings and electricity cutoffs conveyed? ",
    answer:
      "The water timmings and electricity cutoffs will be conveyed through the app and also through  SMS onregistered mobile number.",
  },
  {
    question: "The complaints will be conveyed to Nagarsevak, right? ",
    answer:
      "Yes, the complaints will be conveyed to Nagarsevak and also to the concerned department.",
  },
];

export default Faq;
