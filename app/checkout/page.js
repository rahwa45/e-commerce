"use client";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../nav/nav";
const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);

    // Calculate total price
    const total = savedCart.reduce(
      (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to create Stripe session.");
    }
  };

  return (
    <div className="min-h-screen  pt-20 px-4 sm:px-8">
      <Navbar />
      <h1 className="text-4xl font-bold  text-gray-800 mb-10 text-center">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6"
            >
              <img
                src={item.urls?.small || "/default-image.png"}
                alt={item.description || "Product Image"}
                className="w-40 h-40 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  {item.description || "Untitled Item"}
                </p>
                <p className="text-gray-600 mb-2">${item.price}</p>
                <input
                  style={{ backgroundColor: "white", color: "black" }}
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 w-24"
                />
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <p className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
