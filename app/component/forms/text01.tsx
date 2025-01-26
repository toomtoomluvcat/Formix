import React, { useState, useRef, useEffect } from "react";
import Inputtext from "./inputtext01";
import InputNumber from "./inputnumber01";
import InputMutiple from "./inputmutiple01";
import Image from "next/image";

interface Option {
  label: string;
  limit: number | null;
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
  updateLimit: (optionIndex: number, limit: number) => void;
  updateLabel: (optionIndex: number, newLabel: string) => void;
  addLabel: () => void;
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
  updateLimit,
  updateLabel,
  addLabel,
  optionsValue,
  color,
  addChangeTitle,
  addChangeType,
}: InputProp) {
  const [nameQuestion, setNameQuestion] = useState<string>("");
  const [type, setType] = useState<string>("text");
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
      label: "Text",
      imgSrc: "/Icon-form/Theme2/I03.png",
      wideth: 50,
      height: 50,
    },
    {
      value: "number",
      label: "Number",
      imgSrc: "/Icon-form/Theme2/I04.png",
      wideth: 22,
      height: 22,
    },
    {
      value: "mutiple",
      label: "Multiple",
      imgSrc: "/Icon-form/Theme2/I05.png",
      wideth: 22,
      height: 16,
    },
    {
      value: "check",
      label: "Check",
      imgSrc: "/Icon-form/Theme2/I06.png",
      wideth: 22,
      height: 10,
    },
    {
      value: "dropdown",
      label: "Dropdown",
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
                fontSize: "28px",
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
                  <div className="font-press-gothic text-[1rem] underline">
                    {options.find((option) => option.value === type)?.label}
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
                  boxShadow: "0px 0px 1px 0px  rgba(0,0,0,0.34)",
                }}
                className="absolute translate-y-[10px] px-[10px] z-40  py-[10px] border-[3px] border-black bg-white rounded-[12px]"
              >
                {options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <div
                      onClick={() => handleTypeChange(option.value)}
                      className="py-[4px] px-[5px] text-[0.85rem] items-center transition-all duration-[300ms] rounded-[4px] my-[2px] w-[140px] flex gap-x-[8px]" // Tailwind CSS ของคุณ
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
                      <p className="font-press-gothic text-[16px]">
                        {option.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="">
          {type === "number" && <InputNumber  color={color}></InputNumber>}
          {type === "text" && <Inputtext color={color} />}
          {type === "mutiple" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updateLimit={(optionsIndex: number, limit: number) =>
                updateLimit(optionsIndex, limit)
              }
              updateLabel={(optionIndex: number, newLabel: string) =>
                updateLabel(optionIndex, newLabel)
              }
              optionsValue={optionsValue}
              addLabel={() => addLabel()}
            ></InputMutiple>
          )}
          {type === "check" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updateLimit={(optionsIndex: number, limit: number) =>
                updateLimit(optionsIndex, limit)
              }
              updateLabel={(optionIndex: number, newLabel: string) =>
                updateLabel(optionIndex, newLabel)
              }
              optionsValue={optionsValue}
              addLabel={() => addLabel()}
            ></InputMutiple>
          )}
          {type === "dropdown" && (
            <InputMutiple
              color={color}
              deleteChoiceById={(ChoiceById: number) =>
                deleteChoiceById(ChoiceById)
              }
              updateLimit={(optionsIndex: number, limit: number) =>
                updateLimit(optionsIndex, limit)
              }
              updateLabel={(optionIndex: number, newLabel: string) =>
                updateLabel(optionIndex, newLabel)
              }
              optionsValue={optionsValue}
              addLabel={() => addLabel()}
            ></InputMutiple>
          )}
          <div>
            <div className="flex mt-4 justify-end pt-2 gap-x-[5px] items-center">
              <p
                className="font-press-gothic"
                style={{
                  fontSize: "20px",
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
