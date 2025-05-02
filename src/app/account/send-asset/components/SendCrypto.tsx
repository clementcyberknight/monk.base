"use client";

import Image from "next/image";
import React from "react";

interface RecieveFiatStepProps {
  accountName: string;
  bankName: string;
  accountNumber: string;
  currencyName: string;
  onShowQrCode: (details: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  }) => void;
  onCopyDetails: (details: {
    accountName: string;
    bankName: string;
    accountNumber: string;
  }) => void;
}

export default function SendCryptoStep({
  accountName,
  bankName,
  accountNumber,
  currencyName,
  onShowQrCode,
  onCopyDetails,
}: RecieveFiatStepProps) {
  const accountDetails = { accountName, bankName, accountNumber };

  return (
    <div className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9] p-6">
      <div className="flex flex-col w-full max-w-md flex-grow">
        {/* Currency Name */}
        <div className="w-full mb-6">
          <h2 className="text-xl font-semibold text-left text-[#F7F0D9]">
            {currencyName}
          </h2>
        </div>

        {/* Account Name */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Contact Address
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-lg p-4 flex items-center gap-3">
            <span className="text-[#F7F0D9] text-base flex-grow truncate">
              {accountName}
            </span>
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFBB03] rounded-full">
              <Image
                src="/icons/UserCircle.svg"
                alt="Person icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        {/* Token */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Token
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-lg p-4 flex items-center gap-3">
            <Image
              src="/icons/USDC.svg"
              alt="Token icon"
              width={24}
              height={24}
            />
            <span className="text-[#F7F0D9] text-base">USDC</span>
          </div>
        </div>

        {/* Amount */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Amount
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-lg p-4 flex items-center gap-3">
            <span className="text-[#FFBB03] text-lg font-semibold">₦</span>
            <input
              type="text"
              placeholder="Enter amount"
              className="bg-transparent text-[#F7F0D9] text-base flex-grow outline-none"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => onShowQrCode(accountDetails)}
          className="w-full py-4 rounded-lg text-lg font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
