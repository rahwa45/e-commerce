"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../nav/nav";
import React from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-28 bg-gray-100">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <div>
              {/* Cart Items Grid */}
              <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center p-5 shadow-xl ">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white rounded-lg  p-4 flex flex-col items-center"
                  >
                    <img
                      src={item.urls?.small}
                      alt={item.description}
                      className="w-64 h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 text-center">
                      {item.description || "Untitled Item"}
                    </h3>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="mt-3 text-red-600 transition-colors px-4 py-2 border border-red-300 rounded-md cursor-pointer hover:border-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-8 px-4 py-5 sm:px-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Total:</h3>
                  <p className="text-xl font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-evenly">
                  <button
                    onClick={handleCheckout}
                    className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => {
                      setCartItems([]);
                      localStorage.removeItem("cart");
                    }}
                    className=" bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors font-medium"
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
