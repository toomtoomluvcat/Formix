"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

function NewPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { token } = useParams(); // ดึง token จาก path parameter (เช่น /reset-password/abc123)

  useEffect(() => {
    // ตรวจสอบว่ามี token หรือไม่ ถ้าไม่มีให้แสดง error
    if (!token) {
      setError("No token provided. Please use a valid reset password link.");
    }
  }, [token]);

  const handleSubmit = async (): Promise<void> => {
    setError(""); // ล้าง error ก่อน

    // ตรวจสอบว่ามี token หรือไม่
    if (!token) {
      setError("No token provided. Please use a valid reset password link.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/auth/newpassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          confirmNewPassword,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || `HTTP error! Status: ${res.status}`);
      }

      // ถ้าสำเร็จ ให้ redirect ไปหน้า signin
      alert(responseData.msg); // แสดงข้อความสำเร็จจาก backend
      router.push("/signin");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col grow">
        <Link href={"/"}>
          <Image
            src="/Icon-form/FORMIX LOGO.png"
            width={1000}
            height={1000}
            quality={100}
            alt="question"
            className="h-[23px] mt-[20px] md:mt-[0px] ml-[50px] w-[70px]"
          />
        </Link>
        <div className="w-full flex-col flex items-center mx-auto mt-[130px] px-[50px]">
          <h1 className="font-medium max-w-[350px] w-full mb-[15px] text-[30px]">
            ✨ Reset Your Password
          </h1>
          <p className="text-red-400 text-[13px] w-full px-[7px] max-w-[350px]">
            {error}
          </p>
          <div className="w-full max-w-[350px] mx-auto mt-[5px] items-center flex gap-y-[10px] flex-col">
            <div className="w-full">
              <div className="relative mt-[7px]">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                  id="new-password-input"
                  type={showPassword ? "text" : "password"}
                  className="py-3 ps-4 pe-10 block w-full bg-[#F5F5F5] border-gray-200 rounded-[15px] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter new password"
                  value={newPassword}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-[15px] focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {!showPassword ? (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43SIL 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </>
                    ) : (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <div className="relative mt-[15px]">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmNewPassword(e.target.value)
                  }
                  id="confirm-new-password-input"
                  type={showConfirmPassword ? "text" : "password"}
                  className="py-3 ps-4 pe-10 block w-full bg-[#F5F5F5] border-gray-200 rounded-[15px] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-[15px] focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {!showConfirmPassword ? (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </>
                    ) : (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="border-2 mt-6 text-white bg-black hover:bg-[#262626] transition-all duration-[500ms] rounded-[15px] py-[10px] w-full"
              >
                Reset Password
              </button>
              <div className="w-full mt-2 mb-[100px]">
                <p className="text-center text-[12px]">
                  Do you already have an account?{" "}
                  <Link
                    href={"/signin"}
                    className="font-medium hover:text-[#3E3E3E] transition-all duration-[500ms]"
                  >
                    SignIn
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/Icon-form/B03.png"
          width={1500}
          height={1500}
          quality={100}
          alt="B03"
          className="h-[695px] hidden lg:block w-auto"
        />
      </div>
    </div>
  );
}

export default NewPassword;