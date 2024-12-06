import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, updateCart } from "../stores/shoppingcart";
import "../css/productCart.css";

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  console.log("Redux Store carts:", carts);
  const { id, name, price, image, slug } = props.data;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  // Load cart data when component mounts
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const currentItem = carts.find((item) => item.productId === id);
    setQuantity(currentItem ? currentItem.quantity : 0);
  }, [carts, id]);

  const handleAddToCart = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    dispatch(updateCart({ productId: id, quantity: updatedQuantity, price, name: name }));
  };

  const handleQtyIncrease = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    dispatch(updateCart({ productId: id, quantity: updatedQuantity, price, name: name }));
  };

  const handleQtyDecrease = () => {
    const updatedQuantity = quantity - 1;
    setQuantity(updatedQuantity > 0 ? updatedQuantity : 0);
    dispatch(updateCart({ productId: id, quantity: updatedQuantity, price, name: name }));
  };

  return (
    <div className="product-card">
      <Link to={slug}>
        <img className="product-img" src={image} alt="" />
      </Link>
      <h3 className="text-2xl py-3 text-center font-medium">{name}</h3>
      <p className="currency">
        CA$<span className="product-price">{price}</span>
      </p>
      {quantity === 0 ? (
        <button className="btn-AddToCart" onClick={handleAddToCart}>
          Add To Cart
        </button>
      ) : (
        <div className="product-qty-container">
          <button onClick={handleQtyDecrease}>-</button>
          <span className="mx-2">{quantity}</span>
          <button onClick={handleQtyIncrease}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
