import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/shoppingcart";
import { FaSignOutAlt } from "react-icons/fa"; // Logout icon
import "../css/header.css";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [role, setRole] = useState(""); // State to store user role
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting to login

  useEffect(() => {
    // Fetch role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      console.log(storedRole);
      setRole(storedRole);
    }

    // Calculate total quantity in the cart
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  // Handle opening the cart tab
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from storage
    localStorage.removeItem("role"); // Clear the role from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="header-style">
      <div>
        <Link to="/" className="link-style-home">
          Home
        </Link>
        {/* Show Product link only if the user is an admin */}
        {role === "admin" && (
          <Link to="/product" className="link-style-product">
            Product
          </Link>
        )}
      </div>
      <div className="header-right">
        {/* Cart Section */}
        <div className="cart" onClick={handleOpenTabCart}>
          🛒
          <span className="qty-style">{totalQuantity}</span>
        </div>
        {/* Logout Button */}
        <div className="logout" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
