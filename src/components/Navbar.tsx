"use client";

import { FC, useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  MessageSquare,
  Settings,
  Home,
  Zap,
  Video,
  Users,
} from "lucide-react";
import { AuthContext } from "@/Provider/AuthProvider";

const Navbar: FC = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const logOut = auth?.logOut;

  const pathname = usePathname();

  const [messageSectionIsOpen, setMessageSectionIsOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const addDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("messageSectionIsOpen");
      if (stored === null) {
        setMessageSectionIsOpen(true);
        localStorage.setItem("messageSectionIsOpen", "true");
      } else {
        setMessageSectionIsOpen(stored === "true");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "messageSectionIsOpen",
        String(messageSectionIsOpen)
      );
      window.dispatchEvent(new Event("storage"));
    }
  }, [messageSectionIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        addDropdownRef.current &&
        !addDropdownRef.current.contains(event.target as Node)
      ) {
        setAddDropdownOpen(false);
      }
    };
    if (profileDropdownOpen || addDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen, addDropdownOpen]);

  const toggleMessages = () => {
    setMessageSectionIsOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  const toggleAddDropdown = () => {
    setAddDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      if (logOut) {
        await logOut();
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navItems = [
    { id: "/", icon: <Home size={20} />, label: "Home" },
    { id: "/stories", icon: <Zap size={20} />, label: "Stories" },
    { id: "/groups", icon: <Users size={20} />, label: "Groups" },
    { id: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const userAvatar = user?.photoURL || "/default-avatar.png";

  return user ? (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 relative z-50">
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping" />
              <div className="relative z-10 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                💬
              </div>
            </div>
            <span className="font-extrabold text-indigo-700 text-lg tracking-tight whitespace-nowrap">
              LinkUp
            </span>
          </div>

          <div
            className="flex items-center gap-3 relative"
            ref={addDropdownRef}
          >
            <button
              onClick={toggleAddDropdown}
              className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold hover:bg-indigo-700 transition"
            >
              +
            </button>

            {addDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right z-50">
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
                  <Zap size={18} /> Post
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
                  <Users size={18} /> Story
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
                  <Video size={18} /> Video
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700">
                  <MessageSquare size={18} /> Note
                </button>
              </div>
            )}

            <button
              onClick={toggleMessages}
              title="Toggle Messages"
              className="w-6 h-6 flex items-center justify-center rounded-full"
            >
              <MessageSquare
                className={`transition-colors w-5 h-5 ${
                  messageSectionIsOpen ? "text-indigo-600" : "text-blue-600"
                }`}
              />
            </button>

            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="w-7 h-7 rounded-full overflow-hidden border-2 border-indigo-200"
              >
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right transition-all duration-200 ease-out transform ${
                  profileDropdownOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex gap-2 justify-evenly mt-5 overflow-x-auto no-scrollbar max-w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.id;
            return (
              <Link
                key={item.id}
                href={item.id}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600 font-semibold"
                    : "border-gray-300 text-gray-600 hover:bg-indigo-50 hover:border-indigo-400"
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping" />
            <div className="relative z-10 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-base">
              💬
            </div>
          </div>
          <span className="font-extrabold text-indigo-700 text-2xl tracking-tight whitespace-nowrap">
            LinkUp
          </span>
        </div>

        <nav className="flex gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.id;
            return (
              <Link
                key={item.id}
                href={item.id}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600 scale-105 shadow-inner"
                    : "bg-gray-100 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>

        <div
          className="flex items-center gap-4 relative"
          ref={profileDropdownRef}
        >
          <div className="relative w-7 h-7">
            <Bell className="text-blue-600 w-7 h-7" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </div>

          <button
            onClick={toggleMessages}
            className="w-7 h-7 flex items-center justify-center rounded-full"
          >
            <MessageSquare
              className={`transition-colors w-6 h-6 ${
                messageSectionIsOpen ? "text-indigo-600" : "text-blue-600"
              }`}
            />
          </button>

          <button
            onClick={toggleProfileDropdown}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-200"
          >
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          <div
            className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right transition-all duration-200 ease-out transform ${
              profileDropdownOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible pointer-events-none"
            }`}
          >
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
              onClick={() => setProfileDropdownOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
              onClick={() => setProfileDropdownOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  ) : (
    <></>
  );
};

export default Navbar;
