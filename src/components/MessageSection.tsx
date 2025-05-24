'use client';

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const friends = [
  'Hurin Seary',
  'Victor Exrixon',
  'Surfiya Zakir',
  'Goria Coast',
  'David Goria',
  'Seary Victor',
  'Ana Seary',
];

const isOnline = (index: number) => index % 2 === 0;

const MessageSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = localStorage.getItem('messageSectionIsOpen');
    setIsOpen(open === 'true');
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const open = localStorage.getItem('messageSectionIsOpen');
      setIsOpen(open === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleFriendClick = (name: string) => {
    toast.success(`Opening chat with ${name}`, {
      style: {
        borderRadius: '8px',
        background: '#f9fafb',
        color: '#333',
        padding: '12px 16px',
        fontWeight: 500,
      },
      icon: '💬',
    });
  };

  return (
    <>
      <Toaster position="bottom-right" />

      <div
        className={`fixed top-16 right-0 h-[calc(100vh-64px)] bg-white shadow-lg border-l border-gray-200 z-40 transition-transform duration-300
        w-full sm:w-[320px] max-w-full
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="p-4 border-b font-semibold text-lg text-indigo-700">
          Messages
        </div>
        <div className="overflow-y-auto h-full p-4 space-y-4">
          {friends.map((name, idx) => {
            const online = isOnline(idx);
            return (
              <button
                key={idx}
                onClick={() => handleFriendClick(name)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-50 transition"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img
                    src={`https://i.pravatar.cc/150?img=${idx + 10}`}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white
                      ${online ? 'bg-green-500' : 'bg-gray-400'}`}
                  />
                </div>
                <div className="text-left flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{name}</p>
                  <p className={`text-xs sm:text-sm ${online ? 'text-green-500' : 'text-gray-400'}`}>
                    {online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MessageSection;
