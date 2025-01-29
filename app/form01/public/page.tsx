"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import NavBarInForm from "../../component/nav01";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

function Preview() {
  const [dropdown, setDropdown] = useState<{ [key: number]: boolean }>({});
  const [answerList, setAnswerList] = useState<
    {
      id: number;
      type: string;
      answer: string[];
    }[]
  >([]);

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
      id: 3,
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
      id: 50,
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
    {
      id: 16,
      title: "What is your favorite sport?",
      type: "radio",
      required: true,
      options: [
        { label: "Football", limit: 1 },
        { label: "Basketball", limit: 1 },
        { label: "Tennis", limit: 1 },
        { label: "Swimming", limit: 1 },
        { label: "Running", limit: 1 },
      ],
    },
    {
      id: 17,
      title: "Which social media platforms do you use?",
      type: "check",
      required: false,
      options: [
        { label: "Facebook", limit: null },
        { label: "Instagram", limit: 7 },
        { label: "Twitter", limit: 6 },
        { label: "LinkedIn", limit: null },
        { label: "TikTok", limit: null },
      ],
    },
    {
      id: 18,
      title: "What is your highest level of education?",
      type: "dropdown",
      required: true,
      options: [
        { label: "High School", limit: 5 },
        { label: "Bachelor's Degree", limit: 8 },
        { label: "Master's Degree", limit: 9 },
        { label: "PhD", limit: null },
        { label: "Other", limit: null },
      ],
    },
    {
      id: 19,
      title: "How many hours do you spend online per day?",
      type: "number",
      required: true,
    },
    {
      id: 20,
      title: "Would you recommend our service to others?",
      type: "radio",
      required: true,
      options: [
        { label: "Definitely", limit: 1 },
        { label: "Maybe", limit: 1 },
        { label: "Not sure", limit: 1 },
        { label: "No", limit: 1 },
      ],
    },
  ]);
  useEffect(() => {
    generateAnswer();
  }, []);
  const generateAnswer = (): void => {
    if (questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        setAnswerList((prev) => [
          ...prev,
          {
            id: questions[i]?.id,
            type: questions[i]?.type,
            answer:
              questions[i]?.type === "check" ||
              questions[i]?.type === "dropdown"
                ? []
                : [""],
          },
        ]);
      }
    }
  };
  const handleInput = (inputIndex: number, value: string): void => {
    setAnswerList((prev) =>
      prev.map((item) =>
        item.id === inputIndex ? { ...item, answer: [value] } : item
      )
    );
  };
  const handleCheckboxChange = (
    id: number,
    value: string,
    checked: boolean
  ): void => {
    setAnswerList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              answer: checked
                ? [...item.answer, value]
                : item.answer.filter((val) => val !== value),
            }
          : item
      )
    );
  };
  const handleInputDropdown = (id: number, value: string): void => {
    setAnswerList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, answer: [value] } : item))
    );
    handleDropdown(id);
  };

  const handleDropdown = (questionId: number): void => {
    setDropdown((prev) => ({ ...Preview, [questionId]: !prev[questionId] }));
  };
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

  return (
    <div className="relative">
      <div></div>
      <div className="mt-12 max-w-[650px] mx-auto mb-[60px]">
        <div className="mb-8">
          <h1
            style={{ color: color.color2 ?? "" }}
            className="text-[45px] font-press-gothic font-medium text-center"
          >
            FORM NAME
          </h1>
          <p className="mt-2 text-center text-[#c4c4c4]">
            enter description here
          </p>
        </div>

        <div>
          {questions.map((item, questionId) => (
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
                    value={answerList[questionId]?.answer[0] ?? ""}
                    onChange={(e) => handleInput(item.id, e.target.value)}
                    type="text"
                    style={{ backgroundColor: color.color10 ?? "" }}
                    className="border-b-2 focus:border-b-[3px] transition-all duration-[500ms] border-[#666666] text-white py-[4px] px-[3px] focus:border-white  w-full 
      focus:border-solid  focus:outline-none"
                  ></input>
                </div>
              )}
              {item.type === "number" && (
                <div className="mt-2 mr-[30%]">
                  <input
                    value={answerList[questionId]?.answer[0] ?? ""}
                    onChange={(e) => handleInput(item.id, e.target.value)}
                    type="number"
                    style={{ backgroundColor: color.color10 ?? "" }}
                    className="border-b-2 focus:border-b-[3px] transition-all duration-[500ms] border-[#666666] text-white py-[4px] px-[3px] focus:border-white  w-full 
      focus:border-solid  focus:outline-none"
                  ></input>
                </div>
              )}

              {item.type === "check" && (
                <div className="mt-4">
                  {item.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-[10px] mb-2"
                    >
                      <div className="flex">
                        <label className="flex items-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer transition-all bg-white border-[3px] border-black appearance-none rounded 
            checked:bg-black checked:border-black"
                            style={{
                              filter: "drop-shadow(0px 2px 0px #000000)",
                            }}
                            id={`check-${item.id}-${index}`}
                            value={option.label}
                            checked={
                              answerList[questionId]?.answer.includes(
                                option.label
                              ) ?? false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.id,
                                option.label,
                                e.target.checked
                              )
                            }
                          />
                          <span
                            className="bg-black border-black absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="white"
                              strokeWidth="2"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <p className="ml-2 text-white text-sm">
                          {option.label}
                        </p>
                      </div>
                      <p className="text-gray-400  text-sm ml-2">
                       
                      </p>
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
                          value={option.label}
                          onChange={(e) => handleInput(item.id, e.target.value)}
                          style={{ filter: "drop-shadow(0px 2px 0px #000000)" }}
                          type="radio"
                          id="disabled-radio-1"
                          name={`radio-group-${item.id}`}
                          className="custom-radio bg-[#DCDCDC] "
                        />

                        <label
                          htmlFor="disabled-radio-1"
                          className="ms-2 text-white text-sm "
                        >
                          {option.label}
                        </label>
                        <p className="text-gray-400  text-sm ml-2">
                          {option.limit ? `(0/${option?.limit})` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.type === "dropdown" && (
                <div className="relative mt-4 w-fit min-w-[150px]">
                  <div
                    onClick={() => handleDropdown(item.id)}
                    style={{
                      backgroundColor: color.color7 ?? "",
                      filter: "drop-shadow(0px 3.5px 0px #000000)",
                    }}
                    className="flex justify-center  px-[15px] border-[3px] border-black items-center rounded-[19px] py-[4px]"
                  >
                   
                    
                    <span className=" font-press-gothic ml-1 text-[1.1em]">
                      {answerList[questionId]?.answer.length > 0
                        ? answerList[questionId]?.answer
                        : "options"}
                    </span>
                    <Image
                      width={1000}
                      height={1000}
                      src="/Icon-form/Theme2/I02.svg"
                      className={
                        dropdown[item.id]
                          ? "h-[30px] w-[30px] rotate-180 transition-all duration-700"
                          : "transition-all duration-700 h-[30px] w-[30px]"
                      }
                      alt={"drop"}
                    ></Image>
                  </div>

                  {dropdown[item.id] && (
                    <div
                      style={{
                        filter: "drop-shadow(0px 3.5px 0px #000000)",
                      }}
                      className="absolute border-black border-[3px]  bg-white rounded-lg px-2 py-4 mt-2 z-30 ml-2"
                    >
                      {item.options?.map((option, index) => (
                        <div onClick={() =>
                          handleInputDropdown(item.id, option.label)
                        }
                          className="flex py-[4px] items-center gap-x-[20px] text-[0.85em] transition-all duration-300 rounded-lg pl-4 pr-6 hover:bg-gray-200"
                          key={index}
                        >
                          <ul
                           
                            className=""
                          >
                            {option.label}
                          </ul>
                          <p>{option.limit ? `(0/${option?.limit})` : ""}</p>
                        </div>
                      ))}
                    </div>
                  )}
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
