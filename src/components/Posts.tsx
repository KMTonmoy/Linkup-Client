'use client';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

interface Post {
  _id: string;
  text: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  authorName: string;
  authorEmail: string;
  userId: string;
  userImage: string;
  postedAt: string;
}

const POSTS_PER_PAGE = 5;

const SkeletonPost = () => (
  <div className="w-full max-w-xl mx-auto p-4 border border-gray-200 rounded-xl shadow animate-pulse">
    <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
    <div className="h-48 bg-gray-300 rounded mb-4"></div>
    <div className="flex justify-between text-gray-400 mb-2">
      <div className="h-4 bg-gray-300 rounded w-16"></div>
      <div className="h-4 bg-gray-300 rounded w-16"></div>
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>
  </div>
);

const Posts: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const shufflePosts = useCallback((posts: Post[]) => {
    let array = [...posts];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get<Post[]>('/post.json')
      .then((res) => {
        const shuffled = shufflePosts(res.data);
        setAllPosts(shuffled);
        setVisiblePosts(shuffled.slice(0, POSTS_PER_PAGE));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
        setLoading(false);
      });
  }, [shufflePosts]);

  const loadMorePosts = () => {
    if (loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextCount = nextPage * POSTS_PER_PAGE;

      if (nextCount <= allPosts.length) {
        const nextPosts = allPosts.slice(0, nextCount);
        setVisiblePosts(nextPosts);
        setPage(nextPage);
      } else {
        const reshuffled = shufflePosts(allPosts);
        const extraPostsCount = nextCount - allPosts.length;
        setVisiblePosts((prev) => [...prev, ...reshuffled.slice(0, extraPostsCount)]);
        setPage(nextPage);
      }

      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !loadingMore) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, visiblePosts, loading]);

  if (loading)
    return (
      <div className="flex flex-col items-center space-y-6 mt-10 w-full max-w-xl mx-auto">
        {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
          <SkeletonPost key={i} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">{error}</div>
    );

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-xl mx-auto mt-6">
      {visiblePosts.map((post) => (
        <PostCard key={post._id + '-' + Math.random()} post={post} />
      ))}
      {loadingMore && (
        <div className="w-full max-w-xl mx-auto p-4">
          <SkeletonPost />
        </div>
      )}
    </div>
  );
};

export default Posts;
