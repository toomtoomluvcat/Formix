"use client";

import React, { useEffect, useState } from "react";
import NavBarInForm from "../../component/nav01";
import Link from "next/link";
import Image from "next/image";

function Preview() {
  const [questions, setQuestions] = useState<
    {
      id: number;
      title: string;
      type: string;
      required: boolean;
      options?: Array<{ label: string; limit: number | null }> | null;
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
        { label: "Reading", limit: null },
        { label: "Traveling", limit: null },
        { label: "Cooking", limit: null },
        { label: "Gaming", limit: null },
        { label: "Photography", limit: null },
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
        { label: "Apple", limit: null },
        { label: "Banana", limit: null },
        { label: "Orange", limit: null },
        { label: "Grapes", limit: null },
        { label: "Pineapple", limit: null },
      ],
    },
    {
      id: 5,
      title: "Choose your favorite pets",
      type: "radio",
      required: true,
      options: [
        { label: "Dog", limit: 1 },
        { label: "Cat", limit: 1 },
        { label: "Rabbit", limit: 1 },
        { label: "Hamster", limit: 1 },
        { label: "Bird", limit: 1 },
      ],
    },
    {
      id: 6,
      title: "What is your preferred mode of transport?",
      type: "dropdown",
      required: false,
      options: [
        { label: "Car", limit: null },
        { label: "Bicycle", limit: null },
        { label: "Bus", limit: null },
        { label: "Train", limit: null },
        { label: "Walk", limit: null },
      ],
    },
    {
      id: 7,
      title: "Which programming languages do you know?",
      type: "check",
      required: true,
      options: [
        { label: "JavaScript", limit: null },
        { label: "Python", limit: null },
        { label: "Java", limit: null },
        { label: "C++", limit: null },
        { label: "Go", limit: null },
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
        { label: "Yes", limit: 1 },
        { label: "No", limit: 1 },
      ],
    },
    {
      id: 10,
      title: "What kind of movies do you prefer?",
      type: "radio",
      required: false,
      options: [
        { label: "Action", limit: null },
        { label: "Comedy", limit: null },
        { label: "Drama", limit: null },
        { label: "Horror", limit: null },
        { label: "Romance", limit: null },
        { label: "Sci-Fi", limit: null },
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
        { label: "Yes, please", limit: 1 },
        { label: "No, thanks", limit: 1 },
      ],
    },
    {
      id: 14,
      title: "Select the countries you have visited",
      type: "check",
      required: false,
      options: [
        { label: "USA", limit: null },
        { label: "France", limit: null },
        { label: "Japan", limit: null },
        { label: "Italy", limit: null },
        { label: "Thailand", limit: null },
        { label: "India", limit: null },
      ],
    },
    {
      id: 15,
      title: "How satisfied are you with our product?",
      type: "number",
      required: true,
    },
  ]);
  
  interface Color {
    color1: string | null;
    color2: string | null;
    color3: string | null;
    color4: string | null;
    color5: string | null;
    color6: string | null;
    color7: string | null;
    color8: string | null;
    color9: string | null;
    color10: string | null;
  }
  const [color, setColor] = useState<Color>({
    color1: "rgb(247, 248, 243)",
    color2: "rgb(48, 34, 68)",
    color3: "rgb(224, 83, 125)",
    color4: "rgb(77, 120, 231)",
    color5: "rgb(106, 165, 218)",
    color6: "rgb(28, 215, 147)",
    color7: "rgb(254, 216, 60)",
    color8: "rgb(255, 147, 86)",
    color9: "rgb(228, 228, 228)",
    color10: "rgb(58, 44, 77)",
  });
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
      <div style={{backgroundColor:color.color2?? ""}} className=" text-white py-1 text-center text-[10px]">
        This is the preview of your form.{" "}
        <Link className="underline font-medium" href="/form01">
          {" "}
          Back to form
        </Link>
      </div>
      <NavBarInForm></NavBarInForm>
      <div className="mt-12 max-w-[650px] mx-auto mb-[60px]">
        <div className="mb-8">
          <h1
            style={{ color: color.color2 ?? "" }}
            className="text-[45px] font-press-gothic font-medium text-center"
          >
            Form Name
          </h1>
          <p className="mt-2 text-center text-[#c4c4c4]">
            enter description here
          </p>
        </div>
        <div>
          {questions.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: color.color2 ?? "" }}
              className="mx-[15px] mb-4  py-6 px-6 rounded-[12px]"
            >
              <p className="font-medium  text-[1.1em] sm:text-[1.6em] font-press-gothic">
                <span
                  style={{
                    transition: "all 0.3s ease",
                    color: "white",
                    WebkitTextStroke: "2px black",
                    paintOrder: "stroke fill",
                    textShadow: "2px 3px 0px rgb(0, 0, 0)",
                  }}
                >
                  {item.title}
                </span>
                {item.required && <span className="ml-1 text-red-400">*</span>}
              </p>
              {item.type === "text" && (
                <div className="mt-2 mr-[30%]">
                  <input
                    disabled={true}
                    type="text"
                    style={{ backgroundColor: color.color10 ?? "" }}
                    className="border-b-2 border-[#666666] focus:border-black w-full 
      focus:border-solid focus:text-start focus:outline-none"
                  ></input>
                </div>
              )}
              {item.type === "number" && (
                <div className="mt-2 mr-[30%]">
                  <input
                    disabled={true}
                    type="number"
                    style={{ backgroundColor: color.color10 ?? "" }}
                    className="border-b-2 border-[#666666] focus:border-black w-full 
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
                          style={{ filter: "drop-shadow(0px 2px 0px #000000)" }}
                          type="checkbox"
                          disabled={true}
                          className="peer h-5 w-5 cursor-pointer transition-all bg-gray-200 border-[3px] border-black appearance-none rounded checked:bg-slate-800 checked:border-slate-800"
                          id="check"
                        />
                        <span
                          className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2
                         transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="white"
                            strokeWidth="4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-2 text-white text-sm">{option.label}</p>
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
                        style={{ filter: "drop-shadow(0px 2px 0px #000000)" }}
                          type="radio"
                          id="disabled-radio-1"
                          name="disabled-radio"
                          className="custom-radio bg-[#DCDCDC]"
                          disabled
                        />

                        <label
                          htmlFor="disabled-radio-1"
                          className="ms-2 text-white text-sm "
                        >
                          {option.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.type === "dropdown" && (
                <div className="relative mt-4 max-w-[100px]">
                  <div
                    style={{
                      backgroundColor: color.color7 ?? "",
                      filter: "drop-shadow(0px 3.5px 0px #000000)",
                    }}
                    className="flex justify-center border-[3px] border-black items-center rounded-[19px] py-[4px]"
                  >
                    <h2 className=" font-press-gothic ml-1 text-[1.1em]">
                      option
                    </h2>
                    <Image
                      width={1000}
                      height={1000}
                      src="/Icon-form/Theme2/I02.svg"
                      className="h-[30px] w-[30px]"
                      alt={"drop"}
                    ></Image>
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
