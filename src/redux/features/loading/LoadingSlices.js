import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action?.payload
      return state
    }
  },
});

const { actions, reducer } = loadingSlice

export const LoadingReducer =  reducer
export const LoadingAction =  actions

