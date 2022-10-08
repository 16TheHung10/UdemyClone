import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closeCaptions: [],
};

export const closeCaptionSlice = createSlice({
  name: "closeCaptions",
  initialState,
  reducers: {
    getCloseCaption: (state, action) => {
      state.closeCaptions = action?.payload;
      return state;
    },
  },
});

const { actions, reducer } = closeCaptionSlice;

export const closeCaptionReducer = reducer;
export const closeCaptionAction = actions;
