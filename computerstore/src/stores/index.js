import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './shoppingcart'

export const store = configureStore(
    {
        reducer:{
            cart: cartReducer,
        }
    }
)