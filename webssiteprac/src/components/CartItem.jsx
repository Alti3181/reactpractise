// src/components/CartItem.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ title, price, image, quantity }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  return (
    <li className="bg-white text-black rounded p-4 flex items-center gap-4">
      <img src={image} alt={title} className="h-20 w-20 object-cover rounded" />
      <div>
        <p className="font-semibold">{title}</p>
        <p>
          ₹{price} x {quantity} = ₹{price * quantity}
        </p>

        {/* 👇 This block shows + quantity - in a row */}
        <div className="flex items-center gap-2 mt-2">
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={() => increaseQuantity(title)}
          >
            +
          </button>

          <span className="px-2">{quantity}</span>

          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={() => decreaseQuantity(title)}
          >
            -
          </button>
        </div>

        <button
          className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 text-sm"
          onClick={() => removeFromCart(title)}
        >
          Remove from Cart
        </button>
      </div>
    </li>
  );
}
