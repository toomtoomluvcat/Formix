"use client";

import React, { useState } from "react";
import NavBarInForm from "./component/nav";
import Image from "next/image";

function page() {
  const [status, setStatus] = useState<number>(0);
  return (
    <div className="font-Kanit flex justify-center mt-12">
      <div className="flex-col text-center ">
        <button
          onClick={() => setStatus(1)}
          className="text-white bg-black rounded-[7px] px-[15px] py-[10px]"
        >
          กดปุ่มนี้ดูสิ
        </button>
        {status == 1 ? (
          <div className="mt-[20px] ">
            <div className="mb-[15px]">
            <span>คนกดปุ่มนี้น่ารักที่สุด</span>
            <span className="text-[#EE66A6]"> ในโลก</span>
            </div>
            <Image
              className=""
              src="/Icon-form/images (1).jpg"
              width={300}
              height={300}
              alt="cat1"
            ></Image>
            <button
              className="text-white bg-black rounded-[7px] px-[15px] py-[10px] mt-[20px]"
              onClick={() => setStatus(2)}
            >
              กดอีกทีสิๆ
            </button>
            
          </div>
          
        ) : (
          <div></div>
        )}
        {status == 2? (
          <div className="mt-[20px]">
            <div className="mb-[14px]">
            <span>โดยเฉพาะ</span>
            <span className="text-[#EE66A6]"> "ไข่มุก"</span>
            </div>
            <Image
              className=""
              src="/Icon-form/images (2).jpg"
              width={300}
              height={300}
              alt="cat1"
            ></Image>
            <button
              className="text-white bg-black rounded-[7px] px-[15px] py-[10px] mt-[20px]"
              
            >
              <a href="https://www.youtube.com/watch?v=DrGZEO7Sy_I">กดอีกๆๆ</a>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default page;
