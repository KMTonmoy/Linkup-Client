'use client';

import { motion } from 'framer-motion';
import {
  Home,
  MapPin,
  Twitter,
  CreditCard,
  Lock,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const settings = [
  {
    title: 'General',
    items: [
      {
        label: 'Account Information',
        icon: <Home className="text-white" size={20} />,
        color: 'from-blue-500 to-blue-700',
      },
      {
        label: 'Saved Address',
        icon: <MapPin className="text-white" size={20} />,
        color: 'from-yellow-400 to-orange-500',
      },
      {
        label: 'Social Account',
        icon: <Twitter className="text-white" size={20} />,
        color: 'from-orange-400 to-red-500',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        label: 'My Cards',
        icon: <CreditCard className="text-white" size={20} />,
        color: 'from-pink-500 to-red-500',
      },
      {
        label: 'Password',
        icon: <Lock className="text-white" size={20} />,
        color: 'from-blue-600 to-indigo-700',
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        label: 'Notification',
        icon: <Bell className="text-white" size={20} />,
        color: 'from-yellow-400 to-orange-500',
      },
      {
        label: 'Help',
        icon: <HelpCircle className="text-white" size={20} />,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        label: 'Logout',
        icon: <LogOut className="text-white" size={20} />,
        color: 'from-red-500 to-orange-600',
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="max-w-2xl my-10 mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {settings.map((section, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-gray-500 text-sm mb-3">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-3 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-800">{item.label}</span>
                </div>
                <div className="text-gray-400 text-xl">&gt;</div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
