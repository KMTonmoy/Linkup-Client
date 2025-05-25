import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-roboto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-[#4F46E5] text-6xl font-bold">LinkUp</h1>
            <p className="text-2xl mt-4 max-w-md">
              LinkUp helps you connect and share with the people in your life.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-[380px]">
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address or phone number"
                required
                className="h-12 px-4 rounded-md border border-gray-300"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="h-12 px-4 rounded-md border border-gray-300"
              />
              <button
                type="submit"
                className="bg-[#4F46E5] text-white font-bold py-3 rounded-md hover:bg-[#3730a3] transition"
              >
                Log In
              </button>
            </form>
            <div className="text-center mt-3">
              <a href="#" className="text-[#4F46E5] hover:underline text-sm">
                Forgotten password?
              </a>
            </div>
            <hr className="my-4" />
            <div className="text-center">
              <button className="bg-[#10b981] text-white font-bold py-3 px-6 rounded-md hover:bg-[#059669] transition">
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
