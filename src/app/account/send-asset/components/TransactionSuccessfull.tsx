"use client";

import Image from "next/image";
import React from "react";

interface TransactionSuccessProps {
  onComplete: () => void;
  onDownloadReceipt: () => void;
  onSaveAccount: () => void;
  message?: string;
  hideSaveAccount?: boolean;
}

export default function TransactionSuccess({
  onComplete,
  onDownloadReceipt,
  onSaveAccount,
  message = "Successfully transferred, any further delay is likely from recipient's bank.",
  hideSaveAccount = false,
}: TransactionSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-between flex-grow w-full max-w-md text-[#F7F0D9] py-8 text-center">
      <div className="flex flex-col items-center flex-1 justify-center mb-42">
        <div className="mb-12">
          <Image
            src="/icons/sucessfull.svg"
            alt="Transaction Success Illustration"
            width={220}
            height={180}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
          Success{" "}
          <span role="img" aria-label="rocket">
          🚀
          </span>
        </h1>
        <p className="text-sm text-[#A0A0A0] max-w-[400px] mx-auto leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col gap-3 w-[385px] mt-8">
          <button
            onClick={onDownloadReceipt}
            className="w-full bg-[#2C2C2B] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3a3a3a] transition-colors text-lg font-semibold"
          >
            Download Receipt
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
          {!hideSaveAccount && (
            <button
              onClick={onSaveAccount}
              className="w-full bg-[#2C2C2B] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3a3a3a] transition-colors text-lg font-semibold"
            >
              Save Account
            </button>
          )}
        </div>
      </div>

      <div className="w-full mt-12">
        <button
          onClick={onComplete}
          className="w-full bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] py-3 rounded-xl text-xl font-semibold transition-colors"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
