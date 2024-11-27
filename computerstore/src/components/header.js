import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/shoppingcart";

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
    <header className="flex justify-between items-center mb-5">
      <div>
        <Link to="/" className="text-xl font-semibold ml-10 mt-8">
          Home
        </Link>
        <Link to="/product" className="text-xl font-semibold ml-20 mt-8">
          Product
        </Link>
      </div>
      <div
        className="w-12 h-12 bg-white-100 rounded-full flex justify-center items-center relative"
        onClick={handleOpenTabCart}
      >
        🛒
        <span
          className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
                w-4 h-4 rounded-full flex justify-center items-center"
        >
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;
