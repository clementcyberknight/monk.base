"use client";

import Image from "next/image";
import MobileCheck from "@/app/MobileCheck";

export default function SignupPage() {
  return (
    <MobileCheck>
      <main className="flex min-h-screen flex-col items-center bg-[#1E1E1E] text-white">
        <div className="flex flex-col items-center justify-between w-full max-w-md px-4 py-8 h-screen">
          <div className="w-full flex flex-col items-center justify-between h-full">
            <div className="flex-1"></div>

            <div className="flex flex-col mb-44 items-center space-y-8">
              <div className="rounded-3xl overflow-hidden w-74 h-74 bg-[#FFBB03] flex items-center justify-center">
                <Image
                  src="/icons/monkey-globe.svg"
                  alt="Crypto mascot holding globe"
                  width={272}
                  height={272}
                  priority
                />
              </div>

              <div className="text-center space-y-2 px-4">
                <h2 className="text-3xl font-bold">Send or Receive</h2>
                <h2 className="text-3xl font-bold">crypto or fiat from</h2>
                <h2 className="text-3xl font-bold">any where.</h2>
              </div>
            </div>

            <div className="flex-1"></div>

            <div className="w-full mb-8 flex justify-center">
              <button className="px-9 py-4 rounded-3xl text-xl font-semibold bg-[#FFBB03] hover:bg-[#FFBB03]/90 text-[#1E1E1E]">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </main>
    </MobileCheck>
  );
}
