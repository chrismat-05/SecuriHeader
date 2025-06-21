import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, ShieldAlert } from "lucide-react";

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
            <div className="animate-pulse text-red-500 flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded"
          >
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2" />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg border border-red-100">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Security Header Analysis
            </h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Analyzed URL:{" "}
                <a
                  href={results.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  {results.url}
                </a>
              </h3>
              <p
                className={`inline-block px-2 py-1 rounded text-sm ${
                  results.status_code >= 400
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                HTTP Status: {results.status_code}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Header
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                        <span className={`font-medium ${getSeverityColor(item.severity)}`}>
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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-red-100">
            <h2 className="text-xl font-bold text-red-800 mb-4">
              All Response Headers
            </h2>
            <div className="bg-red-50 p-4 rounded overflow-x-auto">
              <pre className="text-sm text-gray-800">
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