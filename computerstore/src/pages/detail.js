import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../productitems";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/shoppingcart";
import { changeQuantity } from '../stores/shoppingcart';
import "../css/detail.css";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductDetails = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [reviews, setReviews] = useState([]); 

  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();


useEffect(() => {
  const fetchProductAndReviews = async () => {
    try {
      
      const findDetail = products.filter((product) => product.slug === slug);
      if (findDetail.length > 0) {
        const productId = findDetail[0].id;

        
        const response = await axios.get(`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setDetail(response.data); 
        fetchReviews(); 
      } else {
        
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to fetch product details from the backend:", error);
    }
  };

  fetchProductAndReviews();
}, [slug]);


  useEffect(() => {
    const cartItem = carts.filter((cart) => cart.productId === detail.id);
    if (cartItem.length > 0) {
      setQuantity(cartItem[0].quantity);
    }
    setIsAdded(!!cartItem.length);
  }, [carts, detail.id]);


  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
      setReviews(response.data.slice(0, 5)); 
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };


  const handleMinusQuantity = async () => {
  const newQuantity = quantity - 1 < 1 ? 0 : quantity - 1;
  setQuantity(newQuantity);

  if (quantity <= 1) {
    try {
      // Remove item from cart in backend
      await axios.delete(`/api/cart/${detail.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Update Redux store
      dispatch(changeQuantity({ productId: detail.id, quantity: 0 }));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  } else {
    try {
      // Decrease quantity in backend
      await axios.post(
        '/api/cart',
        { productId: detail.id, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Update Redux store
      dispatch(changeQuantity({ productId: detail.id, quantity: quantity - 1 }));
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
    }
  }
};


const handlePlusQuantity = async () => {
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);

  if (isAdded) {
    try {
      await axios.post(
        '/api/cart',
        { productId: detail.id, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(changeQuantity({ productId: detail.id, quantity: quantity + 1 }));
    } catch (error) {
      console.error('Failed to increase quantity:', error);
    }
  }
};


const handleAddToCart = async () => {
  try {
    await axios.post(
      '/api/cart',
      { productId: detail.id, quantity: 1 },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    dispatch(
      addToCart({
        productId: detail.id,
        price: detail.price,
        quantity: 1,
      })
    );
    setIsAdded(true);
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};


  return (
    <div>
      <h2 className="text-3xl text-center mt-5">Product Details</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img src={detail.image} alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold">{detail.name}</h1>
          <p className="font-bold text-3xl ml-5">
            CA${detail.price}
          </p>
          <div className="flex gap-5">
            {!isAdded ? (
              <button className="btn-Add" onClick={handleAddToCart}>
                Add To Cart
              </button>
            ) : (
              <div className="product-qty-container">
                <button onClick={handleMinusQuantity}>-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={handlePlusQuantity}>+</button>
              </div>
            )}
          </div>
          <p className="description-style">{detail.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <strong>Name:</strong> {review.name}
              <br />
              <strong>Comment:</strong> {review.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails; 
