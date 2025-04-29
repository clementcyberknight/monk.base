// src/app/auth/page.tsx
"use client";

import { useState } from "react";
import MobileCheck from "@/app/MobileCheck";
import SignupStep from "./components/SignupStep";
import VerifyPhoneStep from "./components/VerifyPhoneStep";
import UserDetailsStep from "./components/UserDetailsStep";
import SetPinStep from "./components/SetPinStep";

type AuthStep =
  | "signup"
  | "verifyPhone"
  | "userDetails"
  | "setPin"
  | "completed";

export default function AuthFlowPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("signup");
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string | null>(
    null
  );
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
  } | null>(null);
  const [paymentPin, setPaymentPin] = useState<string | null>(null);

  const handleSignupComplete = () => {
    console.log("Signup step completed.");
    setCurrentStep("verifyPhone");
  };

  const handleVerifyPhoneComplete = (phoneNumber: string) => {
    console.log("Verify Phone step completed for:", phoneNumber);
    setVerifiedPhoneNumber(phoneNumber);
    setCurrentStep("userDetails");
  };

  const handleUserDetailsComplete = (details: {
    firstName: string;
    lastName: string;
    userName: string;
  }) => {
    console.log("User Details step completed:", details);
    setUserDetails(details);
    setCurrentStep("setPin");
  };

  const handleSetPinComplete = (pin: string) => {
    console.log("Set PIN step completed:", pin);
    setPaymentPin(pin);

    // Last step completed! Perform final actions.
    // TODO: Call backend API to finalize registration with all collected data
    console.log("Auth Flow Completed! Final Data:", {
      phone: verifiedPhoneNumber,
      details: userDetails,
      pin: paymentPin,
    });

    setCurrentStep("completed");
    // TODO: Redirect user to the main application dashboard.
  };

  const renderProgressBar = () => {
    const totalSteps = 4;
    let completedSteps = 0;
    switch (currentStep) {
      case "verifyPhone":
        completedSteps = 1;
        break;
      case "userDetails":
        completedSteps = 2;
        break;
      case "setPin":
        completedSteps = 3;
        break;
      case "completed":
        completedSteps = 4;
        break;
    }

    const steps = Array.from({ length: totalSteps }).map((_, index) => (
      <div
        key={index}
        className={`flex-1 h-2 rounded-full ${
          index < completedSteps ? "bg-[#FFBB03]" : "bg-[#444]"
        }`}
      ></div>
    ));

    return <div className="flex space-x-1 mb-8 w-full">{steps}</div>;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "signup":
        return <SignupStep onComplete={handleSignupComplete} />;
      case "verifyPhone":
        return <VerifyPhoneStep onComplete={handleVerifyPhoneComplete} />;
      case "userDetails":
        return <UserDetailsStep onComplete={handleUserDetailsComplete} />;
      case "setPin":
        return <SetPinStep onComplete={handleSetPinComplete} />;
      case "completed":
        return (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
            <p className="text-lg">Redirecting to dashboard...</p>
            {/* Add a spinner or success animation */}
          </div>
        );
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  return (
    <MobileCheck>
      <main className="flex min-h-screen flex-col items-center bg-[#1E1E1E] text-white">
        <div className="flex flex-col w-full max-w-md px-4 py-8 flex-grow overflow-y-auto">
          {currentStep !== "signup" &&
            currentStep !== "completed" &&
            renderProgressBar()}

          {currentStep === "verifyPhone" ? (
            <div className="flex flex-col h-full">{renderCurrentStep()}</div>
          ) : (
            <div className="flex flex-col flex-grow">{renderCurrentStep()}</div>
          )}
        </div>

        <div className="w-full max-w-md px-4 py-4 flex-shrink-0"></div>
      </main>
    </MobileCheck>
  );
}
