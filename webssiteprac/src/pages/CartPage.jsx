import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="bg-[#666363] min-h-screen text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
