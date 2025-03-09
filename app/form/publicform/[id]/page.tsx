// app/publicform/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBarInForm from "@/app/component/nav";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

function Preview() {
  const { id } = useParams<{ id: string }>();
  const [archive, setIsArchive] = useState<boolean>();
  const [formName, setFormName] = useState<string | null>(null);
  const [isLimit, setIsLimit] = useState<number>();
  const [description, setDescription] = useState<string | null>(null);
  const [erorr, setEror] = useState<string>();
  const [dropdown, setDropdown] = useState<{ [key: number]: boolean }>({});
  const [alreadySubmit, setAlreadySubmit] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<
    {
      id: number;
      type: string;
      answer: string[];
    }[]
  >([]);

  const [questions, setQuestions] = useState<
    | {
        id: number;
        title: string;
        type: string;
        required: boolean;
        options?: Array<{ text: string; limitAns: number | null }>;
      }[]
    | null
  >(null);

  useEffect(() => {
    generateAnswer();
  }, [questions]);
  const generateAnswer = (): void => {
    if (questions !== null) {
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

  async function formPublic() {
    try {
      const response = await fetch(
        `http://localhost:5001/recieve/public/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setIsArchive(result.archive);
      setAlreadySubmit(localStorage.getItem(id) !== null);
      setColor(result.color);
      setFormName(result.title);
      setDescription(result.description);
      setQuestions(result.questions);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    formPublic();
  }, []);

  async function submitForm() {
    if (questions) {
      console.log("start");
      const requiredQuestions = questions.filter((q) => q.required);
      for (const requiredQ of requiredQuestions) {
        const answer = answerList.find((ans) => ans.id === requiredQ.id);

        if (
          !answer ||
          answer?.answer.toString() == "" ||
          answer.answer.length === 0
        ) {
          setEror("You still have some questions that need to be answered");
          return;
        }
      }
    }
    const data = {
      formID: id,
      email: "guest@gmail.com",
      answer: answerList.map((ans) => ({
        questionID: ans.id,
        value: ans.answer,
      })),
    };
    console.log("data", data);

    try {
      const response = await fetch(`http://localhost:5001/response/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.setItem(id, "1");
        setAlreadySubmit(true);
        setEror("");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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
  }
  const [color, setColor] = useState<Color>({
    color1: "#000000",
    color3: "#C4C4C4",
    color2: "#fef2f2",
  });

  return (
    <div className="relative">
      {alreadySubmit ? (
        <div className="mx-[30px] mt-[50px]">
          <div
            style={{ filter: `drop-shadow(0px 6px 0px ${color.color1})` }}
            className="max-w-[650px] border-2 px-8 pt-6 pb-8 mx-auto rounded-lg bg-white"
          >
            <p
              style={{ color: color.color1 ?? "" }}
              className=" font-bold text-[1.4em] mb-2"
            >
              Your form has been successfully submitted.
            </p>
            <p className="text-[0.8em] mb-2 text-gray-800">
              {" "}
              the information in your form has been successfully saved in the
              system, and the submission process has been completed without any
              issues
            </p>
            <p
              onClick={() => {
                formPublic(),
                  localStorage.removeItem(id),
                  setAlreadySubmit(false);
              }}
              className="text-blue-800 underline text-[0.8em]"
            >
              send another answer
            </p>
          </div>
        </div>
      ) : (
        <div>
          {false ? (
            <div className="flex mt-[150px] md:mt-[200px] justify-between  px-[15%] items-center ">
              <div>
                <p className="text-[25px]">EROR404</p>
                <h2 className="text-nowrap text-[35px] font-bold">
                  Page not found
                </h2>
                <p className="max-w-[500px] md:max-w-[350px] mt-4">
                  We're sorry. The form you are looking for may have been
                  disabled or the path is incorrect.
                </p>
                <button type="button"></button>
              </div>
              <Image
                className="hidden md:block"
                src="/Icon-form/19.png"
                alt="sad"
                width={400}
                height={400}
              ></Image>
            </div>
          ) : (
            <div>
              <div className="mt-12 max-w-[650px] mx-auto">
                <div className="mb-8">
                  <h1 className="text-[30px] font-medium text-center">
                    {formName}
                  </h1>
                  <p className="mt-4 text-center text-[#c4c4c4]">
                    {description}
                  </p>
                </div>
                {questions && (
                  <div>
                    {questions?.map((item, questionId) => (
                      <div
                        key={item.id}
                        className="bg-black mx-[15px] mb-4 rounded-[12px]"
                      >
                        <div
                          style={{
                            zIndex: dropdown[item.id] ? 50 : 0,
                          }}
                          className="relative  border-[2.5px] bg-white py-6 px-6 translate-x-[-5px] translate-y-[-3px] rounded-[12px] border-black"
                        >
                          <span>{item.title}</span>
                          {item.required && (
                            <span className="ml-1 text-red-400">*</span>
                          )}
                          {item.type == "text" && (
                            <div className="mt-2 mr-[30%]">
                              <input
                                value={answerList[questionId]?.answer[0] ?? ""}
                                onChange={(e) =>
                                  handleInput(item.id, e.target.value)
                                }
                                type="text"
                                className="pl-2 border-b-2 pb-[1px] focus:border-b-[2.6px] bg-white
                     transition-all duration-500 focus:bg-[#f4f4f4] focus:border-black w-full 
      focus:border-solid focus:text-start focus:outline-none"
                              ></input>
                            </div>
                          )}
                          {item.type == "number" && (
                            <div className="mt-2 mr-[30%]">
                              <input
                                value={answerList[questionId]?.answer[0] ?? ""}
                                onChange={(e) =>
                                  handleInput(item.id, e.target.value)
                                }
                                type="number"
                                className="border-b-2 pl-2 pb-[1px] focus:border-b-[2.6px] bg-white
                     transition-all duration-500 focus:bg-[#f4f4f4] focus:border-black w-full 
      focus:border-solid focus:text-start focus:outline-none"
                              ></input>
                            </div>
                          )}

                          {(item.type == "mutiple" || item.type == "check") && (
                            <div className="mt-4">
                              {item.options?.map((option, index) => (
                                <div
                                  key={index}
                                  
                                >
                                  {index + 1 !== item.options?.length ? (
                                    <div className="flex items-center mb-2">
                                      <label className="flex items-center cursor-pointer relative">
                                        <input
                                          value={option.text}
                                          checked={
                                            answerList[
                                              questionId
                                            ]?.answer.includes(option.text) ??
                                            false
                                          }
                                          onChange={(e) =>
                                            handleCheckboxChange(
                                              item.id,
                                              option.text,
                                              e.target.checked
                                            )
                                          }
                                          type="checkbox"
                                          className="peer h-4 w-4 cursor-pointer transition-all checked:bg-[#ababab]  checked:border-[#ababab] appearance-none rounded border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                          id="check"
                                        />

                                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
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

                                      <p className="ml-2  text-sm">
                                        {option.text}
                                        <span className=" text-gray-600">
                                          {" "}
                                          {option.limitAns
                                            ? `(0/${option?.limitAns})`
                                            : ""}
                                        </span>
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          )}
                          {item.type == "radio" && (
                            <div className="mt-4">
                              {item.options?.map((option, index) => (
                                <div key={index}>
                                  <div className="flex items-center mb-2">
                                    <input
                                      value={option.text}
                                      onChange={(e) =>
                                        handleInput(item.id, e.target.value)
                                      }
                                      type="radio"
                                      className="form-radio accent-[#000000]"
                                      name={`radio-group-${item.id}`}
                                    />

                                    <label
                                      htmlFor="disabled-radio-1"
                                      className="ms-2 text-sm "
                                    >
                                      {index + 1 !== item.options?.length
                                        ? option.text
                                        : ""}{" "}
                                      &nbsp;&nbsp;{" "}
                                      <span className=" text-gray-600">
                                        {" "}
                                        {option.limitAns
                                          ? `(0/${option?.limitAns})`
                                          : ""}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {item.type == "dropdown" && (
                            <div className="relative mt-4 w-fit min-w-[100px]">
                              <div
                                onClick={() => handleDropdown(item.id)}
                                className="flex justify-center border-2 rounded-lg py-[4px]"
                              >
                                <span className="text-sm px-4 ml-1">
                                  {answerList[questionId]?.answer.length > 0
                                    ? answerList[questionId]?.answer
                                    : "options"}
                                </span>
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

                              {dropdown[item.id] && (
                                <div className="absolute left-0 top-full px-2 py-2 w-fit bg-white border-2 rounded-lg mt-2 shadow-lg">
                                  {item.options?.map((option, index) => (
                                    <div
                                      className="flex hover:bg-gray-100 items-center transition-all duration-[500ms] rounded-lg pl-2 pr-6"
                                      key={index}
                                      onClick={() =>
                                        handleInputDropdown(
                                          item.id,
                                          option.text
                                        )
                                      }
                                    >
                                      <ul className="p-2 rounded-lg text-[0.85em]  cursor-pointer">
                                        {index + 1 !== item.options?.length
                                          ? option.text
                                          : ""}
                                      </ul>
                                      <p className="text-sm text-gray-600">
                                        {option.limitAns
                                          ? `(0/${option?.limitAns})`
                                          : ""}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {
                  <p className="text-[0.8em] text-end px-[30px] mb-4 text-red-400">
                    {erorr}
                  </p>
                }
                <div className="flex justify-end w-full px-4">
                  <button
                    onClick={() => submitForm()}
                    className="flex mb-6 bg-black text-white rounded-lg py-2 px-4"
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Preview;
