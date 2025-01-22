import React from "react";
import Image from "next/image";
import Link from "next/link";

function NavBarInForm() {
  return (
    <div>
      <nav>
        <div className="flex justify-between max-w-[1280px] mx-auto mt-6 px-[30px]">
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
              <Link href="/form">
                <div className="flex gap-[6px] font-medium items-center">
                  <Image
                    src="/Icon-form/1.png"
                    width={20}
                    height={20}
                    quality={100}
                    alt="question"
                    className="h-[20px] w-[20px]"
                  ></Image>
                  <p className="md:block hidden">Quesion</p>
                </div>
              </Link>
              <Link href="/formrespone">
                <div className="flex gap-[6px] font-medium items-center">
                  <Image
                    src="/Icon-form/2.png"
                    width={20}
                    height={20}
                    quality={100}
                    alt="question"
                    className="h-[20px] w-[20px]"
                  ></Image>
                  <p className="md:block hidden">Respone</p>
                </div>
              </Link>
              <div className="flex gap-[6px] font-medium items-center">
                <Image
                  src="/Icon-form/3.png"
                  width={20}
                  height={20}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                ></Image>
                <p className="md:block hidden">View</p>
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
                <p className="md:block hidden">Public</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarInForm;
