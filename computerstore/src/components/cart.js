import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/shoppingcart";
import { products } from "../productitems";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = carts.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId); 
    const itemPrice = product?.price || 0; 
    const itemQuantity = item.quantity || 0; 
    return sum + itemPrice * itemQuantity;
  }, 0);
  const shippingFee = 6.99; 
  const hst = subtotal * 0.13;
  const total = subtotal + hst + shippingFee;

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckOut = () => {
    navigate("/checkout", {
      state: { carts, subtotal, hst, shippingFee, total },
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 w-96 h-full flex flex-col transform transition-transform duration-500 ${
        statusTab === false ? "translate-x-full" : ""
      }`}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="flex-1 overflow-y-auto p-5">
        {carts.length > 0 ? (
          carts.map((item, key) => (
            <CartItem
              key={key}
              data={item}
              product={products.find((p) => p.id === item.productId)}
            />
          ))
        ) : (
          <p className="text-white">Your cart is empty.</p>
        )}
      </div>
      {}
      <div className="p-5 bg-gray-800 text-white">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)} CAD</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>HST:</span>
          <span>${hst.toFixed(2)} CAD</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Fee:</span>
          <span>${shippingFee.toFixed(2)} CAD</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)} CAD</span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          Close
        </button>
        <button className="bg-blue-600 text-white" onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
