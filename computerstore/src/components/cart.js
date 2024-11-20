import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./cartItem";
import { toggleStatusTab } from "../stores/shoppingcart";
import { products } from "../productitems";

const Cart = () => {
    const carts = useSelector((store) => store.cart.items);
    const statusTab = useSelector((store) => store.cart.statusTab);
    const dispatch = useDispatch();

    // 计算 subtotal, shippingFee 和 total
    const subtotal = carts.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId); // 根据 productId 获取商品信息
        const itemPrice = product?.price || 0; // 默认价格为 0
        const itemQuantity = item.quantity || 0; // 默认数量为 0
        return sum + itemPrice * itemQuantity;
    }, 0);
    const shippingFee = 6.99; // 固定运费
    const total = subtotal * 1.13 + shippingFee;

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    return (
        <div
            className={`fixed top-0 right-0 bg-gray-700 w-96 h-full flex flex-col transform transition-transform duration-500 ${
                statusTab === false ? "translate-x-full" : ""
            }`}
        >
            <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
            {/* 商品列表 */}
            <div className="flex-1 overflow-y-auto p-5">
                {carts.length > 0 ? (
                    carts.map((item, key) => (
                        <CartItem key={key} data={item} product={products.find((p) => p.id === item.productId)} />
                    ))
                ) : (
                    <p className="text-white">Your cart is empty.</p>
                )}
            </div>
            {/* 小计, 运费, 总计 */}
            <div className="p-5 bg-gray-800 text-white">
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping Fee:</span>
                    <span>${shippingFee.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)} CAD</span>
                </div>
            </div>
            {/* 按钮 */}
            <div className="grid grid-cols-2">
                <button className="bg-black text-white" onClick={handleCloseTabCart}>
                    Close
                </button>
                <button className="bg-blue-600 text-white">Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
