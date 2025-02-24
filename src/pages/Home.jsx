import { useState } from "react";
import { shortenUrl } from "../api/api";
import Layout from "../layouts/Layout";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission

    const result = await shortenUrl(longUrl);
    if (result.shortUrl) {
      setShortUrl(result.shortUrl);
    } else {
      setError(result.error || "Something went wrong! Please try again."); // Set error message
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
            Shorten & Share Links with{" "}
            <span className="font-extrabold">
              <span className="text-secondary">Link</span>
              <span className="text-accent">Bite</span>
            </span>{" "}
            🔗
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto">
            The simplest way to make your URLs{" "}
            <span className="font-semibold">shorter, cleaner, and easier</span>{" "}
            to share.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-lg bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="w-full">
            <input
              type="url"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>

          <button className="w-full sm:w-3/4 px-4 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition duration-300 shadow-md">
            Shorten Now
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        {/* Shortened URL Output */}
        {shortUrl && (
          <div
            className="mt-6 p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md w-full max-w-lg text-center border border-green-400 
          animate-fade-in"
          >
            <p>✨ Your shortened link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
