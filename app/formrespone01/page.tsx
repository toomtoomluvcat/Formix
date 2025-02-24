"use client";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBarInForm from "../component/nav01";
import Image from "next/image";
import ApexCharts from "apexcharts";
import DynamicPieChart from "../component/graph/circle";
import DynamicBarChart from "../component/graph/bar";

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
  const [delForm, setDelForm] = useState<boolean>(false);
  const [isDel, setIsdel] = useState<string>("");
  const [letDel, setLetDel] = useState<boolean>(false);
  const [displayArchive, setDisplayArchive] = useState();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState<boolean>(false);
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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // const hadleSendData: MouseEventHandler<HTMLDivElement> = (color: {
  //   position: number;
  //   color1: string;
  //   color2: string;
  //   color3: string;
  // },limit:number,archive:boolean) => {
  //   sessionStorage.setItem("color":"")
  // };
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
      {showArchive && (
        <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
      )}
      {showArchive && (
        <div>
          {" "}
          <div
            style={{
              filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
            }}
            className="fixed top-1/2 left-1/2 border-[3px] border-black transform rounded-[15px]
           w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
          >
            <div className=" md:mb-[15px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
              <p className="font-medium text-[1.4em] sm:text-[1.7em] font-press-gothic">
                <span
                  style={{
                    transition: "all 0.3s ease",
                    color: "#302244",

                    paintOrder: "stroke fill",
                  }}
                >
                  Archive
                </span>
                <span
                  style={{
                    transition: "all 0.3s ease",
                    color: "rgb(28, 215, 147)",

                    paintOrder: "stroke fill",
                  }}
                >
                  {" "}
                  form
                </span>
              </p>
              <hr className="mb-4 mt-2 h-[1.5px] border-black border-2"></hr>
              <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
                Archiving the form will disable it, preventing others from
                accessing or submitting responses. However, all existing data
                and responses will remain intact and can be accessed later.
              </p>
            </div>
            <div>
              <div className="mb-[20px] mx-[15px] justify-end flex gap-x-[10px]">
                <p
                  onClick={() => {
                    setShowArchive(false);
                  }}
                  style={{
                    backgroundColor: "white",
                    filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
                  }}
                  className="text-[0.65em] border-[3px] font-press-gothic border-black sm:text-[0.8em] px-[20px] py-[5px] rounded-[14px] "
                >
                  cancel
                </p>
                <p
                  style={{
                    filter: letDel
                      ? "drop-shadow(0px 2px 0px rgb(0, 0, 0))"
                      : "",
                  }}
                  className={
                    "text-[0.65em] text-white border-[3px] border-black font-press-gothic bg-black sm:text-[0.8em] px-[12px] py-[5px] rounded-[14px]"
                  }
                >
                  comfirm
                </p>
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
          <div className="mb-[20px] md:mb-[40px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
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

      <NavBarInForm />
      <div className="mx-[20px]">
        <div
          style={{ backgroundColor: color.color2 }}
          className="flex max-w-[670px] py-[5px]  justify-center rounded-[25px] gap-x-[15px] mx-auto items-center mt-[50px] px-[20px]"
        >
          <h2
            style={{
              backgroundColor: display == 1 ? "white" : "transparent",
              filter: display == 1 ? "drop-shadow(0px 2px 0px #000000)" : "",
            }}
            onClick={() => setDisplay(1)}
            className={`${
              display === 1
                ? "border-[3px] text-[1.1em] border-black font-press-gothic w-[120px] text-center py-[4px] rounded-[20px]"
                : "w-[120px] text-[1.1em] font-press-gothic text-white text-center py-[6px] rounded-[7px]"
            } transition-colors transition-rounded duration-[500ms]`}
          >
            All response
          </h2>
          <h2
            style={{
              backgroundColor: display == 2 ? "white" : "transparent",
              filter: display == 2 ? "drop-shadow(0px 2px 0px #000000)" : "",
            }}
            onClick={() => setDisplay(2)}
            className={`${
              display === 2
                ? "border-[3px] text-[1.1em] border-black font-press-gothic w-[120px] text-center py-[4px] rounded-[20px]"
                : "w-[120px] text-[1.1em] font-press-gothic text-white text-center py-[6px] rounded-[7px]"
            } transition-colors transition-rounded duration-[500ms]`}
          >
            Individual
          </h2>
          <h2
            style={{
              backgroundColor: display == 3 ? "white" : "transparent",
              filter: display == 3 ? "drop-shadow(0px 2px 0px #000000)" : "",
            }}
            onClick={() => setDisplay(3)}
            className={`${
              display === 3
                ? "border-[3px] text-[1.1em] border-black font-press-gothic w-[120px] text-center py-[4px] rounded-[20px]"
                : "w-[120px] text-[1.1em] font-press-gothic text-white text-center py-[6px] rounded-[7px]"
            } transition-colors transition-rounded duration-[500ms]`}
          >
            Setting
          </h2>
        </div>
      </div>

      {display === 1 && (
        <div className="">
          <div className="max-w-[800px] mx-auto px-[30px]  mt-[50px]">
            <div
              style={{ backgroundColor: color.color2 }}
              className="  z-40
               rounded-lg shadow p-4 md:p-6"
            >
              <div className="fle justify-between items-start ">
                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="flex justify-between mx-auto w-full px-[30px] md:px-[70px] items-center gap-x-[15px]">
                      <div className="flex items-center gap-x-[15px]">
                        <Image
                          src="/Icon-form/theme2/I13.png"
                          width={1000}
                          height={1000}
                          quality={100}
                          alt="question"
                          className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
                        />
                        <div>
                          <p
                            style={{
                              fontSize: "1em",
                              transition: "all 0.3s ease",
                              color: "white",
                              WebkitTextStroke: "0.15em black",
                              paintOrder: "stroke fill",
                              textShadow: `
      2px 0px 0px rgb(0, 0, 0), 
      2px 2px 0px rgb(0, 0, 0),
      1px 2px 0px rgb(0, 0, 0),
      0px 1px 0px rgb(0, 0, 0)
    `,
                            }}
                            className=" font-press-gothic text-white sm:text-[1em] font-medium"
                          >
                            Question 1
                          </p>
                          <p
                            style={{
                              fontSize: "1.7em",
                              transition: "all 0.3s ease",
                              color: "white",
                              WebkitTextStroke: "0.1em black",
                              paintOrder: "stroke fill",
                              textShadow: `
      0px 0px 0px rgb(0, 0, 0), 
      2px 3px 0px rgb(0, 0, 0),
      -1px 3px 0px rgb(0, 0, 0),
      0px 2px 0px rgb(0, 0, 0)
    `,
                            }}
                            className=" translate-y-[-5px] font-press-gothic text-white sm:text-[1.5em]"
                          >
                            dog is cat right?
                          </p>
                        </div>
                      </div>
                      <div
                        ref={dropdownRef}
                        style={{
                          backgroundColor: `rgb(254, 216, 60)`,
                          filter: "drop-shadow(0px 3.5px 0px #000000)",
                        }}
                        className="relative py-[5px] px-[10px] border-[3.2px] border-black rounded-[25px] w-[100px] sm:w-[140px] cursor-pointer"
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
                            className="sm:w-[15px]  sm:h-[15px] w-[12px] h-[12px]"
                          />
                          <p className="text-[0.8em] mt-[1px] font-press-gothic sm:text-[1em]">
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
                              boxShadow: "0px 0px 1px 0px rgb(0, 0, 0)",
                            }}
                            className="absolute px-[10px] translate-x-[-12px] bottom-[48px] z-40 py-[10px] border-[3px] border-black bg-white rounded-[18px]"
                          >
                            {options.map((option, optionIndex) => (
                              <div key={optionIndex}>
                                <div
                                  onClick={() => (
                                    setIsOpen(false), setChart(optionIndex)
                                  )}
                                  className="py-[4px] px-[5px] z-41 items-center transition-all duration-[300ms] rounded-[4px] my-[2px] w-[140px] flex gap-x-[8px]" // Tailwind CSS ของคุณ
                                  style={{
                                    backgroundColor:
                                      hoveredIndex === optionIndex
                                        ? `${color.color7}`
                                        : "transparent",
                                  }}
                                  onMouseEnter={() =>
                                    handleMouseEnter(optionIndex)
                                  }
                                  onMouseLeave={handleMouseLeave}
                                >
                                  <Image
                                    className="sm:w-[15px] sm:h-[15px] w-[12px] h-[12px]"
                                    src={option.imgSrc}
                                    width={option.wideth}
                                    height={20}
                                    alt={option.label}
                                  />
                                  <p className="text-[0.8em] font-press-gothic sm:text-[1em]">
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

              <div className="mx-auto flex justify-center">
                <div className="h-[2px] w-[78%] mt-2 bg-white " />
              </div>
              {options[chart]?.label === "Circle" && (
                <DynamicPieChart
                  color={[
                    "rgb(58, 44, 77)",
                    "rgb(224, 83, 125)",
                    "rgb(255, 147, 86)",
                    "rgb(254, 216, 60)",
                    "rgb(28, 215, 147)",
                    "rgb(106, 165, 218)",
                    "rgb(77, 120, 231)",
                    "#0088FE",
                    "#00C49F",
                    "#FFBB28",
                    "#FF8042",
                    "#8884D8",
                    "#82CA9D",
                    "#F06292",
                    "#BA68C8",
                    "#4DD0E1",
                    "#DCE775",
                  ]}
                  theme={"0002"}
                  data={setData}
                ></DynamicPieChart>
              )}
              {options[chart]?.label === "Bar" && (
                <div className="mt-4">
                  <DynamicBarChart
                  color={[
                    "rgb(58, 44, 77)",
                    "rgb(224, 83, 125)",
                    "rgb(255, 147, 86)",
                    "rgb(254, 216, 60)",
                    "rgb(28, 215, 147)",
                    "rgb(106, 165, 218)",
                    "rgb(77, 120, 231)",
                    "#0088FE",
                    "#00C49F",
                    "#FFBB28",
                    "#FF8042",
                    "#8884D8",
                    "#82CA9D",
                    "#F06292",
                    "#BA68C8",
                    "#4DD0E1",
                    "#DCE775",
                  ]}
                    theme={"0002"}
                    data={setData}
                  ></DynamicBarChart>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {display == 2 && (
        <div className="flex flex-col justify-center items-center mt-[100px]">
          <Image
            src="/Icon-form/Theme2/I15.png"
            width={1000}
            height={1000}
            quality={100}
            alt="question"
            className=" sm:w-[150px] h-auto w-[120px] "
          />
          <h2 className="mt-[45px] font-medium font-press-gothic text-[1.8em] sm:text-[2.5em]">
            No Respone yet
          </h2>
          <h2 className="mt-[10px] text-[1em] sm:text-[1.2em] text-[#808080] max-w-[250px]  font-press-gothic text-center">
            Your form has no responses. Create it and share widely
          </h2>
        </div>
      )}
      {display == 3 && (
        <div className="mx-auto px-[30px] max-w-[700px] flex flex-col gap-y-[35px] mt-[50px]">
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
                This archive temporarily stores your forms to prevent
                submissions. You can reactivate them later.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowArchive(!showArchive)}
              style={{
                backgroundColor: "rgb(254, 216, 60)",
                filter: "drop-shadow(0px 2px 0px rgb(0, 0, 0))",
              }}
              className="px-[20px] sm:px-[40px] rounded-[25px]  border-[3px] border-black text-[0.85em] sm:text-[1em] py-2 font-press-gothic text-black h-full"
            >
              ARCHIVE
            </button>
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
            <div className="mb-[40px]">
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
                Choose your color style to display by hovering the mouse over
                the color palette.
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
            <div className="mb-[10px]">
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
              rounded-[8px] mb-[70px] flex justify-between items-center gap-x-[15px] translate-y-[-10px]"
          >
            <div className="mb-[10px]">
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
        </div>
      )}
    </div>
  );
}

export default formrespone;
