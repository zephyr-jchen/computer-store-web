import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/shoppingcart";
import "../css/header.css"

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <header className="header-style">
      <div>
        <Link to="/" className="link-style-home">
          Home
        </Link>
        <Link to="/product" className="link-style-product">
          Product
        </Link>
      </div>
      <div className="cart" onClick={handleOpenTabCart}>
        🛒
        <span
          className="qty-style"
        >
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;
