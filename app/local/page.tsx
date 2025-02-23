"use client";

import React, { useEffect, useState } from "react";

function Page() {
  const [token, setToken] = useState<string>();
  

  const hadleLocal = (newTOken: string): void => {
    localStorage.setItem("token", newTOken ?? "");
    console.log("Hello");
  };
  const hadleGet = (): void => {
    setToken(localStorage.getItem("token") ?? "");
  };
  return (
    <div>
      <p className="mb-6 mx-auto w-fit">token: {token ?? ""}</p>
      <div className="flex flex-col gap-4 items-center justify-center">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            hadleLocal(e.target.value)
          }
          className="p-4 border-2"
        />

        <button
          onClick={() => hadleGet()}
          type={"button"}
          className="bg-black p-4 text-white"
        >
          กดปุ่มนี้{" "}
        </button>
      </div>
    </div>
  );
}

export default Page;
