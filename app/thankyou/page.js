"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Create a separate client component to use useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const amount = searchParams.get("amount");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (email && amount) {
      fetch("/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Email sent:", data);
          setStatusMessage("Confirmation email sent!");
        })
        .catch((err) => {
          console.error("❌ Email failed:", err);
          setStatusMessage("Failed to send confirmation email.");
        });
    }
  }, [email, amount]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-700 text-md mb-4">
        Your order has been placed successfully.
        <br />
        You will receive a confirmation email soon.
      </p>
      {statusMessage && (
        <p className="text-sm text-blue-600 mb-4">{statusMessage}</p>
      )}
      <div>
        <a href="/">
          <button className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer">
            Back to Home
          </button>
        </a>
      </div>
    </div>
  );
}

// Wrap the client component with Suspense in your main page
const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Suspense fallback={<p>Loading order details...</p>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
};

export default ThankYouPage;
