import { createSlice } from "@reduxjs/toolkit";
import { getMyNotificationThunk } from "./notificationThunk";

const initialState = {
  isLoading: false,
  notificationList: [],
  newNotificationList: [],
};

export const notification = createSlice({
  name: "notification",
  initialState,
  extraReducers: {
    // Get my notification
    [getMyNotificationThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyNotificationThunk.fulfilled]: (state, action) => {
      state.notificationList = action.payload;
      state.isLoading = false;
    },
    [getMyNotificationThunk.rejected]: (state) => {
      state.isLoading = false;
    },
  },
  reducers: {
    updateNotification: (state, action) => {
      console.log(action.payload);
      state.newNotificationList = [
        action.payload.id,
        ...state.newNotificationList,
      ];
      state.notificationList = [action.payload, ...state.notificationList];
    },
    removeNewNotification: (state, action) => {
      state.newNotificationList = state.newNotificationList.filter(
        (item) => item !== action.payload
      );
    },
  },
});

const { actions, reducer } = notification;

export const notificationReducer = reducer;
export const notificationAction = actions;
