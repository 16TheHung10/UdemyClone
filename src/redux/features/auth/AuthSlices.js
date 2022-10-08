import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action?.payload?.token;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout() {},
  },
});

const { actions, reducer } = authSlice;

export const AuthReducer = reducer;
export const AuthAction = actions;
