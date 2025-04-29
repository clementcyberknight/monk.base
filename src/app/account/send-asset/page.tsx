// src/app/send-asset/page.tsx
"use client";

import MobileCheck from "@/app/MobileCheck";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SendAssetPage() {
  const router = useRouter();

  const fiats = [
    { name: "Nigerian Naira", symbol: "NGN", icon: "/icons/flag-nigeria.svg" },
    { name: "US Dollar", symbol: "USD", icon: "/icons/us.svg" },
  ];

  const chains = [
    { name: "Solana", symbol: "SOL", icon: "/icons/solanaico.svg" },
    { name: "Ethereum", symbol: "ETH", icon: "/icons/eth.svg" },
  ];

  const handleCurrencySelect = (currency: { name: string; symbol: string }) => {
    console.log("Selected:", currency);
  };

  const handleBeneficiariesClick = () => {
    console.log("Viewing saved beneficiaries.");
  };

  const handleFilterSort = (type: "fiat" | "chain") => {
    console.log(`Filtering/sorting ${type}s`);
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9]">
        <div className="flex flex-col w-full max-w-md px-4 py-8 flex-grow overflow-y-auto">
          {/* Header */}
          <div className="w-full mb-8">
            <h1 className="text-2xl font-bold text-left">Pick Currency</h1>
          </div>

          {/* Fiats Section */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Fiats</h2>

              <button className="p-1" onClick={() => handleFilterSort("fiat")}>
                <img src="/icons/filterbrown.svg" alt="filter" />
              </button>
            </div>
            <div className="space-y-3">
              {fiats.map((fiat) => (
                <button
                  key={fiat.symbol}
                  onClick={() => handleCurrencySelect(fiat)}
                  className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={fiat.icon}
                      alt={`${fiat.name} flag`}
                      width={28}
                      height={21}
                      className="rounded-sm"
                    />
                    <span className="font-semibold text-lg">{fiat.name}</span>{" "}
                  </div>
                  <span className="font-semibold text-lg text-[#777]">
                    {fiat.symbol}
                  </span>{" "}
                </button>
              ))}
            </div>
          </div>

          {/* Chains Section */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Chains</h2>
              {/* Filter/Sort Icon Button */}
              <button className="p-1" onClick={() => handleFilterSort("chain")}>
                <img src="/icons/filterbrown.svg" alt="filter" />
              </button>
            </div>
            <div className="space-y-3">
              {chains.map((chain) => (
                <button
                  key={chain.symbol}
                  onClick={() => handleCurrencySelect(chain)}
                  className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {" "}
                      <Image
                        src={chain.icon}
                        alt={`${chain.name} logo`}
                        width={28}
                        height={28}
                      />
                    </div>
                    <span className="font-semibold text-lg">{chain.name}</span>{" "}
                    {/* Adjusted text size */}
                  </div>
                  <span className="font-semibold text-lg text-[#777]">
                    {chain.symbol}
                  </span>{" "}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Beneficiaries */}
          <div className="w-full mt-6">
            {" "}
            <button
              onClick={handleBeneficiariesClick}
              className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#3a3a3a] transition-colors"
            >
              {/* User Icon */}
              <div className="w-8 h-8 flex items-center justify-center text-[#FFBB03]">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user-round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span className="font-semibold text-lg">Saved Beneficiaries</span>{" "}
              {/* Adjusted text size */}
            </button>
          </div>

          <div className="flex-grow"></div>
        </div>
      </main>
    </MobileCheck>
  );
}
