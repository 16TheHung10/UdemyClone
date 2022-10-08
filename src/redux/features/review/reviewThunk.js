import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewAPI } from "apis/features/Review/reviewApi";
export const fetchAllReviewByCourseId = createAsyncThunk(
  "list-review",
  async (courseId) => {
    const response = await reviewAPI.getCourseReviewOfAllUser(courseId);
    const { data } = response.data;
    return data;
  }
);
export const fetReviewOfUser = createAsyncThunk(
  "user-review",
  async (courseId) => {
    const response = await reviewAPI.getCourseReviewOfUser(courseId);
    const { data } = response.data;
    return data;
  }
);
