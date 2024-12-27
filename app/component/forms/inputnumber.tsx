import React from "react";

function InputNumber() {
  return (
    <div>
      <input
        maxLength={20}
        disabled={true}
        placeholder="Add you number here"
        type="text"
        className="max-w-[300px] text-[16px]
         py-2 focus:outline-none  border-[#e5e5e5] text-[12px] px-2 boder-soild focus:border-black"
      />
    </div>
  );
}

export default InputNumber;
