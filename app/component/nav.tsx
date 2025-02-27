import React from "react";
import Image from "next/image";
import Link from "next/link";

function NavBarInForm({
  saveQuestionTolocalstorage,
  hadlesubmit
}: {
  saveQuestionTolocalstorage?: () => void;
  hadlesubmit?:()=>void
}) {
  return (
    <div>
      <nav>
        <div className="flex justify-between max-w-[1280px] mx-auto mt-6 px-[30px]">
          <Link href={"/"}>
            <Image
              src="/Icon-form/FORMIX LOGO.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[23px]  w-[70px]"
            />
          </Link>

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
              <Link
                onClick={() => saveQuestionTolocalstorage?.()}
                href={"/form/preview"}
              >
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
              </Link>
              <Link
                onClick={() => saveQuestionTolocalstorage?.()}
                href={"/form/setting"}
              >
                <div className="flex gap-[6px] font-medium items-center">
                  <Image
                    src="/Icon-form/2.svg"
                    width={20}
                    height={20}
                    quality={100}
                    alt="question"
                    className="h-[20px] w-[20px]"
                  ></Image>
                  <p className="md:block hidden">setting</p>
                </div>
              </Link>
              
              <div onClick={()=>hadlesubmit?.()} className="flex gap-[6px] font-medium items-center">
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
