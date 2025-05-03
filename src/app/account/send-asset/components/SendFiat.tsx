"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import TransactionPasscodeModal from "@/app/account/send-asset/modal/PassCode";
import SaveRecipient from "@/app/account/send-asset/modal/SaveRecipient";

interface SendFiatStepProps {
  currencyName: string;
  currencySymbol: string;
  currencyIcon: string;
  onConfirm: (details: {
    accountNumber: string;
    bankCode: string;
    amount: string;
    accountName?: string;
    bankName?: string;
  }) => void;
}

export default function SendFiatStep({
  currencyName,
  currencySymbol,
  currencyIcon,
  onConfirm,
}: SendFiatStepProps) {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("058"); // Example: Zenith Bank Code, make dynamic
  const [amount, setAmount] = useState("");
  const [fetchedAccountName, setFetchedAccountName] = useState<string | null>(
    null
  ); // State for fetched name
  const [selectedBankName, setSelectedBankName] =
    useState<string>("Zenith Bank");
  const [showSavedRecipients, setShowSavedRecipients] = useState(false);

  const savedAccounts = [
    { name: "Ojukwu Emanuel", icon: "/icons/zenithbank.svg", accountNumber: "7586947586" },
    { name: "Peter Nwobi", icon: "/icons/gtbank.svg", accountNumber: "7694758693" },
    { name: "Papa J", icon: "/icons/palmpay.svg", accountNumber: "6879849674" }
  ];

  const matchingAccounts = accountNumber 
    ? savedAccounts.filter(account => account.accountNumber.startsWith(accountNumber))
    : [];

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      console.log("Fetching account name for", accountNumber, bankCode);
      const timeoutId = setTimeout(() => {
        setFetchedAccountName("Adebayo Adewale");
      }, 1000); // Simulate network delay
      return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or change
    } else {
      setFetchedAccountName(null); // Clear name if inputs are incomplete
    }
  }, [accountNumber, bankCode]);

  const handleConfirmClick = () => {
    if (!accountNumber || !bankCode || !amount || !fetchedAccountName) {
      alert("Please fill all fields and verify account name.");
      return;
    }
    setShowPasscodeModal(true);
  };

  const handleVerifyPasscode = (passcode: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onConfirm({
        accountNumber,
        bankCode,
        amount,
        accountName: fetchedAccountName ?? "",
        bankName: selectedBankName,
      });
      
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      console.log("Transaction completed with passcode:", passcode);
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="flex flex-col w-full max-w-md flex-grow text-[#F7F0D9]">
      <div className="w-full px-2 mb-6">
        <label className="block text-sm mt-8 font-medium mb-2 text-[#F7F0D9]">
          Account Number
        </label>
        <div className="flex items-center gap-3">
          <div className="w-full bg-[#2C2C2B] rounded-2xl p-4">
            <input
              type="tel"
              value={accountNumber
                .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3")
                .trim()}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setAccountNumber(value);
                }
              }}
              className="bg-transparent tracking-widest text-lg font-semibold text-[#F7F0D9] outline-none font-mono"
              placeholder="000 000 0000"
              maxLength={13}
              inputMode="numeric"
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
        {accountNumber && matchingAccounts.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto py-2 px-1">
            {matchingAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => {
                  setAccountNumber(account.accountNumber);
                  setSelectedBankName(account.name.includes("Zenith") ? "Zenith Bank" : 
                                   account.name.includes("GT") ? "GT Bank" : "Palm Pay");
                }}
                className="flex items-center gap-2 px-3 py-2 bg-[#2C2C2E] rounded-xl hover:bg-[#3A3A3C] transition-colors flex-shrink-0"
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

      {/* Bank Selection */}
      <div className="w-full px-2 mb-6">
        <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
          Bank
        </label>
        {/* TODO: Replace with a proper dropdown/searchable list */}
        <button className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center justify-between gap-3 text-left hover:bg-[#3a3a3a]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/icons/zenithbank.svg"
                alt="Bank icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {selectedBankName}
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
      {fetchedAccountName && (
        <div className="w-full px-2 mb-6 transition-opacity duration-300 ease-in-out opacity-100">
          <label className="block text-sm font-medium mb-2 text-[#777]">
            Account Name (Verified)
          </label>
          <div className="w-full bg-[#1a1a1a] bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 ">
            {" "}
            {/* Indicate verified */}
            <div className="w-6 h-6 flex items-center justify-center text-green-500">
              <img src="/icons/UserCircle.svg" alt="account name" />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {fetchedAccountName}
            </span>
          </div>
        </div>
      )}
      {/* Placeholder/Loading for Account Name */}
      {!fetchedAccountName && accountNumber.length === 10 && bankCode && (
        <div className="w-full mb-6">
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-gray-600"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      )}
      {/* Amount Input */}
      <div className="w-full px-2 mb-8">
        <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
          Amount
        </label>
        <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 focus-within:border focus-within:border-[#FFBB03]">
          <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
            <Image
              src={currencyIcon}
              alt={`${currencySymbol} icon`}
              width={20}
              height={20}
            />
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
          Available: {currencySymbol} 50,000.00
        </p>
      </div>
      {/* Confirm Button */}
      <div className="mt-2">
        {" "}
        <button
          onClick={handleConfirmClick}
          disabled={!accountNumber || !amount || !fetchedAccountName}
          className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
      <TransactionPasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onConfirm={handleVerifyPasscode}
        transactionAmount={amount || "0"}
        transactionCurrency={currencyName}
      />
      {showSavedRecipients && (
        <SaveRecipient
          savedAccounts={savedAccounts}
          onSelect={(account) => {
            setAccountNumber(account.accountNumber);
            setShowSavedRecipients(false);
          }}
          onClose={() => setShowSavedRecipients(false)}
        />
      )}
    </div>
  );
}
