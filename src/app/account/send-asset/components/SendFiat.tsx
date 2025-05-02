"use client";

import Image from "next/image";
import React from "react";

interface RecieveFiatStepProps {
  accountName: string;
  bankName: string;
  accountNumber: string;
  amount: string;
  onConfirm: () => void;
}

export default function SendFiatStep({
  accountName,
  bankName,
  accountNumber,
  amount,
  onConfirm,
}: RecieveFiatStepProps) {
  return (
    <div className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9] p-6">
      <div className="flex flex-col w-full max-w-md">
        {/* Account Number */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Account Number
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/UserCircle.svg"
                alt="Account icon"
                width={24}
                height={24}
              />
            </div>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => console.log(e.target.value)} // Replace with a proper handler
              className="w-full bg-transparent text-lg font-semibold text-[#F7F0D9] outline-none"
              placeholder="Enter account number"
            />
          </div>
        </div>

        {/* Bank Name */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Bank
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/zenithbank.svg"
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

        {/* Account Name */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Account Name
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/UserCircle.svg"
                alt="User icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {accountName}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="w-full mb-8">
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Amount
          </label>
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              <Image
                src="/icons/naira.svg"
                alt="Naira icon"
                width={24}
                height={24}
              />
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => console.log(e.target.value)}
              className="w-full bg-transparent text-lg font-semibold text-[#F7F0D9] outline-none"
              placeholder="Enter amount in ₦"
            />
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
