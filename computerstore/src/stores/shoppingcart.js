import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // Shopping cart items
  statusTab: false,
  subtotal: 0,
  hst: 0,
  shippingFee: 6.99,
  total: 0,
};

const calculateTotals = (items, shippingFee) => {
  if (!items.length) return { subtotal: 0, hst: 0, total: 0 };
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const hst = subtotal * 0.13;
  const total = subtotal + hst + shippingFee;
  return { subtotal, hst, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      const { subtotal, hst, total } = calculateTotals(state.items, state.shippingFee);
      state.subtotal = subtotal;
      state.hst = hst;
      state.total = total;
    },
    addToCart(state, action) {
        const { productId, quantity, price } = action.payload;

        const existingItem = state.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.items.push({ productId, quantity, price });
        }

        const { subtotal, hst, total } = calculateTotals(state.items, state.shippingFee);
        state.subtotal = subtotal;
        state.hst = hst;
        state.total = total;
    },
    changeQuantity(state, action) {
        const { productId, quantity } = action.payload;
        const index = state.items.findIndex(item => item.productId === productId);
        if (index !== -1) {
            if (quantity > 0) {
                state.items[index].quantity = quantity;
            } else {
                state.items.splice(index, 1);
            }
        }
    
    },
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
  },
});

export const { setCart, changeQuantity, addToCart, toggleStatusTab } = cartSlice.actions;

export const fetchCart = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/cart", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setCart(response.data));
  } catch (error) {
    console.error("Failed to fetch cart:", error);
  }
};

export const updateCart = (item) => async (dispatch) => {
  try {
    const { productId, quantity } = item;
    if (quantity > 0) {
      await axios.post(
        "/api/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } else {
      await axios.delete(`/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    }
    dispatch(fetchCart()); // Refresh cart after update
  } catch (error) {
    console.error("Failed to update cart:", error);
  }
};

export default cartSlice.reducer;
