"use client";

import React, { useState, useRef, useEffect } from "react";

interface TransactionPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (passcode: string) => void;
  transactionAmount: string;
  transactionCurrency: string;
}

const TransactionPasscodeModal: React.FC<TransactionPasscodeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transactionAmount,
  transactionCurrency,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      // Focus on the first input when the modal opens
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    } else {
      // Clear OTP and reset active index when modal closes
      setOtp(["", "", "", ""]);
      setActiveOtpIndex(0);
    }
  }, [isOpen]);

  const handleOtpInputChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < 3 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1]?.focus();
      } else if (index === 3) {
        //If it is the last input, call onConfirm
        const passcode = newOtp.join("");
        onConfirm(passcode);
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to the previous input
      if (index > 0 && otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1]?.focus();
      } else if (index === 0) {
        otpInputRefs.current[0]?.focus();
      }
    }
  };

  const handleKeypadInput = (key: string) => {
    if (key === "<") {
      // Handle backspace
      if (activeOtpIndex > 0) {
        setActiveOtpIndex(activeOtpIndex - 1);
        if (otpInputRefs.current[activeOtpIndex - 1]) {
          otpInputRefs.current[activeOtpIndex - 1]?.focus();
        }
      }
      handleOtpInputChange(activeOtpIndex, "");
    } else {
      handleOtpInputChange(activeOtpIndex, key);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 flex justify-center items-end">
      <div className="bg-[#F7F0D9] rounded-t-4xl p-6 w-full max-w-md">
        <h2 className="text-2xl text-center font-bold text-[#1E1E1E] mb-4">
          Enter Passcode
        </h2>
        <p className="text-sm text-[#1E1E1E] mb-6">
          Enter your 4-digit passcode to confirm the transaction
        </p>

        <div className="w-full flex flex-col items-center justify-start">
          <div className="flex space-x-4 justify-center w-full mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpInputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit !== "" && index !== activeOtpIndex ? "•" : digit}
                onChange={(e) => handleOtpInputChange(index, e.target.value)}
                onFocus={() => setActiveOtpIndex(index)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl font-semibold rounded-3xl bg-transparent text-[#1E1E1E] caret-transparent border-4"
                style={{
                  borderColor: activeOtpIndex === index ? "#FFBB03" : "#ABA48D",
                  outline: "none",
                  boxShadow:
                    activeOtpIndex === index ? "0 0 0 2px #FFBB03" : "none",
                }}
                inputMode="numeric"
                readOnly={index !== activeOtpIndex && digit !== ""}
              />
            ))}
          </div>
        </div>

        {/* Full-width keypad with fixed positioning */}
        <div className="grid grid-cols-3 gap-4 text-3xl font-mono w-full pb-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"].map(
            (key) => (
              <button
                key={key}
                onClick={() => handleKeypadInput(key)}
                disabled={key === "."}
                className={`flex items-center justify-center w-full h-16 rounded-full active:bg-gray-300 ${
                  key === "."
                    ? "text-[#1E1E1E] opacity-50 cursor-not-allowed"
                    : key === "<"
                    ? "text-[#1E1E1E]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {key === "<" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                ) : (
                  key
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPasscodeModal;
