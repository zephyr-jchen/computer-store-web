import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { products as initialProducts } from "../productitems";
import "../css/home.css"

const Home = () => {
  // const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearthTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    setSearthTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = initialProducts.filter((item) => {
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
      <h1>List Products</h1>

      <div className="filter-style">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          
        >
          <option value="">All Categories</option>
          <option value="desktop">Desktops</option>
          <option value="laptop">Laptops</option>
          <option value="monitor">Monitors</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <div className="product-item-container">
        {filteredProducts.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center mt-5">No products match your search</p>
      )}
    </div>
  );
};

export default Home;
