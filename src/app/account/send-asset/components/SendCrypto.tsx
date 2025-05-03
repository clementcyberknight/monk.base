"use client";

import Image from "next/image";
import React, { useState } from "react";
import TransactionPasscodeModal from "@/app/account/send-asset/modal/PassCode";

interface SendCryptoStepProps {
  chainName: string;
  chainSymbol: string;
  chainIcon: string;
  onConfirm: (details: {
    contactAddress: string;
    token: string;
    amount: string;
    tokenSymbol?: string;
  }) => void;
  onTransactionComplete: () => void;
}

export default function SendCryptoStep({ onConfirm }: SendCryptoStepProps) {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [contactAddress, setContactAddress] = useState("");
  const [token, setToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("$");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmClick = () => {
    if (!contactAddress || !token || !amount) {
      alert("Please fill all fields.");
      return;
    }
    setShowPasscodeModal(true);
  };

  const handleVerifyPasscode = (passcode: string) => {
    // Show loading indicator while verifying/processing
    setIsLoading(true);
    setShowPasscodeModal(false);

    // --- Simulate API call to verify passcode AND process transaction ---
    console.log("Verifying passcode and processing transaction...");
    setTimeout(() => {
      // Assume API call is successful
      console.log("Transaction successful with passcode:", passcode);
      setIsLoading(false);
      onConfirm({
        contactAddress,
        token,
        amount,
        tokenSymbol,
      });

      // *** Call the new prop to s
    }, 1500); // Simulate API delay
    // --- Handle API Errors: In a real app, catch errors here, set isLoading false, show error message, potentially re-open modal or show error inline ---
  };

  return (
    <div className="flex flex-col w-full max-w-md flex-grow text-[#F7F0D9] bg-[#1E1E1E]">
      {/* Contact Address Section */}
      <div className="w-full px-2 mb-6">
        <label className="block text-sm mt-8 font-medium mb-2 text-[#F7F0D9]">
          Wallet Address
        </label>
        <div className="flex items-center gap-3">
          <div className="w-full bg-[#2C2C2B] rounded-2xl p-4">
            <input
              type="text"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              className="bg-transparent tracking-wide text-lg font-semibold text-[#F7F0D9] outline-none w-full"
              placeholder="7hdgyG64dFGO.....12d"
            />
          </div>
          <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#FFBB03] shrink-0">
            <Image
              src="/icons/blackUserCircle.svg"
              alt="Account icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Token Selection */}
      <div className="w-full px-2 mb-6">
        <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
          Token
        </label>
        <button className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center justify-between gap-3 text-left hover:bg-[#3a3a3a]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/usdc.svg"
                alt="Token icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {token}
            </span>
          </div>
          {/* Dropdown indicator */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-[#777]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Amount Input */}
      <div className="w-full px-2 mb-8">
        <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
          Amount
        </label>
        <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 focus-within:border focus-within:border-[#FFBB03]">
          <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
            <span className="text-[#FFBB03] font-bold">₦</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-lg font-semibold text-[#F7F0D9] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.00"
            inputMode="decimal"
          />
          {/* Max button */}
          <button className="text-[#FFBB03] font-semibold text-sm">
            Max
          </button>{" "}
        </div>
        <p className="text-xs text-[#777] mt-1">
          Available: {tokenSymbol} 50,000.00
        </p>
      </div>

      {/* Confirm Button */}
      <div className="mt-2 px-2">
        <button
          onClick={handleConfirmClick}
          disabled={!contactAddress || !amount}
          className="w-full py-4 rounded-xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
      <TransactionPasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onConfirm={handleVerifyPasscode}
        transactionAmount={amount || "0"}
        transactionCurrency={token || "USDC"}
      />
    </div>
  );
}
