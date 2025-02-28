"use client";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import NavBarInForm from "../../component/nav01";
import Image from "next/image";
import ApexCharts from "apexcharts";
import DynamicPieChart from "../../component/graph/circle";
import DynamicBarChart from "../../component/graph/bar";
import { parse } from "path";

function formrespone() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<
    {
      imgSrc: string;
      wideth: number;
      label: string;
    }[]
  >([
    { imgSrc: "/Icon-form/theme2/I13.png", wideth: 20, label: "Circle" },
    { imgSrc: "/Icon-form/theme2/I14.png", wideth: 20, label: "Bar" },
  ]);
  const [chart, setChart] = useState<number>(0);
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState<number | null>(0);
  const [color, setColor] = useState<ColorState>({
    color1: "#F7F8F3",
    color2: "#302244",
    color3: "#E0537D",
    color4: "#4D78E7",
    color5: "#6AA5DA",
    color6: "#1CD793",
    color7: "#FEDD3C",
    color8: "#FF9356",
    color9: "#E4E4E4",
    color10: "#3A2C4D",
  });
  type ColorState = {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    color7: string;
    color8: string;
    color9: string;
    color10: string;
  };
  const [isSaveData, setIsSaveData] = useState<boolean>(false);
  const [delForm, setDelForm] = useState<boolean>(false);
  const [isDel, setIsdel] = useState<string>("");
  const [letDel, setLetDel] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isArchive, setIsArchive] = useState<boolean>(true);
  const [showPublic,setShowPublic] = useState<boolean>(false);
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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    const setting = localStorage.getItem("setting");
    const limit = setting ? JSON.parse(setting).limit : 0;
    const archive = setting ? JSON.parse(setting).archive : false;

    setAmount(limit);
    setIsChecked(archive);
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
    const color = setting
      ? JSON.parse(setting)
      : {
          color1: "#000000",
          color3: "#C4C4C4",
          color2: "#fef2f2",
        };
    const archive = setting ? JSON.parse(setting) : true;

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
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const updateColor = (colorKey: keyof ColorState, newColor: string): void => {
    setColor((prev) => ({
      ...prev,
      [colorKey]: newColor, // Update the color by its specific key
    }));
  };

  const increaseAmount = (): void => {
    if (amount === null || amount === 0) {
      setAmount(1);
    } else {
      setAmount(amount + 1);
    }
  };
  useEffect(() => {
    if (isDel === "delete my form") {
      setLetDel(true);
    } else {
      setLetDel(false);
    }
  }, [isDel]);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: color.color1 }}
      className="relative min-h-screen"
    > 
    {showPublic && (
        <div className="relative">
          

          <div className="fixed inset-0 bg-black  opacity-50 z-40"></div>
          <div
            style={{
              filter: "drop-shadow(2px 4px 0px rgb(0, 0, 0))",
            }}
            className="fixed border-black border-[3.5px] top-1/2 left-1/2 transform rounded-[15px] w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
          >
            <Image
              width={1000}
              height={1000}
              alt="changeusername"
              src={"/Icon-form/50.png"}
            >
              
            </Image>
            <svg className="absolute z-50 top-[-15px] left-[-15px]"
            width="50"
            height="50"
            viewBox="0 0 61 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="26.1091"
              cy="37.0574"
              rx="19.3708"
              ry="11.7909"
              fill="rgb(77, 120, 231)"
            />
            <ellipse
              cx="31.1613"
              cy="24.4243"
              rx="14.3176"
              ry="10.9487"
              fill="rgb(77, 120, 231)"
            />
            <ellipse
              cx="42.1121"
              cy="39.5841"
              rx="13.4754"
              ry="10.9487"
              fill="rgb(77, 120, 231)"
            />
            <path
              d="M16.4238 50.5327C12.5496 50.5327 9.26503 49.1851 6.56995 46.4901C3.87488 43.795 2.52734 40.5104 2.52734 36.6362C2.52734 33.3516 3.54852 30.4565 5.59088 27.9509C7.63325 25.4453 10.1915 23.8346 13.2655 23.1187C14.3183 19.3288 16.4028 16.2126 19.5189 13.7702C22.6351 11.3278 26.2356 10.1066 30.3203 10.1066C35.3314 10.1066 39.532 11.8436 42.9219 15.3177C46.3118 18.7919 48.0067 22.9503 48.0067 27.793C51.165 28.1299 53.639 29.4353 55.4287 31.7093C57.2184 33.9832 58.1132 36.4467 58.1132 39.0997C58.1132 42.258 57.0078 44.953 54.797 47.1849C52.5862 49.4167 49.9017 50.5327 46.7434 50.5327H16.4238ZM16.4238 45.4794H46.7434C48.512 45.4794 50.007 44.8688 51.2282 43.6476C52.4494 42.4264 53.06 40.9315 53.06 39.1628C53.06 37.3942 52.4494 35.8993 51.2282 34.6781C50.007 33.4569 48.512 32.8463 46.7434 32.8463H42.9535V27.793C42.9535 24.2978 41.7217 21.3185 39.2583 18.855C36.7948 16.3916 33.8155 15.1598 30.3203 15.1598C27.6673 15.1598 25.3091 15.8862 23.2457 17.3391C21.1823 18.7919 19.6663 20.6553 18.6978 22.9292C21.9824 23.4767 24.7406 25.0242 26.9725 27.5719C29.2044 30.1196 30.3203 33.141 30.3203 36.6362H25.267C25.267 34.1938 24.4038 32.1093 22.6772 30.3828C20.9507 28.6563 18.8662 27.793 16.4238 27.793C13.9814 27.793 11.8969 28.6563 10.1704 30.3828C8.44387 32.1093 7.58061 34.1938 7.58061 36.6362C7.58061 39.0786 8.44387 41.1631 10.1704 42.8896C11.8969 44.6161 13.9814 45.4794 16.4238 45.4794Z"
              fill="black"
            />
          </svg>
            <div className="mb-[10px] md:mb-[20px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
              <p className="font-medium font-press-gothic text-[1.2em] sm:text-[1.7em]">
                Your form is now live!
              </p>
              <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
                Let it go live! We're here to help you summarize all the data
                efficiently!
              </p>
              <div className="py-[8px] flex gap-x-[5px]">
                <input
                  value={""}
                  onChange={() => {
                    return;
                  }}
                  className=" w-[60%] rounded-[7px] py-[10px] px-[15px] text-[13px] bg-[#f6f6f6]"
                  type="text"
                />
                <Link
                  href="/workspace"
                  type="button"
                  className="border-2  border-black py-[10px] w-[20%] text-center  rounded-[7px] text-[10px]"
                >
                  Workspace
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("");
                  }}
                  className="bg-black w-[20%] py-[10px]   rounded-[7px] text-white text-[10px]"
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {delForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
      )}
      {delForm && (
        <div
          style={{
            filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
          }}
          className="fixed top-1/2 left-1/2 border-[3px] border-black transform rounded-[15px]
           w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
        >
          <div className=" pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
            <p className="font-medium text-[1.4em] sm:text-[1.7em] font-press-gothic">
              <span
                style={{
                  transition: "all 0.3s ease",
                  color: "rgb(224, 83, 125)",

                  paintOrder: "stroke fill",
                }}
              >
                Delete
              </span>
              <span
                style={{
                  transition: "all 0.3s ease",
                  color: "#302244",

                  paintOrder: "stroke fill",
                }}
              >
                {" "}
                form
              </span>
            </p>
            <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
              Are you sure you want to delete the form? Deleting the form will
              permanently remove all data, including all received responses, and
              none of the information can be recovered.
            </p>
            <p
              style={{
                filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
              }}
              className="text-[9px] border-[2.5px] border-black sm:text-[13px] 
              text-red-500 px-[15px] mt-[15px] py-[10px] rounded-[15px] bg-red-300"
            >
              <strong>Warning:</strong> This action is not reversible. Please be
              certain.
            </p>
          </div>
          <div className="flex flex-col  px-[45px] py-[15px]  w-full bg-[#f4f4f4] rounded-b-[15px]">
            <p className="text-[9px] sm:text-[13px]">
              To verify, type{" "}
              <strong className="font-medium">delete my form</strong> below:
            </p>
            <input
              value={isDel}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsdel(e.target.value)
              }
              className="w-full rounded-[6px] border-2 text-[13px] text-[#474747] px-[15px] py-[6px]"
              style={{
                boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
              }}
            ></input>
            <div className="mt-[12px] justify-end flex gap-x-[10px]">
              <p
                onClick={() => {
                  setDelForm(false), setIsdel("");
                }}
                style={{
                  backgroundColor: "white",
                  filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
                }}
                className="text-[0.65em] border-[3px] font-press-gothic border-black sm:text-[1em] px-[20px] py-[5px] rounded-[14px] "
              >
                cancel
              </p>
              <p
                style={{
                  filter: letDel ? "drop-shadow(0px 2px 0px rgb(0, 0, 0))" : "",
                }}
                className={
                  letDel
                    ? "text-[0.65em] text-white border-[3px] border-black font-press-gothic bg-black pointer-events-none sm:text-[1em] px-[12px] py-[5px] rounded-[14px] "
                    : "text-[0.65em] text-white border-[3px] font-press-gothic bg-[#C4C4C4] sm:text-[1em] px-[12px] py-[5px] rounded-[14px]"
                }
              >
                comfirm
              </p>
            </div>
          </div>
        </div>
      )}

      <NavBarInForm hadlesubmit={()=>hadleSubmit()} />

      <div className="mx-auto px-[30px] max-w-[700px] flex flex-col gap-y-[15px]  mt-[70px]">
        <div
          style={{ backgroundColor: color.color2 }}
          className="bg-[8px] px-[30px] md:px-[45px] py-[25px] rounded-[8px] flex justify-between gap-x-[15px] translate-y-[-10px]"
        >
          <div>
            <span
              className="font-medium font-press-gothic"
              style={{
                fontSize: "1.6em",
                transition: "all 0.3s ease",
                color: "white",
                WebkitTextStroke: "0.1em black",
                paintOrder: "stroke fill",
                textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
              }}
            >
              Archive
            </span>
            <span
              className="font-medium font-press-gothic"
              style={{
                fontSize: "1.6em",
                transition: "all 0.3s ease",
                color: "rgb(28, 215, 147)",
                WebkitTextStroke: "0.1em black",
                paintOrder: "stroke fill",
                textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
              }}
            >
              {" "}
              forms
            </span>
            <p className="text-[0.7em] text-white mt-[10px] max-w-[300px]">
              This archive temporarily stores your forms to prevent submissions.
              You can reactivate them later.
            </p>
          </div>
          <label className="flex cursor-pointer select-none items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                className="sr-only"
              />
              <div>
                <div
                  className={`border-[3px] border-black  box block h-[22px] w-12 rounded-full transition-all duration-300 ease-in-out`}
                  style={{
                    filter: "drop-shadow(0px 2px 0px #000000)",
                    backgroundColor: isChecked
                      ? `${color.color4}`
                      : `${color.color5}`,
                  }}
                ></div>
                <div
                  className={`absolute left-1 border-2 border-black top-1 flex h-[14px] translate-y-[0px] w-[14px] items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                    isChecked ? "translate-x-[23px]" : ""
                  }`}
                ></div>
              </div>
            </div>
          </label>
        </div>
        <div
          style={{ backgroundColor: color.color2 }}
          className="bg-[8px]  px-[30px] md:px-[45px] py-[25px] rounded-[8px] flex justify-between gap-x-[15px]  translate-y-[-10px]"
        >
          <div>
            <span
              className=" font-medium font-press-gothic text-[1.4em]"
              style={{
                fontSize: "1.6em",
                transition: "all 0.3s ease",
                color: "rgb(255, 147, 86)",
                WebkitTextStroke: "0.1em black",
                paintOrder: "stroke fill",
                textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
              }}
            >
              limiting
            </span>
            <span
              className="font-medium font-press-gothic text-[1.4em]"
              style={{
                fontSize: "1.6em",
                transition: "all 0.3s ease",
                color: "white",
                WebkitTextStroke: "0.1em black",
                paintOrder: "stroke fill",
                textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
              }}
            >
              {" "}
              forms
            </span>
            <p className="text-[0.7em] text-white mt-[10px] max-w-[300px]">
              You can limit the number of responses to your form.
            </p>
          </div>
          <div className="max-w-[200px] relative">
            <label className="block text-sm text-slate-600 font-medium font-press-gothic">
              <span
                style={{
                  fontSize: "1.2em",
                  transition: "all 0.3s ease",
                  color: "white",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                Select
              </span>
              <span
                style={{
                  fontSize: "1.2em",
                  transition: "all 0.3s ease",
                  color: "rgb(77, 120, 231)",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                {" "}
                Amount
              </span>
            </label>
            <div className="relative  ">
              <input
                style={{
                  filter: "drop-shadow(0px 2px 0px #000000)",
                }}
                id="amountInput"
                type="number"
                value={amount === null || amount === 0 ? "" : amount}
                onChange={(e) =>
                  setAmount(e.target.value ? parseInt(e.target.value) : 0)
                }
                className="w-[100px] text-black bg-white border-[3px] border-black sm:w-full bg-transparent text-slate-700 text-sm 
                   rounded-md pl-3 sm:pr-[65px] pr-4 py-2
                     transition duration-300 ease
                     focus:outline-none focus:border-slate-400 hover:border-slate-300 
                     shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <p className="flex items-center mt-2 text-xs text-[#D6D3DA] text-slate-400">
              Enter the limit number, or leave blank if no limit.
            </p>
          </div>
        </div>

        <div
          style={{ backgroundColor: color.color2 }}
          className=" px-[30px] md:px-[45px] py-[25px] rounded-[8px] gap-x-[15px] bg-white translate-y-[-10px]"
        >
          <div className="">
            <p className="font-medium font-press-gothic">
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "rgb(254, 216, 60)",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                form
              </span>
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "rgb(255, 255, 255)",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                {" "}
                color
              </span>
            </p>
            <p className="text-[0.68em] text-white mt-[10px] max-w-[300px]">
              Choose your color style to display by hovering the mouse over the
              color palette.
            </p>
          </div>
          <div className="flex justify-between">
            {Object.keys(color).map((key, index) => (
              <div key={key}>
                {index > 1 && index < 8 && (
                  <input
                    type="color"
                    onChange={(e) =>
                      updateColor(key as keyof ColorState, e.target.value)
                    } // Ensure key is typed correctly
                    value={color[key as keyof ColorState]}
                    className="color-input w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: color.color2,
          }}
          className="bg-[8px] px-[30px] md:px-[45px] py-[25px] rounded-[8px] item-center flex justify-between gap-x-[15px] translate-y-[-10px]"
        >
          <div className="">
            <p className="font-medium font-press-gothic">
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "white",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                Export
              </span>
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "rgb(77, 120, 231)",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                {" "}
                form
              </span>
            </p>
            <p className="text-[11px] text-white mt-[10px] max-w-[300px]">
              Export forms to google sheet
            </p>
          </div>

          <button
            type="button"
            style={{
              backgroundColor: "rgb(254, 216, 60)",
              filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
            }}
            className="px-[20px] sm:px-[40px] rounded-[25px]  border-[3px] border-black text-[0.85em] sm:text-[1em] py-2 font-press-gothic text-black h-full"
          >
            EXPORT
          </button>
        </div>

        <div
          style={{ backgroundColor: color.color2 }}
          className="bg-[8px] px-[30px] md:px-[45px] py-[25px] 
              rounded-[8px]  flex justify-between items-center gap-x-[15px] translate-y-[-10px]"
        >
          <div className="">
            <p className="font-medium font-press-gothic">
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "rgb(224, 83, 125)",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                Delete
              </span>
              <span
                style={{
                  fontSize: "1.7em",
                  transition: "all 0.3s ease",
                  color: "white",
                  WebkitTextStroke: "0.1em black",
                  paintOrder: "stroke fill",
                  textShadow: `
  0px 0px 0px rgb(0, 0, 0), 
  2px 2px 0px rgb(0, 0, 0),
  -1px 2px 0px rgb(0, 0, 0),
  0px 2px 0px rgb(0, 0, 0)
  `,
                }}
              >
                {" "}
                form
              </span>
            </p>
            <p className="text-[11px] text-white mt-[10px] max-w-[300px]">
              Removes all data entered in a form, usually before submission or
              permanently
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDelForm(true)}
            style={{
              backgroundColor: "rgb(224, 83, 125)",
              filter: "drop-shadow(0px 2px 0px rgb(255, 255, 255))",
            }}
            className="px-[20px] sm:px-[40px] rounded-[25px]  border-[3px] text-[0.85em] sm:text-[1em] py-2 font-press-gothic text-white h-full"
          >
            DELETE
          </button>
        </div>
        <div className="flex mb-[70px]  justify-end">
          {" "}
          <button
            onClick={() => setSetting()}
            style={{
              backgroundColor: isSaveData ? color.color10 : color.color2,
              padding: "15px 0",
              borderRadius: "10px",
            }}
            type="button"
            className="text-white w-[100px] text-[13px]"
          >
            {isSaveData ? "Saving..." : "Save Change"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default formrespone;
