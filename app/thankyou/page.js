// pages/thank-you.js
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-700 text-md p-5">
          Your order has been placed successfully. <br />
          You will receive a confirmation email soon.
        </p>
        <div>
          <a href="/">
            <button className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
