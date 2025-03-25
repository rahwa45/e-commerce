"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  // Access order data from URL query or local storage
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("order")) || null;
    if (orderData) {
      setOrder(orderData);
    } else {
      router.push("/"); // Redirect if no order found
    }
  }, [router]);

  if (!order) {
    return <p>No order found.</p>;
  }

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order! Your order number is: {order.orderNumber}</p>
      <h3>Order Details</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${order.totalPrice}</p>
      <p>Shipping to: {order.shippingAddress}</p>
    </div>
  );
};

export default OrderConfirmation;
