"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileCheck from "@/app/MobileCheck";

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <MobileCheck>
      <main className="flex h-screen flex-col items-center justify-center bg-[#1E1E1E] text-[#F7F0D9] p-4">
        <div className="flex flex-col items-center text-center max-w-sm w-full">
          {/* Illustration */}
          <div className="mb-8">
            <Image
              src="/error.png"
              alt="Error illustration of a monkey fixing a rocket"
              width={300}
              height={250}
              className="rounded-2xl object-contain"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            Page Error
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#FFBB03" // Yellow warning color
              stroke="currentColor"
              strokeWidth="0" // No stroke needed if using fill
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-alert-triangle"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" stroke="#1E1E1E" strokeWidth="2" />
              <path d="M12 17h.01" stroke="#1E1E1E" strokeWidth="2" />
            </svg>
          </h1>

          {/* Buttons */}
          <div className="w-full px-2 space-y-4">
            {/* Report Bug Button */}
            <button className="w-full bg-[#2C2C2B] text-[#F7F0D9] py-3 px-6 rounded-xl text-lg font-semibold hover:bg-[#3a3a3a] transition-colors">
              Report Bug: 3200
            </button>

            <Link
              href="/"
              className="block w-full bg-[#FFBB03] text-[#1E1E1E] py-3 px-6 rounded-xl text-lg font-semibold hover:bg-[#FFBB03]/90 transition-colors text-center"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </main>
    </MobileCheck>
  );
}
