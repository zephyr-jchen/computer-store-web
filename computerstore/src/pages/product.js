import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";

const ProductMgt = () => {
  const [products, setProducts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    price: "",
    description: "",
    slug: "",
    image: "",
    quantity: 0,
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products with token
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new product with token
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required!");
      return;
    }
    try {
      const response = await axios.post("/api/products", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts([...products, response.data]);
      resetForm();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // Function to delete a product with token
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((item) => item.id === id);
    setNewProduct(productToEdit);
    setPreviewImage(productToEdit.image);
  };

  // Function to update a product with token
  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${newProduct.id}`, newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(
        products.map((item) => (item.id === newProduct.id ? response.data : item))
      );
      resetForm();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const resetForm = () => {
    setNewProduct({
      id: 0,
      name: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      quantity: 0,
      category: "",
    });
    setPreviewImage(null);
  };

  return (
    <div className="product-management">
      <div className="add-product-form">
        <h2>{newProduct.id ? "Edit Product" : "Add Product"}</h2>
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
        <input type="file" accept="image/*" onChange={handleImage} />
        {previewImage && <img src={previewImage} alt="Preview" width="100" />}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <button
          className="bg-slate-900 text-white px-3 py-3 rounded-xl"
          onClick={newProduct.id ? handleUpdateProduct : handleAddProduct}
        >
          {newProduct.id ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="product-list">
        <h2>Existing Products</h2>
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
                    className="bg-slate-900 text-white px-3 py-3 rounded-xl"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-slate-900 text-white px-3 py-3 rounded-xl"
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
