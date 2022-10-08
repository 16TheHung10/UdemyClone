import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarUI: "home",
};

export const sideBarSlice = createSlice({
  name: "stateSideBar",
  initialState,
  reducers: {
    changeToHome: (state, action) => {
      state.sideBarUI = "home";
    },
    changeToDashboard: (state, action) => {
      state.sideBarUI = "dashboard";
    },
  },
});

const { actions, reducer } = sideBarSlice;

export const sideBarReducer = reducer;
export const sideBarAction = actions;
