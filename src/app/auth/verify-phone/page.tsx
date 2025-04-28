"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import MobileCheck from "@/app/MobileCheck";

type VerificationStep = "addPhone" | "verifyOtp";

const countries = [
  { code: "+234", name: "Nigeria", flag: "/icons/flag-nigeria.svg" },
  { code: "+233", name: "Ghana", flag: "/icons/flag-ghana.svg" },
  { code: "+254", name: "Kenya", flag: "/icons/flag-kenya.svg" },
  { code: "+27", name: "South Africa", flag: "/icons/flag-south-africa.svg" },
];

export default function PhoneVerificationPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("addPhone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  useEffect(() => {
    if (currentStep === "verifyOtp" && otpInputRefs.current[activeOtpIndex]) {
      otpInputRefs.current[activeOtpIndex]?.focus();
    }
  }, [currentStep, activeOtpIndex]);

  const handleOtpInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    const digit = value.replace(/\D/g, "").slice(-1);

    if (digit) {
      newOtp[index] = digit;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        setActiveOtpIndex(index + 1);
      } else {
        setActiveOtpIndex(index);
      }
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        setActiveOtpIndex(index - 1);
      } else {
        setActiveOtpIndex(0);
      }
    }

    const completeOtp = newOtp.join("");
    if (
      completeOtp.length === otp.length &&
      newOtp.every((digit) => digit !== "")
    ) {
      handleOtpComplete(completeOtp);
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
    if (
      completeOtp.length === otp.length &&
      newOtp.every((digit) => digit !== "")
    ) {
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
      const fullPhoneNumber = selectedCountry.code + phoneNumber;
      const lastFourDigits = phoneNumber.slice(-4);
      const masked = `${selectedCountry.code} ${phoneNumber.slice(
        0,
        1
      )}*** *** ${lastFourDigits}`;
      setMaskedPhoneNumber(masked);
      setCurrentStep("verifyOtp");
      setOtp(["", "", "", ""]);
      setActiveOtpIndex(0);
      console.log("Confirming phone number:", fullPhoneNumber);
    } else {
      alert("Please enter a valid phone number (at least 8 digits).");
    }
  };

  const handleOtpComplete = (completeOtp: string) => {
    console.log("Verifying OTP:", completeOtp);
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-white">
        <div className="flex flex-col w-full max-w-md px-4 py-8 flex-grow overflow-y-auto">
          <div className="w-full mb-8">
            <div className="flex space-x-1 mb-8">
              <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
              <div className="flex-1 h-2 rounded-full bg-[#444]"></div>
              <div className="flex-1 h-2 rounded-full bg-[#444]"></div>
            </div>
            <h1 className="text-2xl font-bold text-left">
              {currentStep === "addPhone" ? "Add Phone" : ""}
            </h1>

            {currentStep === "verifyOtp" && (
              <div>
                <p className="text-sm text-[F7F0D9] -mb-2">OTP was sent to</p>
                <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                  <p className="text-lg text-[F7F0D9] font-semibold">
                    {maskedPhoneNumber}
                  </p>
                </div>
              </div>
            )}
          </div>

          {currentStep === "addPhone" && (
            <div className="w-full flex flex-col flex-grow">
              <div className="w-full mb-8 relative">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number
                </label>
                <div className="flex bg-[#333] rounded-xl overflow-hidden">
                  <button
                    onClick={toggleCountryPicker}
                    className="flex items-center px-4 py-3 bg-[#444] border-r border-[#555] focus:outline-none"
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
                    <span className="font-semibold">
                      {selectedCountry.code}
                    </span>
                  </button>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="flex-1 px-4 py-3 bg-transparent text-white font-semibold text-lg focus:outline-none"
                    placeholder="000 000 0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputMode="tel"
                  />
                </div>
                {showCountryPicker && (
                  <div className="absolute z-10 mt-1 w-full bg-[#333] rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => selectCountry(country)}
                        className="flex items-center w-full px-4 py-3 hover:bg-[#444] text-left"
                      >
                        <Image
                          src={country.flag}
                          alt={`${country.name} flag`}
                          width={20}
                          height={15}
                          className="mr-3"
                        />
                        <span className="text-white">
                          {country.name} ({country.code})
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full">
                <button
                  onClick={handleAddPhoneConfirm}
                  className="w-full px-9 py-4 rounded-4xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={phoneNumber.length < 8}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        {currentStep === "verifyOtp" && (
          <div className="w-full flex-shrink-0">
            <div className="bg-[#F0EAD6] text-[#1E1E1E] p-4 pt-12 rounded-t-3xl">
              <p className="text-center text-lg font-semibold mb-6">
                Enter OTP
              </p>

              <div className="w-full flex flex-col items-center justify-start">
                <div className="flex space-x-4 justify-center w-full mb-12">
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
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          otp[index] === "" &&
                          index > 0
                        ) {
                          e.preventDefault();
                          setActiveOtpIndex(index - 1);
                        } else if (e.key === "Backspace" && otp[index] !== "") {
                        } else if (e.key.match(/[0-9]/)) {
                        } else if (e.key === "ArrowLeft" && index > 0) {
                          e.preventDefault();
                          setActiveOtpIndex(index - 1);
                        } else if (
                          e.key === "ArrowRight" &&
                          index < otp.length - 1
                        ) {
                          e.preventDefault();
                          setActiveOtpIndex(index + 1);
                        } else if (
                          !e.ctrlKey &&
                          !e.metaKey &&
                          !e.shiftKey &&
                          e.key.length === 1
                        ) {
                          if (!e.key.match(/[0-9]/)) {
                            e.preventDefault();
                          }
                        }
                      }}
                      className={`w-18 h-18 text-center text-2xl font-semibold rounded-3xl bg-transparent text-black caret-transparent border-4`}
                      style={{
                        borderColor:
                          activeOtpIndex === index ? "#FFBB03" : "#ABA48D",
                        outline: "none",
                        boxShadow:
                          activeOtpIndex === index
                            ? "0 0 0 2px #FFBB03"
                            : "none",
                      }}
                      inputMode="numeric"
                      readOnly={index !== activeOtpIndex && digit !== ""}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-3xl font-mono">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  ".",
                  "0",
                  "<",
                ].map((key) => (
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
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </MobileCheck>
  );
}
