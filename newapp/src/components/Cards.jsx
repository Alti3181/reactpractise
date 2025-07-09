import { useNavigate } from "react-router-dom";

export default function Card({ article, loading }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: { article } });
  };

  if (loading) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg shadow-md h-48 animate-pulse"></div>
    );
  }

  if (!article) return null;

  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-IN",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div
      onClick={handleClick}
      className="bg-[#1e1e1e] rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:scale-[1.01] transition"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="news"
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-3 flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold line-clamp-2">{article.title}</h2>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
          {article.description}
        </p>
        <div className="mt-3 text-xs text-gray-400 flex justify-between items-center">
          <span>{article.source?.name || "Unknown Source"}</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </div>
  );
}
