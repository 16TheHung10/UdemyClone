import { createSlice } from "@reduxjs/toolkit";
import { getAllWishlist } from "./WishlistThunk";
import { message } from "antd";
const initialState = {
  wishlist: [],
  isLoading: false
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addNewItemWishlist: (state, action) => {
      state.wishlist.push(action.payload)
    },
    deleteItemWishlist: (state, action) => {
      const findItemIndex = state.wishlist.findIndex(
        (item) => item.id === action.payload
      );
      if (findItemIndex > -1) {
        state.wishlist.splice(findItemIndex, 1);
      }
    },
    addPreviousWishlist: (state, action) => {
      state.wishlist = action.payload;
      message.error('Oops! Something went wrong.')
    }
  },
  extraReducers: {
    [getAllWishlist.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllWishlist.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.wishlist = action.payload;
    },
    [getAllWishlist.rejected]: (state, action) => {
      state.isLoading = true;
    },
  }
});

const { actions, reducer } = wishlistSlice;

export const wishlistReducer = reducer;
export const wishlistAction = actions;
