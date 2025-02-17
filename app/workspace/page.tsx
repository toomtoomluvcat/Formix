"use client";
import React, { ChangeEvent, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Workspace() {
  const [username, setUsername] = useState<string>("username");
  const [email, setEmail] = useState<string>("userna.me@kkumail.com");
  const [totalForm, settotalForm] = useState<number>(0);
  const [activeForm, setActiveForm] = useState<number>(0);
  const [respone, setRespone] = useState<number>(0);
  const [showNav, setShowNav] = useState<boolean>(false);
  const [isHiding, setIsHiding] = useState(false);
  const [account, setAccount] = useState<Boolean>(false);
  const [accountMoblie, setAccountMoblie] = useState<Boolean>(false);
  const [changeUsername, setChangeUsername] = useState<string>("");
  const [showChangeName, setShowChangeName] = useState<boolean>(false);
  const [showChangePassword, setShowChanegPassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassworld, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [errorChangePassword, setErrorChangePassword] = useState<string>("");
  const [formData, setFormData] = useState([
    { name: "toomtam", archive: true, proflieId: "0001", status: false },
    { name: "pare", archive: false, proflieId: "0002", status: false },
  ]);
  const [showMarket, setShowMarket] = useState<boolean>(false);
  const [formDataToSearch, setFormDataToSearch] = useState<
    { name: string; archive: boolean; proflieId: string; status: boolean }[]
  >([]);
  const [firstTime, setfirstTime] = useState<boolean>(true);
  const [shownotify, setnotify] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const accountPcRef = useRef<HTMLDivElement | null>(null);
  const accountMoblieRef = useRef<HTMLDivElement | null>(null);
  const notifyref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("jwt");

      if (!token) {
        alert("Please login to access this page.");
        router.push("/signin");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/post/private", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("jwt");
          router.push("/signin");
          return;
        }

        const data = await response.json();
        console.log("Private Data:", data);
  } catch (error) {
        console.error("Error:", error);
      }
  }
    fetchUserData();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isMarket = urlParams.get("isMarket");
    console.log(isMarket);
    if (isMarket === "true") {
      setShowMarket(true);
    } else {
      setShowMarket(false);
    }
  },[]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifyref.current &&
        !notifyref.current.contains(event.target as Node)
      ) {
        setnotify(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setFormData((prev) => prev.map((item) => ({ ...item, status: false })));
      }

      if (
        accountMoblieRef.current &&
        !accountMoblieRef.current.contains(event.target as Node)
      ) {
        setAccountMoblie(false);
      }

      if (
        accountPcRef.current &&
        !accountPcRef.current.contains(event.target as Node)
      ) {
        setAccount(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, accountMoblieRef, accountPcRef]);

  useEffect(() => {
    handleSearchForm("");
  }, [formData]);

  const handleShowOptionsForms = (id: number): void => {
    setFormData((prev) =>
      prev.map((item, index) =>
        index === id
          ? { ...item, status: !item.status }
          : { ...item, status: false }
      )
    );
  };

  const handleSearchForm = (searchText: string): void => {
    const inputText = searchText.toLowerCase();
    if (inputText) {
      setFormDataToSearch(
        formData.filter((item) => item.name.toLowerCase().includes(inputText))
      );
    } else {
      setFormDataToSearch(formData);
    }
  };
  const handleChangePassword = (): void => {
    if (newPassworld.length < 8) {
      setErrorChangePassword("Password should have more than 8 character");
      return;
    }
    if (confirmNewPassword === newPassworld) {
      setShowChanegPassword(false);
      setErrorChangePassword("");
      return;
    } else {
      setErrorChangePassword("password don't match");
      return;
    }
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length <= 15) {
      setChangeUsername(value);
    }
  };

  const handleSaveUsername = (): void => {
    if (changeUsername) {
      setUsername(changeUsername);
    }
  };

  const toggleNav = () => {
    if (showNav) {
      setIsHiding(true);
    } else {
      setShowNav(true);
      setIsHiding(false);
    }
  };

  return (
    <div className="relative">
      {showChangeName && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="fixed top-1/2 left-1/2 transform rounded-[15px] w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
          >
            <Image
              width={1000}
              height={1000}
              alt="changeusername"
              src={"/Icon-form/39.svg"}
            ></Image>
            <div className="mb-[10px] md:mb-[20px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
              <p className="font-medium text-[12px] sm:text-[15px]">
                Welcome To Formix Aboard!
              </p>
              <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
                Let’s get started! Please enter your name to personalize your
                experience
              </p>
              <div className="py-[8px] flex gap-x-[10px]">
                <input
                  value={changeUsername || ""}
                  onChange={handleUsername}
                  className="grow rounded-[7px] px-[15px] text-[13px] bg-[#f6f6f6]"
                  type="text"
                />

                <button
                  type="button"
                  onClick={() => {
                    handleSaveUsername();
                    setShowChangeName(false);
                  }}
                  className="bg-black p-[12px] rounded-[7px] text-white text-[10px]"
                >
                  Let’s started!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showChangePassword ? (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
          <div
            style={{
              boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.34)",
            }}
            className="fixed top-1/2 left-1/2 transform rounded-[15px] w-[70vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 z-40 bg-white"
          >
            <Image
              width={1000}
              height={1000}
              alt="changeusername"
              src={"/Icon-form/40.svg"}
            ></Image>
            <div className="mb-[10px] md:mb-[20px] pt-[15px] md:pt-[25px] px-[15px] md:px-[40px]">
              <p className="font-medium text-[12px] sm:text-[15px]">
                Change new Password
              </p>
              <p className="text-[9px] sm:text-[13px] text-[#474747] mt-[4px] sm:mt-[7px] max-w-[350px]">
                To enhance your security, please enter your old password
                followed by your new password to update your account
                credentials.
              </p>
              <div className="text-[11px] text-red-400">
                {errorChangePassword}
              </div>
              <div className="py-[8px] mt-[4px] flex flex-col gap-y-[10px]">
                <label className="text-[10px] sm:text-[13px] px-[7px]">
                  old password
                </label>
                <input
                  value={oldPassword || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOldPassword(e.target.value)
                  }
                  className="grow rounded-[7px] px-[15px] py-[10px] text-[13px] bg-[#f6f6f6]"
                  type="password"
                />
              </div>
              <div className="py-[8px] mt-[4px] flex flex-col gap-y-[10px]">
                <label className="text-[10px] sm:text-[13px] px-[7px]  md:text-[10px]">
                  new password
                </label>
                <input
                  value={newPassworld || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                  className="grow rounded-[7px] px-[15px] py-[10px] text-[13px] bg-[#f6f6f6]"
                  type="password"
                />
              </div>
              <div
                onClick={() => handleChangePassword()}
                className="py-[8px] mt-[4px] flex flex-col gap-y-[10px]"
              >
                <label className="text-[10px] sm:text-[13px] px-[7px] md:text-[10px]">
                  confirm password
                </label>
                <input
                  value={confirmNewPassword || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmNewPassword(e.target.value)
                  }
                  className="grow rounded-[7px] px-[15px] py-[10px] text-[13px] bg-[#f6f6f6]"
                  type="password"
                />
              </div>
              <div className="flex text-[13px] justify-end items-center gap-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => (
                    setShowChanegPassword(false), setErrorChangePassword("")
                  )}
                  className="text-[11px] sm:text-[14px] border-2 px-[15px] py-[6px] rounded-[8px]"
                >
                  cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleChangePassword()}
                  className="text-[11px] sm:text-[14px] px-[15px] py-[6px] rounded-[8px] text-white bg-black"
                >
                  confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
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
            <Link href={'/'}>
            <Image
              src="/Icon-form/FORMIX LOGO.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className="h-[20px] w-[70px]"
            /></Link>

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
              <Link href={"/workspace"} onClick={() => setShowMarket(false)}>
                <div className=" flex gap-x-[10px] hover:bg-[#F1F1F1] rounded-[8px] px-[20px] py-[10px] items-center">
                  <Image
                    src="/Icon-form/22.svg"
                    width={1000}
                    height={1000}
                    quality={100}
                    alt="question"
                    className="h-[22px] w-auto"
                  />
                  <p className="text-[13px]">Work space</p>
                </div>
              </Link>
              <Link href={"/workspace?isMarket=true"}>
                <div
                  onClick={() => setShowMarket(true)}
                  className=" flex gap-x-[10px] hover:bg-[#F1F1F1] rounded-[8px] px-[20px] py-[10px] items-center"
                >
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
              </Link>

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
          <div className=" relative flex ml-[15px] justify-between lg:gap-x-[5px] pr-[25px] w-full  items-center">
            <div className="flex  items-center gap-x-[10px]">
              <div className="bg-[#c7c7c7] min-w-[25px] min-h-[25px] rounded-[50%]"></div>
              <div>
                <p className="font-medium text-[13px]">{username}</p>
                <p className="text-[10px] text-[#c5c5c5]">{email}</p>
              </div>
            </div>
            <Image
              onClick={() => setAccount((prev) => !prev)}
              src="/Icon-form/18.png"
              width={1000}
              height={1000}
              quality={100}
              alt="question"
              className={
                account
                  ? "h-[25px] w-[25px] transition-all duration-[500ms]"
                  : "h-[25px] w-[25px]  rotate-180 transition-all duration-[500ms]"
              }
            />
            {account && (
              <div
                ref={accountPcRef}
                className="hidden md:block absolute z-30 bottom-8 right-2"
              >
                <div className="w-[140px] flex flex-col text-[10px] border-2 gap-y-[5px] bg-white rounded-[7px] px-[7px] py-[5px]">
                  <div
                    onClick={() => {
                      setShowChangeName(true);
                      setAccount(false);
                    }}
                    className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]"
                  >
                    <Image
                      src="/Icon-form/37.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[13px] w-[14px]"
                    />
                    <h4>Username</h4>
                  </div>
                  <div
                    onClick={() => (
                      setShowChanegPassword(true), setAccount(false)
                    )}
                    className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]"
                  >
                    <Image
                      src="/Icon-form/38.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[13px] w-[14px]"
                    />
                    <h4>Change password</h4>
                  </div>
                  <div className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]">
                    <Image
                      src="/Icon-form/39.png"
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="question"
                      className="h-[13px] w-[14px]"
                    />
                    <h4>Logout</h4>
                  </div>
                </div>
              </div>
            )}
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
            <div className="relative flex items-center gap-x-2">
              <div
                className="relative"
                onClick={() => {
                  setnotify(!shownotify), setfirstTime(false);
                }}
              >
                <Image
                  src="/Icon-form/26.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="question"
                  className="h-[20px] w-[20px]"
                />
                <div
                  className={
                    firstTime
                      ? "rounded-[50%] w-[7px] h-[7px]  absolute left-2.5 top-0 bg-orange-400"
                      : ""
                  }
                ></div>
                {shownotify && (
                  <div
                    ref={notifyref}
                    className="absolute top-[30px] right-[-10px] w-[240px] border-2 bg-white rounded-[8px] p-4"
                  >
                    <h2 className="font-medium">Notify</h2>
                    <div className="mt-4 flex gap-x-[15px] items-center">
                      <Image
                        src="/Icon-form/47.svg"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-[40px] w-[40px]"
                      />
                      <div className="text-[#6D6D6D]">
                        <p className="text-[10px]">
                          Welcome! {username} Let’s get started and create your
                          form.
                        </p>
                        <p className="text-[8px]">just now</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => setAccountMoblie((prev) => !prev)}
                className="md:hidden relative items-center flex md:mr-[14px]"
              >
                <div className="bg-gray-400 w-[18px] h-[18px] rounded-[50%]"></div>
                <Image
                  src="/Icon-form/18.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="question"
                  className={
                    accountMoblie
                      ? "h-[25px] w-[25px] transition-all  rotate-180 duration-[500ms]"
                      : "h-[25px] w-[25px]  transition-all duration-[500ms]"
                  }
                />
              </div>
              {accountMoblie && (
                <div
                  ref={accountMoblieRef}
                  className="md:hidden block absolute z-30 top-6 right-2"
                >
                  <div className="w-[140px] flex flex-col text-[10px] border-2 gap-y-[5px] bg-white rounded-[7px] px-[7px] py-[5px]">
                    <div
                      onClick={() => (
                        setShowChangeName(true), setAccountMoblie(false)
                      )}
                      className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]"
                    >
                      <Image
                        src="/Icon-form/37.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-[13px] w-[14px]"
                      />
                      <h4>Username</h4>
                    </div>
                    <div
                      onClick={() => (
                        setShowChanegPassword(true), setAccountMoblie(false)
                      )}
                      className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]"
                    >
                      <Image
                        src="/Icon-form/38.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-[13px] w-[14px]"
                      />
                      <h4>Change password</h4>
                    </div>
                    <div className=" flex gap-x-[5px] items-center hover:bg-[#D9D9D9] transition-all duration-[400ms] p-[7px] rounded-[5px]">
                      <Image
                        src="/Icon-form/39.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-[13px] w-[14px]"
                      />
                      <h4>Logout</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!showMarket ? (
            <div>
              <div
                style={{
                  borderRight: "1px solid #c7c7c7",
                  borderSpacing: "100px",
                }}
                className=" rounded-[13px] py-[15px] px-[40px] hidden md:flex justify-between  mt-4 border-2 mr-[15px] "
              >
                <div className=" grow">
                  <h2 className="text-[10px] text-[#515151]">Total Form</h2>
                  <p className="font-medium text-[20px] mt-[5px]">
                    {totalForm}
                  </p>
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
                  <p className="font-medium text-[20px] mt-[5px]">
                    {activeForm}
                  </p>
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
                    <h2 className="text-[12px] font-medium ">
                      Keep It Simple!
                    </h2>
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
                          <p className="font-medium text-[12px]">
                            sort by date
                          </p>
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
                      <Link href="/form01">
                      <Image
                        src="/Icon-form/29.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        alt="question"
                        className="h-auto hover:brightness-[90%] transition-all duration-[500ms] w-[90px]"
                      />
                      </Link>
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleSearchForm(e.target.value)
                      }
                      className="bg-[#f5f5f5] max-w-[300px] grow py-[5px] rounded-[7px] text-[13px] px-[15px]"
                      placeholder="search your project"
                    ></input>
                  </div>
                  <div className="mt-2">
                    {formDataToSearch.map((item, index) => (
                      <div className="flex flex-col " key={index}>
                        <div className="flex mt-2 justify-between items-center">
                          <div className="flex gap-x-2 items-center">
                            <Image
                              src={`/Icon-form/${item.proflieId}.svg`}
                              width={1000}
                              height={1000}
                              quality={100}
                              alt="question"
                              className="h-auto hover:brightness-[90%] transition-all duration-[500ms] w-[35px]"
                            />
                            <p className="font-medium text-[13px] hover:text-[#5B5B5B] transition-all duration-[500ms]">
                              {item.name}
                            </p>
                          </div>
                          <div className="relative flex items-center gap-x-[15px]">
                            <div
                              title={
                                item.archive
                                  ? "Form is active"
                                  : "Form isn't active"
                              }
                              className={
                                item.archive
                                  ? "bg-red-400 w-[10px] h-[10px] rounded-[50%]"
                                  : "bg-green-400 w-[10px] h-[10px] rounded-[50%]"
                              }
                            ></div>

                            <Image
                              title="Edit"
                              src={`/Icon-form/41.svg`}
                              width={1000}
                              height={1000}
                              quality={100}
                              alt="question"
                              className="h-auto hover:brightness-[90%] mb-[2px] transition-all duration-[500ms] w-[18px]"
                            />
                            <div className="absolute bottom-5 left-[-15px] ">
                              {item.status && (
                                <div ref={menuRef} className="">
                                  <div className="w-[120px] bg-white px-[5px] bg-white  py-[8px] rounded-[7px] ] gap-x-[5px] flex flex-col gap-y-[5px] border-2 items-center">
                                    <div className="flex w-full gap-x-[5px] px-[7px] py-[5px] rounded-[5px]  hover:bg-[#D9D9D9] transition-all duration-[400ms]">
                                      <Image
                                        src={`/Icon-form/44.svg`}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        alt="question"
                                        className="h-[15px] mb-[2px] w-auto"
                                      />
                                      <h2 className="text-[10px]">Coppy Url</h2>
                                    </div>
                                    <div className="flex w-full gap-x-[5px] px-[7px] py-[5px] rounded-[5px]  hover:bg-[#D9D9D9] transition-all duration-[400ms]">
                                      <Image
                                        src={`/Icon-form/46.svg`}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        alt="question"
                                        className="h-[15px] mb-[2px] w-auto"
                                      />
                                      <h2 className="text-[10px]">
                                        Archive Form
                                      </h2>
                                    </div>
                                    <div className="flex w-full gap-x-[5px] px-[7px] py-[5px] rounded-[5px]  hover:bg-[#D9D9D9] transition-all duration-[400ms]">
                                      <Image
                                        src={`/Icon-form/45.svg`}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        alt="question"
                                        className="h-[15px] mb-[2px] w-auto"
                                      />
                                      <h2 className="text-[10px]">Delete</h2>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Image
                              onClick={() => handleShowOptionsForms(index)}
                              src={`/Icon-form/42.svg`}
                              width={1000}
                              height={1000}
                              quality={100}
                              alt="question"
                              className="h-auto hover:brightness-[90%] transition-all duration-[500ms] w-[20px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[590px] items-center justify-center">
              <div>
                <Image
                  src="/Icon-form/B02.svg"
                  width={1500}
                  height={1500}
                  quality={100}
                  alt="B02"
                  className="h-[250px] md:h-[300px] w-auto"
                />
                <h1 className="font-medium text-center text-[18px]">
                  Theme Store Not Yet Active
                </h1>
                <p className="text-[13px] text-[#5D5D5D] max-w-[250px] mt-2 mx-auto text-center">
                  This feature is not yet active, but it will be available soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={toggleNav}
        className={
          isHiding
            ? "md:hidden flex justify-center items-center fixed bottom-6 right-9 bg-white border-2 w-[52px] h-[52px] rounded-[50%]  transition-all duration-[500ms]"
            : "md:hidden flex justify-center items-center fixed bottom-6 right-9 bg-white border-2 w-[52px] h-[52px] rounded-[50%] rotate-180 transition-all duration-[500ms]"
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
          className={`
             flex flex-col fixed bottom-[90px] gap-y-[5px] right-9 ${
               isHiding ? "animation-slide-down" : "animation-slide-up"
             }`}
          onAnimationEnd={() => {
            if (isHiding) setShowNav(false);
          }}
        >
          <Link href={"/workspace"}>
            <div
              onClick={() => (setShowMarket(false), setShowNav(false))}
              className="md:hidden flex justify-center items-center bg-white border-2 w-[52px] h-[52px] rounded-[50%]"
            >
              <Image
                src="/Icon-form/22.svg"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[15px] w-[15px]"
              />
            </div>
          </Link>
          <Link href={"/workspace?isMarket=true"} onClick={() => setShowMarket(true)}>
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

          <Link href={"/"}>
            <div className="md:hidden flex justify-center items-center bg-white border-2 w-[52px] h-[52px] rounded-[50%]">
              <Image
                src="/Icon-form/24.png"
                width={1000}
                height={1000}
                quality={100}
                alt="question"
                className="h-[15px] w-[15px]"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Workspace;
