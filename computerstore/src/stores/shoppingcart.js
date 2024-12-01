import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    statusTab: false,
    subtotal: 0, hst: 0, shippingFee: 6.99, total: 0
}
const calculateTotals = (items, shippingFee) => {
    console.log('items', items.length, )
    if (!items.length) return { subtotal: 0, hst: 0, total: 0 };
    console.log('first', items[0])
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const hst = subtotal * 0.13;
    const total = subtotal + hst + shippingFee;
    return { subtotal, hst, total };
};

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            addToCart(state, action) {
                const { productId, quantity ,price} = action.payload;

                const indexProductId = (state.items).findIndex(item => item.productId === productId);
                if (indexProductId >= 0) {
                    state.items[indexProductId].quantity += quantity;
                } else {
                    state.items.push({ productId, quantity  ,price});
                }
                // 计算总价
                const { subtotal, hst, total } = calculateTotals(state.items, state.shippingFee);
                console.log('subtotal, hst, total', subtotal, hst, total)
                state.subtotal = subtotal;
                state.hst = hst;
                state.total = total;

            },
            changeQuantity(state, action) {
                const { productId, quantity } = action.payload;
                const indexProductId = (state.items).findIndex(item => item.productId === productId);

                if (quantity > 0) {
                    state.items[indexProductId].quantity = quantity;
                } else {
                    state.items = (state.items).filter(item => item.productId !== productId);
                }
                // 计算总价
                const { subtotal, hst, total } = calculateTotals(state.items, state.shippingFee);
                state.subtotal = subtotal;
                state.hst = hst;
                state.total = total;
            },
            toggleStatusTab(state) {
                if (state.statusTab === false) {
                    state.statusTab = true;
                } else {
                    state.statusTab = false;
                }
            },
        }
    }
)
export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;