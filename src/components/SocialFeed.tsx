"use client";
import React, { useRef, useState } from "react";
import { Plus, Video, Image, Smile } from "lucide-react";

const stories = [
  {
    name: "Victor Erixon",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Surfiya Zakir",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Goria Coast",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Hurin Seary",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Daniel Wu",
    img: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    name: "Jessica Lane",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

export default function SocialFeed() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <div className="mx-auto p-4 w-full max-w-[615px] space-y-6">
      {/* Stories Carousel */}
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Add Story */}
          <div className="w-24 min-w-[6rem] h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-600 shrink-0 snap-start">
            <div className="bg-white p-2 rounded-full shadow">
              <Plus />
            </div>
            <span className="text-sm mt-2 text-center">Add Story</span>
          </div>

          {/* User Stories */}
          {stories.map((story, index) => (
            <div
              key={index}
              className="w-24 min-w-[6rem] h-40 bg-cover bg-center rounded-xl relative shrink-0 snap-start"
              style={{ backgroundImage: `url(${story.img})` }}
            >
              <div className="absolute bottom-2 left-2">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img
                    src={story.img}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-xs mt-1">{story.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Box */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-start space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none"
          />
        </div>

        <div className="flex justify-between mt-4 text-gray-600 text-sm flex-wrap gap-2">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
            <Video className="w-5 h-5" />
            <span>Live Video</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
            <Image className="w-5 h-5" />
            <span>Photo/Video</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-yellow-500">
            <Smile className="w-5 h-5" />
            <span>Feeling/Activity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
