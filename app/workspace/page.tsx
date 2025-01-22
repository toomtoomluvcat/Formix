"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function page() {
  const [username, setUsername] = useState<string>("username");
  const [email, setEmail] = useState<string>("userna.me@kkumail.com");
  const [totalForm, settotalForm] = useState<number>(0);
  const [activeForm, setActiveForm] = useState<number>(0);
  const [respone, setRespone] = useState<number>(0);
  const [showNav, setShowNav] = useState<boolean>(false);
  const [isHiding, setIsHiding] = useState(false);

  const toggleNav = () => {
    if (showNav) {
      setIsHiding(true);
    } else {
      setShowNav(true); // แสดงทันที
      setIsHiding(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          style={{
            borderRight: "1px solid #c7c7c7",
            padding: "20px",
            margin: "20px 0",
            borderSpacing: "100px",
          }}
          className="max-w-[220px] lg:max-w-[280px] hidden md:flex flex-col items-between h-[94vh] justify-between gap-y-[30px]"
        >
          <div className="flex flex-col px-[15px]">
            <Image
              src="/Icon-form/FORMIX LOGO.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[20px] w-[70px]"
            />

            <div
              className="flex items-center font-medium"
              style={{
                borderTop: "2px dashed #C7c7c7",
                borderBottom: "2px dashed #c7c7c7",
                padding: "20px",
                margin: "20px 0",
                borderSpacing: "100px",
              }}
            >
              <Image
                src="/Icon-form/21.png"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[30px] w-auto"
              />
              <p className="text-[11px] lg:whitespace-nowrap uppercase">
                {username} WORKSPACE
              </p>
            </div>
            <div
              style={{
                borderBottom: "2px dashed black",
                padding: "0 0 20px 0 ",
                borderSpacing: "100px",
              }}
              className=" font-medium flex flex-col gap-y-[9px] px-[10px]"
            >
              {/* <div className=" flex gap-x-[10px] hover:bg-[#F1F1F1] rounded-[8px] px-[20px] py-[10px] items-center">
                <Image
                  src="/Icon-form/22.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="question"
                  className="h-[22px] w-auto"
                />
                <p className="text-[13px]">Create</p>
              </div> */}
              <div className=" flex gap-x-[10px] hover:bg-[#F1F1F1] rounded-[8px] px-[20px] py-[10px] items-center">
                <Image
                  src="/Icon-form/23.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="question"
                  className="h-[22px] w-auto"
                />
                <p className="text-[13px]">Market</p>
              </div>
              <Link href={"/"}>
                <div className="flex gap-x-[10px] hover:bg-[#F1F1F1] rounded-[8px] px-[20px] py-[10px] items-center">
                  <Image
                    src="/Icon-form/24.png"
                    width={1000}
                    height={1000}
                    quality={100}
                    alt="question"
                    className="h-[22px] w-auto"
                  />
                  <p className="text-[13px]">Landing</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex ml-[15px] justify-between lg:gap-x-[5px] pr-[25px] w-full  items-center">
            <div className="flex  items-center gap-x-[10px]">
              <div className="bg-[#c7c7c7] min-w-[25px] min-h-[25px] rounded-[50%]"></div>
              <div>
                <p className="font-medium text-[13px]">{username}</p>
                <p className="text-[10px] text-[#c5c5c5]">{email}</p>
              </div>
            </div>
            <Image
              src="/Icon-form/25.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[15px] w-[15px]"
            />
          </div>
        </div>
        <div className="mt-[30px] md:mt-[0px] grow px-[15px] md:px-[45px]">
          <div className="flex items-center  justify-between">
            <div>
              <h2 className="font-medium text-[13px] sm:text-[15px]">Create</h2>
              <h2 className="text-[10px] sm:text-[12px] max-w-[200px] sm:max-w-[400px] text-[#515151]">
                You can create and efficiently manage your forms right here.
              </h2>
            </div>
            <div className="relative">
              <Image
                src="/Icon-form/26.png"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[20px] mr-[15px] w-[20px]"
              />
              <div className="rounded-[50%] w-[7px] h-[7px]  absolute left-2.5 top-0 bg-orange-400"></div>
            </div>
          </div>
          <div
            style={{
              borderRight: "1px solid #c7c7c7",
              borderSpacing: "100px",
            }}
            className=" rounded-[13px] py-[15px] px-[40px] hidden md:flex justify-between  mt-4 border-2 mr-[15px] "
          >
            <div className=" grow">
              <h2 className="text-[10px] text-[#515151]">Total Form</h2>
              <p className="font-medium text-[20px] mt-[5px]">{totalForm}</p>
            </div>

            <div
              style={{
                borderLeft: "2px dashed #C7c7c7",
                borderSpacing: "100px",
                padding: "0px 0 0 40px",
              }}
              className="grow"
            >
              <h2 className="text-[10px] text-[#515151]">Active Form</h2>
              <p className="font-medium text-[20px] mt-[5px]">{activeForm}</p>
            </div>
            <div
              style={{
                borderLeft: "2px dashed #C7c7c7",
                borderSpacing: "100px",
                padding: "0px 0 0 40px",
              }}
              className="  grow"
            >
              <h2 className="text-[10px] text-[#515151]">Respone Forms</h2>
              <p className="font-medium text-[20px] mt-[5px]">{respone}</p>
            </div>
            <div
              style={{
                borderLeft: "2px dashed #C7c7c7",
                borderSpacing: "100px",
                padding: "0px 0 0 40px",
              }}
              className=""
            >
              <Image
                src="/Icon-form/27.png"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[20px] mb-2 w-[20px]"
              />
              <div className="max-w-[220px]">
                <h2 className="text-[12px] font-medium ">Keep It Simple!</h2>
                <p className="font-medium text-[#515151] text-[8px] mt-[5px]">
                  Minimize the number of questions to encourage higher
                  completion rates and reduce user fatigue
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center md:flex-row flex-col mt-[20px] gap-y-[20px]">
            <div className="w-full mx-[0px]">
              <div className="mt-[px] h-[250px] md:h-[450px] bg-[#F5F5F5] px-[25px] py-[15px] rounded-[10px]">
                <div
                  style={{
                    borderBottom: "2px dashed #C7c7c7",
                    borderSpacing: "100px",
                    padding: "0px 0 10px 0px",
                  }}
                  className="flex items-center justify-between"
                >
                  <p className="font-medium text-[13px]">Create New Form</p>
                  <div className="flex gap-x-[7px] items-center">
                    <div className="flex gap-x-[10px] bg-white text-[13px] rounded-[4px] px-[10px] py-[4px] items-center">
                      <p className="font-medium text-[12px]">sort by date</p>
                      <Image
                        src="/Icon-form/25.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-[13px] w-[13px]"
                      />
                    </div>
                    <Image
                      src="/Icon-form/34.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[25px] w-[34px]"
                    />
                  </div>
                </div>
                <div className="mt-4 flex  flex-wrap gap-2">
                  <Link href="/form">
                    <Image
                      src="/Icon-form/28.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-auto hover:brightness-[90%] transition-all duration-[500ms] w-[90px]"
                    />
                  </Link>
                  <Image
                    src="/Icon-form/29.png"
                    width={1000}
                    height={1000}
                    quality={100}
                    alt="question"
                    className="h-auto hover:brightness-[90%] transition-all duration-[500ms] w-[90px]"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-[15px] mx-[15px] w-full h-[300px] md:h-[450px] border-2 py-[16px] px-[20px] ">
              <div
                style={{
                  borderBottom: "2px dashed #C7c7c7",
                  borderSpacing: "100px",
                  padding: "0px 0 20px 0px",
                }}
                className="flex gap-x-[25px] justify-between items-center"
              >
                <p className="font-medium">Projects</p>
                <input
                  className="bg-[#f5f5f5] max-w-[300px] grow py-[5px] rounded-[7px] text-[13px] px-[15px]"
                  placeholder="search your project"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={toggleNav}
        className={
          isHiding
            ? "md:hidden flex justify-center items-center fixed bottom-6 right-9 bg-white border-2 w-[52px] h-[52px] rounded-[50%] rotate-180 transition-all duration-[500ms]"
            : "md:hidden flex justify-center items-center fixed bottom-6 right-9 bg-white border-2 w-[52px] h-[52px] rounded-[50%] transition-all duration-[500ms]"
        }
      >
        <Image
          src="/Icon-form/36.png"
          width={1000}
          height={1000}
          quality={100}
          alt="question"
          className="h-[6.5px] w-[13px]"
        />
      </div>

      {showNav && (
        <div
          className={`flex flex-col fixed bottom-[90px] gap-y-[5px] right-9 ${
            isHiding ? "animation-slide-down" : "animation-slide-up"
          }`}
          onAnimationEnd={() => {
            if (isHiding) setShowNav(false);
          }}
        >
          <Link href={'/store'}>
            <div className="md:hidden flex justify-center items-center bg-white border-2 w-[52px] h-[52px] rounded-[50%]">
              <Image
                src="/Icon-form/23.png"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[15px] w-[15px]"
              />
            </div>
          </Link>
          <Link href={'/'}><div className="md:hidden flex justify-center items-center bg-white border-2 w-[52px] h-[52px] rounded-[50%]">
            <Image
              src="/Icon-form/24.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[15px] w-[15px]"
            />
          </div></Link>
        </div>
      )}
    </div>
  );
}

export default page;
