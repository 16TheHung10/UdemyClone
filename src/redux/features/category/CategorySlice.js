import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action?.payload
      return state
    }
  },
});

const { actions, reducer } = categorySlice

export const CategoryReducer =  reducer
export const CategoryAction =  actions

