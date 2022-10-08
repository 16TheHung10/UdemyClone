import { createSlice } from "@reduxjs/toolkit";
import { getCartItems, updateCartItems } from "./CartThunk";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  buyNowItem: {},
  checkedList: JSON.parse(localStorage.getItem("checkedList")) || [],
  typeBuy: "",
  isLoading: false,
};

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.items = [];
      state.checkedList = [];
    },
    setPreviousCartItems: (state, action) => {
      state.items = action.payload;
      state.checkedList = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
      state.checkedList.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    setTypeBuy: (state, action) => {
      state.typeBuy = action.payload;
    },
    buyItemNow: (state, action) => {
      state.buyNowItem = action.payload;
    },
    setCheckedList: (state, action) => {
      state.checkedList.push(action.payload);
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    setAllCheckedList: (state) => {
      state.checkedList = state.items;
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    removeAllCheckedList: (state) => {
      state.checkedList = [];
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    removeCheckedList: (state, action) => {
      const findItemIndex = state.checkedList.findIndex(
        (item) => item.id === action.payload
      );
      if (findItemIndex > -1) {
        state.checkedList.splice(findItemIndex, 1);
      }
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    removeItemFromCart: (state, action) => {
      const findItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const findItemIndexCheckedList = state.checkedList.findIndex(
        (item) => item.id === action.payload
      );
      if (findItemIndex > -1) {
        state.items.splice(findItemIndex, 1);
      }
      if (findItemIndexCheckedList > -1) {
        state.checkedList.splice(findItemIndexCheckedList, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    updateCartItem: (state, action) => {
      state.items = state.items.filter((item) =>
        action.payload.every((id) => id !== item.id))
      state.checkedList = [];
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = true;
      let array = [...state.items, ...action.payload];
      let tempArray = [];
      const result = array.filter((item) => {
        const isDuplicate = tempArray.includes(item.id);

        if (!isDuplicate) {
          tempArray.push(item.id);

          return true;
        }

        return false;
      });
      state.items = [...result];
      state.checkedList = [...result];
      localStorage.setItem("checkedList", JSON.stringify(state.checkedList));
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

const { actions, reducer } = cartSlice;

export const CartReducer = reducer;
export const CartAction = actions;
