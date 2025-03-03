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
      options?: Array<{ labelChoice: string; limitAns: number | null }> | null;
    }[]
  >([]);

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
  const [title, setTitle] = useState<string>();
  const [url, seturl] = useState<string>(" ");
  const [showPublic, setShowPublic] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
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

  const hadleSubmit = async (): Promise<void> => {
    const localData = localStorage.getItem("formQuestions");
    const localTitle = localData ? JSON.parse(localData).title : null;
    const localQuestion = localData ? JSON.parse(localData).questions : null;
    const localDescription = localData
      ? JSON.parse(localData).description
      : null;
    setQuestions(localQuestion);

    const setting = localStorage.getItem("setting");
    const color = setting
      ? JSON.parse(setting)
      : {
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
        };
    const archive = setting ? JSON.parse(setting).archive : true;
    const data = {
      title: localTitle,
      description: localDescription,
      color,
      archive: archive,
      theme: "0001",
      limitForm: JSON.parse(localStorage.getItem("setting") || '{"limit":0}')
        .limit,
      questions: {
        create: questions?.map((q) => ({
          questionID: q.id,
          title: q.title,
          type: q.type,
          required: q.required,
          limit: 100,
          limitAns: 1,
          options: q.options
            ? {
                create: q.options.map((opt) => ({
                  text: opt.labelChoice,
                  limitAns: opt.limitAns,
                })),
              }
            : undefined,
        })),
      },
    };

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const res = await fetch("http://localhost:5001/form/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(data),
    });
    setShowPublic(true);
    const responseData = await res.json();
  };
  useEffect(() => {
    const setting = localStorage.getItem("setting");
    const localColor = setting
      ? JSON.parse(setting).color
      : {
          color1: "#F7F8F3",
          color2: "#302244",
          color3: "#E0537D",
          color4: "#4D78E7",
          color5: "#6AA5DA",
          color6: "#1CD793",
          color7: "#FED83C",
          color8: "#FF9356",
          color9: "#E4E4E4",
          color10: "#3A2C4D",
        };
    const localData = localStorage.getItem("formQuestions");
    const localTitle = localData ? JSON.parse(localData).title : null;
    if (localColor) {
      setColor({
        color1: localColor.color1 || color.color1,
        color2: localColor.color2 || color.color2,
        color3: localColor.color3 || color.color3,
        color4: localColor.color4 || color.color4,
        color5: localColor.color5 || color.color5,
        color6: localColor.color6 || color.color6,
        color7: localColor.color7 || color.color7,
        color8: localColor.color8 || color.color8,
        color9: localColor.color9 || color.color9,
        color10: localColor.color10 || color.color10,
      });
    }
    const localQuestion = localData ? JSON.parse(localData).questions : null;
    const localDescription = localData
      ? JSON.parse(localData).description
      : null;
    createDropdown;
    setTitle(localTitle);
    setDescription(localDescription);
    setQuestions(localQuestion);
  }, []);

  return (
    <div className="relative">
      <div
        style={{ backgroundColor: color.color2 ?? "" }}
        className=" text-white py-1 text-center text-[10px]"
      >
        This is the preview of your form.{" "}
        <Link className="underline font-medium" href="/form01">
          Back to form
        </Link>
      </div>
      <NavBarInForm hadlesubmit={() => hadleSubmit()}></NavBarInForm>
      {showPublic && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="fixed top-1/2 left-1/2 transform rounded-[15px] w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
          >
            <Image
              width={1000}
              height={1000}
              alt="changeusername"
              src={"/Icon-form/39.svg"}
            ></Image>
            <div className="mb-[10px] md:mb-[20px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
              <p className="font-medium text-[12px] sm:text-[15px]">
                Your form is now live!
              </p>
              <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
                Let it go live! We're here to help you summarize all the data
                efficiently!
              </p>
              <div className="py-[8px] flex gap-x-[5px]">
                <input
                  value={url}
                  onChange={() => {
                    return;
                  }}
                  className="grow rounded-[7px] px-[15px] text-[13px] bg-[#f6f6f6]"
                  type="text"
                />
                <Link
                  href="/workspace"
                  type="button"
                  className="border-2 border-black py-[10px] w-full text-center  rounded-[7px] text-[10px]"
                >
                  Workspace
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                  }}
                  className="bg-black w-full   rounded-[7px] text-white text-[10px]"
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-12 max-w-[650px] mx-auto mb-[60px]">
        <div className="mb-8">
          <h1
            style={{ color: color.color2 ?? "" }}
            className="text-[45px] font-press-gothic font-medium text-center"
          >
            {title}
          </h1>
          <p className="mt-2 text-center text-[#c4c4c4]">{description}</p>
        </div>
        <div>
          {questions?.map((item) => (
            <div key={item.id}>
              {item.title && (
                <div
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
                              style={{
                                filter: "drop-shadow(0px 2px 0px #000000)",
                              }}
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
                          <p className="ml-2 text-white text-sm">
                            {option.labelChoice}
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
                              style={{
                                filter: "drop-shadow(0px 2px 0px #000000)",
                              }}
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
                              {option.labelChoice}
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;
