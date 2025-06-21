import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

const UrlInput = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState("");
  const [followRedirects, setFollowRedirects] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url, followRedirects);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow border border-green-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="url" className="text-gray-700 font-medium">
            Enter Website URL to Analyze
          </label>

          <div className="flex">
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            <motion.button
              type="submit"
              className="bg-gradient-to-tl from-emerald-950 via-emerald-950 to-green-700 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition flex items-center justify-center font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Search className="mr-2" size={20} />
                  Analyze
                </>
              )}
            </motion.button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="follow-redirects"
              checked={followRedirects}
              onChange={(e) => setFollowRedirects(e.target.checked)}
              className="mr-2 h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="follow-redirects" className="text-gray-700">
              Follow redirects
            </label>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default UrlInput;