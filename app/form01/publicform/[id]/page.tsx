"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBarInForm from "@/app/component/nav";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

function Preview() {
  const { id } = useParams<{ id: string }>();
  const [formName, setFormName] = useState<string>();
  const [islimit,setIsLimit]= useState<number>(0);
  const [isArchive,setIsArchive] =useState<boolean>();
  const [alreadySubmit, setAlreadySubmit] = useState<boolean>();
  const [description, setDescription] = useState<string>();
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
      options?: Array<{ text: string; limitAns: number | null }> | null;
    }[]
  >([]);

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

  async function submitForm() {
    const data = {
      formID: id,
      email: "guest@gmail.com",
      answer: answerList.map((ans) => ({
        questionID: ans.id,
        value: ans.answer,
      })),
    };

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
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="relative">
    {alreadySubmit ? (
      <div className="mx-[30px] mt-[50px]">
        <div style={{ backgroundColor:color.color10?? "",filter: `drop-shadow(0px 6px 0px ${color.color2})`}} className="max-w-[650px] px-8 pt-6 pb-8 mx-auto rounded-lg bg-white">
          <p style={{color:color.color1?? ""}} className=" font-bold text-[1.4em] mb-2">Your form has been successfully submitted.</p>
          <p className="text-[0.8em] mb-2 text-gray-400"> the information in your form has been successfully saved in the system, and the submission process has been completed without any issues</p>
          <p onClick={()=>{formPublic(),localStorage.removeItem(id),setAlreadySubmit(false)}} className="text-blue-800 underline text-[0.8em]">send another answer</p>
        </div>
      </div>
    ) : (
      <div>
      {true? (
        <div className="flex mt-[150px] md:mt-[170px] justify-between  px-[15%] items-center ">
          <div>
            <p className="text-[2.7em] font-press-gothic">EROR404</p>
            <h2 className="text-nowrap font-press-gothic text-[3.6em] ">
              Page not found
            </h2>
            <p className="max-w-[500px] md:max-w-[350px] mt-4">
              We're sorry. The form you are looking for may have been disabled
              or the path is incorrect.
            </p>
            <button type="button"></button>
          </div>
          <Image
            className="hidden md:block"
            src="/decorationIcon/19.svg"
            alt="sad"
            width={400}
            height={400}
          ></Image>
        </div>
      ) : (
        <div className="mt-12 max-w-[650px] mx-auto mb-[60px]">
          <div className="mb-8">
            <h1
              style={{ color: color.color2 ?? "" }}
              className="text-[45px] font-press-gothic font-medium text-center"
            >
              {formName}
            </h1>
            <p className="mt-2 text-center text-[#c4c4c4]">{description}</p>
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
                  {item.required && (
                    <span className="ml-1 text-red-400">*</span>
                  )}
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
                              value={option.text}
                              checked={
                                answerList[questionId]?.answer.includes(
                                  option.text
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(
                                  item.id,
                                  option.text,
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
                            {option.text}
                          </p>
                        </div>
                        <p className="text-gray-400  text-sm ml-2"></p>
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
                            value={option.text}
                            onChange={(e) =>
                              handleInput(item.id, e.target.value)
                            }
                            style={{
                              filter: "drop-shadow(0px 2px 0px #000000)",
                            }}
                            type="radio"
                            id="disabled-radio-1"
                            name={`radio-group-${item.id}`}
                            className="custom-radio bg-[#DCDCDC] "
                          />

                          <label
                            htmlFor="disabled-radio-1"
                            className="ms-2 text-white text-sm "
                          >
                            {option.text}
                          </label>
                          <p className="text-gray-400  text-sm ml-2">
                            {option.limitAns ? `(0/${option?.limitAns})` : ""}
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
                          <div
                            onClick={() =>
                              handleInputDropdown(item.id, option.text)
                            }
                            className="flex py-[4px] items-center gap-x-[20px] text-[0.85em] transition-all duration-300 rounded-lg pl-4 pr-6 hover:bg-gray-200"
                            key={index}
                          >
                            {index + 1 !== item.options?.length ? (
                              <ul
                                style={{
                                  pointerEvents:
                                    index + 1 !== item.options?.length
                                      ? "auto"
                                      : "none",
                                }}
                              >
                                {option.text}
                              </ul>
                            ) : null}
                            <p>
                              {option.limitAns ? `(0/${option?.limitAns})` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex w-full justify-end">
            <button
              onClick={() => submitForm()}
              className="px-[15px] py-[12px]  text-white rounded-lg  mx-4 text-[0.8em]"
              style={{ backgroundColor: color.color2 ?? "" }}
              type="button"
            >
              submit
            </button>
          </div>{" "}
        </div>
      )}
    </div>
    )}
    </div>
  );
}

export default Preview;
