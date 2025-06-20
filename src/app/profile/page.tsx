"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Video,
  Image,
  Smile,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  MapPin,
  Eye,
  Lock,
  Users,
} from "lucide-react";
import { AuthContext } from "@/Provider/AuthProvider";

const tabs: string[] = ["About", "Membership", "Discussion", "Video", "Group", "Events"];

const ProfilePage: React.FC = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 min-h-screen p-4">
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6985000/pexels-photo-6985000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1200"
          alt="Cover"
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full px-6 pb-4">
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-16">
            <div className="flex items-center gap-4">
              <img
                src={user?.photoURL ?? "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.displayName ?? "Anonymous User"}
                </h2>
                <p className="text-sm text-gray-500">{user?.email ?? "No email provided"}</p>
                <p className="text-sm text-gray-500 mt-1">👥 253 Friends</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Send Mail"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button
                aria-label="More options"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-3 mt-20 flex gap-6 overflow-x-auto bg-white">
          {tabs.map((tab, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 hover:text-black text-sm font-medium whitespace-nowrap"
              type="button"
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-6">
          <section className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-gray-700 mb-3">About</h4>
            <p className="text-sm text-gray-600 mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at
              commodo non.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> Private
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> Visible
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Florida, Austria
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4" /> General Group
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-700">Photos</h4>
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                "https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg",
                "https://images.pexels.com/photos/1557183/pexels-photo-1557183.jpeg",
                "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
                "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
                "https://images.pexels.com/photos/2189833/pexels-photo-2189833.jpeg",
                "https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg",
              ].map((url, i) => (
                <img
                  key={i}
                  src={`${url}?auto=compress&cs=tinysrgb&dpr=2&h=100`}
                  alt={`photo-${i}`}
                  className="rounded-md object-cover w-full h-20"
                  loading="lazy"
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Events</h4>
            <div className="space-y-3">
              {[
                { date: "Feb 22", title: "Meeting with Clients" },
                { date: "Apr 30", title: "Developer Program" },
                { date: "Apr 23", title: "Anniversary Event" },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-700 font-semibold w-12 h-12 flex flex-col items-center justify-center rounded-md">
                    <span className="text-xs">{event.date.split(" ")[0]}</span>
                    <span className="text-lg">{event.date.split(" ")[1]}</span>
                  </div>
                  <p className="text-sm">{event.title}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-lg shadow p-4">
            <textarea
              rows={3}
              placeholder="What's on your mind?"
              className="w-full border border-gray-200 rounded-md p-2 text-sm resize-none"
              aria-label="Create a post"
            />
            <div className="flex gap-4 mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-500 hover:underline"
              >
                <Video className="w-4 h-4" /> Live Video
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-yellow-500 hover:underline"
              >
                <Image className="w-4 h-4" /> Photo/Video
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-green-500 hover:underline"
              >
                <Smile className="w-4 h-4" /> Feeling/Activity
              </button>
            </div>
          </section>

          {[1, 2].map((_, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-lg shadow p-4 space-y-3"
            >
              <header className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="author"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-medium">Anthony Daugloi</p>
                    <time className="text-xs text-gray-500" dateTime="PT1H">
                      1 hour ago
                    </time>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </header>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla odio dolor.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
                  "https://images.pexels.com/photos/210241/pexels-photo-210241.jpeg",
                  "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg",
                ].map((url, idx) => (
                  <img
                    key={idx}
                    src={`${url}?auto=compress&cs=tinysrgb&dpr=2&h=120`}
                    className="rounded-md w-full object-cover"
                    alt={`media-${idx}`}
                    loading="lazy"
                  />
                ))}
              </div>
              <footer className="flex justify-between text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" /> 2.8k
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> 22 Comments
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </div>
              </footer>
            </motion.article>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
