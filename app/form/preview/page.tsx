"use client";

import React, { useEffect, useState } from "react";
import NavBarInForm from "../../component/nav";
import Link from "next/link";

function Preview() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [questions, setQuestions] = useState<
    | {
        id: number;
        title: string;
        type: string;
        required: boolean;
        options?: Array<{ labelChoice: string; limitAns: number | null }>;
      }[]
    | null
  >(null);
  const [dropdown, setDropdown] = useState<{ show: boolean }[]>();
  useEffect(() => {
    const localData = localStorage.getItem("formQuestions");
    const localTitle = localData ? JSON.parse(localData).title : null;
    
    const localQuestion = localData ? JSON.parse(localData).questions : null;
    const localDescription = localData
      ? JSON.parse(localData).description
      : null;

    setTitle(localTitle)
    setDescription(localDescription)
    setQuestions(localQuestion)
  }, []);
  const createDropdown = (): void => {
    const dropdownQuestions = questions?.filter(
      (item) => item.type === "dropdown"
    );
    setDropdown(dropdownQuestions?.map(() => ({ show: false })));
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
      <div className=" bg-black text-white py-1 text-center text-[10px]">
        This is the preview of your form.{" "}
        <Link className="underline font-medium" href="/form">
          {" "}
          Back to form
        </Link>
      </div>
      <NavBarInForm></NavBarInForm>
      <div className="mt-12 max-w-[650px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[30px] font-medium text-center">{title}</h1>
          <p className="mt-4 text-center text-[#c4c4c4]">
            {description}
          </p>
        </div>
        <div>
          {questions?.map((item) => (
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
                    <h2 className=" text-[#666666] ">option</h2>
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
