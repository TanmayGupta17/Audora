"use client";
import { notFound } from "next/navigation";
import AudioPlayer from "@/Components/AudioPlayer";
import { featuredBooks } from "@/data/mockData";
import Link from "next/link";
import { useState, use } from "react";

export default function BookSummary({ params }) {
  const unwrappedParams = use(params); // Unwrap the params promise
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const book = featuredBooks.find((b) => b.id === parseInt(unwrappedParams.id));
  if (!book) notFound();

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFeedback("");
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Self-help": "from-purple-500 to-pink-500",
      Productivity: "from-green-500 to-emerald-500",
      Sales: "from-red-500 to-orange-500",
      Leadership: "from-blue-500 to-indigo-500",
      Finance: "from-yellow-500 to-amber-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/categories"
                className="hover:text-indigo-600 transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{book.title}</li>
          </ol>
        </nav>

        {/* Book Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div
            className={`bg-gradient-to-r ${getCategoryColor(
              book.category
            )} p-8`}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-48 h-64 rounded-2xl object-cover shadow-2xl border-4 border-white"
                />
              </div>
              <div className="flex-1 text-center lg:text-left text-white">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                  {book.category}
                </span>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl mb-6 opacity-90">
                  by <span className="font-semibold">{book.author}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{book.duration}</span>
                  </div>
                  {book.rating && (
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <svg
                        className="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{book.rating}</span>
                    </div>
                  )}
                  {book.listeners && (
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      <span>{book.listeners} listeners</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full Summary Audio */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                📖
              </span>
              Complete Book Summary
            </h2>
            <AudioPlayer
              audioUrl={book.audioUrl}
              title={`${book.title} - Complete Summary`}
              transcript={book.transcript}
            />
          </div>
        </div>

        {/* Book Overview */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About This Book
          </h2>
          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 rounded-r-2xl mb-6">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {book.summary}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {book.fullContent}
            </p>
          </div>
        </div>

        {/* Modules Section */}
        {book.modules && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-4">
                🎯
              </span>
              Key Learning Modules
            </h2>
            <div className="space-y-6">
              {book.modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {module.title}
                        </h3>
                      </div>
                      {module.duration && (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {module.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg pl-12">
                      {module.description}
                    </p>
                    {module.audioUrl && (
                      <div className="pl-12">
                        <AudioPlayer
                          audioUrl={module.audioUrl}
                          title={module.title}
                          transcript={module.transcript}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Feedback Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Want More Books Like This?
              </h3>
              <p className="text-gray-600 mt-1">
                Help us build our library by suggesting books you'd love to hear
              </p>
            </div>
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-sm"
            >
              {showFeedback ? "Close" : "Request Books"}
            </button>
          </div>

          {showFeedback && (
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Suggest Your Next Favorite Book
              </h4>
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Thanks for your suggestion! We'll consider adding this book
                    to our library.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Which book should we summarize next? Tell us the title and author, and why you think it would be valuable..."
                    rows={4}
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-sm"
                    >
                      Submit Suggestion
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Key Takeaways */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Takeaways
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Master the fundamental principles outlined in the book",
              "Apply practical strategies for immediate implementation",
              "Develop long-term habits for sustained personal growth",
              "Learn from real-world examples and case studies",
            ].map((takeaway, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Books */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            More from {book.category}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBooks
              .filter((b) => b.category === book.category && b.id !== book.id)
              .slice(0, 2)
              .map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  href={`/book/${relatedBook.id}`}
                  className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
                >
                  <img
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    className="w-16 h-20 rounded-lg object-cover group-hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {relatedBook.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      by {relatedBook.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {relatedBook.duration}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
