import React from "react";
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
interface InputMutipleProps {
  color: Color;
  deleteChoiceById: (choiceToDel: number) => void;
  optionsValue?: Option[];
  updatelimitAns: (optionIndex: number, limitAns: number) => void;
  updatelabelChoice: (optionIndex: number, newlabelChoice: string) => void;
  addlabelChoice: () => void;
}

const InputMutiple = ({
  color,
  deleteChoiceById,
  optionsValue = [],
  updatelimitAns,
  updatelabelChoice,
  addlabelChoice,
}: InputMutipleProps) => {
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
              
              <input
                onBlur={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "transparent";
                }}
                
                style={{
                  transition: "all 0.3s ease",
                  borderColor: "transparent",
                  backgroundColor: isLastOption
                    ? color.color10 ?? ""
                    : "transparent",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updatelabelChoice(index, e.target.value)
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "black";
                  e.target.style.backgroundColor = color.color10 ?? "";
                  if (
                    isLastOption &&
                    !optionsValue.some((opt) => opt.labelChoice === "")
                  ) {
                    addlabelChoice();
                  }
                }}
                value={isLastOption ? "" : item.labelChoice}
                maxLength={20}
                placeholder={
                  isLastOption ? "Add question" : "Add labelChoice options"
                }
                type="text"
                className="w-full text-[16px] py-2 text-white focus:outline-none border-[#e5e5e5]
                 text-[12px] transition-all duration-500 px-2 boder-soild focus:border-black border-b-2"
              />
            </div>
            {!isLastOption && (
              <div className="flex gap-x-[15px] text-white items-center ">
                <input
                  onFocus={(e) => {
                    e.target.style.borderColor = "black";
                    e.target.style.backgroundColor = color.color10 ?? "";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "transparent";
                  }}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: "transparent",
                    borderColor : "transparent"
                  }}
                  type="text"
                  maxLength={3}
                  value={item.limitAns || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 3) {
                      updatelimitAns(index, value ? parseInt(value, 10) : 0);
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
                  placeholder="No-limit"
                />

                <div onClick={() => deleteChoiceById(index)}>
                  <Image
                    src={"/Icon-form/Theme2/I12.png"}
                    width={100}
                    height={100}
                    alt="icon"
                    className="w-[23px] "
                  ></Image>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>);};export default InputMutiple;
