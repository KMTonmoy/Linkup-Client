'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

interface Story {
  name: string;
  authorEmail: string;
  DateTime: string;
  AuthorImage: string;
  img: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('/story.json');
        setStories(response.data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'story-modal-backdrop') {
      setSelectedIndex(null);
    }
  };

  const showPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const showNext = () => {
    if (selectedIndex !== null && selectedIndex < stories.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedIndex(index)}
          >
            <img src={story.img} alt="Story" className="w-full h-48 object-cover rounded-md mb-4" />
            <div className="flex items-center gap-3">
              <img
                src={story.AuthorImage}
                alt={story.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{story.name}</h2>
                <p className="text-sm text-gray-500">{story.DateTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          id="story-modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="relative bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl overflow-hidden shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            <div className="w-full h-96 sm:h-[30rem] md:h-[32rem] bg-black">
              <img
                src={stories[selectedIndex].img}
                alt="Story Content"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex items-center gap-3">
              <img
                src={stories[selectedIndex].AuthorImage}
                alt={stories[selectedIndex].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-md sm:text-lg font-semibold">{stories[selectedIndex].name}</h2>
                <p className="text-xs text-gray-500">{stories[selectedIndex].DateTime}</p>
              </div>
            </div>

            <div className="absolute inset-y-0 left-2 flex items-center">
              <button
                onClick={showPrev}
                disabled={selectedIndex === 0}
                className="bg-white p-1 rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <ArrowLeft />
              </button>
            </div>

            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                onClick={showNext}
                disabled={selectedIndex === stories.length - 1}
                className="bg-white p-1 rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;
