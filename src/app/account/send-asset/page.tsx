"use client";

import { useState } from "react";
import MobileCheck from "@/app/MobileCheck";
import Image from "next/image";
import SendFiatStep from "./components/SendFiat";
import SendCryptoStep from "./components/SendCrypto";
import TransactionSuccess from "@/app/account/send-asset/components/TransactionSuccessfull";
import { useRouter } from "next/navigation";
import TransactionFailed from "@/app/account/send-asset/components/TransactionFailed";

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

type SendAssetView = "list" | "sendFiat" | "sendCrypto" | "success" | "failed";

export default function SendAssetPage() {
  const [currentView, setCurrentView] = useState<SendAssetView>("list");
  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectedCurrency>(null);
  const [lastTransactionDetails, setLastTransactionDetails] =
    useState<any>(null);
  const router = useRouter();

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
  ];

  const handleCurrencySelect = (currency: FiatCurrency | CryptoCurrency) => {
    setSelectedCurrency(currency);
    if (currency.type === "fiat") {
      setCurrentView("sendFiat");
    } else {
      setCurrentView("sendCrypto");
    }
  };

  // Handler to go back to the list view
  const handleGoBack = () => {
    setCurrentView("list");
    setSelectedCurrency(null);
  };

  // Handlers for confirming the send action
  const handleSendFiatConfirm = (details: {
    accountNumber: string;
    bankCode: string;
    amount: string;
    accountName?: string; // Optional fields from verification
    bankName?: string; // Optional fields from verification
  }) => {
    console.log("Confirming Fiat Send:", details);
    setLastTransactionDetails(details);
    setCurrentView(Math.random() < 0.5 ? "failed" : "success");
    // TODO: Implement API call to initiate fiat transfer
    // Show confirmation screen or PIN entry screen
  };

  const handleSendCryptoConfirm = (details: {
    contactAddress: string;
    token: string;
    amount: string;
    tokenSymbol?: string;
  }) => {
    console.log("Confirming Crypto Send:", details);
    setLastTransactionDetails(details);
    setCurrentView(Math.random() < 0.5 ? "failed" : "success");
    // TODO: Implement API call to initiate crypto transaction
    // Show confirmation screen or PIN entry screen
  };

  // Placeholder for beneficiaries
  const handleBeneficiariesClick = () => {
    console.log("Viewing saved beneficiaries.");
    // TODO: Implement navigation or modal for beneficiaries
  };
  const handleDownloadReceipt = () => {
    console.log("Downloading receipt for:", lastTransactionDetails);
  };

  const handleSaveAccount = () => {
    console.log("Saving account for:", lastTransactionDetails);
    // Determine if it's fiat or crypto based on lastTransactionDetails structure
    // Example check:
    if (lastTransactionDetails?.accountNumber) {
      console.log("Saving Fiat beneficiary...");
    } else if (lastTransactionDetails?.recipientAddress) {
      console.log("Saving Crypto beneficiary...");
    }
  };

  const handleComplete = () => {
    router.push("/account/dashboard");
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9]">
        {/* Main content area */}
        <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto px-4 py-4">
          {" "}
          {/* Padding for content */}
          {currentView === "list" && (
            <>
              <div className="w-full max-w-md px-2 py-8 flex items-center justify-start flex-shrink-0">
                <h1 className="text-2xl font-bold  flex-grow">Pick Currency</h1>
              </div>

              {/* Fiats Section */}
              <div className="w-full px-2  mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-[#F7F0D9]">
                    Fiats
                  </h2>
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
              <div className="w-full px-2  mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-[#F7F0D9]">
                    Chains
                  </h2>
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

              {/* Saved Beneficiaries Button */}
              <div className="w-full px-2  -mt-4 pt-6 pb-2">
                {" "}
                <button
                  onClick={handleBeneficiariesClick}
                  className="w-full bg-[#2C2C2B] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-[#FFBB03]">
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
                  <span className="font-semibold text-lg text-[#F7F0D9]">
                    Saved Beneficiaries
                  </span>
                </button>
              </div>
            </>
          )}
          {/* Render SendFiatStep directly without extra divs/headers */}
          {currentView === "sendFiat" &&
            selectedCurrency &&
            selectedCurrency.type === "fiat" && (
              <SendFiatStep
                currencyName={selectedCurrency.name}
                currencySymbol={selectedCurrency.symbol}
                currencyIcon={selectedCurrency.icon}
                onConfirm={handleSendFiatConfirm}
              />
            )}
          {currentView === "sendCrypto" &&
            selectedCurrency &&
            selectedCurrency.type === "crypto" && (
              <SendCryptoStep
                chainName={selectedCurrency.name}
                chainSymbol={selectedCurrency.symbol}
                chainIcon={selectedCurrency.icon}
                onConfirm={handleSendCryptoConfirm}
                onTransactionComplete={handleComplete}
              />
            )}
          {currentView === "success" && (
            <TransactionSuccess
              onComplete={handleComplete}
              onDownloadReceipt={handleDownloadReceipt}
            />
          )}
          {currentView === "failed" && (
            <TransactionFailed
              onComplete={handleComplete}
              onDownloadReceipt={handleDownloadReceipt}
            />
          )}
        </div>
      </main>
    </MobileCheck>
  );
}
