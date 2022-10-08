import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyNotification } from "apis/features/Notification/Notification";

export const getMyNotificationThunk = createAsyncThunk(
  "notification",
  async () => {
    const response = (await getMyNotification());
    const data = response.data.data
    return data.reverse();
  }
);

