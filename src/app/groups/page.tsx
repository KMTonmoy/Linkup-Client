"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const groups = [
  {
    id: 1,
    name: "Frontend Developers",
    banner:
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    banner:
      "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
  },
  {
    id: 3,
    name: "Startup Founders",
    banner:
      "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
  },
  {
    id: 4,
    name: "Photography Club",
    banner:
      "https://images.pexels.com/photos/3707991/pexels-photo-3707991.jpeg",
  },
  {
    id: 5,
    name: "UI/UX Designers",
    banner:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
];

const GroupPage = () => {
  const handleJoin = (groupName: string) => {
    toast.success(`You've joined ${groupName}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Toaster position="top-center" />
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg relative">
        <h1 className="text-3xl font-bold mb-2">Explore Groups</h1>
        <p className="text-sm">Find and join communities that match your interests.</p>
        <img
          src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: group.id * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={group.banner}
              alt={group.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{group.name}</h2>
              <button
                onClick={() => handleJoin(group.name)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
              >
                Join Group
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
