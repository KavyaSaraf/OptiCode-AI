import { useState } from "react";
import Head from "next/head";
import jsPDF from "jspdf";

export default function Analyzer() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Analyze Code Handler
  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please paste or upload some code first!");
      return;
    }

    setLoading(true);

    // Reset all states at the start of a new analysis
    setAnalysis("");
    setScore(null);
    setSuggestions([]); // Reset as an array

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.error) {
        setAnalysis(`❗️ Error: ${data.error}`);
      } else {
        setAnalysis(data.analysis || "No analysis returned.");
        setScore(data.score ?? null);

        // Sample AI Suggestions with details
        const aiSuggestions = data.suggestions || [
          {
            title: "Use descriptive variable names",
            details: "Avoid short or vague names like 'x' or 'temp'. Good names improve code readability and maintainability.",
          },
          {
            title: "Optimize your loops",
            details: "Review loops for unnecessary iterations. Use efficient data structures to reduce time complexity and improve performance.",
          },
          {
            title: "Handle edge cases properly",
            details: "Ensure your code gracefully handles inputs like null, empty strings, or unexpected types. Validate data before processing.",
          },
        ];

        setSuggestions(aiSuggestions);
      }

      console.log("Analysis Result:", data);
    } catch (error) {
      console.error("Fetch error:", error);
      setAnalysis("❗️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // File Upload Handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setCode(e.target.result);
    reader.readAsText(file);
  };

  // Export as PDF Handler
  const handleExportPDF = () => {
    if (!analysis) {
      alert("Nothing to export yet!");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("AI Code Analysis Report", 20, 20);

    // Score
    if (score !== null) {
      doc.setFontSize(14);
      doc.setTextColor(100);
      doc.text(`Code Quality Score: ${score} / 100`, 20, 40);
    }

    // Analysis Content
    doc.setFontSize(12);
    doc.setTextColor(50);
    const lines = doc.splitTextToSize(analysis, 170);
    doc.text(lines, 20, score !== null ? 60 : 40);

    // Suggestions (Optional Section)
    if (suggestions.length > 0) {
      let y = score !== null ? 70 + lines.length * 7 : 50 + lines.length * 7;
      doc.setFontSize(14);
      doc.setTextColor(100);
      doc.text("AI Suggestions:", 20, y);

      doc.setFontSize(12);
      doc.setTextColor(50);
      suggestions.forEach((suggestion, index) => {
        const suggestionText = `${index + 1}. ${suggestion.title} - ${suggestion.details}`;
        const wrappedText = doc.splitTextToSize(suggestionText, 170);
        doc.text(wrappedText, 20, y + 10 + index * 14);
      });
    }

    doc.save("Code_Analysis_Report.pdf");
  };

  // Clear Form Handler
  const handleClear = () => {
    setCode("");
    setAnalysis("");
    setScore(null);
    setSuggestions([]);
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

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side: Code Input Section */}
            <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Input Your Code</h2>

              <textarea
                className="w-full h-80 p-4 rounded-lg bg-gray-800 text-gray-200 text-sm border border-gray-700 focus:ring-2 focus:ring-green-500 resize-none transition"
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                {/* Upload Button */}
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

                {/* Clear Button */}
                <button
                  onClick={handleClear}
                  disabled={loading}
                  className="px-6 py-3 text-lg font-medium rounded-lg shadow-md transition bg-red-500 hover:bg-red-600 text-white"
                >
                  Clear
                </button>
              </div>
            </section>

            {/* Right Side: Results Section */}
            <div className="flex flex-col gap-8">
              {/* AI Analysis Results */}
              <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
                <h2 className="text-2xl font-semibold mb-4 text-green-400">AI Analysis Results</h2>

                {score !== null && (
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-400">Code Quality Score</h3>
                    <p className="text-4xl font-extrabold text-green-400 mt-2">{score} / 100</p>
                    <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
                      <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div
                  id="analysis-result"
                  className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded-lg overflow-y-auto text-gray-300 text-sm"
                >
                  {analysis ? (
                    <pre className="whitespace-pre-wrap">{analysis}</pre>
                  ) : (
                    <p className="text-gray-500 italic">Your analysis will appear here...</p>
                  )}
                </div>

                {/* Export PDF Button */}
                {analysis && (
                  <button
                    onClick={handleExportPDF}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
                  >
                    Export as PDF
                  </button>
                )}
              </section>

              {/* Suggestions Section */}
              {suggestions.length > 0 && (
                <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-400">AI Suggestions</h2>
                  <ul className="space-y-4">
                    {suggestions.map((sugg, index) => (
                      <li
                        key={index}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <p className="text-green-400 font-semibold">{sugg.title}</p>
                        <details className="mt-2 text-gray-300 text-sm">
                          <summary className="cursor-pointer text-blue-400">See Details</summary>
                          <p className="mt-2">{sugg.details}</p>
                        </details>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
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
