import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>OptiCode AI</title>
        <meta name="description" content="Enhance your code quality with AI-powered analysis and optimization." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Welcome to OptiCode AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Optimize, analyze, and refine your code with AI-powered insights. Make your code cleaner, faster, and more reliable.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/analyzer">
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-lg shadow-xl transition duration-300 ease-in-out">
                  Get Started
                </button>
              </Link>
              <a href="#features" className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-2xl text-lg shadow-lg transition duration-300 ease-in-out">
                Learn More
              </a>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-green-500/50 transition">
              <h3 className="text-2xl font-semibold mb-4">AI Code Analysis</h3>
              <p className="text-gray-400">
                Advanced AI analyzes your code for quality, efficiency, and best practices in real-time.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/50 transition">
              <h3 className="text-2xl font-semibold mb-4">Intelligent Refactoring</h3>
              <p className="text-gray-400">
                Get smart suggestions to refactor and optimize your code, enhancing performance and readability.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/50 transition">
              <h3 className="text-2xl font-semibold mb-4">Seamless Integration</h3>
              <p className="text-gray-400">
                Easily integrate OptiCode AI into your workflow for effortless, continuous code improvement.
              </p>
            </div>
          </section>

          {/* How it Works Section */}
          <section className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-10">How OptiCode AI Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="bg-gray-800 p-8 rounded-xl w-full md:w-1/3 hover:shadow-xl">
                <h4 className="text-xl font-semibold mb-3">1. Upload or Paste Code</h4>
                <p className="text-gray-400">Start by uploading your files or pasting your code snippet directly.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl w-full md:w-1/3 hover:shadow-xl">
                <h4 className="text-xl font-semibold mb-3">2. Analyze with AI</h4>
                <p className="text-gray-400">Our AI scans your code, detects issues, and offers improvement suggestions.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl w-full md:w-1/3 hover:shadow-xl">
                <h4 className="text-xl font-semibold mb-3">3. Implement & Improve</h4>
                <p className="text-gray-400">Refactor your code using actionable insights to enhance quality and maintainability.</p>
              </div>
            </div>
          </section>
          <section className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
  <h2 className="text-2xl font-semibold mb-4 text-green-400">AI Analysis Results</h2>

  {/* ...existing score and analysis... */}

  {analysis && (
    <button
      onClick={handleExportPDF}
      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
    >
      Export as PDF
    </button>
  )}

  {/* Suggestions Section */}
  {suggestions.length > 0 && (
    <section className="mt-8 bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-transform hover:scale-[1.02]">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-400">AI Suggestions & Improvements</h2>

      <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
        {suggestions.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </section>
  )}
</section>

          {/* Call To Action */}
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-6">Take Your Code to the Next Level</h2>
            <Link href="/analyzer">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg shadow-2xl transition duration-300">
                Analyze Now with OptiCode AI
              </button>
            </Link>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-center py-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} OptiCode AI. All rights reserved.
        </footer>
      </main>
    </>
  );
}
