"use client";

import Image from "next/image";
import React from "react";

interface RecieveCryptoStepProps {
  chainName: string;
  chainSymbol: string;
  chainIcon: string;
  walletAddress: string;
  onShowQrCode: (address: string) => void;
  onCopyAddress: (address: string) => void;
}

export default function RecieveCryptoStep({
  chainName,
  chainSymbol,
  chainIcon,
  walletAddress,
  onShowQrCode,
  onCopyAddress,
}: RecieveCryptoStepProps) {
  const maskAddress = (address: string, startChars = 15, endChars = 3) => {
    // Adjusted numbers to match image: 15...3
    if (!address) return "";
    if (address.length <= startChars + endChars) return address;
    return `${address.substring(0, startChars)}....${address.substring(
      address.length - endChars
    )}`;
  };

  const maskedAddress = maskAddress(walletAddress);

  return (
    <div className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9] p-4">
      {" "}
      {/* Added padding to match the image spacing */}
      <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto">
        {/* Header - Wallet Title */}
        <div className="w-full mb-8">
          {" "}
          {/* Adjusted margin-bottom */}
          <h1 className="text-2xl font-bold text-left text-[#F7F0D9]">
            Wallet
          </h1>{" "}
          {/* Ensure text color */}
        </div>

        {/* Chain Info */}
        <div className="w-full mb-6">
          {" "}
          {/* Adjusted margin-bottom */}
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Chain
          </label>{" "}
          {/* Ensure text color */}
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src={chainIcon}
                  alt={`${chainName} logo`}
                  width={28}
                  height={28}
                />
              </div>
              <span className="font-semibold text-lg text-[#F7F0D9]">
                {chainName}
              </span>{" "}
              {/* Ensure text color */}
            </div>
            <span className="font-semibold text-lg text-[#777]">
              {chainSymbol}
            </span>{" "}
            {/* Use lighter color for symbol */}
          </div>
        </div>

        {/* Account Number Info */}
        <div className="w-full mb-8">
          {" "}
          {/* Adjusted margin-bottom */}
          <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
            Account Number
          </label>{" "}
          {/* Ensure text color */}
          <div className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#FFBB03]">
              {" "}
              {/* Adjust size and color for wallet icon */}
              <Image
                src="/icons/wallet.svg"
                alt="Wallet icon"
                width={24}
                height={24}
              />
            </div>
            <span className="font-semibold text-lg text-[#F7F0D9]">
              {maskedAddress}
            </span>{" "}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col space-y-4 mb-auto">
          {" "}
          <button
            onClick={() => onShowQrCode(walletAddress)}
            className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#2C2C2B] hover:bg-[#3a3a3a] text-[#F7F0D9] flex items-center justify-center gap-2" // Ensure text color and gap
          >
            QR Code
            <div className="w-6 h-6 text-[#F7F0D9]">
              {" "}
              <Image
                src="/icons/qr-code.svg"
                alt="QR Code icon"
                width={24}
                height={24}
              />
            </div>
          </button>
          <button
            onClick={() => onCopyAddress(walletAddress)}
            className="w-full px-9 py-4 rounded-xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] flex items-center justify-center gap-2" // Ensure text color and gap
          >
            Copy Address
            <div className="w-6 h-6 text-[#1E1E1E]">
              {" "}
              <Image
                src="/icons/copy.svg"
                alt="Copy icon"
                width={24}
                height={24}
              />
            </div>
          </button>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}
