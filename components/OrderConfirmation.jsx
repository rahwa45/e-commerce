// OrderConfirmation.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

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
