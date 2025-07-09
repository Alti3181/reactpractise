import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Navbar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <header className="bg-white dark:bg-[#121212] text-black dark:text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl font-bold">
          <Link to="/">TodayNews</Link>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 rounded-md bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white outline-none"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white px-3 py-1 rounded-md border border-gray-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-[#1e1e1e] text-black dark:text-white px-3 py-1 rounded-md border border-gray-400"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
