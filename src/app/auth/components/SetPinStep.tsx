"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";

interface SetPinStepProps {
  onComplete: (pin: string) => void;
}

export default function SetPinStep({ onComplete }: SetPinStepProps) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<
    "newPin" | "confirmPin" | null
  >("newPin");
  const newPinInputRef = useRef<HTMLInputElement>(null);
  const confirmPinInputRef = useRef<HTMLInputElement>(null);
  const pinLength = 4;

  // Auto-focus logic
  useEffect(() => {
    if (activeField === "newPin") {
      newPinInputRef.current?.focus();
    } else if (activeField === "confirmPin") {
      confirmPinInputRef.current?.focus();
    }
  }, [activeField]);

  // Handle PIN input changes
  const handlePinChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= pinLength) {
      setter(digitsOnly);
      if (setter === setNewPin && digitsOnly.length === pinLength) {
        setTimeout(() => setActiveField("confirmPin"), 0);
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
    onComplete(newPin);
  };

  const renderPinDots = (pin: string) => {
    const dots = [];
    for (let i = 0; i < pinLength; i++) {
      const isFilled = i < pin.length;
      dots.push(
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${
            isFilled ? "bg-white" : "bg-[#666]"
          }`}
        ></div>
      );
    }
    return (
      <div className="flex space-x-4 min-h-[1rem] items-center">{dots}</div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto text-[#F7F0D9]">
      {" "}
      <div className="w-full mb-8">
        <h1 className="text-2xl font-bold text-left">Set a payment pin</h1>
      </div>
      <div className="w-full flex flex-col flex-grow">
        <div className="w-full mb-6">
          {" "}
          <label
            htmlFor="newPinInput"
            className="block text-sm font-medium mb-2"
          >
            New Pin
          </label>
          <div
            className={`w-full bg-[#333] rounded-xl py-6 px-7 flex items-center cursor-text focus-within:border focus-within:border-[#FFBB03]`} // Add focus style
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
            onBlur={() => {}}
            className="sr-only"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
          />
        </div>

        <div className="w-full mb-8">
          <label
            htmlFor="confirmPinInput"
            className="block text-sm font-medium mb-2"
          >
            Confirm Pin
          </label>
          <div
            className={`w-full bg-[#333] rounded-xl py-6 px-7 flex items-center cursor-text focus-within:border focus-within:border-[#FFBB03]`} // Add focus style
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
            onBlur={() => {}}
            className="sr-only"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
          />

          {/* Button pushed to bottom */}
          <button
            onClick={handleSave}
            className="w-full px-9 py-4 rounded-2xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed mt-8" // Use mt-auto
            disabled={
              newPin.length !== pinLength || confirmPin.length !== pinLength
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
