"use client";

import Image from "next/image";
import React from "react";

interface TransactionSuccessProps {
  onComplete: () => void;
  onDownloadReceipt: () => void;
  message?: string;
}

export default function TransactionFailed({
  onComplete,
  onDownloadReceipt,
  message = "We’ve encountered some issues check your(or recipients bank’s) network  and try again later. ",
}: TransactionSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-between flex-grow w-full max-w-md text-[#F7F0D9] py-8 text-center">
      <div className="flex flex-col items-center flex-1 justify-center mb-42">
        <div className="mb-12">
          <Image
            src="/icons/failed.svg"
            alt="Transaction Failed Illustration"
            width={220}
            height={180}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
        Error {" "}
          <span role="img" aria-label="Warning Emoji">
            ⚠
          </span>
        </h1>
        <p className="text-sm text-[#A0A0A0] max-w-[400px] mx-auto leading-relaxed">
          {message}
        </p>
        <button
          className="w-[385px] mt-8 bg-[#2C2C2B] rounded-xl p-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3a3a3a] transition-colors text-lg font-semibold"
        >
          Report Error: 3100
        </button>
      </div>
      

      <div className="w-full mt-12">
        <button
          onClick={onComplete}
          className="w-full bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] py-3 rounded-xl text-xl font-semibold transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
