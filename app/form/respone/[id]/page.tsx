"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBarInForm from "@/app/component/nav";
import Image from "next/image";
import DynamicBarChart from "@/app/component/graph/bar";
import DynamicPieChart from "@/app/component/graph/circle";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function formrespone() {
  const { id } = useParams();
  const [display, setDisplay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<
    {
      imgSrc: string;
      wideth: number;
      label: string;
    }[]
  >([
    { imgSrc: "/Icon-form/16.png", wideth: 20, label: "Circle" },
    { imgSrc: "/Icon-form/17.png", wideth: 20, label: "Bar" },
  ]);
  const [dataChart, setDataChart] = useState<{ question: string; data: { name: string[]; value: number }[] }[]>([]);
  const [chart, setChart] = useState<number>(0);
  const [isSaveData, setIsSaveData] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  const [ivdRespone, setIvDRespone] = useState<
    | {
        time: number;
        email: string;
        data: { question: string; answer: string }[];
      }[]
    | null
  >([]);

  const setData = [
    [
      { name: "Software Development", value: 5 },
      { name: "Network Engineering", value: 4 },
      { name: "Cyber Security", value: 6 },
      { name: "Database Administration", value: 7 },
      { name: "IT Support", value: 3 },
      { name: "Product Management", value: 5 },
    ],
    [
      { name: "Finance", value: 8 },
      { name: "Accounting", value: 4 },
      { name: "Investment", value: 6 },
      { name: "Risk Management", value: 5 },
      { name: "Insurance", value: 7 },
      { name: "Audit", value: 3 },
    ],
    [
      { name: "Marketing", value: 6 },
      { name: "Public Relations", value: 4 },
      { name: "Content Creation", value: 5 },
      { name: "Branding", value: 7 },
      { name: "Social Media", value: 6 },
      { name: "Advertising", value: 3 },
    ],
    [
      { name: "Sales", value: 9 },
      { name: "Customer Service", value: 4 },
      { name: "Business Development", value: 8 },
      { name: "Retail", value: 5 },
      { name: "Wholesale", value: 7 },
      { name: "E-commerce", value: 6 },
    ],
    [
      { name: "Healthcare", value: 7 },
      { name: "Nursing", value: 5 },
      { name: "Medical Research", value: 6 },
      { name: "Pharmacy", value: 4 },
      { name: "Psychology", value: 8 },
      { name: "Surgery", value: 3 },
    ],
    [
      { name: "Legal", value: 6 },
      { name: "Criminal Law", value: 5 },
      { name: "Corporate Law", value: 7 },
      { name: "Family Law", value: 4 },
      { name: "Intellectual Property", value: 6 },
      { name: "Environmental Law", value: 3 },
    ],
  ];
  const [isShow, setIsShow] = useState<boolean[]>([]);

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
  
 

  const showIvdRes = (position: number) => {
    setIsShow((prev) =>
      prev.map((item, index) => (index === position ? !item : item))
    );
  };

  

  const router = useRouter();

 

  useEffect(() => {
    
    if (!id) {
      router.push("/workspace")
    };

    async function fetchUserData() {
      const token = localStorage.getItem("token");
      const expDate = localStorage.getItem("expDate");
    
      if (!token || !expDate || Number(expDate) < Date.now()) {
        router.push("/signin");
        return;
      }
    
      try {
        const responseRes = await fetch(
          `http://localhost:5001/dashboard/form/${id}/responses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
    
        if (!responseRes.ok) throw new Error("Failed to fetch responses");
    
        const responseData = await responseRes.json();
        const formattedResponses =
          responseData.responses?.map((resp: any) => ({
            time: new Date(resp.createdAt).getTime(),
            email: resp.email || "Anonymous",
            data: (resp.answers ?? []).map((ans: any) => ({
              question: ans.questionTitle,
              answer: ans.value,
            })),
          })) ?? [];
    
        setIvDRespone(formattedResponses);
    
        const graphRes = await fetch(
          `http://localhost:5001/dashboard/form/${id}/graph`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
    
        if (!graphRes.ok) throw new Error("Failed to fetch graph data");
    
        const graphData = await graphRes.json();
        setDataChart(graphData.setData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchUserData();
    
  }, [id]);

  useEffect(() => {
    if (dataChart && dataChart[0] && dataChart[0].data) {
      console.log(JSON.stringify(dataChart[0].data, null, 2));
    } else {
      console.log('Data is not available or not properly initialized');
    }
  }, [dataChart]);
  
  
  useEffect(()=>{
    setIsShow(ivdRespone?.map(() => false) || []);
  },[ivdRespone])



  return (
    <div className="relative">
      <nav>
        <div className="flex justify-between max-w-[1280px] mx-auto mt-6 px-[30px]">
          <Link href={"/"}>
            <Image
              src="/Icon-form/FORMIX LOGO.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[23px]  w-[70px]"
            />
          </Link>
        </div>
      </nav>

      <div className="flex max-w-[370px] justify-between gap-x-[15px] mx-auto items-center text-[13px] mt-[50px] px-[20px]">
      <h2
          onClick={() => setDisplay(1)}
          className={
            display === 1
              ? "text-white hover:bg-[#212121] transition-all duration-[300ms] bg-black w-[170px] text-center py-[6px] rounded-[7px]"
              : "w-[170px] hover:bg-[#FCFCFC] transition-all duration-[300ms] text-center py-[6px] rounded-[7px] border-2"
          }
        >
         All Response
        </h2>
        <h2
          onClick={() => setDisplay(2)}
          className={
            display === 2
              ? "text-white hover:bg-[#212121] transition-all duration-[300ms] bg-black w-[170px] text-center py-[6px] rounded-[7px]"
              : "w-[170px] hover:bg-[#FCFCFC] transition-all duration-[300ms] text-center py-[6px] rounded-[7px] border-2"
          }
        >
            Individual
        </h2>
        
      </div>

      {display === 2 && (
        <div className="">
          <div className="max-w-[800px] mx-auto px-[30px] flex flex-col gap-[45px]  mt-[50px]">
            {dataChart?.map((item, index) => (
              <div key={index} className=" bg-black rounded-lg">
                <div
                  className="  translate-y-[-15px] z-40 bg-white border-2
               bg-white rounded-lg shadow  p-4 md:p-6"
                >
                  <div className="fle justify-between items-start ">
                    <div className="">
                      <div className="flex items-center mb-1">
                        <div className="flex justify-between mx-auto w-full px-[30px] md:px-[70px]  items-center gap-x-[15px]">
                          <div className="flex  items-center gap-x-[15px]">
                            <Image
                              src="/Icon-form/16.png"
                              width={1000}
                              height={1000}
                              quality={100}
                              alt="question"
                              className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                            />
                            <div>
                              <p className="text-[8px] sm:text-[11px] font-medium">
                                question {index + 1}
                              </p>
                              <p className="text-[#4C4C4C] text-[11px] mt-[2px] sm:text-[13px]">
                              {item.question}
                              </p>
                            </div>
                          </div>

                          <div
                            ref={dropdownRef}
                            className="relative rounded-[4px] flex justify-center py-[4px]"
                          >
                            <div
                              onClick={() => setIsOpen(!isOpen)}
                              className="flex items-center justify-center px-4 gap-x-2"
                            >
                              <Image
                                src={options[chart]?.imgSrc}
                                width={1000}
                                height={1000}
                                quality={100}
                                alt="question"
                                className="sm:w-[15px] sm:h-[15px] w-[12px] h-[12px]"
                              />
                              <p className="text-[11px] sm:text-[12px]">
                                {options[chart]?.label}
                              </p>

                              <Image
                                src="/Icon-form/18.png"
                                width={1000}
                                height={1000}
                                quality={100}
                                alt="question"
                                className={
                                  isOpen
                                    ? "sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] rotate-180 transition-all duration-[700ms]"
                                    : "sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] transition-all duration-1000"
                                }
                              />
                            </div>
                            {isOpen && (
                              <div
                                style={{
                                  boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
                                }}
                                className="absolute px-[10px] translate-y-[32px] z-40 py-[5px] bg-white rounded-[7px]"
                              >
                                {options.map((option, optionIndex) => (
                                  <div key={optionIndex}>
                                    <div
                                      onClick={() => (
                                        setIsOpen(false), setChart(optionIndex)
                                      )}
                                      className="py-[4px]  px-[5px] text-[0.85rem]  hover:bg-[#E5e5e5] transition-all duration-500
                          items-center rounded-[4px] my-[2px] w-[110px] sm:w-[140px] flex gap-x-[8px]"
                                    >
                                      <Image
                                        className="sm:w-[15px] sm:h-[15px] w-[12px] h-[12px]"
                                        src={option.imgSrc}
                                        width={option.wideth}
                                        height={20}
                                        alt={option.label}
                                      />
                                      <p className="text-[11px] sm:text-[12px]">
                                        {option.label}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {options[chart]?.label === "Circle" && (
                    <DynamicPieChart
                      color={[
                        "#222831",
                        "#2C323A",
                        "#393E46",
                        "#4E5965",
                        "#5E6B75",
                        "#6D9886",
                        "#7FA395",
                        "#89B9A8",
                        "#A1D1C2",
                        "#F2E7D5",
                        "#E5D1B8",
                        "#DCC9B6",
                        "#F7F7F7",
                        "#EDEDED",
                        "#DADADA",
                        "#C3C3C3",
                        "#B0B0B0",
                      ]}
                      theme={"0001"}
                      data={item?.data ?? []}
                    ></DynamicPieChart>
                  )}
                  {options[chart]?.label === "Bar" && (
                    <div className="mt-4">
                      <DynamicBarChart
                        color={[
                          "#222831",
                          "#2C323A",
                          "#393E46",
                          "#4E5965",
                          "#5E6B75",
                          "#6D9886",
                          "#7FA395",
                          "#89B9A8",
                          "#A1D1C2",
                          "#F2E7D5",
                          "#E5D1B8",
                          "#DCC9B6",
                          "#F7F7F7",
                          "#EDEDED",
                          "#DADADA",
                          "#C3C3C3",
                          "#B0B0B0",
                        ]}
                        theme={"0001"}
                        data={item?.data ?? []}
                      ></DynamicBarChart>
                    </div>
                  )}

                  <div className="py-6 px-16" id="chart"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {display == 1 && (
        <div className="mt-10">
          {ivdRespone?.map((item, index) => (
            <div
              key={index}
              className="max-w-[700px] mx-auto mt-4 border-2 rounded-lg mb-4 md:px-10 py-4 p-6"
              style={{
                filter: "drop-shadow(0px 5px 0px rgb(0, 0, 0))",
                backgroundColor: "white",
              }}
            >
              <div
                onClick={() => showIvdRes(index)}
                className="flex justify-between items-center mb-2 cursor-pointer"
              >
                <div>
                  <div className="text-[18px]">Response {index + 1}</div>
                  <div className="text-[13px]">{item.email ?? "guess"}</div>
                </div>
                <svg
                  className={`w-[0.7rem] h-4 ml-2 transition-transform duration-300 ${
                    isShow[index] ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>

              {/* Section ที่ต้องการให้มี Animation */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  isShow[index]
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="text-[13px] mb-2">
                  timeStamp:{" "}
                  {new Date(item.time).toLocaleString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,

                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",

                    timeZone: "Asia/Bangkok",
                  })}
                </div>

                {item.data?.map((datum, number) => (
                  <div key={number}>
                    {datum.question}: {datum.answer}
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default formrespone;
