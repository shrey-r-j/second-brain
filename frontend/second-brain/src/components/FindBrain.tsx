import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import SharedFeed from "./SharedFeed";

export default function FindBrain() {
  const [hash, setHash] = useState("");
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSharedBrain = async () => {
    if (!hash.trim()) {
      setError("Please enter a hash to search");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${BACKEND_URL}/brain/${hash}`);
      setContent(res.data.content || []);
      setUsername(res.data.username || "");
    } catch (err) {
      console.error("Error fetching shared brain:", err?.response?.data || err.message);
      setError("Incorrect or expired hash. Please try again.");
      setContent([]);
      setUsername("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchSharedBrain();
  };

  const clearSearch = () => {
    setHash("");
    setContent([]);
    setUsername("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Discover Shared Brains</h1>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter brain hash (e.g. abc123...)"
            className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={fetchSharedBrain}
            disabled={loading || !hash.trim()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
          >
            {loading ? "Searching..." : "Find Brain"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
        )}

        {/* Results Header */}
        {username && (
          <div className="mb-4 text-gray-700 font-semibold">
            <span className="text-purple-600">{username}</span>'s Brain
          </div>
        )}

        {/* Shared Content */}
        {content.length > 0 ? (
          <SharedFeed content={content} />
        ) : (
          hash && !loading && !error && (
            <div className="text-center text-gray-500 mt-12">No content found for this hash.</div>
          )
        )}

        {/* Empty Prompt */}
        {!hash && !loading && (
          <div className="text-center text-gray-500 mt-12">Start by entering a brain hash above.</div>
        )}
      </div>
    </div>
  );
}
