import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/shoppingcart';
import "../css/productCart.css"


const ProductCart = (props) =>{
    const carts = useSelector(store => store.cart.items);
    console.log(carts);
    const [isAdded, setIsAdded] = useState(false);
    const {id, name, price,image,slug} = props.data;
    const dispatch = useDispatch();
    
    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: id,
                quantity: 1,
                price: price
            })
        );
        setIsAdded(true);
    }

    const handleQtyIncrease = () =>{
        dispatch(
            addToCart({ 
                productId: id, 
                quantity: 1 ,
                price: price
            }));
    }

    const handleQtyDecrease = () =>{
        const currentQty = carts.find(item => item.productId === id)?.quantity || 0;
        
        if (currentQty > 1) {
            dispatch(
                addToCart({ 
                    productId: id, 
                    quantity: -1 ,
                    price: price
                })
            );
        } else if (currentQty === 1) {
            dispatch(
                addToCart({ 
                    productId: id, 
                    quantity: -1 ,
                    price: price
                })
            );
            setIsAdded(false);
        }
    }

    return(
        <div className='product-card'>
            <Link to={slug}>
                <img className='product-img' src={image} alt=''/>
            </Link>
            <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
            {/* <div className='flex justify-between items-center'> */}
                <p className='currency'>
                    CA$<span className='product-price'>{price}</span>
                </p>
                {/* <button className='bg-gray-200 p-2 rounded-md text-sm hover:bg-blue-300 flex gap-2' onClick={handleAddToCart}>
                    Add To Cart
                </button> */}
                {!isAdded ? (
                    <button className='btn-AddToCart' onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                ) : (
                    <div className='product-qty-container'>
                        <button onClick={handleQtyDecrease}>-</button>
                        <span className='mx-2'>{carts.find(item => item.productId === id)?.quantity || 1}</span>
                        <button onClick={handleQtyIncrease}>+</button>
                    </div>
                )}
            {/* </div> */}
        </div>
    )
}

export default ProductCart