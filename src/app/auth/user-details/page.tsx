"use client";

import { useState } from "react";
import MobileCheck from "@/app/MobileCheck";

export default function PersonalizationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const handleDone = () => {
    console.log("Personalization Data:", { firstName, lastName, userName });
  };

  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center bg-[#1E1E1E] text-[#F7F0D9]">
        <div className="flex flex-col w-full max-w-md px-4 py-8 flex-grow overflow-y-auto">
          <div className="flex space-x-1 mb-8">
            <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
            <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
            <div className="flex-1 h-2 rounded-full bg-[#FFBB03]"></div>
          </div>
          <div className="w-full mb-8">
            <h1 className="text-2xl font-bold text-[#F7F0D9] text-left">
              Personalization(optional)
            </h1>
          </div>
          <div className="w-full flex flex-col flex-grow">
            <div className="w-full mb-6">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2 text-[#F7F0D9]"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full bg-[#333] rounded-xl py-4 px-5 text-[#F7F0D9] font-semibold text-lg focus:outline-none focus:border focus:border-[#FFBB03]"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-full mb-6">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2 text-[#F7F0D9]"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full bg-[#333] rounded-xl py-4 px-5 text-[#F7F0D9] font-semibold text-lg focus:outline-none focus:border focus:border-[#FFBB03]"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="w-full mb-8">
              <label
                htmlFor="userName"
                className="block text-sm font-medium mb-2 text-[#F7F0D9]"
              >
                User name
              </label>
              <div className="flex items-center bg-[#333] rounded-xl px-5 focus-within:border focus-within:border-[#FFBB03]">
                <span className="text-[#FFBB03] text-lg font-bold mr-2">@</span>
                <input
                  id="userName"
                  type="text"
                  className="flex-1 py-4 bg-transparent text-[#F7F0D9] font-semibold text-lg focus:outline-none"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleDone}
              className="w-full px-9 py-4 rounded-2xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              disabled={false}
            >
              Done
            </button>
          </div>
        </div>
      </main>
    </MobileCheck>
  );
}
