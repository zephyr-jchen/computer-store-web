import React from "react";
import { useStore } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  
  //const {  subtotal, hst, shippingFee, total } = state || {};
  const cartsStore = useSelector(store => store.cart);
  const carts = state?.carts || cartsStore;
  const subtotal = state?.subtotal || 0;
  const hst = state?.hst || 0;
  const shippingFee = state?.shippingFee || 6.99;
  const total = state?.total || 0;
  //const { items: carts, subtotal = 0, hst = 0, shippingFee = 6.99, total = 0} = cartsSotre
  console.log("Redux Store cart data:", cartsStore);
  console.log("carts:", carts)
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
          {carts.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <div className="total-summary">
          <p>Subtotal: ${Number(subtotal).toFixed(2)} CAD </p>
          <p>HST: ${hst.toFixed(2)} CAD</p>
          <p>Shipping Fee: ${shippingFee.toFixed(2)} CAD</p>
          <h3>Total: ${total.toFixed(2)} CAD</h3>
        </div>
      </div>

      <div className="checkout-actions">
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={() => navigate("/payment")}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Checkout;
