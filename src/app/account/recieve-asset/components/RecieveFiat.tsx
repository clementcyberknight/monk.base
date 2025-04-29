// src/app/recieve-asset/components/RecieveFiatStep.tsx
"use client";

import Image from "next/image";
import React from "react";

interface RecieveFiatStepProps {
  accountName: string;
  bankName: string;
  accountNumber: string;
  currencyName: string; // e.g., "Naira Account"
  onShowQrCode: (details: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  }) => void; // Callback for showing QR
  onCopyDetails: (details: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  }) => void; // Callback for copying details
}

export default function RecieveFiatStep({
  accountName,
  bankName,
  accountNumber,
  currencyName,
  onShowQrCode,
  onCopyDetails,
}: RecieveFiatStepProps) {
  // Prepare details object for callbacks
  const accountDetails = { accountName, bankName, accountNumber };

  return (
    <div className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9] p-4">
      {" "}
      {/* Added padding */}
      <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto">
        {/* Header - Account Details Title */}
        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-left text-[#F7F0D9]">
            Account Details
          </h1>
        </div>

        {/* Currency Account Title */}
        <div className="w-full mb-6">
          {" "}
          {/* Adjusted margin-bottom */}
          <h2 className="text-xl font-semibold text-left text-[#F7F0D9]">
            {currencyName}
          </h2>
        </div>

        {/* Account Name Info */}
        <div className="w-full mb-4">
          {" "}
          {/* Adjusted margin-bottom */}
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Account Name
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/person.svg"
                alt="Person icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {accountName}
            </span>
          </div>
        </div>

        {/* Bank Name Info */}
        <div className="w-full mb-4">
          {" "}
          {/* Adjusted margin-bottom */}
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Bank Name
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/bank.svg"
                alt="Bank icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {bankName}
            </span>
          </div>
        </div>

        {/* Account Number Info */}
        <div className="w-full mb-8">
          {" "}
          {/* Adjusted margin-bottom */}
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Account Number
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/hash.svg"
                alt="Hash icon"
                width={24}
                height={24}
              />{" "}
              {/* Using hash.svg placeholder */}
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {accountNumber}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col space-y-4 mb-auto">
          {" "}
          {/* Added mb-auto to push buttons towards bottom */}
          <button
            onClick={() => onShowQrCode(accountDetails)}
            className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#2C2C2B] hover:bg-[#3a3a3a] text-[#F7F0D9] flex items-center justify-center gap-2"
          >
            QR Code
            <div className="w-6 h-6 text-[#F7F0D9]">
              <Image
                src="/icons/qr-code.svg"
                alt="QR Code icon"
                width={24}
                height={24}
              />
            </div>
          </button>
          <button
            onClick={() => onCopyDetails(accountDetails)}
            className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center gap-2"
          >
            Copy Details
            <div className="w-6 h-6 text-[#1E1E1E]">
              <Image
                src="/icons/copy.svg"
                alt="Copy icon"
                width={24}
                height={24}
              />
            </div>
          </button>
        </div>

        {/* Flex grow element to push buttons down */}
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}
