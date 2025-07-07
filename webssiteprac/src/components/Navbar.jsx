import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const {
    cartCount,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
  } = useCart();

  const MIN = 100;
  const MAX = 10000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
  };

  return (
    <header className="bg-[#121212] text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">MyShop</div>
        {/* 🔍 Search Input */}
        <div className="ml-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
            className="px-3 py-1 rounded bg-white text-black text-sm w-48 focus:outline-none"
          />
        </div>

        {/* 🎯 Dual-thumb slider */}
        <div className="relative w-[240px] text-xs mx-4">
          <label className="text-white text-sm mb-1 block">Price Range</label>
          <div className="relative h-8">
            {/* Track */}
            <div className="absolute top-[14px] left-0 right-0 h-1 bg-pink-500 rounded"></div>

            {/* Min Thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={minPrice}
              onChange={handleMinChange}
              className="range-thumb"
              style={{ zIndex: minPrice > MAX - 100 ? 5 : 3 }}
            />
            {/* Max Thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={maxPrice}
              onChange={handleMaxChange}
              className="range-thumb"
              style={{ zIndex: 4 }}
            />
          </div>
          <p className="text-white mt-2">
            ₹{minPrice} – ₹{maxPrice}+
          </p>
        </div>

        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/cart">Cart {cartCount}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
