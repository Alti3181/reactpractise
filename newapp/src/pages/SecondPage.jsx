import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SecondPage() {
  const { state } = useLocation();
  const article = state?.article;
  const navigate = useNavigate();

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="text-white p-6">
          <p>❌ No article data found.</p>
          <button
            className="mt-4 bg-blue-600 px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const publishedDate = new Date(article.publishedAt).toLocaleString("en-IN");

  return (
    <>
      <Navbar />
      <div className="bg-[#666363] min-h-screen text-white p-6">
        <div className="max-w-3xl mx-auto">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="news"
              className="w-full rounded-md mb-4"
            />
          )}
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>

          <p className="text-sm text-gray-300 mb-2">
            <span>By: {article.author || "Unknown"}</span> |{" "}
            <span>{article.source.name}</span> | <span>{publishedDate}</span>
          </p>

          <p className="text-lg mb-10">
            {article.content || article.description}
          </p>

          <div className="relative mt-10">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#666363] to-transparent blur-sm pointer-events-none"></div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
