import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Checkout = () => {
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

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCartItems([]);

    // Redirect to the order confirmation page (thank-you page)
    router.push("/thankyou"); // Ensure this path is correct and matches your file structure
  };

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-center text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 border rounded-lg"
            >
              <img
                src={item.urls?.small || "/default-image.png"}
                alt={item.description || "Product Image"}
                className="w-20 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold">{item.description}</p>
                <p className="text-gray-600">${item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="w-16 border p-1 text-center mt-2"
                />
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <p className="text-lg font-semibold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <button
            className="mt-6 bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-400"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
