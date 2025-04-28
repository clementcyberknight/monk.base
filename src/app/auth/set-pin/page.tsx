"use client";

import { useState, useRef, useEffect } from "react";
import MobileCheck from "@/app/MobileCheck";

export default function SetPaymentPinPage() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<
    "newPin" | "confirmPin" | null
  >("newPin");
  const newPinInputRef = useRef<HTMLInputElement>(null);
  const confirmPinInputRef = useRef<HTMLInputElement>(null);
  const pinLength = 4;

  useEffect(() => {
    if (activeField === "newPin") {
      newPinInputRef.current?.focus();
    } else if (activeField === "confirmPin") {
      confirmPinInputRef.current?.focus();
    }
  }, [activeField]);

  const handlePinChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= pinLength) {
      setter(digitsOnly);
      if (setter === setNewPin && digitsOnly.length === pinLength) {
        setActiveField("confirmPin");
      }
    }
  };

  const handleSave = () => {
    if (newPin.length !== pinLength || confirmPin.length !== pinLength) {
      alert(`Please enter a ${pinLength}-digit PIN for both fields.`);
      return;
    }
    if (newPin !== confirmPin) {
      alert("New PIN and Confirm PIN do not match.");
      return;
    }

    console.log("Saving PIN:", newPin);
  };

  const renderPinDots = (pin: string) => {
    const dots = [];
    for (let i = 0; i < pin.length; i++) {
      dots.push(<div key={i} className="w-4 h-4 rounded-full bg-white"></div>);
    }

    return (
      <div className="flex space-x-4 min-h-[1rem] items-center">{dots}</div>
    );
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-white">
        <div className="flex flex-col w-full max-w-md px-4 py-8 flex-grow overflow-y-auto">
          <div className="flex space-x-1 mb-8">
            <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
            <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
            <div className="flex-1 h-2 rounded-full bg-[#444]"></div>
          </div>

          <div className="w-full mb-8">
            <h1 className="text-2xl font-bold text-[#F7F0D9] text-left">
              Set a payment pin
            </h1>
          </div>

          <div className="w-full flex flex-col flex-grow">
            <div className="w-full mb-8">
              <label
                htmlFor="newPinInput"
                className="block text-sm font-medium mb-2 text-[#F7F0D9]"
              >
                New Pin
              </label>
              <div
                className={`w-full bg-[#333] rounded-xl py-6 px-7 flex items-center cursor-text ${
                  activeField === "newPin" ? "border border-[#FFBB03]" : ""
                }`}
                onClick={() => newPinInputRef.current?.focus()}
              >
                {renderPinDots(newPin)}
              </div>
              <input
                id="newPinInput"
                ref={newPinInputRef}
                type="tel"
                maxLength={pinLength}
                value={newPin}
                onChange={(e) => handlePinChange(setNewPin, e)}
                onFocus={() => setActiveField("newPin")}
                onBlur={() => setActiveField(null)}
                className="sr-only"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <div className="w-full mb-8">
              <label
                htmlFor="confirmPinInput"
                className="block text-sm font-medium mb-2 text-[#F7F0D9]"
              >
                Confirm Pin
              </label>
              <div
                className={`w-full bg-[#333] rounded-xl py-6 px-7 flex items-center cursor-text ${
                  activeField === "confirmPin" ? "border border-[#FFBB03]" : ""
                }`}
                onClick={() => confirmPinInputRef.current?.focus()}
              >
                {renderPinDots(confirmPin)}
              </div>
              <input
                id="confirmPinInput"
                ref={confirmPinInputRef}
                type="tel"
                maxLength={pinLength}
                value={confirmPin}
                onChange={(e) => handlePinChange(setConfirmPin, e)}
                onFocus={() => setActiveField("confirmPin")}
                onBlur={() => setActiveField(null)}
                className="sr-only"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button
                onClick={handleSave}
                className="w-full px-9 py-4 rounded-2xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                disabled={
                  newPin.length !== pinLength || confirmPin.length !== pinLength
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md px-4 py-4 flex-shrink-0"></div>
      </main>
    </MobileCheck>
  );
}
