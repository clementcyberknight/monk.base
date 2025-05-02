"use client";

import { useState } from "react";
import MobileCheck from "@/app/MobileCheck";
import Image from "next/image";
import RecieveFiatStep from "./components/RecieveFiat";
import RecieveCryptoStep from "./components/RecieveCrypto";

type CurrencyType = "fiat" | "crypto";

interface FiatCurrency {
  name: string;
  symbol: string;
  icon: string;
  type: "fiat";
}

interface CryptoCurrency {
  name: string;
  symbol: string;
  icon: string;
  type: "crypto";
}

type SelectedCurrency = FiatCurrency | CryptoCurrency | null;

// Define possible views for the page
type ReceiveAssetView = "list" | "fiatReceive" | "cryptoReceive";

export default function RecieveAssetPage() {
  const [currentView, setCurrentView] = useState<ReceiveAssetView>("list");
  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectedCurrency>(null);

  const fiats: FiatCurrency[] = [
    {
      name: "Nigerian Naira",
      symbol: "NGN",
      icon: "/icons/flag-nigeria.svg",
      type: "fiat",
    },
    { name: "US Dollar", symbol: "USD", icon: "/icons/us.svg", type: "fiat" },
  ];

  const chains: CryptoCurrency[] = [
    {
      name: "Solana",
      symbol: "SOL",
      icon: "/icons/solanaico.svg",
      type: "crypto",
    },
    { name: "Ethereum", symbol: "ETH", icon: "/icons/eth.svg", type: "crypto" },
    // Add more chains
  ];

  // Dummy receive details - Replace with actual data fetched after selection
  const dummyFiatDetails = {
    accountName: "John Doe",
    bankName: "Example Bank",
    accountNumber: "1234567890",
    currencyName: "Naira Account", // Or dynamically set based on selected fiat
  };

  const dummyCryptoDetails = {
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j...", // Replace with user's actual wallet address for the chain
  };

  const handleCurrencySelect = (currency: FiatCurrency | CryptoCurrency) => {
    console.log("Selected:", currency);
    setSelectedCurrency(currency);
    if (currency.type === "fiat") {
      setCurrentView("fiatReceive");
    } else {
      // type is 'crypto'
      setCurrentView("cryptoReceive");
      // In a real app, trigger API call here to get walletAddress for the selected chain
      // For now, we'll use dummy data directly
    }
  };

  // Handlers for actions within the receive components (placeholders)
  const handleShowQrCode = (details: any) => {
    console.log("Showing QR code for:", details);
    // Implement modal or new screen to show QR code
  };

  const handleCopyDetails = (details: any) => {
    console.log("Copying details:", details);
    // Implement copy to clipboard logic (using navigator.clipboard API)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      const textToCopy =
        typeof details === "string"
          ? details
          : JSON.stringify(details, null, 2);
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    } else {
      console.warn("Clipboard API not available.");
    }
  };

  const handleGoBack = () => {
    setCurrentView("list");
    setSelectedCurrency(null);
  };

  const handleFilterSort = (type: "fiat" | "crypto") => {
    console.log(`Filtering/sorting ${type}s`);
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9]">
        {/* Header with back button */}
        <div className="w-full max-w-md px-4 py-4 flex items-center justify-between flex-shrink-0">
          {currentView !== "list" && (
            <button
              onClick={handleGoBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#F7F0D9]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
          {/* Optionally show a title here depending on the view */}
          {currentView === "list" && (
            <h1 className="text-2xl font-bold text-left flex-grow">
              Pick Currency
            </h1>
          )}
          {currentView !== "list" && selectedCurrency && (
            <h1 className="text-2xl font-bold text-center flex-grow">
              Account Details
            </h1>
          )}
          <div className="w-8"></div>{" "}
        </div>

        <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto px-4 py-4">
          {" "}
          {currentView === "list" && (
            <>
              <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-[#F7F0D9]">
                    Fiats
                  </h2>
                  <button
                    className="p-1"
                    onClick={() => handleFilterSort("fiat")}
                  >
                    <img
                      src="/icons/filterbrown.svg"
                      alt="filter"
                      className="w-5 h-5"
                    />{" "}
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
                        <span className="font-semibold text-lg text-[#F7F0D9]">
                          {fiat.name}
                        </span>
                      </div>
                      <span className="font-semibold text-lg text-[#777]">
                        {fiat.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chains Section */}
              <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-[#F7F0D9]">
                    Chains
                  </h2>
                  <button
                    className="p-1"
                    onClick={() => handleFilterSort("crypto")}
                  >
                    {" "}
                    <img
                      src="/icons/filterbrown.svg"
                      alt="filter"
                      className="w-5 h-5"
                    />{" "}
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
                          <Image
                            src={chain.icon}
                            alt={`${chain.name} logo`}
                            width={28}
                            height={28}
                          />
                        </div>
                        <span className="font-semibold text-lg text-[#F7F0D9]">
                          {chain.name}
                        </span>
                      </div>
                      <span className="font-semibold text-lg text-[#777]">
                        {chain.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-grow"></div>
            </>
          )}
          {currentView === "fiatReceive" &&
            selectedCurrency &&
            selectedCurrency.type === "fiat" && (
              <RecieveFiatStep
                accountName={dummyFiatDetails.accountName}
                bankName={dummyFiatDetails.bankName}
                accountNumber={dummyFiatDetails.accountNumber}
                currencyName={`${selectedCurrency.name} Account`}
                onShowQrCode={handleShowQrCode}
                onCopyDetails={handleCopyDetails}
              />
            )}
          {currentView === "cryptoReceive" &&
            selectedCurrency &&
            selectedCurrency.type === "crypto" && (
              <RecieveCryptoStep
                chainName={selectedCurrency.name}
                chainSymbol={selectedCurrency.symbol}
                chainIcon={selectedCurrency.icon}
                walletAddress={dummyCryptoDetails.walletAddress}
                onShowQrCode={handleShowQrCode}
                onCopyAddress={handleCopyDetails}
              />
            )}
        </div>
      </main>
    </MobileCheck>
  );
}
