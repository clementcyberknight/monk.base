"use client";

import Image from "next/image";
import React, { useState } from "react";
import TransactionPasscodeModal from "@/app/account/send-asset/modal/PassCode";
import SaveRecipient from "@/app/account/send-asset/modal/SaveRecipient";

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
  const [showSavedRecipients, setShowSavedRecipients] = useState(false);

  const savedAccounts = [
    { name: "Ojukwu Emanuel", icon: "/icons/usdc.svg", accountNumber: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    { name: "Paul Nwobi", icon: "/icons/usdc.svg", accountNumber: "0x742d35Cc6634C0532925a3b844Bc454e4438f44f" },
    { name: "Taiwo Ade", icon: "/icons/usdc.svg", accountNumber: "0x742d35Cc6634C0532925a3b844Bc454e4438f44g" }
  ];

  const matchingAccounts = contactAddress 
    ? savedAccounts.filter(account => account.accountNumber.toLowerCase().startsWith(contactAddress.toLowerCase()))
    : [];

  const handleConfirmClick = () => {
    if (!contactAddress || !token || !amount) {
      alert("Please fill all fields.");
      return;
    }
    setShowPasscodeModal(true);
  };

  const handleVerifyPasscode = (passcode: string) => {
    setIsLoading(true);
    setShowPasscodeModal(false);

    console.log("Verifying passcode and processing transaction...");
    setTimeout(() => {
      console.log("Transaction successful with passcode:", passcode);
      setIsLoading(false);
      onConfirm({
        contactAddress,
        token,
        amount,
        tokenSymbol,
      });
    }, 1500);
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
              placeholder="0x742d...44e"
            />
          </div>
          <button 
            onClick={() => setShowSavedRecipients(true)}
            className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#FFBB03] shrink-0"
          >
            <Image
              src="/icons/blackUserCircle.svg"
              alt="Account icon"
              width={24}
              height={24}
            />
          </button>
        </div>
        {contactAddress && matchingAccounts.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto py-2 px-1">
            {matchingAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => {
                  setContactAddress(account.accountNumber);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-[#2C2C2B] rounded-xl hover:bg-[#3A3A3C] transition-colors flex-shrink-0"
              >
                <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={account.icon}
                    alt={account.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-[#F7F0D9] whitespace-nowrap">{account.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        )}
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
      {showSavedRecipients && (
        <SaveRecipient
          savedAccounts={savedAccounts}
          onSelect={(account) => {
            setContactAddress(account.accountNumber);
            setShowSavedRecipients(false);
          }}
          onClose={() => setShowSavedRecipients(false)}
        />
      )}
    </div>
  );
}
