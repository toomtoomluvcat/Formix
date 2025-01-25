import React from "react";
import Image from "next/image";

interface Option {
  label: string;
  limit: number | null;
}

interface Color {
  color1: string;
  color2: string;
  color3: string;
}
interface InputCheckProps {
  color: Color;
  deleteChoiceById: (choiceToDel: number) => void;
  optionsValue?: Option[];
  updateLimit: (optionIndex: number, limit: number) => void;
  updateLabel: (optionIndex: number, newLabel: string) => void;
  addLabel: () => void;
}

const InputCheck = ({
  color,
  deleteChoiceById,
  optionsValue = [],
  updateLimit,
  updateLabel,
  addLabel,
}: InputCheckProps) => {
  return (
    <div>
      {optionsValue.map((item, index) => {
        const isLastOption = index + 1 === optionsValue.length;
        return (
          <div
            className="flex items-center justify-between flex-wrap"
            key={index}
          >
            <div className="flex items-center gap-x-[5px] mb-2">
              {!isLastOption && (
                <div className="w-[15px] h-[15px] rounded-[50%] border-2"></div>
              )}
              <input
                onBlur={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "transparent";
                }}
                style={{ transition: "all 0.3s ease" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateLabel(index, e.target.value)
                }
                onFocus={(e) => {
                  e.target.style.borderColor = color.color1;
                  e.target.style.backgroundColor = color.color3;
                  if (
                    isLastOption &&
                    !optionsValue.some((opt) => opt.label === "")
                  ) {
                    addLabel();
                  }
                }}
                value={isLastOption ? "" : item.label}
                maxLength={20}
                placeholder={
                  isLastOption ? "Add question" : "Add label options"
                }
                type="text"
                className="w-full text-[16px] py-2 focus:outline-none border-[#e5e5e5] text-[12px] transition-all duration-500 px-2 boder-soild focus:border-black border-b-2"
              />
            </div>
            {!isLastOption && (
              <div className="flex gap-x-[15px] items-center ">
                <input
                  onFocus={(e) => {
                    e.target.style.borderColor = color.color1;
                    e.target.style.backgroundColor = color.color3;
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "transparent";
                  }}
                  style={{ transition: "all 0.3s ease" }}
                  type="text"
                  maxLength={3}
                  value={item.limit || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 3) {
                      updateLimit(index, value ? parseInt(value, 10) : 0); 
                    }
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className={`text-center w-[70px] translate-y-[5px] focus:outline-none
     border-${color.color1} text-[14px] transition-all duration-500 px-2
     border-solid focus:border-black border-b-2`}
                  placeholder="No-Limit"
                />

                <div onClick={() => deleteChoiceById(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={color.color1}
                  >
                    <path d="M200-440v-80h560v80H200Z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InputCheck;
