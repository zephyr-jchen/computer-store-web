import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const { carts, subtotal, hst, shippingFee, total } = state || {};
  const navigate = useNavigate();

  if (!carts || carts.length === 0) {
    return (
      <div>
        <h2>No items in the cart!</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Order Review</h2>
      <ul>
        {carts.map((item, index) => {
          <li key={index}>
            {item.productId} - Quantity: {item.quantity}
          </li>;
        })}
      </ul>
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)} CAD </p>
        <p>HST: ${hst.toFixed(2)} CAD</p>
        <p>Shipping Fee: ${shippingFee.toFixed(2)} CAD</p>
        <p>Total: ${total.toFixed(2)} CAD</p>
      </div>
      <button onClick={() => alert("Order Placed.")}>Confirm</button>
    </div>
  );
};

export default Checkout;
