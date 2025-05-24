import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center animate-fadeIn">
      {/* Bird Icon with animation */}
      <div className="w-28 h-28 mb-6 text-indigo-600 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M16 7h.01" />
          <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
          <path d="m20 7 2 .5-2 .5" />
          <path d="M10 18v3" />
          <path d="M14 17.75V21" />
          <path d="M7 18a6 6 0 0 0 3.84-10.61" />
        </svg>
      </div>

      {/* Headline and Message */}
      <h1 className="text-7xl font-extrabold text-indigo-700 mb-2">404</h1>
      <p className="text-2xl font-semibold text-indigo-600 mb-1">
        Page Not Found
      </p>
      <p className="mb-6 text-indigo-500 max-w-lg">
        Sorry, we couldnt find the page youre looking for. <br />
        This site is currently <span className="font-bold text-indigo-700">under development 🚧</span>.
      </p>

      {/* Back Home Button */}
      <Link
        href="/"
        className="inline-block px-8 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
      >
        🏠 Go Back Home
      </Link>
    </main>
  );
}
