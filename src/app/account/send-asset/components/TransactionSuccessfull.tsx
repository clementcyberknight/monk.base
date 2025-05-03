"use client";

import Image from "next/image";
import React from "react";

interface TransactionSuccessProps {
  onComplete: () => void;
  onDownloadReceipt: () => void;
  message?: string;
}

export default function TransactionSuccess({
  onComplete,
  onDownloadReceipt,
  message = "Successfully transferred, any further delay is likely from recipients bank.",
}: TransactionSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1E1E1E] text-[#F7F0D9] px-4 pt-12 pb-8">
      <div className="flex flex-col items-center w-full max-w-[385px] justify-center -mt-0">
        <div className="rounded-3xl overflow-hidden mb-8">
          <Image
            src="/icons/sucessfull.svg"
            alt="Transaction Success Illustration"
            width={260}
            height={260}
            priority
            className="w-[260px] h-[260px]"
          />
        </div>
        <h1 className="text-3xl text-[#F7F0D9] font-bold mb-2 flex items-center gap-2">
          Success <span role="img" aria-label="rocket">🚀</span>
        </h1>
        <p className="text-sm text-[#F7F0D9] w-[320px] mb-6 text-center">
          {message}
        </p>
        <button
          onClick={onDownloadReceipt}
          className="w-full bg-[#2C2C2B] rounded-xl p-4 mb-3 flex items-center justify-center gap-2 text-base font-medium"
        >
          Download Receipt{" "}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
          >
            <path
              d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <button
        onClick={onComplete}
        className="w-full max-w-[385px] mb-12 bg-[#FFB803] text-[#1E1E1E] rounded-2xl p-4 font-semibold text-base"
      >
        Complete
      </button>
    </div>
  );
}
