import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCart from "../components/productCart";
import "../css/home.css";
import { FaSignOutAlt } from "react-icons/fa"; // Icon for the logout button
import axios from "axios";

const Home = () => {
  const navigate = useNavigate(); // Used for navigation
  const [products, setProducts] = useState([]); // Store products from the backend
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProducts(response.data); // Store products in state
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the authentication token
    navigate("/login"); // Redirect to the login page
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((item) => {
    const matchedSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchedCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchedCategory && matchedSearch;
  });

  return (
    <div>
      {/* Search and category filter */}
      <div className="filter-style">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="desktop">Desktops</option>
          <option value="laptop">Laptops</option>
          <option value="monitor">Monitors</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Display products */}
      <div className="product-item-container">
        {filteredProducts.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>

      {/* No products found */}
      {filteredProducts.length === 0 && (
        <p className="text-center mt-5">No products match your search</p>
      )}
    </div>
  );
};

export default Home;
