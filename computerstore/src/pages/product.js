import React, { useState } from "react";

const ProductMgt = () => {
  const [product, setProduct] = useState([]);
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
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
};

export default ProductMgt;
