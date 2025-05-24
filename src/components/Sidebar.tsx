'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Mail,
  Home,
  MapPin,
  Video,
  Tv,
  Award,
  Globe,
  Zap,
  User,
  Settings,
  BarChart2,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

const newFeeds = [
  { icon: <Tv className="text-white" />, label: 'Newsfeed', color: 'bg-blue-600', href: '/newsfeed' },
  { icon: <Award className="text-white" />, label: 'Badges', color: 'bg-orange-500', href: '/badges' },
  { icon: <Globe className="text-white" />, label: 'Explore Stories', color: 'bg-yellow-400', href: '/stories' },
  { icon: <Zap className="text-white" />, label: 'Popular Groups', color: 'bg-pink-500', href: '/groups' },
  { icon: <User className="text-white" />, label: 'Author Profile', color: 'bg-blue-500', href: '/profile' },
];

const morePages = [
  { icon: <Mail className="text-blue-600" />, label: 'Email Box', badge: 584, href: '/email' },
  { icon: <Home className="text-blue-600" />, label: 'Near Hotel', href: '/hotels' },
  { icon: <MapPin className="text-blue-600" />, label: 'Latest Event', href: '/events' },
  { icon: <Video className="text-blue-600" />, label: 'Live Stream', href: '/live' },
];

const account = [
  { icon: <Settings className="text-gray-500" />, label: 'Settings', href: '/settings' },
  { icon: <BarChart2 className="text-gray-500" />, label: 'Analytics', href: '/analytics' },
  { icon: <MessageCircle className="text-gray-500" />, label: 'Chat', badge: 23, href: '/chat' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden sticky   transform -translate-y-1/2  z-20">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 text-gray-800" />
        </button>
      </div>

      <div className="hidden md:block fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 p-4 space-y-4 bg-white shadow-lg z-40">
        <SidebarSection title="New Feeds" items={newFeeds} />
        <SidebarSection title="More Pages" items={morePages} />
        <SidebarSection title="Account" items={account} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-lg p-4 overflow-y-auto space-y-4 md:hidden"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <SidebarSection title="New Feeds" items={newFeeds} />
            <SidebarSection title="More Pages" items={morePages} />
            <SidebarSection title="Account" items={account} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarSection({
  title,
  items
}: {
  title: string;
  items: { icon: React.ReactNode; label: string; color?: string; badge?: number; href: string }[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-between cursor-pointer"
        >
          <Link href={item.href} className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color || 'bg-gray-100'}`}>
              {item.icon}
            </div>
            <span className="text-gray-700 font-medium group-hover:underline">{item.label}</span>
          </Link>
          {item.badge && (
            <div className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
              {item.badge}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
