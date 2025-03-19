import { useState } from "react";
import Head from "next/head";

export default function Analyzer() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle analyzing the code
 
  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please paste or upload some code first!");
      return;
    }
  
    setLoading(true);
    setAnalysis("");
  
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
  
      const data = await res.json();
  
      // This is where you add the error handling!
      if (data.error) {
        setAnalysis(`❗️ Error: ${data.error}`);
      } else {
        setAnalysis(data.analysis || "No analysis returned.");
      }
  
    } catch (error) {
      console.error(error);
      setAnalysis("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle file uploads and read file content
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setCode(e.target.result);
    reader.readAsText(file);
  };

  return (
    <>
      <Head>
        <title>Code Analyzer | OptiCode AI</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-sans">
        <div className="max-w-7xl mx-auto py-16 px-4 md:px-8">
          
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            OptiCode AI - Code Quality Analyzer
          </h1>

          {/* Main Grid Layout */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Code Input Section */}
            <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Input Your Code</h2>

              <textarea
                className="w-full h-80 p-4 rounded-lg bg-gray-800 text-gray-200 text-sm border border-gray-700 focus:ring-2 focus:ring-green-500 resize-none transition"
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              {/* File Upload & Analyze Button */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                
                {/* File Upload */}
                <label className="cursor-pointer inline-block">
                  <input
                    type="file"
                    accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm shadow-md">
                    Upload Code File
                  </span>
                </label>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`px-6 py-3 text-lg font-medium rounded-lg shadow-md transition ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  {loading ? "Analyzing..." : "Analyze Code"}
                </button>
              </div>
            </section>

            {/* Analysis Result Section */}
            <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
              <h2 className="text-2xl font-semibold mb-4 text-green-400">AI Analysis Results</h2>

              <div className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded-lg overflow-y-auto text-gray-300 text-sm">
                {analysis ? (
                  <pre className="whitespace-pre-wrap">{analysis}</pre>
                ) : (
                  <p className="text-gray-500 italic">Your analysis will appear here...</p>
                )}
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} OptiCode AI. All rights reserved.
          </footer>
        </div>
      </main>
    </>
  );
}
