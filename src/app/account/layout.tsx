"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FeatureModal from "@/app/account/components/cardfeature";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-[#F7F0D9] relative overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#F7F0D9] shadow-lg max-w-md mx-auto rounded-t-2xl p-4 flex justify-around items-center z-50">
        <Link href="/account/dashboard" className="flex flex-col items-center">
          <img
            src={
              pathname === "/account/dashboard"
                ? "/icons/yellowBank.svg"
                : "/icons/Bank.svg"
            }
            alt="Bank"
            className="h-8 w-8"
          />
        </Link>

        <button
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center"
        >
          <img src="/icons/CreditCard.svg" alt="Card" className="h-8 w-8" />
        </button>

        <Link href="/account/profile" className="flex flex-col items-center">
          <img
            src={
              pathname === "/account/profile"
                ? "/icons/yellowUser.svg"
                : "/icons/User.svg"
            }
            alt="User"
            className="h-8 w-8"
          />
        </Link>
      </nav>

      {isModalOpen && <FeatureModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
