import React from "react";
import Image from "next/image";

function NavBarInForm() {
  return (
    <div>
      <nav>
        <div className="flex justify-between max-w-[1280px] mx-auto mt-6">
          <Image
            src="/Logo/FORMIX.png"
            alt="logo"
            width={150}
            height={150}
            quality={100}
            className="h-[22px] w-[70px]"
          ></Image>
          <div>
            <div className="flex text-[13px] gap-[35px] items-center">
              <div className="flex gap-[6px] font-medium items-center">
                <Image
                  src="/Icon-form/1.png"
                  width={20}
                  height={20}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                ></Image>
                <p>Quesion</p>
              </div>
              <div className="flex gap-[6px] font-medium items-center">
                <Image
                  src="/Icon-form/2.png"
                  width={20}
                  height={20}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                ></Image>
                <p>Respone</p>
              </div>
              <div className="flex gap-[6px] font-medium items-center">
                <Image
                  src="/Icon-form/3.png"
                  width={20}
                  height={20}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                ></Image>
                <p>View</p>
              </div>
              <div className="flex gap-[6px] font-medium items-center">
                <Image
                  src="/Icon-form/5.png"
                  width={20}
                  height={20}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                ></Image>
                <p>Public</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarInForm;
