import { createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlist from "apis/features/Favourite/Favourite";

export const getAllWishlist = createAsyncThunk(
    "wishlist/getAll",
    async () => {
        const response = (await wishlist.getAllFavorites()).data;
        const data = response.data;
        const result = data.map(item => item.course)
        return result;
    }
);