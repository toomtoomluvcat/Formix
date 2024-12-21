'use client'

import React, { useState } from "react";
import NavBarInForm from "../component/nav";

function Form() {
  const [formName, setFormName] = useState<string>("Unitiled forms");
  
  
  return (
    <div>
      <NavBarInForm></NavBarInForm>
      <div className="max-w-[750px] flex flex-col items-center mx-auto mt-[80px] px-[50px]">
        <input 
          className="text-center font-medium text-[30px] border-0 focus:outline-none focus:border-b-2 focus:border-black  "
          value={formName}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFormName(e.target.value)}
        />
        <input
          className="text-center font-medium text-[10px] border-0 focus:outline-none focus:border-b-2 focus:border-black w-[30px]"
          placeholder="You can add a description of your form here."
        />
      </div>
    </div>
  );
}

export default Form;
