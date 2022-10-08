import { createSlice } from "@reduxjs/toolkit";
import { getMySubscriptionThunk } from "./subscriptionThunk";

const initialState = {
  isLoading: false,
  mySubscription: [],
  urlSubscription: "",
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    changeURL: (state, action) => {
      state.urlSubscription = action.payload;
    },
  },
  extraReducers: {
    // Get all courses
    [getMySubscriptionThunk.pending]: (state) => {},
    [getMySubscriptionThunk.fulfilled]: (state, action) => {
      state.mySubscription = action.payload;
    },
    [getMySubscriptionThunk.rejected]: (state) => {},
  },
});

const { actions, reducer } = subscriptionSlice;

export const subscriptionReducer = reducer;
export const subscriptionAction = actions;
