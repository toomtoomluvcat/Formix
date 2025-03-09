import React, { useState, useRef, useEffect } from "react";
import Inputtext from "./inputtext01";
import InputNumber from "./inputnumber01";
import InputMutiple from "./inputmutiple01";
import Image from "next/image";

interface Option {
  labelChoice: string;
  limitAns: number | null;
}
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
  color10?: string | null;
}
interface InputProp {
  requiredQuestion: boolean;
  typeQuestion: string;
  titleQuestion: string;
  deleteFromById: () => void;
  updateRequired: () => void;
  updatelimitAns: (optionIndex: number, limitAns: number) => void;
  updatelabelChoice: (optionIndex: number, newlabelChoice: string) => void;
  addlabelChoice: () => void;
  optionsValue?: Option[];
  color: Color;
  addChangeType: (newType: string) => void;
  addChangeTitle: (newTitle: string) => void;
  deleteChoiceById: (choiceToDel: number) => void;
}

function Text({
  requiredQuestion,
  typeQuestion,
  titleQuestion,
  deleteFromById,
  updateRequired,
  deleteChoiceById,
  updatelimitAns,
  updatelabelChoice,
  addlabelChoice,
  optionsValue,
  color,
  addChangeTitle,
  addChangeType,
}: InputProp) {
  const [nameQuestion, setNameQuestion] = useState<string>("");
  const [type, setType] = useState<string>("Text");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    setType(typeQuestion);
    setNameQuestion(titleQuestion);
    setIsChecked(requiredQuestion);
  }, [titleQuestion, typeQuestion, requiredQuestion]);

  useEffect(() => {
    setType(typeQuestion);
    setNameQuestion(titleQuestion);

    if (divRef.current) {
      divRef.current.textContent = titleQuestion;
    }
  }, [titleQuestion, typeQuestion]);

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>): void => {
    const newTitle: string = e.currentTarget.textContent || "";
    setNameQuestion(newTitle);
    addChangeTitle(newTitle);
  };

  useEffect(() => {
    const handleDeletion = () => {
      if (divRef.current) {
        divRef.current.textContent = titleQuestion;
      }
    };
    handleDeletion();
  }, [titleQuestion]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeChange = (newType: string) => {
    setType(newType);
    addChangeType(newType);
    setIsOpen(false);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };
  const updateIsChecked = () => {
    setIsChecked(!isChecked);
    updateRequired();
  };
  const options = [
    {
      value: "text",
      labelChoice: "Text",
      imgSrc: "/Icon-form/Theme2/I03.png",
      wideth: 50,
      height: 50,
    },
    {
      value: "number",
      labelChoice: "Number",
      imgSrc: "/Icon-form/Theme2/I04.png",
      wideth: 22,
      height: 22,
    },
    {
      value: "check",
      labelChoice: "check",
      imgSrc: "/Icon-form/Theme2/I05.png",
      wideth: 22,
      height: 16,
    },
    
    {
      value: "dropdown",
      labelChoice: "Dropdown",
      imgSrc: "/Icon-form/Theme2/I07.png",
      wideth: 20,
      height: 20,
    },
  ];

  return (
    <div className="relative">
      <div
        style={{ backgroundColor: `${color.color2}` }}
        className=" py-[20px] mb-[20px] rounded-[20px] px-[30px] bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.34)]"
      >
        <div className="flex justify-between flex-wrap">
          <div className="page-other max-w-[215px] sm:max-w-[300px]">
            <div
              ref={divRef}
              onInput={handleInputChange}
              contentEditable="true"
              suppressContentEditableWarning={true}
              role="textbox"
              data-placeholder="+Question"
              className={`${
                !nameQuestion ? "placeholder" : ""
              } p-[4px] focus:outline-none 
    focus:border-b-2 font-press-gothic border-[#E5e5e5] focus:border-black transition-border duration-500 mb-4`}
              onFocus={(e) => {
                e.target.style.backgroundColor = color.color10 ?? "";
              }}
              style={{
                fontSize: "1.7em",
                transition: "all 0.3s ease",
                color: "white",
                WebkitTextStroke: "3px black",
                paintOrder: "stroke fill",
                textShadow: `
      0px 0px 0px rgb(0, 0, 0), 
      1px 3px 0px rgb(0, 0, 0),
      -1px 3px 0px rgb(0, 0, 0),
      0px 2px 0px rgb(0, 0, 0)
    `,
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              style={{
                backgroundColor: `${color.color7}`,
                filter: "drop-shadow(0px 3.5px 0px #000000)",
              }}
              className="py-[5px] px-[10px] border-[3.2px] border-black rounded-[25px] w-[130px] cursor-pointer"
              onClick={handleDropdownClick}
            >
              <div className="flex w-full justify-center items-center">
                <div className="flex items-center ml-4">
                  <div className="font-press-gothic text-[1em] underline">
                    {
                      options.find((option) => option.value === type)
                        ?.labelChoice
                    }
                  </div>
                </div>
                <svg
                  className={
                    isOpen
                      ? "rotate-180 transition-all duration-[700ms]"
                      : "transition-all duration-[700ms]"
                  }
                  width="25"
                  height="25"
                  viewBox="0 0 47 47"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.9355 19.314L23.5001 29.7495L13.0646 19.314H33.9355Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            {isOpen && (
              <div
                style={{
                  filter: "drop-shadow(2px 2px 0px #000000)",
                }}
                className="absolute translate-y-[10px] px-[10px] z-40  py-[10px] border-[3.5px] border-black bg-orange-400 rounded-[25px]"
              >
                {" "}
                <Image
                  src={"/decorationIcon/14.svg"}
                  width={100}
                  height={100}
                  alt="icon"
                  className="right-4 top-[-7px] absolute w-[20px]"
                ></Image>
                <svg className="absolute w-[30px] top-[160px] left-[-10px]"
                  width="52"
                  height="49"
                  viewBox="0 0 52 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="path-1-outside-1_1656_39"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="52"
                    height="49"
                    fill="black"
                  >
                    <rect fill="white" width="52" height="49" />
                    <path d="M30.7112 5.60741V17.3296L41.4428 13.6974L44.7448 22.2827L34.0132 26.7404L40.7824 36.3163L33.5179 41.7646L26.0884 32.0236L18.989 41.7646L11.3943 36.3163L18.1635 26.4102L7.26679 22.2827L10.4037 13.6974L21.6306 17.3296V5.60741H30.7112Z" />
                  </mask>
                  <path
                    d="M30.7112 5.60741V17.3296L41.4428 13.6974L44.7448 22.2827L34.0132 26.7404L40.7824 36.3163L33.5179 41.7646L26.0884 32.0236L18.989 41.7646L11.3943 36.3163L18.1635 26.4102L7.26679 22.2827L10.4037 13.6974L21.6306 17.3296V5.60741H30.7112Z"
                    fill={"rgb(224, 83, 125)"}
                  />
                  <path
                    d="M30.7112 5.60741H35.7112V0.607413H30.7112V5.60741ZM30.7112 17.3296H25.7112V24.3005L32.3142 22.0657L30.7112 17.3296ZM41.4428 13.6974L46.1095 11.9025L44.3864 7.42244L39.8398 8.9613L41.4428 13.6974ZM44.7448 22.2827L46.6629 26.9001L51.1595 25.0323L49.4115 20.4878L44.7448 22.2827ZM34.0132 26.7404L32.0952 22.1229L26.3214 24.5213L29.9303 29.6266L34.0132 26.7404ZM40.7824 36.3163L43.7824 40.3163L47.6713 37.3996L44.8653 33.4301L40.7824 36.3163ZM33.5179 41.7646L29.5423 44.7969L32.5501 48.7405L36.5179 45.7646L33.5179 41.7646ZM26.0884 32.0236L30.064 28.9914L25.9972 23.6595L22.0476 29.0787L26.0884 32.0236ZM18.989 41.7646L16.0745 45.8273L20.1068 48.7201L23.0297 44.7096L18.989 41.7646ZM11.3943 36.3163L7.2661 33.4953L4.50888 37.5303L8.47979 40.379L11.3943 36.3163ZM18.1635 26.4102L22.2917 29.2311L25.8765 23.9851L19.9346 21.7344L18.1635 26.4102ZM7.26679 22.2827L2.57046 20.5667L0.874582 25.208L5.49565 26.9584L7.26679 22.2827ZM10.4037 13.6974L11.9428 8.94016L7.36033 7.45759L5.70739 11.9814L10.4037 13.6974ZM21.6306 17.3296L20.0915 22.0868L26.6306 24.2024V17.3296H21.6306ZM21.6306 5.60741V0.607413H16.6306V5.60741H21.6306ZM25.7112 5.60741V17.3296H35.7112V5.60741H25.7112ZM32.3142 22.0657L43.0458 18.4335L39.8398 8.9613L29.1082 12.5935L32.3142 22.0657ZM36.7761 15.4923L40.0781 24.0775L49.4115 20.4878L46.1095 11.9025L36.7761 15.4923ZM42.8268 17.6652L32.0952 22.1229L35.9313 31.3579L46.6629 26.9001L42.8268 17.6652ZM29.9303 29.6266L36.6995 39.2025L44.8653 33.4301L38.0961 23.8542L29.9303 29.6266ZM37.7824 32.3163L30.5179 37.7646L36.5179 45.7646L43.7824 40.3163L37.7824 32.3163ZM37.4935 38.7324L30.064 28.9914L22.1127 35.0559L29.5423 44.7969L37.4935 38.7324ZM22.0476 29.0787L14.9483 38.8197L23.0297 44.7096L30.1291 34.9686L22.0476 29.0787ZM21.9035 37.7019L14.3089 32.2536L8.47979 40.379L16.0745 45.8273L21.9035 37.7019ZM15.5225 39.1372L22.2917 29.2311L14.0353 23.5892L7.2661 33.4953L15.5225 39.1372ZM19.9346 21.7344L9.03792 17.6069L5.49565 26.9584L16.3923 31.086L19.9346 21.7344ZM11.9631 23.9986L15.1 15.4133L5.70739 11.9814L2.57046 20.5667L11.9631 23.9986ZM8.86461 18.4546L20.0915 22.0868L23.1697 12.5724L11.9428 8.94016L8.86461 18.4546ZM26.6306 17.3296V5.60741H16.6306V17.3296H26.6306ZM21.6306 10.6074H30.7112V0.607413H21.6306V10.6074Z"
                    fill="black"
                    mask="url(#path-1-outside-1_1656_39)"
                  />
                </svg>
                {options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <div className="absolute"></div>
                    <div
                      onClick={() => handleTypeChange(option.value)}
                      className="py-[4px] px-[5px]  items-center transition-all duration-[300ms] rounded-[4px] my-[2px] w-[140px] flex gap-x-[8px]" // Tailwind CSS ของคุณ
                      style={{
                        backgroundColor:
                          hoveredIndex === optionIndex
                            ? `${color.color7}`
                            : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter(optionIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        className="h-[19px] w-[18px]"
                        src={option.imgSrc}
                        width={option.wideth}
                        height={20}
                        alt={option.value}
                      />
                      <p className="font-press-gothic text-[1em]">
                        {option.labelChoice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="">
          {type === "number" && <InputNumber color={color}></InputNumber>}
          {type === "text" && <Inputtext color={color} />}
          {type === "mutiple" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updatelimitAns={(optionsIndex: number, limitAns: number) =>
                updatelimitAns(optionsIndex, limitAns)
              }
              updatelabelChoice={(
                optionIndex: number,
                newlabelChoice: string
              ) => updatelabelChoice(optionIndex, newlabelChoice)}
              optionsValue={optionsValue}
              addlabelChoice={() => addlabelChoice()}
            ></InputMutiple>
          )}
          {type === "check" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updatelimitAns={(optionsIndex: number, limitAns: number) =>
                updatelimitAns(optionsIndex, limitAns)
              }
              updatelabelChoice={(
                optionIndex: number,
                newlabelChoice: string
              ) => updatelabelChoice(optionIndex, newlabelChoice)}
              optionsValue={optionsValue}
              addlabelChoice={() => addlabelChoice()}
            ></InputMutiple>
          )}
          {type === "dropdown" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updatelimitAns={(optionsIndex: number, limitAns: number) =>
                updatelimitAns(optionsIndex, limitAns)
              }
              updatelabelChoice={(
                optionIndex: number,
                newlabelChoice: string
              ) => updatelabelChoice(optionIndex, newlabelChoice)}
              optionsValue={optionsValue}
              addlabelChoice={() => addlabelChoice()}
            ></InputMutiple>
          )}
          <div>
            <div className="flex mt-4 justify-end pt-2 gap-x-[5px] items-center">
              <p
                className="font-press-gothic"
                style={{
                  fontSize: "1.3em",
                  transition: "all 0.3s ease",
                  color: "white",
                  WebkitTextStroke: "3px black",
                  paintOrder: "stroke fill",
                  textShadow: `
      0px 0px 0px rgb(0, 0, 0), 
      1px 3px 0px rgb(0, 0, 0),
      -1px 3px 0px rgb(0, 0, 0),
      0px 2px 0px rgb(0, 0, 0)
    `,
                }}
              >
                required
              </p>
              <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => updateIsChecked()}
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
              <Image
                src={"/Icon-form/Theme2/I08.png"}
                width={100}
                height={100}
                alt="icon"
                className="w-[6px] h-[25px]"
              ></Image>
              <div className="w-[1px] bg-black"></div>
              <Image
                src={"/Icon-form/Theme2/I10.png"}
                width={100}
                height={100}
                alt="icon"
                className="w-[25px] h-[25px]"
              ></Image>

              <svg
                onClick={() => deleteFromById()}
                width="25"
                height="25"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1465_4828)">
                  <rect
                    x="9.9165"
                    y="7.08325"
                    width="14.1667"
                    height="21.25"
                    fill={`${color.color3}`}
                  />
                  <path
                    d="M9.9165 29.75C9.13734 29.75 8.47032 29.4726 7.91546 28.9177C7.3606 28.3628 7.08317 27.6958 7.08317 26.9167V8.5H5.6665V5.66667H12.7498V4.25H21.2498V5.66667H28.3332V8.5H26.9165V26.9167C26.9165 27.6958 26.6391 28.3628 26.0842 28.9177C25.5294 29.4726 24.8623 29.75 24.0832 29.75H9.9165ZM24.0832 8.5H9.9165V26.9167H24.0832V8.5ZM12.7498 24.0833H15.5832V11.3333H12.7498V24.0833ZM18.4165 24.0833H21.2498V11.3333H18.4165V24.0833Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1465_4828"
                    x="5.6665"
                    y="4.25"
                    width="24.0832"
                    height="26.9167"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1.41667" dy="1.41667" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1465_4828"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1465_4828"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text;
