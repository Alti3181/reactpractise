import React from "react";
import { useCart } from "../context/CartContext";

export default function Card({ title, price, image }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { title, price, image };
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex flex-col">
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">₹{price}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-black text-white py-2 px-4 m-4 rounded hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
