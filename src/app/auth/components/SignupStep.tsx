"use client";

import Image from "next/image";
import React from "react";

interface SignupStepProps {
  onComplete: () => void;
}

export default function SignupStep({ onComplete }: SignupStepProps) {
  const handleGoogleSignup = () => {
    console.log("Initiating Google Signup...");
    // TODO: Implement actual Google Auth flow here.
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <div className="w-full flex flex-col items-center justify-between h-full">
        <div className="flex-1"></div>
        <div className="flex flex-col mb-44 items-center space-y-8">
          <div className="rounded-3xl mt-8 overflow-hidden w-74 h-74 bg-[#FFBB03] flex items-center justify-center">
            <Image
              src="/icons/monkey-globe.svg"
              alt="Crypto mascot holding globe"
              width={294}
              height={294}
              priority
            />
          </div>

          <div className="text-center space-y-2 px-4 text-white">
            {" "}
            <h2 className="text-3xl font-bold">Send or Receive</h2>
            <h2 className="text-3xl font-bold">crypto or fiat from</h2>
            <h2 className="text-3xl font-bold">any where.</h2>
          </div>
        </div>
        <div className="flex-1"></div> {/* Spacer */}
        <div className="w-full mb-8 flex justify-center">
          <button
            onClick={handleGoogleSignup}
            className="px-9 py-4 rounded-3xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] mt-20"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
