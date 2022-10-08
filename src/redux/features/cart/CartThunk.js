import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cart from 'apis/features/Cart/Cart'

export const getCartItems = createAsyncThunk(
    "cart/getCart",
    async (params) => {
        const response = (await cart.GetCartItems()).data;
        const data = response.data.courses;
        return data
    }
);

export const updateCartItems = createAsyncThunk(
    "cart/updateCart",
    async (params) => {
        const response = (await cart.UpdateCartItems(params));
        const data = response.data;
        return data
    }
);