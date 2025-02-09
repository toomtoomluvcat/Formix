"use client";

import React, { useEffect, useState } from "react";
import NavBarInForm from "../../component/nav";
import Link from "next/link";

function Preview() {
  const [questions, setQuestions] = useState<
    {
      id: number;
      title: string;
      type: string;
      required: boolean;
      options?: Array<{ labelChoice: string; limitAns: number | null }> | null;
    }[]
  >([
    {
      id: 1,
      title: "What is your favorite color?",
      type: "text",
      required: true,
    },
    {
      id: 2,
      title: "Select your hobbies",
      type: "check",
      required: false,
      options: [
        { labelChoice: "Reading", limitAns: null },
        { labelChoice: "Traveling", limitAns: null },
        { labelChoice: "Cooking", limitAns: null },
        { labelChoice: "Gaming", limitAns: null },
        { labelChoice: "Photography", limitAns: null },
      ],
    },
    {
      id: 3,
      title: "How old are you?",
      type: "number",
      required: true,
    },
    {
      id: 4,
      title: "Select your favorite fruit",
      type: "dropdown",
      required: false,
      options: [
        { labelChoice: "Apple", limitAns: null },
        { labelChoice: "Banana", limitAns: null },
        { labelChoice: "Orange", limitAns: null },
        { labelChoice: "Grapes", limitAns: null },
        { labelChoice: "Pineapple", limitAns: null },
      ],
    },
    {
      id: 5,
      title: "Choose your favorite pets",
      type: "radio",
      required: true,
      options: [
        { labelChoice: "Dog", limitAns: 1 },
        { labelChoice: "Cat", limitAns: 1 },
        { labelChoice: "Rabbit", limitAns: 1 },
        { labelChoice: "Hamster", limitAns: 1 },
        { labelChoice: "Bird", limitAns: 1 },
      ],
    },
    {
      id: 6,
      title: "What is your preferred mode of transport?",
      type: "dropdown",
      required: false,
      options: [
        { labelChoice: "Car", limitAns: null },
        { labelChoice: "Bicycle", limitAns: null },
        { labelChoice: "Bus", limitAns: null },
        { labelChoice: "Train", limitAns: null },
        { labelChoice: "Walk", limitAns: null },
      ],
    },
    {
      id: 7,
      title: "Which programming languages do you know?",
      type: "check",
      required: true,
      options: [
        { labelChoice: "JavaScript", limitAns: null },
        { labelChoice: "Python", limitAns: null },
        { labelChoice: "Java", limitAns: null },
        { labelChoice: "C++", limitAns: null },
        { labelChoice: "Go", limitAns: null },
      ],
    },
    {
      id: 8,
      title: "Rate your experience with our service",
      type: "number",
      required: true,
    },
    {
      id: 9,
      title: "Do you like our website design?",
      type: "radio",
      required: true,
      options: [
        { labelChoice: "Yes", limitAns: 1 },
        { labelChoice: "No", limitAns: 1 },
      ],
    },
    {
      id: 10,
      title: "What kind of movies do you prefer?",
      type: "radio",
      required: false,
      options: [
        { labelChoice: "Action", limitAns: null },
        { labelChoice: "Comedy", limitAns: null },
        { labelChoice: "Drama", limitAns: null },
        { labelChoice: "Horror", limitAns: null },
        { labelChoice: "Romance", limitAns: null },
        { labelChoice: "Sci-Fi", limitAns: null },
      ],
    },
    {
      id: 11,
      title: "What is your full name?",
      type: "text",
      required: true,
    },
    {
      id: 12,
      title: "What is your email address?",
      type: "text",
      required: true,
    },
    {
      id: 13,
      title: "Would you like to receive our newsletter?",
      type: "radio",
      required: false,
      options: [
        { labelChoice: "Yes, please", limitAns: 1 },
        { labelChoice: "No, thanks", limitAns: 1 },
      ],
    },
    {
      id: 14,
      title: "Select the countries you have visited",
      type: "check",
      required: false,
      options: [
        { labelChoice: "USA", limitAns: null },
        { labelChoice: "France", limitAns: null },
        { labelChoice: "Japan", limitAns: null },
        { labelChoice: "Italy", limitAns: null },
        { labelChoice: "Thailand", limitAns: null },
        { labelChoice: "India", limitAns: null },
      ],
    },
    {
      id: 15,
      title: "How satisfied are you with our product?",
      type: "number",
      required: true,
    },
  ]);
  const [dropdown, setDropdown] = useState<{ show: boolean }[]>();

  const createDropdown = (): void => {
    const dropdownQuestions = questions.filter(
      (item) => item.type === "dropdown"
    );
    setDropdown(dropdownQuestions.map(() => ({ show: false })));
  };

  const showDropdown = (indexDropdown: number) => {
    setDropdown((prev) =>
      prev?.map((item, index) =>
        indexDropdown === index ? { ...item, show: true } : item
      )
    );
  };
  useEffect(() => createDropdown, []);
  return (
    <div className="relative">
      <div className=" bg-black text-white py-1 text-center text-[10px]">This is the preview of your form. <Link className="underline font-medium" href="/form"> Back to form</Link></div>
      <NavBarInForm></NavBarInForm>
      <div className="mt-12 max-w-[650px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[30px] font-medium text-center">Form Name</h1>
          <p className="mt-4 text-center text-[#c4c4c4]">
            enter description here
          </p>
        </div>
        <div>
          {questions.map((item) => (
            <div
              key={item.id}
              style={{
                filter: "drop-shadow(6px 3px 0px rgb(0, 0, 0)) ",
              }}
              className="mx-[15px] mb-4 border-[2.5px] bg-white py-6 px-6 border-black rounded-[12px]"
            >
              <span>{item.title}</span>
              {item.required && <span className="ml-1 text-red-400">*</span>}
              {item.type === "text" && (
                <div className="mt-2 mr-[30%]">
                  <input
                    disabled={true}
                    type="text"
                    className="border-b-2 focus:border-black w-full 
      focus:border-solid focus:text-start focus:outline-none"
                  ></input>
                </div>
              )}
              {item.type === "number" && (
                <div className="mt-2 mr-[30%]">
                  <input
                    disabled={true}
                    type="number"
                    className="border-b-2 focus:border-black w-full 
      focus:border-solid focus:text-start focus:outline-none"
                  ></input>
                </div>
              )}

              {item.type === "check" && (
                <div className="mt-4">
                  {item.options?.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          disabled={true}
                          className="peer h-5 w-5 cursor-pointer transition-all checked:bg-[#ababab]  checked:border-[#ababab] appearance-none rounded border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                          id="check"
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-2  text-sm">{option.labelChoice}</p>
                    </div>
                  ))}
                </div>
              )}
              {item.type === "radio" && (
                <div className="mt-4">
                  {item.options?.map((option, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-2">
                        <input
                          disabled
                          id="disabled-radio-1"
                          type="radio"
                          value=""
                          name="disabled-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="disabled-radio-1"
                          className="ms-2 text-sm "
                        >
                          {option.labelChoice}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.type === "dropdown" && (
                <div className="relative mt-4 max-w-[100px]">
                  <div className="flex justify-center border-2 rounded-lg py-[4px]">   
                    <h2 className=" text-[#666666] ">
                      option
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#666666"
                    >
                      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;
