import React, { useState, useRef, useEffect } from "react";
import Inputtext from "./inputtext";
import InputNumber from "./inputnumber";
import InputMutiple from "./inputmutiple";
import Image from "next/image";

interface Option {
  label: string;
  limit: number | null;
}
interface Color {
  color1: string | null;
  color2: string | null;
  color3: string | null;
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
  const [isOpenDecoration,setIsOpenDecoration] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

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
      imgSrc: "/Icon-form/6.png",
      wideth: 20,
      height: 20,
    },
    {
      value: "number",
      label: "Number",
      imgSrc: "/Icon-form/7.png",
      wideth: 22,
      height: 22,
    },
    {
      value: "mutiple",
      label: "Multiple",
      imgSrc: "/Icon-form/9.png",
      wideth: 22,
      height: 16,
    },
    {
      value: "check",
      label: "Check",
      imgSrc: "/Icon-form/8.png",
      wideth: 22,
      height: 10,
    },
    {
      value: "dropdown",
      label: "Dropdown",
      imgSrc: "/Icon-form/10.png",
      wideth: 20,
      height: 20,
    },
  ];

  return (
    <div className="relative">
      <div style={{backgroundColor:color.color1?? ""}} className=" mb-[20px]  rounded-[20px]">
        <div className="translate-x-[10px] py-[20px]  border-2  rounded-[20px] px-[30px] bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0)]">
          <div className="flex justify-between flex-wrap">
            <div className="max-w-[215px] sm:max-w-[300px]">
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
                focus:border-b-2 border-[#E5e5e5] ] focus:border-black transition-border duration-500 mb-4`}
                onFocus={(e) => {
                  e.target.style.backgroundColor = color.color2 ?? "";
                }}
                style={{ transition: "all 0.3s ease" }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              />
            </div>
            <div className="relative" ref={dropdownRef}>
              <div
                className="py-[5px] px-[10px] border rounded-[5px] w-[140px] cursor-pointer"
                onClick={handleDropdownClick}
              >
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center">
                    <Image
                      src={
                        options.find((option) => option.value === type)
                          ?.imgSrc || "/Icon-form/6.png"
                      }
                      width={20}
                      height={20}
                      alt="selected type"
                      className="mr-2 w-[19px] h-[20px]"
                    />
                    <div className="text-[0.85em]">
                      {options.find((option) => option.value === type)?.label}
                    </div>
                  </div>
                  <svg
                    className="w-[0.7rem] h-4 ml-2"
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
              </div>
              {isOpen && (
                <div
                  style={{
                    boxShadow: "0px 0px 1px 0px  rgb(0, 0, 0)",
                  }}
                  className="absolute px-[10px] z-40  py-[5px] bg-white rounded-[7px]"
                >
                  {options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <div
                        onClick={() => handleTypeChange(option.value)}
                        className="py-[2px] px-[5px] text-[0.85rem]  hover:bg-[#E5e5e5] items-center  rounded-[4px] my-[2px] w-[140px] flex gap-x-[8px]"
                      >
                        <Image
                          className="h-[19px] w-[18px]"
                          src={option.imgSrc}
                          width={option.wideth}
                          height={20}
                          alt={option.value}
                        />
                        <p>{option.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            {type === "number" && <InputNumber></InputNumber>}
            {type === "text" && <Inputtext />}
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
              <div className="flex mt-4 justify-end pt-2 gap-x-[15px] ites-center">
                <p>required</p>
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => updateIsChecked()}
                      className="sr-only"
                    />
                    <div className="translate-y-[1px]">
                      <div
                        className={`box block h-[16px] w-8 rounded-full transition-all duration-300 ease-in-out`}
                        style={{
                          backgroundColor: isChecked
                            ? `${color.color1}`
                            : `${color.color3}`,
                        }}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 flex h-[10px] translate-y-[-1px] w-[10px] items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out ${
                          isChecked ? "translate-x-[15px]" : ""
                        }`}
                      ></div>
                    </div>
                  </div>

                  
                </label>
                <div className="w-[1px] bg-black"></div>
                <svg
                  onClick={() => deleteFromById()}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#2a2a2a"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text;
