// src/app/auth/components/VerifyPhoneStep.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type VerificationSubStep = "addPhone" | "verifyOtp";

const countries = [
  { code: "+234", name: "Nigeria", flag: "/icons/flag-nigeria.svg" },
  { code: "+233", name: "Ghana", flag: "/icons/flag-ghana.svg" },
  { code: "+254", name: "Kenya", flag: "/icons/flag-kenya.svg" },
  { code: "+27", name: "South Africa", flag: "/icons/flag-south-africa.svg" },
  // Add more countries as needed
];

interface VerifyPhoneStepProps {
  onComplete: (phoneNumber: string) => void; // Callback when verification is complete, passing phone number
}

export default function VerifyPhoneStep({ onComplete }: VerifyPhoneStepProps) {
  const [currentSubStep, setCurrentSubStep] =
    useState<VerificationSubStep>("addPhone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // Auto-focus OTP input
  useEffect(() => {
    if (
      currentSubStep === "verifyOtp" &&
      otpInputRefs.current[activeOtpIndex]
    ) {
      otpInputRefs.current[activeOtpIndex]?.focus();
    }
  }, [currentSubStep, activeOtpIndex]);

  // Handle input change for OTP inputs
  const handleOtpInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    const digit = value.replace(/\D/g, "").slice(-1); // Get the last entered digit

    if (digit) {
      // If a digit is entered
      newOtp[index] = digit;
      setOtp(newOtp);
      // Move to the next input if not the last one
      if (index < otp.length - 1) {
        setActiveOtpIndex(index + 1);
      } else {
        // Stay on the last input if it's filled
        setActiveOtpIndex(index);
      }
    } else if (value === "") {
      // If input is cleared (e.g., backspace)
      newOtp[index] = "";
      setOtp(newOtp);
      // Move to the previous input if not the first one
      if (index > 0) {
        setActiveOtpIndex(index - 1);
      } else {
        setActiveOtpIndex(0);
      }
    }

    // Check if OTP is complete
    const completeOtp = newOtp.join("");
    if (completeOtp.length === otp.length && newOtp.every((d) => d !== "")) {
      // Delay calling onComplete slightly to allow state update
      setTimeout(() => handleOtpComplete(completeOtp), 0);
    }
  };

  // Handle key down events for custom backspace logic and navigation
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current input is empty, move to previous
        e.preventDefault(); // Prevent default backspace behavior
        setActiveOtpIndex(index - 1);
      } else if (otp[index] !== "") {
        // If current input has a value, just clear it in onChange handler
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setActiveOtpIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      e.preventDefault();
      setActiveOtpIndex(index + 1);
    } else if (e.key.match(/[0-9]/)) {
      // Let the onChange handler manage this
    } else if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.key.length === 1) {
      if (!e.key.match(/[0-9]/)) {
        // Only allow digits
        e.preventDefault();
      }
    }
  };

  const handleKeypadInput = (key: string) => {
    const newOtp = [...otp];
    let nextIndex = activeOtpIndex;

    if (key.match(/[0-9]/)) {
      if (newOtp[activeOtpIndex] === "" || activeOtpIndex < otp.length - 1) {
        newOtp[activeOtpIndex] = key;
        setOtp(newOtp);
        if (activeOtpIndex < otp.length - 1) {
          nextIndex = activeOtpIndex + 1;
        } else {
          nextIndex = activeOtpIndex;
        }
      } else if (
        activeOtpIndex === otp.length - 1 &&
        newOtp[activeOtpIndex] !== ""
      ) {
        nextIndex = activeOtpIndex;
      }
    } else if (key === "<") {
      if (newOtp[activeOtpIndex] === "" && activeOtpIndex > 0) {
        newOtp[activeOtpIndex - 1] = "";
        setOtp(newOtp);
        nextIndex = activeOtpIndex - 1;
      } else if (newOtp[activeOtpIndex] !== "") {
        newOtp[activeOtpIndex] = "";
        setOtp(newOtp);
        nextIndex = activeOtpIndex;
      } else {
        nextIndex = activeOtpIndex;
      }
    }
    if (key !== ".") {
      if (nextIndex >= 0 && nextIndex < otp.length) {
        setActiveOtpIndex(nextIndex);
      } else if (nextIndex >= otp.length) {
        setActiveOtpIndex(otp.length - 1);
      } else {
        setActiveOtpIndex(0);
      }
    }

    const completeOtp = newOtp.join("");
    if (completeOtp.length === otp.length && newOtp.every((d) => d !== "")) {
      handleOtpComplete(completeOtp);
    }
  };

  const toggleCountryPicker = () => {
    setShowCountryPicker(!showCountryPicker);
  };

  const selectCountry = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const handleAddPhoneConfirm = () => {
    if (phoneNumber.length >= 8) {
      // Basic validation
      const fullPhoneNumber = selectedCountry.code + phoneNumber;
      // Mask logic based on the new design
      const lastFourDigits = phoneNumber.slice(-4);
      const masked = `${selectedCountry.code} ${phoneNumber.slice(
        0,
        1
      )}*** *** ${lastFourDigits}`;

      setMaskedPhoneNumber(masked);
      setCurrentSubStep("verifyOtp");
      setOtp(["", "", "", ""]); // Reset OTP state
      setActiveOtpIndex(0); // Reset active index for new step
      console.log("Confirming phone number for OTP:", fullPhoneNumber);
      // In a real app, trigger sending OTP here
    } else {
      alert("Please enter a valid phone number (at least 8 digits).");
    }
  };

  const handleOtpComplete = (completeOtp: string) => {
    console.log("OTP Entered:", completeOtp);
    // TODO: Implement OTP verification API call here.
    // If verification is successful:
    const fullPhoneNumber = selectedCountry.code + phoneNumber; // Use the stored full number
    onComplete(fullPhoneNumber); // Call parent callback with the verified number
    // If verification fails, show error and maybe reset OTP
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Show only when in addPhone step */}
      {currentSubStep === "addPhone" && (
        <div className="w-full flex flex-col flex-grow">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#F7F0D9] text-left">
              Add Phone
            </h1>
          </div>

          <div className="w-full mb-8">
            <label className="block text-sm font-medium mb-2 text-[#F7F0D9]">
              Phone Number
            </label>

            <div className="flex space-x-4 ">
              {/* Country Code Selector */}
              <div className="flex bg-[#333] rounded-xl overflow-hidden focus-within:border focus-within:border-[#FFBB03]">
                {/* Country Code Button - Fixed width to prevent shrinking */}
                <button
                  onClick={toggleCountryPicker}
                  className="flex items-center px-4 py-3 bg-[#444] border-r border-[#555] focus:outline-none min-w-[120px] w-[120px]"
                  aria-expanded={showCountryPicker}
                  aria-haspopup="true"
                >
                  <Image
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    width={24}
                    height={18}
                    className="mr-2 mb-1"
                  />
                  <span className="font-semibold text-[#F7F0D9]">
                    {selectedCountry.code}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-2 w-4 h-4 text-[#F7F0D9]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Phone Number Input */}
              <div className="w-3/4">
                <input
                  id="phoneNumber"
                  type="tel"
                  className="w-full px-4 py-3 bg-[#333] rounded-xl text-[#F7F0D9] font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#FFBB03]"
                  placeholder="000 000 0000"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhoneNumber(value);
                  }}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>
            {showCountryPicker && (
              <div className="absolute z-10 mt-1 w-[280px] bg-[#333] rounded-md shadow-lg max-h-48 overflow-y-auto border border-[#FFBB03]">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => selectCountry(country)}
                    className="flex items-center w-full px-4 py-3 hover:bg-[#444] text-left text-[#F7F0D9]"
                  >
                    <Image
                      src={country.flag}
                      alt={`${country.name} flag`}
                      width={20}
                      height={15}
                      className="mr-3"
                    />
                    <span>
                      {country.name} ({country.code})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full mt-auto">
            <button
              onClick={handleAddPhoneConfirm}
              className="w-full px-9 py-4 rounded-2xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={phoneNumber.length < 8}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification - Now rendered as a bottom sheet */}
      {currentSubStep === "verifyOtp" && (
        <div className="flex flex-col h-full">
          <div className="w-full mb-4">
            <p className="text-sm text-[#F7F0D9] -mb-1">OTP was sent to</p>
            <div className="mt-2 bg-[#333] p-4 rounded-lg">
              <p className="text-lg text-[#F7F0D9] font-semibold">
                {maskedPhoneNumber}
              </p>
            </div>
          </div>

          {/* Bottom sheet for OTP verification - now takes full width and positioned at bottom */}
          <div className="bg-[#F0EAD6] text-[#1E1E1E] p-4 pt-8 rounded-t-3xl mt-auto fixed bottom-0 left-0 right-0">
            <p className="text-center text-lg font-semibold mb-6">Enter OTP</p>

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
                    value={
                      digit !== "" && index !== activeOtpIndex ? "•" : digit
                    }
                    onChange={(e) =>
                      handleOtpInputChange(index, e.target.value)
                    }
                    onFocus={() => setActiveOtpIndex(index)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-16 h-16 text-center text-2xl font-semibold rounded-3xl bg-transparent text-black caret-transparent border-4"
                    style={{
                      borderColor:
                        activeOtpIndex === index ? "#FFBB03" : "#ABA48D",
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
                        ? "text-gray-600 opacity-50 cursor-not-allowed"
                        : key === "<"
                        ? "text-gray-600"
                        : "text-gray-800"
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
      )}
    </div>
  );
}
