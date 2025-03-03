"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [resetPassword, setresetPassword] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/workspace");
      return;
    }
  }, []);

  const data = {
    email: email,
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      console.log("API Response:", responseData);

      if (!res.ok) {
        const errorMessage =
          responseData.errors?.[0]?.msg || `HTTP error! Status: ${res.status}`;
        throw new Error(errorMessage);
      }

      if (!responseData.token) {
        throw new Error("Invalid response: No token received");
      }

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expDate", responseData.expDate);

      router.push("/workspace");
    } catch (err) {
      console.error("Fetch Error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-between items-center">
      {resetPassword?
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
              🔑 Reset Your Password
            </h1>
            <p className="text-red-400 text-[13px] w-full px-[7px] max-w-[350px]">
              {error}
            </p>
            <div className="w-full max-w-[350px] mx-auto mt-[5px]  items-center flex gap-y-[10px] flex-col">
              <input
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                type="email"
                placeholder="Email "
                className="bg-[#F5F5F5] w-full  rounded-[15px] px-[15px] py-[10px]"
              />
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmit(e)
                }
                className="w-full"
              >
                <button
                  type="submit"
                  className="border-2 mt-6 text-white bg-black hover:bg-[#262626] transition-all duration-[500ms] rounded-[15px] py-[10px] w-full"
                >
                  Continue
                </button>
                <div className="w-full mt-2 mb-[100px]">
                  <p className="text-center text-[12px]">
                    Don't Have an Account Yet?{" "}
                    <Link
                      href={"/signup"}
                      className="font-medium hover:text-[#3E3E3E] transition-all duration-[500ms]"
                    >
                      SignUp
                    </Link>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      :<div>
        
        </div>}
      <div className="relative">
        <Image
          src="/Icon-form/B03.png"
          width={1500}
          height={1500}
          quality={100}
          alt="B03"
          className="h-[695px]  hidden lg:block w-auto"
        />
      </div>
    </div>
  );
}

export default Signin;
