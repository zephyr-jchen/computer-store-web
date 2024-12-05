import React, { useState, useEffect } from 'react';
import { products } from '../productitems';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeQuantity } from '../stores/shoppingcart';

const CartItem = (props) => {
    const { productId } = props.data;

    const carts = useSelector((store) => store.cart.items);
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    // Fetch product details
    useEffect(() => {
        const findDetail = products.find((product) => product.id === productId);
        if (findDetail) {
            setDetail(findDetail);
        } else {
            console.error(`Product with id ${productId} not found`);
        }
    }, [productId]);

    const { quantity = 0 } = carts.find((cart) => cart.productId === productId) || {};

    // Decrease quantity handler
    const handleMinusQuantity = async () => {
        if (quantity <= 1) {
            try {
                // Remove item from cart in backend
                await axios.delete(`/api/cart/${productId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                // Update Redux store
                dispatch(changeQuantity({ productId, quantity: 0 }));
                
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
            }
        } else {
            try {
                // Decrease quantity in backend
                await axios.post(
                    '/api/cart',
                    { productId, quantity: quantity - 1 },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );

                // Update Redux store
                dispatch(changeQuantity({ productId, quantity: quantity - 1 }));
            } catch (error) {
                console.error('Failed to decrease quantity:', error);
            }
        }
    };

    // Increase quantity handler
    const handlePlusQuantity = async () => {
        try {
            // Increase quantity in backend
            await axios.post(
                '/api/cart',
                { productId, quantity: quantity + 1 },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            // Update Redux store
            dispatch(changeQuantity({ productId, quantity: quantity + 1 }));
        } catch (error) {
            console.error('Failed to increase quantity:', error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
            <img src={detail.image} alt="" className="w-12" />
            <h3>{detail.name}</h3>
            <p>CA${detail.price}</p>
            <div className="w-20 flex justify-between">
                <button
                    className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
                    onClick={handleMinusQuantity}
                >
                    -
                </button>
                <span>{quantity}</span>
                <button
                    className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
                    onClick={handlePlusQuantity}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CartItem;
