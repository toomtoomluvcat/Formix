"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    
    try {
      // First, check if email is provided
      if (!email || email.trim() === "") {
        throw new Error("Please enter your email address");
      }
      
      const res = await fetch("http://localhost:5001/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Parse the response as JSON
      const responseData = await res.json();
      console.log("API Response:", responseData);

      // Check if response is successful
      if (res.ok) {
        setSuccessMessage("Password reset link has been sent to your email. Please check your inbox.");
      } else {
        // Extract error message properly
        let errorMsg = "Server error. Please try again later.";
        
        if (responseData && typeof responseData === 'object') {
          // Try to find an error message in various possible locations
          if (typeof responseData.message === 'string') {
            errorMsg = responseData.message;
          } else if (typeof responseData.error === 'string') {
            errorMsg = responseData.error;
          } else if (responseData.errors && Array.isArray(responseData.errors) && responseData.errors[0]?.msg) {
            errorMsg = responseData.errors[0].msg;
          }
        }
        
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      
      // Make sure we always set a string as the error
      if (err instanceof Error) {
        setError(err.message);
      } else if (err && typeof err === 'object' && 'toString' in err) {
        setError(err.toString());
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
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
            🔑 Reset Your Password
          </h1>
          {error && (
            <p className="text-red-400 text-[13px] w-full px-[7px] max-w-[350px]">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-[13px] w-full px-[7px] max-w-[350px]">
              {successMessage}
            </p>
          )}
          <div className="w-full max-w-[350px] mx-auto mt-[5px] items-center flex gap-y-[10px] flex-col">
            <input
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="Email"
              className="bg-[#F5F5F5] w-full rounded-[15px] px-[15px] py-[10px]"
            />
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
              className="w-full"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`border-2 mt-6 text-white bg-black hover:bg-[#262626] transition-all duration-[500ms] rounded-[15px] py-[10px] w-full ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="w-full mt-2 mb-[100px]">
                <p className="text-center text-[12px]">
                  Remember your password?{" "}
                  <Link
                    href={"/signin"}
                    className="font-medium hover:text-[#3E3E3E] transition-all duration-[500ms]"
                  >
                    Sign In
                  </Link>{" "}
                </p>
              </div>
            </form>
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

export default ForgotPassword;