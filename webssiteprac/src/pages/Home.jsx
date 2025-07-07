// src/pages/Home.jsx
import React from "react";
import Card from "../components/card";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { filteredProducts } = useCart();

  return (
    <div className="bg-[#666363] min-h-screen text-white">
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product, index) => (
          <div key={index} className="h-full">
            <Card {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
