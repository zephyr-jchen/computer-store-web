import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const { carts, subtotal, hst, shippingFee, total } = state || {};
  const navigate = useNavigate();

  if (!carts || carts.length === 0) {
    return (
      <div className="checkout-container">
        <h2>No items in the cart!</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Order Review</h2>
      <div className="order-summary">
        <h3>Order Details</h3>
        <ul>
          {carts.map((item, index) => {
            <li key={index}>
              {item.productId} - Quantity: {item.quantity}
            </li>;
          })}
        </ul>
        <div className="total-summary">
          <p>Subtotal: ${subtotal.toFixed(2)} CAD </p>
          <p>HST: ${hst.toFixed(2)} CAD</p>
          <p>Shipping Fee: ${shippingFee.toFixed(2)} CAD</p>
          <h3>Total: ${total.toFixed(2)} CAD</h3>
        </div>
      </div>

      <div className="checkout-actions">
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={() => alert("Order Placed.")}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Checkout;
