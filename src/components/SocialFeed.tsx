"use client";
import React, { useRef, useMemo, useContext, useState, MouseEvent } from "react";
import { Plus, Image } from "lucide-react";
import { AuthContext } from "@/Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

type Story = {
  name: string;
  img: string;
};

const stories: Story[] = [
  { name: "Victor Erixon", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Surfiya Zakir", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Goria Coast", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Hurin Seary", img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Daniel Wu", img: "https://randomuser.me/api/portraits/men/78.jpg" },
  { name: "Jessica Lane", img: "https://randomuser.me/api/portraits/women/30.jpg" },
  { name: "John Doe", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Jane Smith", img: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "Michael Ray", img: "https://randomuser.me/api/portraits/men/70.jpg" },
  { name: "Anna Belle", img: "https://randomuser.me/api/portraits/women/77.jpg" },
];

function shuffleArray(array: Story[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SocialFeed() {
  const [postContent, setPostContent] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPhotoInput, setShowPhotoInput] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const randomStories = useMemo(() => shuffleArray(stories).slice(0, 7), []);

  const auth = useContext(AuthContext);
  const user = auth?.user;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || !carouselRef.current) return;
    isDragging.current = true;
    carouselRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!carouselRef.current) return;
    isDragging.current = false;
    carouselRef.current.classList.remove("cursor-grabbing");
  };

  const handlePost = async () => {
    if (!postContent.trim() && !photoURL.trim()) {
      toast.error("Write something or add an image");
      return;
    }

    const postData = {
      author_name: user?.displayName,
      author_email: user?.email,
      author_photo: user?.photoURL,
      content: postContent.trim(),
      photo_url: photoURL.trim(),
      likes: [],
      comments: [],
    };

    try {
      await axios.post("https://linkup-backend-sand.vercel.app/posts", postData);
      toast.success("Post submitted");
      setPostContent("");
      setPhotoURL("");
      setShowPhotoInput(false);
    } catch {
      toast.error("Failed to post");
    }
  };

  return (
    <div className="mx-auto p-4 w-full max-w-full sm:max-w-[460px] md:max-w-[615px] space-y-6">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex flex-wrap md:flex-nowrap gap-3 sm:gap-4 overflow-visible md:overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory select-none md:cursor-grab scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <div className="w-20 sm:w-24 min-w-[5rem] sm:min-w-[6rem] h-36 sm:h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-600 shrink-0 snap-start">
            <div className="bg-white p-2 rounded-full shadow">
              <Plus />
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center">Add Story</span>
          </div>
          {randomStories.map((story, index) => (
            <div
              key={index}
              className="w-20 sm:w-24 min-w-[5rem] sm:min-w-[6rem] h-36 sm:h-40 bg-cover bg-center rounded-xl relative shrink-0 snap-start transition-all duration-200"
              style={{ backgroundImage: `url(${story.img})` }}
            >
              <div className="absolute bottom-2 left-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-white text-xs sm:text-xs mt-1 max-w-[70px] truncate">
                  {story.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow max-w-full">
        <div className="flex items-start space-x-3">
          <img
            src={user?.photoURL || ""}
            alt="Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700"
          >
            Post
          </button>
        </div>

        {showPhotoInput && (
          <div className="mt-2 w-full">
            <input
              type="text"
              placeholder="Enter photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-1 p-2 border rounded text-sm"
            />
            {photoURL && (
              <img
                src={photoURL}
                alt="Preview"
                className="mt-2 max-h-52 rounded-md object-cover"
              />
            )}
          </div>
        )}

        <div className="flex justify-start mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm flex-wrap gap-2">
          <div
            onClick={() => setShowPhotoInput(!showPhotoInput)}
            className="flex items-center space-x-1 cursor-pointer hover:text-green-500"
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Photo/Video</span>
          </div>
        </div>
      </div>
    </div>
  );
}
