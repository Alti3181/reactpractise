// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const products = [
    { title: "T-shirt", price: 599, image: "https://via.placeholder.com/300" },
    {
      title: "Sneakers",
      price: 2499,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Backpack",
      price: 1199,
      image: "https://via.placeholder.com/300",
    },
    { title: "Cap", price: 399, image: "https://via.placeholder.com/300" },
    { title: "Watch", price: 1499, image: "https://via.placeholder.com/300" },
    {
      title: "Sunglasses",
      price: 899,
      image: "https://via.placeholder.com/300",
    },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.title === item.title);
      if (existingItem) {
        return prevItems.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    const meetsMin = minPrice === "" || product.price >= parseFloat(minPrice);
    const meetsMax = maxPrice === "" || product.price <= parseFloat(maxPrice);
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return meetsMin && meetsMax && matchesSearch;
  });

  const removeFromCart = (title) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartCount,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useCart = () => useContext(CartContext);
