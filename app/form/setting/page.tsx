"use client";

import Link from "next/link";

import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBarInForm from "../../component/nav";
import Image from "next/image";
import DynamicBarChart from "../../component/graph/bar";
import DynamicPieChart from "../../component/graph/circle";
import { Fascinate } from "next/font/google";

function formrespone() {
    const [url,seturl] = useState<string>("http://localhost:3000/publicform/")
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPublic,setShowPublic] = useState<boolean>(false);
  const [chart, setChart] = useState<number>(0);
  const [isSaveData, setIsSaveData] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState<number | null>(0);
  const [color, setColor] = useState<{
    position: number;
    color1: string;
    color2: string;
    color3: string;
  }>({ position: 0, color1: "#000000", color2: "#c4c4c4", color3: "#f6f6f6" });

  const [letDel, setLetDel] = useState<boolean>(false);
  const colorArray: {
    position: number;
    color1: string;
    color2: string;
    color3: string;
  }[] = [
    { position: 0, color1: "#000000", color2: "#D9D9D9", color3: "#F6F6F6" },
    { position: 1, color1: "#F8C4CC", color2: "#F6EDBB", color3: "#BDE2F0" },
    { position: 2, color1: "#8EB15C", color2: "#B1CF86", color3: "#D2E6B5" },
    { position: 3, color1: "#FF8B00", color2: "#FED700", color3: "#FEFACD" },
  ];
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

  const updateColor = (
    newPosition: number,
    newcolor1: string,
    newcolor2: string,
    newcolor3: string
  ): void => {
    setColor((prev) => ({
      ...prev,
      position: newPosition,
      color1: newcolor1,
      color2: newcolor2,
      color3: newcolor3,
    }));
  };
  const increaseAmount = (): void => {
    if (amount === null || amount === 0) {
      setAmount(1);
    } else {
      setAmount(amount + 1);
    }
  };

  const decreaseAmount = (): void => {
    if (amount === null || amount === 0) {
      setAmount(0);
    } else if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const setSetting = (): void => {
    const setting = {
      limit: amount,
      archive: isChecked,
      color: color,
    };
    localStorage.setItem("setting", JSON.stringify(setting));
    setIsSaveData(true);
    setTimeout(() => {
      setIsSaveData(false);
    }, 1000);
  };

  useEffect(() => {
    const setting = localStorage.getItem("setting") ?? "";
    if (setting) {
      setColor(JSON.parse(setting).color);
      setAmount(JSON.parse(setting).limit);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hadleSubmit = async (): Promise<void> => {
    const localData = localStorage.getItem("formQuestions");
    const localTitle = localData ? JSON.parse(localData).title : null;

    const localQuestion = localData ? JSON.parse(localData).questions : null;
    const localDescription = localData
      ? JSON.parse(localData).description
      : null;
    setQuestions(localQuestion);

    const setting = localStorage.getItem("setting");
    const color =setting
      ? JSON.parse(setting)
      : {
          color1: "#000000",
          color3: "#C4C4C4",
          color2: "#fef2f2",
        };
    const archive = setting ? JSON.parse(setting) :true
         
        const data = {
          title:localTitle,
          description:localDescription,
          color,
          archive:archive,
          theme: "0002",
          limitForm: JSON.parse(localStorage.getItem("setting") || '{"limit":0}').limit,
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
        "x-auth-token": token, // ส่ง Token ไปด้วย
      },
      body: JSON.stringify(data),
    });
    setShowPublic(true);
    const responseData = await res.json();
  };

  return (
    <div className="relative">
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
                onChange={()=>{return}}
                  className="grow rounded-[7px] px-[15px] text-[13px] bg-[#f6f6f6]"
                  type="text"
                />
                <Link href="/workspace"
                  type="button"
                  className="border-2 border-black py-[10px] w-full text-center  rounded-[7px] text-[10px]"
                >
                  Workspace
                </Link>
                <button
                  type="button"
                  onClick={()=>{ navigator.clipboard.writeText(url);}}
                  className="bg-black w-full   rounded-[7px] text-white text-[10px]"
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto px-[30px] max-w-[700px] flex flex-col gap-y-[35px] mt-[50px]">
        <div className="bg-black rounded-[8px]">
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="bg-[8px] px-[30px] md:px-[45px] py-[25px] rounded-[8px] flex justify-between gap-x-[15px] bg-white translate-y-[-10px]"
          >
            <div>
              <p className="font-medium">Archive forms</p>
              <p className="text-[13px] text-[#474747] mt-[10px] max-w-[300px]">
                This archive temporarily stores your forms to prevent
                submissions. You can reactivate them later.
              </p>
            </div>

            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="sr-only"
                />
                <div className="translate-y-[1px]">
                  <div
                    className={`box block h-[20px] w-10 rounded-full bg-black transition-all duration-300 ease-in-out`}
                    style={{
                      backgroundColor: isChecked ? `#000000` : `#C4C4C4`,
                    }}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 flex h-[12px] translate-y-[0px] w-[12px] items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                      isChecked ? "translate-x-[21px]" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="bg-black rounded-[8px]">
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="bg-[8px]  px-[30px] md:px-[45px] py-[25px] rounded-[8px] flex justify-between gap-x-[15px] bg-white translate-y-[-10px]"
          >
            <div>
              <p className="font-medium">limiting forms </p>
              <p className="text-[13px] text-[#474747] mt-[10px] max-w-[300px]">
                You can limit the number of responses to your form.
              </p>
            </div>
            <div className="max-w-[200px] relative mt-4">
              <label className="block mb-1 text-sm text-slate-600">
                Select Amount
              </label>
              <div className="relative  ">
                <button
                  onClick={decreaseAmount}
                  className=" absolute right-9 top-1 rounded-md border border-transparent p-1.5 text-center text-sm transition-all
                     text-slate-600 
                    hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100
                     disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                      hidden sm:block"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                  </svg>
                </button>
                <input
                  id="amountInput"
                  type="number"
                  value={amount === null || amount === 0 ? "" : amount}
                  onChange={(e) =>
                    setAmount(e.target.value ? parseInt(e.target.value) : 0)
                  }
                  className=" bg-transparent text-slate-700 text-sm border 
                    border-slate-200 rounded-md pl-3 sm:pr-10 pr-3 py-2
                     transition duration-300 ease
                     focus:outline-none focus:border-slate-400 hover:border-slate-300 
                     shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                  onClick={increaseAmount}
                  className="absolute right-1 top-1 rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hidden sm:block"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                </button>
              </div>
              <p className="flex items-center mt-2 text-xs text-slate-400">
                Enter the limit number, or leave blank if no limit.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-[8px]">
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="bg-[8px] px-[30px] md:px-[45px] py-[25px] rounded-[8px] gap-x-[15px] bg-white translate-y-[-10px]"
          >
            <div className="mb-[40px]">
              <p className="font-medium">Color </p>
              <p className="text-[13px] text-[#474747] mt-[10px] max-w-[300px]">
                choose you color style for display
              </p>
            </div>
            <div className="flex flex-col mb-[15px] gap-y-[5px] px-[40px] sm:px-[70px]">
              {colorArray.map((item) => (
                <div
                  key={item.position}
                  onClick={() =>
                    updateColor(
                      item.position,
                      item.color1,
                      item.color2,
                      item.color3
                    )
                  }
                  className={
                    color.position == item.position
                      ? "flex justify-center gap-x-[25px] bg-[#F6F6F6] py-[13px] rounded-[10px] transition-all duration-[500ms]"
                      : "flex justify-center gap-x-[25px] py-[13px] rounded-[10px] transition-all duration-[500ms]"
                  }
                >
                  <div
                    style={{ backgroundColor: `${item.color1}` }}
                    className={`w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] rounded-[50%] `}
                  ></div>
                  <div
                    style={{ backgroundColor: `${item.color2}` }}
                    className={`w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] rounded-[50%]  `}
                  ></div>
                  <div
                    style={{ backgroundColor: `${item.color3}` }}
                    className={`w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] rounded-[50%]  `}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-black rounded-[8px]">
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="bg-[8px] px-[30px] md:px-[45px] py-[25px] rounded-[8px] item-center flex justify-between gap-x-[15px] bg-white translate-y-[-10px]"
          >
            <div className="mb-[10px]">
              <p className="font-medium">Export </p>
              <p className="text-[13px] text-[#474747] mt-[10px] max-w-[300px]">
                Export forms to google sheet
              </p>
            </div>

            <a
              href="/path/to/your/file.pdf"
              download="your-file-name.pdf"
              className="btn border-2 h-full px-4 py-1 rounded-[4px] flex text-[#474747] items-center gap-x-[10px] text-[13px] mt-[10px] btn-primary"
            >
              <Image
                src={"/Icon-form/20.png"}
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="sm:w-[15px] sm:h-[15px] w-[12px] h-[12px]"
              />
              Export form
            </a>
          </div>
        </div>

        <div className="flex justify-end mb-[100px]">
          <button
            className={`rounded-lg ${
              isSaveData ? "bg-stone-800" : "bg-black"
            } text-white w-[120px] py-[10px] text-[13px]`}
            disabled={isSaveData}
            onClick={() => setSetting()}
            type="button"
          >
            {isSaveData ? "Saving ..." : "Save change"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default formrespone;
