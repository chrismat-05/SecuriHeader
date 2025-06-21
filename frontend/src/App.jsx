import { useState } from "react";
import Header from "./components/Header";
import UrlInput from "./components/UrlInput";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url, followRedirects) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          follow_redirects: followRedirects,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze URL");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-red-100"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold text-red-800 mb-4">What is SecuriHeader?</h2>
                  <div className="w-24 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto"
                >
                  SecuriHeader is a <span className="font-bold text-red-600">free, open-source</span> tool that checks any website's HTTP response 
                  headers for missing security protections. It analyzes the headers and identifies 
                  potential vulnerabilities that could expose your website to attacks.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-3xl mx-auto"
                >
                  <p className="text-red-800">
                    Security headers are an important first line of defense against common web 
                    vulnerabilities like cross-site scripting (XSS), clickjacking, MIME sniffing, 
                    and more. SecuriHeader makes it easy to audit your website's security headers 
                    and get actionable recommendations.
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex justify-center"
              >
              </motion.div>
            </motion.div>
          </section>

          <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          <ResultDisplay results={results} isLoading={isLoading} error={error} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
