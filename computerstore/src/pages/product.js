import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products as initialProducts } from "../productitems";

const ProductMgt = () => {
  const { slug } = useParams();
  const [products, setProduct] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    slug: "",
    image: "",
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required!");
      return;
    }
    const updatedProducts = [
      ...products,
      { ...newProduct, id: Date.now(), slug: slug },
    ];
    setProduct(updatedProducts);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      quantity: 0,
    });
  };

  const handleDeleteProduct = (id) => {
    setProduct(products.filter((item) => item.id !== id));
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((item) => item.id === id);
    setNewProduct(productToEdit);
  };

  const handleUpdateProduct = () => {
    setProduct(
      products.map((item) =>
        item.id === newProduct.id ? { ...newProduct } : item
      )
    );
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      quantity: 0,
    });
  };

  return (
    <div className="product-management">
      <h2 className="text-xl font-bold">Product Management</h2>

      {/* Add/Edit Product Form */}
      <div className="add-product-form">
        <h3>{newProduct.id ? "Edit Product" : "Add Product"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <button
          onClick={newProduct.id ? handleUpdateProduct : handleAddProduct}
        >
          {newProduct.id ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>Existing Products</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="bg-slate-900 text-white px-7 py-3 rounded-xl"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-slate-900 text-white px-7 py-3 rounded-xl"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductMgt;
