import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { products as initialProducts } from "../productitems";

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
      <h1 className="text-3xl my-5 ml-10">List Products</h1>

      <div className="flex gap-4 p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md flex-1"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option value="desktop">Desktops</option>
          <option value="laptop">Laptops</option>
          <option value="monitor">Monitors</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
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
