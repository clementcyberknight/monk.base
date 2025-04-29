"use client";

import { useState } from "react";
import Image from "next/image";

export default function FeatureModal({ onClose }: { onClose: () => void }) {
  const [voted, setVoted] = useState(false);

  const handleUpVote = () => {
    setVoted(true);
    setTimeout(() => {
      onClose();
    }, 800); // Smooth delay (0.8 second) before closing
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] text-white p-6 rounded-3xl max-w-xs text-center shadow-xl transition-all">
        <Image
          src="/icons/coming-soon.svg"
          alt="Under Development"
          width={200}
          height={200}
          className="rounded-xl mb-4 mx-auto"
        />
        <p className="text-lg font-semibold mb-4">
          This feature is in development
        </p>
        <button
          onClick={handleUpVote}
          className={`w-full bg-[#2C2C2B] ${
            voted ? "text-green-500" : "text-white"
          } rounded-xl py-3 mb-3 font-semibold transition-all duration-300`}
        >
          {voted ? "Upvoted!" : "Up Vote"}
        </button>
        <button
          onClick={onClose}
          className="w-full bg-[#FFB800] text-black rounded-xl py-3 font-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
