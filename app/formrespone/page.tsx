"use client";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBarInForm from "../component/nav";
import Image from "next/image";
import DynamicBarChart from "../component/graph/bar";
import DynamicPieChart from "../component/graph/circle";

function formrespone() {
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
  const [chart, setChart] = useState<number>(0);
  const [isSaveData,setIsSaveData]= useState<boolean>(false)
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState<number | null>(0);
  const [color, setColor] = useState<{
    position: number;
    color1: string;
    color2: string;
    color3: string;
  }>({ position: 0, color1: "#000000", color2: "#c4c4c4", color3: "#f6f6f6" });
  const [delForm, setDelForm] = useState<boolean>(false);
  const [isDel, setIsdel] = useState<string>("");
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
  const [displayArchive, setDisplayArchive] = useState();

  // const hadleSendData: MouseEventHandler<HTMLDivElement> = (color: {
  //   position: number;
  //   color1: string;
  //   color2: string;
  //   color3: string;
  // },limit:number,archive:boolean) => {
  //   sessionStorage.setItem("color":"")
  // };
  const setData = [
    { name: "IT", value: 2 },
    { name: "Product Development", value: 2 },
    { name: "Sales", value: 6 },
    { name: "Marketing", value: 4 },
    { name: "Support", value: 3 },
    { name: "Human Resources", value: 5 },
    { name: "Finance", value: 7 },
    { name: "Operations", value: 6 },
    { name: "Legal", value: 3 },
    { name: "Customer Success", value: 4 },
    { name: "Engineering", value: 8 },
    { name: "Data Science", value: 4 },
    { name: "Quality Assurance", value: 2 },
    { name: "Design", value: 5 },
    { name: "Logistics", value: 6 },
    { name: "Procurement", value: 3 },
    { name: "Public Relations", value: 2 },
    { name: "Corporate Strategy", value: 5 },
    { name: "R&D", value: 7 },
    { name: "Training", value: 4 },
    { name: "Administration", value: 3 },
  ];
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
  
  const setSetting=():void=>{
    const setting ={
      limit:amount,
      archive:isChecked,
      color:color
    }
    localStorage.setItem("setting",JSON.stringify(setting))
    setIsSaveData(true)
    setTimeout(() => {
      setIsSaveData(false)
    }, 3000);
  }

  useEffect(() => {
    const setting = (localStorage.getItem("setting")?? "")
    if (setting){
      setColor(JSON.parse(setting).color)
      setAmount(JSON.parse(setting).limit)
  
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
   
  }, []);

  

 

  return (
    <div className="relative">
      {delForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
      )}
      {delForm && (
        <div
          style={{
            boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
          }}
          className="fixed top-1/2 left-1/2 transform rounded-[15px] w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
        >
          <div className="mb-[20px] md:mb-[40px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
            <p className="font-medium text-[12px] sm:text-[15px]">
              Delete forms{" "}
            </p>
            <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
              Are you sure you want to delete the form? Deleting the form will
              permanently remove all data, including all received responses, and
              none of the information can be recovered.
            </p>
            <p className="text-[9px] sm:text-[13px] text-red-500 px-[15px] mt-[15px] py-[10px] rounded-[7px] bg-red-300">
              <strong>Warning:</strong> This action is not reversible. Please be
              certain.
            </p>
          </div>
          <div className="flex flex-col gap-y-[10px] px-[45px] py-[15px]  w-full bg-[#f4f4f4] rounded-b-[15px]">
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
            <div className="mt-[12px] mb-[12px] justify-end flex gap-x-[10px]">
              <p
                onClick={() => {
                  setDelForm(false), setIsdel("");
                }}
                style={{
                  boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
                }}
                className="text-[9px] sm:text-[13px] px-[12px] py-[5px] rounded-[7px] "
              >
                cancel
              </p>
              <p
                style={{
                  boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
                }}
                className={
                  letDel
                    ? "text-[9px] text-white bg-black pointer-events-none sm:text-[13px] px-[12px] py-[5px] rounded-[7px] "
                    : "text-[9px] text-white bg-[#C4C4C4] sm:text-[13px] px-[12px] py-[5px] rounded-[7px]"
                }
              >
                comfirm
              </p>
            </div>
          </div>
        </div>
      )}

      <NavBarInForm />
      <div className="flex max-w-[370px] justify-between gap-x-[15px] mx-auto items-center text-[13px] mt-[50px] px-[20px]">
        <h2
          onClick={() => setDisplay(1)}
          className={
            display === 1
              ? "text-white hover:bg-[#212121] transition-all duration-[300ms] bg-black w-[170px] text-center py-[6px] rounded-[7px]"
              : "w-[170px] hover:bg-[#FCFCFC] transition-all duration-[300ms] text-center py-[6px] rounded-[7px] border-2"
          }
        >
          all response
        </h2>
        <h2
          onClick={() => setDisplay(2)}
          className={
            display === 2
              ? "text-white hover:bg-[#212121] transition-all duration-[300ms] bg-black w-[170px] text-center py-[6px] rounded-[7px]"
              : "w-[170px] hover:bg-[#FCFCFC] transition-all duration-[300ms] text-center py-[6px] rounded-[7px] border-2"
          }
        >
          individual
        </h2>
        <h2
          onClick={() => setDisplay(3)}
          className={
            display === 3
              ? "text-white hover:bg-[#212121] transition-all duration-[300ms] bg-black w-[170px] text-center py-[6px] rounded-[7px]"
              : "w-[170px] hover:bg-[#FCFCFC] transition-all duration-[300ms] text-center py-[6px] rounded-[7px] border-2"
          }
        >
          setting
        </h2>
      </div>

      {display === 1 && (
        <div className="">
          <div className="max-w-[800px] mx-auto px-[30px]  mt-[50px]">
            <div className=" bg-black rounded-lg">
              <div
                className="  translate-y-[-15px] z-40 bg-white border-2
               bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6"
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
                              question 1
                            </p>
                            <p className="text-[#4C4C4C] text-[11px] mt-[2px] sm:text-[13px]">
                              dog is cat right?
                            </p>
                          </div>
                        </div>
                        <div
                          ref={dropdownRef}
                          style={{
                            boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
                          }}
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
                <DynamicPieChart data={setData}></DynamicPieChart>
              )}
              {options[chart]?.label === "Bar" && (
                <div className="mt-4">
                  <DynamicBarChart data={setData}></DynamicBarChart>
                </div>
              )}

                <div className="py-6 px-16" id="chart"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {display == 2 && (
        <div className="flex flex-col justify-center items-center mt-[100px]">
          <Image
            src="/Icon-form/19.png"
            width={1000}
            height={1000}
            quality={100}
            alt="question"
            className=" sm:w-[274px] h-auto w-[200px] "
          />
          <h2 className="mt-[45px] font-medium text-[25px]">No Respone yet</h2>
          <h2 className="mt-[10px] text-[13px] max-w-[250px]  text-center">
            Your form has no responses. Create it and share widely
          </h2>
        </div>
      )}
      {display == 3 && (
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
                <p className="font-medium">form color </p>
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
                <p className="font-medium">form colour </p>
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
          <div className="bg-black rounded-[8px]">
            <div
              style={{
                boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
              }}
              className="bg-[8px] px-[30px] md:px-[45px] py-[25px] 
              rounded-[8px] flex justify-between gap-x-[15px] bg-white translate-y-[-10px]"
            >
              <div className="mb-[10px]">
                <p className="font-medium">Delete forms </p>
                <p className="text-[13px] text-[#474747] mt-[10px] max-w-[300px]">
                  Removes all data entered in a form, usually before submission
                  or permanently
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDelForm(true)}
                className="px-[15px] text-[13px] py-2 rounded-lg bg-black text-white h-full"
              >
                delete
              </button>
            </div>
          </div>
          <div className="flex justify-end mb-[100px]">
            <button className={`rounded-lg ${isSaveData? "bg-stone-800":"bg-black"} text-white w-[120px] py-[10px] text-[13px]`} disabled={isSaveData} onClick={()=>setSetting()} type="button">{isSaveData? "Saving ...":"Save change"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default formrespone;
