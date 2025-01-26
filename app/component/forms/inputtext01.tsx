import React from "react";
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
  color: Color;
}
function Inputtext({ color }: InputProp) {
  return (
    <div>
      <input
        maxLength={20}
        disabled={true}
        placeholder="Add question here"
        type="text"
        style={{backgroundColor:color.color10?? "",color:color.color1?? ""}}
        className="max-w-[300px] text-[16px]
         py-2 focus:outline-none  border-[#e5e5e5] text-[12px] px-2 boder-soild focus:border-black"
      />
    </div>
  );
}

export default Inputtext;
