'use client';

import React from 'react';
import Image from 'next/image';

interface SavedAccount {
  name: string;
  icon: string;
  accountNumber: string;
}

interface SaveRecipientProps {
  savedAccounts: SavedAccount[];
  onSelect: (account: SavedAccount) => void;
  onClose: () => void;
}

const SaveRecipient: React.FC<SaveRecipientProps> = ({
  savedAccounts,
  onSelect,
  onClose,
}) => {
  return (
    <div 
      className="fixed inset-0 flex items-start justify-center pt-32 bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-[#1C1C1E] rounded-3xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          {savedAccounts.map((account, index) => (
            <button
              key={index}
              onClick={() => onSelect(account)}
              className="w-full flex items-center p-3 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={account.icon}
                  alt={account.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="ml-3 text-white text-left">{account.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaveRecipient;