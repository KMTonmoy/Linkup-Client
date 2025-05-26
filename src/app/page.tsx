"use client";

import React, { useContext, useState } from "react";
import Posts from "@/components/Posts";
import SocialFeed from "@/components/SocialFeed";
import { AuthContext } from "@/Provider/AuthProvider";

const Page = () => {
  const auth = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!auth) return <div>Loading...</div>;

  const {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  } = auth;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    await signIn(email, password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    await createUser(email, password);
    await updateUserProfile(name, photoURL);
  };

  const handleGoogleSignIn = async () => {
    setError(null);

    await signInWithGoogle();
  };

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div className="max-w-3xl -mt-20 mx-auto p-4">
        <SocialFeed />
        <Posts />
        <button
          onClick={logOut}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-roboto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl w-full">
        {/* Left branding */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-[#4F46E5] text-6xl font-bold select-none">
            LinkUp
          </h1>
          <p className="text-2xl mt-4 max-w-md mx-auto lg:mx-0">
            LinkUp helps you connect and share with the people in your life.
          </p>
        </div>

        {/* Right form */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isLogin ? "Login to LinkUp" : "Create a LinkUp Account"}
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={isLogin ? handleLogin : handleSignup}
            className="flex flex-col gap-4"
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 px-4 rounded-md border border-gray-300"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 rounded-md border border-gray-300"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-4 rounded-md border border-gray-300"
            />

            {!isLogin && (
              <input
                type="url"
                placeholder="Photo URL "
                value={photoURL}
                required
                onChange={(e) => setPhotoURL(e.target.value)}
                className="h-12 px-4 rounded-md border border-gray-300"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 py-3 rounded-md font-bold text-white transition ${
                isLogin
                  ? "bg-[#4F46E5] hover:bg-[#3730a3]"
                  : "bg-[#10b981] hover:bg-[#059669]"
              }`}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Log In"
                : "Sign Up"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mt-4 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login with Google"
              : "Sign Up with Google"}
          </button>

          <p className="mt-6 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={`font-semibold hover:underline ${
                isLogin ? "text-green-600" : "text-indigo-700"
              }`}
            >
              {isLogin ? "Create new account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
