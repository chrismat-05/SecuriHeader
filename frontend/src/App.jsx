import { useState } from "react";
import Header from "./components/Header";
import UrlInput from "./components/UrlInput";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url, followRedirects) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze`, {
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
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AboutSection />
          <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          <ResultDisplay results={results} isLoading={isLoading} error={error} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
