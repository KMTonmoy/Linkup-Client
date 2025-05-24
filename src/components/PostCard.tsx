'use client';
import React, { useState, useEffect } from 'react';
import { ThumbsUp, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import axios from 'axios';

interface Post {
  _id: string;
  text: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  authorName: string;
  userImage: string;
  postedAt: string;
}

interface CommentType {
  _id: string;
  post_id: string;
  postAuthorName: string;
  postAuthorPhoto: string;
  commentAuthorName: string;
  commentAuthorPhoto: string;
  commentText: string;
  commentDate: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;

    const newEntry: CommentType = {
      _id: Date.now().toString(),
      post_id: post._id,
      postAuthorName: post.authorName,
      postAuthorPhoto: post.userImage,
      commentAuthorName: 'You',
      commentAuthorPhoto: 'https://i.pravatar.cc/40?img=3',
      commentText: newComment,
      commentDate: new Date().toISOString(),
    };

    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  useEffect(() => {
    if (!commentsOpen) return;

    setLoadingComments(true);
    axios
      .get<CommentType[]>('/comment.json')
      .then((res) => {
        const filtered = res.data.filter((c) => c.post_id === post._id);
        setComments(filtered);
        setLoadingComments(false);
      })
      .catch(() => {
        setComments([]);
        setLoadingComments(false);
      });
  }, [commentsOpen, post._id]);

  const formattedDate = new Date(post.postedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xl mx-auto my-4">
      <div className="flex items-center gap-3 mb-4">
        <img src={post.userImage} alt={post.authorName} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-gray-800">{post.authorName}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="text-gray-700 font-semibold mb-3">{post.text}</div>

      <div className="rounded-lg overflow-hidden">
        <img src={post.image} alt="Post" className="w-full h-auto object-cover" />
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{post.likes} Likes</span>
        <span>{comments.length} Comments</span>
        <span>{post.shares} Shares</span>
      </div>

      <div className="flex justify-around mt-2 border-t border-b py-2">
        <button className="flex items-center gap-1 text-gray-600 hover:text-[#4F46E5] transition">
          <ThumbsUp size={18} /> Like
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-[#4F46E5] transition">
          <Heart size={18} /> Love
        </button>
        <button
          onClick={() => setCommentsOpen((prev) => !prev)}
          className="flex items-center gap-1 text-gray-600 hover:text-[#4F46E5] transition"
        >
          <MessageCircle size={18} /> Comment
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-[#4F46E5] transition">
          <Share2 size={18} /> Share
        </button>
      </div>

      {commentsOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-8 h-8 rounded-full" />
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
              <button
                onClick={handleCommentSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4F46E5]"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {loadingComments ? (
            <div className="text-center text-gray-500">Loading comments...</div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center">No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="flex items-start gap-3">
                    <img src={c.commentAuthorPhoto} alt={c.commentAuthorName} className="w-8 h-8 rounded-full" />
                    <div className="bg-gray-100 p-2 rounded-xl max-w-xs">
                      <p className="text-sm font-semibold text-gray-700">{c.commentAuthorName}</p>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(c.commentDate).toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{c.commentText}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
