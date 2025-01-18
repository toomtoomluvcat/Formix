"use client";

import React, { useState } from "react";
import NavBarInForm from "./component/nav";
import Image from "next/image";
import Link from "next/link";
import { stat } from "fs";

function page() {
  const [showQuestion, setShowQuestion] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const updateShowQuestion = (position: number): void => {
    setShowQuestion((prev) =>
      prev.map((item, index) => (index === position ? !item : false))
    );
  };

  return (
    <div>
      <div className="bg-[#F5F5F5] w-full md:h-[950px] h-[700px] absolute"></div>
      <div className="relative">
        <Image
          src="/Icon-form/B00.png"
          width={788}
          height={318}
          quality={100}
          alt="backgroundHomePage"
          className="absolute z-0 mx-auto left-1/2 transform -translate-x-1/2 mt-[120px]"
        />
        <div className="relative">
          <nav className="items-center px-[15px] py-[15px] max-w-[1340px] mx-auto flex justify-between ">
            <Image
              src="/Icon-form/FORMIX LOGO.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[20px] w-[70px]"
            />

            <ul className=" font-roboto text-[13px]  flex justify-between w-[120px] md:w-[450px] mx-auto">
              <li className="hidden md:block">
                <Link href="/form">workspace</Link>
              </li>
              <li className="hidden md:block">How is works</li>
              <li className="hidden sm:block">Market</li>
              <li className="hidden sm:block">About us</li>
            </ul>
            <div className="flex text-[13px] gap-x-[15px] items-center">
              <h3>SignIn</h3>
              <h3 className="text-white bg-black rounded-[5px] py-[8px]  px-[10px]">
                SignUp
              </h3>
            </div>
          </nav>
          <div className="max-w-[400px] mt-[100px] mb-[50px] mx-auto text-center">
            <h1 className="text-[25px] sm:text-[35px] font-bold px-[20px]">
              Seamless form<br></br> creation made simple.
            </h1>
            <h2 className="text-[12px] sm:text-[15px] mt-[10px] px-[50px]">
              Effortlessly create forms with just a few clicks, perfect for any
              skill level
            </h2>
            <Link href="/">
              <div className="mt-[30px] mx-auto w-[100px] text-[13px] text-center bg-black text-white p-[10px] rounded">
                Get started
              </div>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/Icon-form/B01.png"
              width={1172}
              height={659}
              quality={100}
              alt="bg-workspace"
              className="mx-auto flex justify-center"
            />
            <div className="px-[15px]">
              <div
                className="md:translate-y-[-220px] md:gap-y-[0px] gap-y-[30px] translate-y-[-80px] 
              drop-shadow max-w-[1300px] sm:px-[70px] px-[30px] py-[30px] flex-wrap 
              flex items-center justify-between mx-auto bg-white rounded-[15px] gap-y-[25px] "
              >
                <div className="">
                  <h2 className="font-medium  sm:text-[25px] text-[23px]">
                    Develop by
                  </h2>
                  <h2 className="mt-[10px] text-[13px] max-w-[450px] leading-[27px]">
                    "My web app uses React and Next.js for the frontend to
                    create dynamic components and routing. The backend is
                    powered by Java Spring for session management,
                    authentication, and CRUD operations with the database."
                  </h2>
                </div>
                <div className="mx-auto md:mt-[15px]">
                  <div className="flex flex-col gap-y-[20px]">
                    <div className="flex md:gap-[100px] gap-[50px]">
                      <Image
                        src="/Icon-form/T01.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="md:w-16 md:h-16 h-14 w-14 mx-auto flex justify-center"
                      />
                      <Image
                        src="/Icon-form/T02.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="md:w-16 md:h-16 h-14 w-14 mx-auto flex justify-center"
                      />
                      <Image
                        src="/Icon-form/T03.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="md:w-20 md:h-20 h-16 w-16 mx-auto flex justify-center"
                      />
                    </div>
                    <div className="flex md:gap-x-[100px] gap-x-[50px]">
                      <Image
                        src="/Icon-form/T04.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="md:w-16 md:h-16 h-14 w-14 mx-auto flex justify-center"
                      />
                      <Image
                        src="/Icon-form/T05.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="translate-x-[-2px] md:w-16 md:h-16 h-14 w-14 mx-auto flex justify-center"
                      />
                      <Image
                        src="/Icon-form/T06.png"
                        width={150}
                        height={150}
                        quality={100}
                        alt="bg-workspace"
                        className="md:w-16 md:h-16 h-14 w-14 mx-auto flex justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="sm:mt-[-70px] flex flex-col items-center justify-center">
            <h1 className="font-medium text-center sm:text-[35px] text-[20px] px-[40px]">
              Why Choose Our Form Builder?
            </h1>
            <p className="max-w-[450px] px-[40px] mt-[15px] text-center sm:text-[15px] text-[13px]">
              Create forms with real-time graphs, easy data management, and
              customizable themes to fit your needs.
            </p>
            <div className="flex gap-[20px] mt-[70px] justify-between max-w-[1600px] px-[30px] flex-wrap">
              <div className="pl-[40px] pr-[70px] py-[25px] rounded-[15px] bg-white drop-shadow w-[200px] md:w-auto grow">
                <Image
                  src="/Icon-form/I01.png"
                  width={150}
                  height={150}
                  quality={100}
                  alt="bg-workspace"
                  className="md:w-12 md:h-12 mb-[35px] h-10 w-10"
                />
                <h2 className="font-medium">Visualize Data</h2>
                <p className="max-w-[260px] mt-[5px] text-[13px]">
                  Analyze form responses at a glance with interactive graphs
                  that help you uncover trends and insights quickly.
                </p>
              </div>
              <div className="pl-[40px] pr-[70px] py-[25px] rounded-[15px] bg-white drop-shadow w-[200px] md:w-auto grow">
                <Image
                  src="/Icon-form/I02.png"
                  width={150}
                  height={150}
                  quality={100}
                  alt="bg-workspace"
                  className="md:w-12 md:h-12 mb-[35px] h-10 w-10"
                />
                <h2 className="font-medium">Manage Easily</h2>
                <p className="max-w-[260px] mt-[5px] text-[13px]">
                  Easily organize, edit, and export your form data to streamline
                  your workflow and save time.
                </p>
              </div>
              <div className="grow pl-[40px] pr-[70px] py-[25px] rounded-[15px] bg-white drop-shadow ">
                <Image
                  src="/Icon-form/I03.png"
                  width={150}
                  height={150}
                  quality={100}
                  alt="bg-workspace"
                  className="md:w-12 md:h-12 mb-[35px] h-10 w-10 mx-0 sm:mx-auto xl:mx-0"
                />
                <h2 className="font-medium text-start sm:text-center xl:text-start">
                  Customize Forms
                </h2>
                <p className="max-w-[260px] mt-[5px] text-[13px] text-start mx-0 sm:mx-auto xl:mx-0 sm:text-center xl:text-start">
                  Design forms that stand out with flexible theme options to
                  match your personal or professional style.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="mt-[150px] mx-auto max-w-[1200px] flex gap-[15px] justify-between px-[30px]">
              <h2 className="font-medium  text-[24px] md:text-[35px]">
                Features
              </h2>
              <p className="max-w-[300px] text-[10px] md:text-[12px] text-[#515151]">
                Design forms that stand out with flexible theme options to match
                your personal or professional style.
              </p>
            </div>
            <div className="px-[30px]">
              <div className="mt-[35px] mx-auto flex justify-center flex-wrap gap-[15px]">
                <div className="flex gap-x-[10px] sm:gap-x-[15px] mx-auto justify-center w-[1400px]">
                  <div className="bg-[#f5f5f5] xl:w-[500px] rounded-[15px] p-[30px]">
                    <h2 className="font-medium text-[12px] md:text-[22px]">
                      Feature Management Hub
                    </h2>
                    <p className="max-w-[250px] mt-[10px] md:mt-[15px] text-[10px] md:text-[12px] text-[#6C6C6C]">
                      A centralized workspace to efficiently manage and
                      customize your website features
                    </p>
                    <Image
                      src="/Icon-form/F00.png"
                      width={384}
                      height={214}
                      quality={100}
                      alt="bg-workspace"
                      className="w-[150px] md:w-[250px] mt-[20px] md:mt-[50px] mx-auto"
                    />
                  </div>
                  <div className="bg-[#f5f5f5] xl:w-[650px] md:max-w-[650px] grow rounded-[15px] p-[30px]">
                    <h2 className="font-medium text-[12px] md:text-[22px]">
                      Feature Management Hub
                    </h2>
                    <p className="max-w-[250px] mt-[10px] md:mt-[15px] text-[10px] md:text-[12px] text-[#6C6C6C]">
                      A centralized workspace to efficiently manage and
                      customize your website features
                    </p>
                    <Image
                      src="/Icon-form/F01.png"
                      width={548}
                      height={226}
                      quality={100}
                      alt="bg-workspace"
                      className="mt-[35px] md:mt-[15px] w-[400px] md:w-[548px] mx-auto"
                    />
                  </div>
                </div>
                <div className="flex gap-x-[10px] sm:gap-x-[15px]">
                  <div className="bg-[#f5f5f5] xl:w-[650px] max-w-[650px] lg:min-w-[650px] rounded-[15px] p-[30px]">
                    <h2 className="font-medium text-[12px] md:text-[22px]">
                      Easy Data Review
                    </h2>
                    <p className="max-w-[270px] mt-[10px] md:mt-[15px] text-[10px] md:text-[12px] text-[#6C6C6C]">
                      Quickly access and verify information with ease.
                    </p>
                    <Image
                      src="/Icon-form/F02.png"
                      width={548}
                      height={226}
                      quality={100}
                      alt="bg-workspace"
                      className="mt-[75px] md:mt-[25px] md:scale-[1] scale-[1.5] mx-auto"
                    />
                  </div>
                  <div className="">
                    <div className="bg-[#f5f5f5] h-[85%] xl:w-[500px] rounded-[15px] p-[30px] flex flex-col justify-end">
                      <Image
                        src="/Icon-form/F03.png"
                        width={384}
                        height={214}
                        quality={100}
                        alt="bg-workspace"
                        className="w-[50px] md:w-[100px] lg:mt-[0px] mx-auto"
                      />
                      <h2 className="font-medium mt-[60px] lg:mt-[100px] text-[12px] md:text-[22px]">
                        Form Activation Control
                      </h2>
                      <p className="max-w-[300px] mt-[10px] text-[12px] text-[#6C6C6C]">
                        Enable or disable forms anytime as needed.
                      </p>
                    </div>
                    <div className="flex gap-x-[10px] mx-auto">
                      <div
                        className="bg-black px-[5px] md:px-[25px] gap-x-[10px] items-center py-[5px] md:py-[10px]
                      justify-center mt-[15px] flex rounded-[10px]"
                      >
                        <Image
                          src="/Icon-form/11.png"
                          width={384}
                          height={214}
                          quality={100}
                          alt="bg-workspace"
                          className="w-[15px] md:block hidden md:w-[25px]"
                        />
                        <h2 className="text-[8px] text-white text-center whitespace-nowrap md:text-[12px]">
                          Create form
                        </h2>
                      </div>
                      <div
                        className="grow drop-shadow-xl border-2 
                      justify-center items-center px-[5px] md:px-[15px] py-[10px] 
                      mt-[15px] flex gap-x-[15px] rounded-[10px]"
                      >
                        <Image
                          src="/Icon-form/12.png"
                          width={384}
                          height={214}
                          quality={100}
                          alt="bg-workspace"
                          className="w-[15px] md:block hidden  md:w-[25px]"
                        />
                        <h2 className="text-[8px] text-center font-medium whitespace-nowrap md:text-[12px]">
                          Visit website workspace
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-[170px] flex justify-between max-w-[1200px] gap-x-[45px]  mx-auto px-[30px]">
            <div className="flex flex-col grow translate-y-[20px]">
              <div className="">
                <div
                  className="flex items-center gap-x-4"
                  onClick={() => updateShowQuestion(0)}
                >
                  <Image
                    src="/Icon-form/13.png"
                    width={500}
                    height={500}
                    quality={100}
                    alt="bg-workspace"
                    className="w-[25px]"
                  />
                  <h2 className="text-[17px] md:text-[23px] font-medium">
                    How formix work?
                  </h2>
                </div>
                <div className="max-w-[550px]">
                  <div
                    className={`text-[#6C6C6C] mt-[15px] transition-all duration-700 overflow-hidden ${
                      showQuestion[0]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      transition:
                        "max-height 0.7s ease-in-out, opacity 0.7s ease-in-out",
                    }}
                  >
                    {showQuestion[0] && (
                      <p>
                        Formix uses Spring Boot as its service server to
                        securely save form data into a database. Each submission
                        is processed, validated, and stored efficiently,
                        ensuring reliable data management and easy access for
                        analysis.
                      </p>
                    )}
                  </div>
                  <hr className="mt-[20px] mb-[27px] h-[3px] bg-[#D2D2D2]" />
                </div>
              </div>
              <div>
                <div
                  className="flex items-center gap-x-4"
                  onClick={() => updateShowQuestion(1)}
                >
                  <Image
                    src="/Icon-form/13.png"
                    width={500}
                    height={500}
                    quality={100}
                    alt="bg-workspace"
                    className="w-[25px]"
                  />
                  <h2 className="text-[17px] md:text-[23px] font-medium">
                    What types of tasks is Formix suitable for?
                  </h2>
                </div>
                <div className="max-w-[550px]">
                  <div
                    className={`text-[#6C6C6C] mt-[15px] transition-all duration-700 overflow-hidden ${
                      showQuestion[1]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      transition:
                        "max-height 0.7s ease-in-out, opacity 0.7s ease-in-out",
                    }}
                  >
                    {showQuestion[1] && (
                      <p>
                        Formix is perfect for tasks like surveys, event
                        registrations, applications, and polls. Its features
                        include customizable forms, limited-choice options, and
                        data visualization tools, making it suitable for
                        managing feedback, tracking attendance, or processing
                        applications. With its versatility, Formix handles both
                        personal and professional needs with ease.
                      </p>
                    )}
                  </div>
                  <hr className="mt-[20px] mb-[27px] h-[3px] bg-[#D2D2D2] grow" />
                </div>
              </div>
              <div>
                <div
                  className="flex items-center gap-x-4"
                  onClick={() => updateShowQuestion(2)}
                >
                  <Image
                    src="/Icon-form/13.png"
                    width={500}
                    height={500}
                    quality={100}
                    alt="bg-workspace"
                    className="w-[25px]"
                  />
                  <h2 className="text-[17px] md:text-[23px] font-medium">
                    Does the website provide support?
                  </h2>
                </div>
                <div className="max-w-[550px]">
                  <div
                    className={`text-[#6C6C6C] mt-[15px] transition-all duration-700 overflow-hidden ${
                      showQuestion[2]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      transition:
                        "max-height 0.7s ease-in-out, opacity 0.7s ease-in-out",
                    }}
                  >
                    {showQuestion[2] && (
                      <p>
                        Yes, Formix is an open-source platform, allowing you to
                        access the code and customize it to fit your needs. You
                        can develop and expand its features freely, giving you
                        full control over your projects. 😊
                      </p>
                    )}
                  </div>
                  <hr className="mt-[20px] mb-[27px] h-[3px] bg-[#D2D2D2] grow" />
                </div>
              </div>
              <div>
                <div
                  className="flex items-center gap-x-4"
                  onClick={() => updateShowQuestion(3)}
                >
                  <Image
                    src="/Icon-form/13.png"
                    width={500}
                    height={500}
                    quality={100}
                    alt="bg-workspace"
                    className="w-[25px]"
                  />
                  <h2 className="text-[17px] md:text-[23px] font-medium">
                    About Developers
                  </h2>
                </div>
                <div className="max-w-[550px]">
                  <div
                    className={`text-[#6C6C6C] mt-[15px] transition-all duration-700 overflow-hidden ${
                      showQuestion[3]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      transition:
                        "max-height 0.7s ease-in-out, opacity 0.7s ease-in-out",
                    }}
                  >
                    {showQuestion[3] && (
                      <p>
                        This project is part of the EN811302 course at Khon Kaen
                        University, Thailand, developed by first-year Computer
                        Engineering students. Its purpose is to explore and
                        learn technologies such as JavaScript, Next.js, React,
                        Java Spring Boot, and other development tools. The
                        project is purely educational and non-profit
                      </p>
                    )}
                  </div>
                  <hr className="mt-[20px] mb-[27px] h-[3px] bg-[#D2D2D2] grow" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-medium text-[30px] md:text-[45px]">
                ABOUT FORMIX
                <br /> WEBSITE
              </h1>
            </div>
          </section>
          <section className="py-[100px] mt-[300px] bg-black text-white">
            <div className="flex justify-between max-w-[800px] px-[30px] gap-x-[20px] md:gap-x-[150px] mx-auto">
              <div className="flex flex-col gap-y-[120px] sm:gap-y-[150px]">
                <Image
                  src="/Icon-form/FORMIX LOGO1.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="question"
                  className="md:h-[20px] w-[50px]  md:w-[70px]"
                />
                <div className="flex gap-x-[15px]">
                  <Link
                    href="https://www.canva.com/design/DAGZWc09KEY/F0jEr_oOu8Pg-y-4
              // -YlVQVQ/edit?utm_content=DAGZWc09KEY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  >
                    <Image
                      src="/Icon-form/14.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[28px] w-[28px]"
                    />
                  </Link>
                  <Link href="https://github.com/toomtoomluvcat/Formix.git">
                    <Image
                      src="/Icon-form/15.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[28px] w-[28px]"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between gap-x-[5px] grow">
                <div>
                  <h3 className="md:text-[15px] text-[13px]">Landing</h3>
                  <hr className="mt-[10px] w-[50px] sm:w-[80px] mb-[15px]"></hr>
                  <div className="text-[10px] md:text-[13px] flex flex-col gap-y-[5px]">
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="/"
                    >
                      <p>Home</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href=""
                    >
                      <p>SignUp</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href=""
                    >
                      <p>LogIn</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href=""
                    >
                      <p>Workspace</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href=""
                    >
                      <p>Form</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href=""
                    >
                      <p>ThemeShop</p>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="md:text-[15px] text-[13px]">Resources</h3>
                  <div className="text-[10px] md:text-[13px] flex flex-col gap-y-[5px]">
                    <hr className="mt-[10px] w-[50px] sm:w-[80px] mb-[15px]"></hr>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="https://qwertyisaduck.com/"
                    >
                      <p>Qwerty is a DUCK </p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="https://dribbble.com/"
                    >
                      <p>Dribbble </p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="https://fonts.google.com/icons"
                    >
                      <p>Google Icon </p>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="md:text-[15px] text-[13px]">Develop</h3>
                  <hr className="mt-[10px] w-[50px] sm:w-[80px] mb-[15px]"></hr>
                  <div className="text-[10px] md:text-[13px] flex flex-col gap-y-[5px]">
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="/"
                    >
                      <p>Toomluvcat</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="/"
                    >
                      <p>ParePattara</p>
                    </Link>
                    <Link
                      className="hover:text-[#c1c1c1] transition-all duration-500"
                      href="/"
                    >
                      <p>Nanan</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default page;
