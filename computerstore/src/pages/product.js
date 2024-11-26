import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";

const ProductMgt = ({ products, setProducts }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    slug: "",
    image: "",
    quantity: 0,
  });
  const { slug } = useParams();

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

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required!");
      return;
    }
    const updatedProducts = [
      ...products,
      { ...newProduct, id: Date.now(), slug: slug },
    ];
    setProducts(updatedProducts);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      quantity: 0,
    });
    setPreviewImage(null);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((item) => item.id !== id);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((item) => item.id === id);
    setNewProduct(productToEdit);
    setPreviewImage(productToEdit.image);
  };

  const handleUpdateProduct = () => {
    const productToUpdate = products.map((item) =>
      item.id === newProduct.id ? { ...newProduct } : item
    );
    setProducts(productToUpdate);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      quantity: 0,
    });
    setPreviewImage(null);
  };

  return (
    <div className="product-management">
      <Header />
      {/* <h2 className="text-xl font-bold">Product Management</h2> */}

      {/* Add/Edit Product Form */}
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
        <button
          className="bg-slate-900 text-white px-3 py-3 rounded-xl"
          onClick={newProduct.id ? handleUpdateProduct : handleAddProduct}
        >
          {newProduct.id ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product List */}
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
