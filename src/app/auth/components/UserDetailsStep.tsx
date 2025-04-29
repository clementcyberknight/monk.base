// src/app/auth/components/UserDetailsStep.tsx
"use client";

import { useState } from "react";
import React from "react"; // Import React

interface UserDetailsStepProps {
  onComplete: (details: {
    firstName: string;
    lastName: string;
    userName: string;
  }) => void; // Callback with user details
}

export default function UserDetailsStep({ onComplete }: UserDetailsStepProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const handleDone = () => {
    // Perform basic validation if needed
    if (!userName) {
      alert("Username is required.");
      return;
    }
    const details = { firstName, lastName, userName };
    console.log("Personalization Data:", details);
    onComplete(details); // Pass data back to parent
  };

  return (
    <div className="flex flex-col w-full max-w-md flex-grow overflow-y-auto text-[#F7F0D9]">
      {" "}
      {/* Ensure text color */}
      {/* Progress Bar - Parent handles this */}
      <div className="w-full mb-8">
        <h1 className="text-2xl font-bold text-left">
          Personalization (optional)
        </h1>
      </div>
      <div className="w-full flex flex-col flex-grow">
        <div className="w-full mb-6">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full bg-[#333] rounded-xl py-4 px-5 text-[#F7F0D9] font-semibold text-lg focus:outline-none focus:border focus:border-[#FFBB03]"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name" // Add autocomplete
          />
        </div>

        <div className="w-full mb-6">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full bg-[#333] rounded-xl py-4 px-5 text-[#F7F0D9] font-semibold text-lg focus:outline-none focus:border focus:border-[#FFBB03]"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name" // Add autocomplete
          />
        </div>

        <div className="w-full mb-8">
          <label htmlFor="userName" className="block text-sm font-medium mb-2">
            User name
          </label>
          <div className="flex items-center bg-[#333] rounded-xl px-5 focus-within:border focus-within:border-[#FFBB03]">
            <span className="text-[#FFBB03] text-xl font-bold mr-2">@</span>
            <input
              id="userName"
              type="text"
              className="flex-1 py-4 bg-transparent text-[#F7F0D9] font-semibold text-lg focus:outline-none"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value.replace(/\s/g, ""))} // Prevent spaces in username
              autoComplete="username" // Add autocomplete
            />
          </div>
          <button
            onClick={handleDone}
            className="w-full px-9 py-4 rounded-2xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed mt-8" // Use mt-auto
            disabled={!userName} // Disable if username is empty
          >
            Done
          </button>
        </div>
        {/* Button pushed to bottom */}
      </div>
    </div>
  );
}
