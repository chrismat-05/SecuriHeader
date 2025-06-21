import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCopy, Check, CheckCircle2, AlertTriangle, Info, ShieldAlert } from "lucide-react";

const ResultDisplay = ({ results, isLoading, error }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "valid":
      case "present":
        return "bg-green-100 text-green-800";
      case "invalid":
        return "bg-yellow-100 text-yellow-800";
      case "missing":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "valid":
      case "present":
        return <CheckCircle2 className="mr-2" size={20} />;
      case "invalid":
        return <AlertTriangle className="mr-2" size={20} />;
      case "missing":
        return <ShieldAlert className="mr-2" size={20} />;
      default:
        return <Info className="mr-2" size={20} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-8">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-8"
          >
            <div className="animate-pulse text-green-700 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing security headers...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded"
          >
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2" />
              <div>
                <h3 className="text-red-700 font-bold">Error</h3>
                <p className="text-red-500">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-green-700"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">
            Security Header Analysis
          </h2>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-green-50 text-emerald-700 border-b border-green-100">
                <tr>
                  <th className="px-6 py-3">Header</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {results.results.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.header}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium ${getSeverityColor(
                          item.severity
                        )}`}
                      >
                        {item.severity.charAt(0).toUpperCase() +
                          item.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-600">{item.description}</p>
                        {item.value && (
                          <p className="mt-1 text-sm text-gray-500">
                            <span className="font-medium">Value:</span>{" "}
                            <code className="bg-gray-100 px-1 rounded">
                              {item.value}
                            </code>
                          </p>
                        )}
                        {item.status === "invalid" && (
                          <p className="mt-1 text-sm text-yellow-600">
                            <span className="font-medium">Expected:</span>{" "}
                            {item.expected_values.join(" or ")}
                          </p>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-emerald-800 shadow relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-green-700">All Response Headers</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(results.headers, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="overflow-auto rounded bg-gray-100 border border-green-500 p-4">
              <pre className="text-sm text-black whitespace-pre-wrap">
                {JSON.stringify(results.headers, null, 2)}
              </pre>
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
};

export default ResultDisplay;
