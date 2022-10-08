import { createSlice } from "@reduxjs/toolkit";
import { fetchAllReviewByCourseId, fetReviewOfUser } from "./reviewThunk";
const initialState = {
  isLoadingListReview: false,
  isLoadingUserReview: false,
  listReview: [],
  userReview: {},
  errorMessage: "",
};

export const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    //GET rating of all user by courseID
    [fetchAllReviewByCourseId.pending]: (state) => {
      state.isLoadingListReview = true;
    },
    [fetchAllReviewByCourseId.fulfilled]: (state, action) => {
      state.isLoadingListReview = false;
      state.listReview = [...action.payload];
    },
    [fetchAllReviewByCourseId.rejected]: (state) => {
      state.isLoadingListReview = false;
    },
    //---END get rating of all user by courseID--
    //GET review of user by courseID
    [fetReviewOfUser.pending]: (state) => {
      state.isLoadingUserReview = true;
    },
    [fetReviewOfUser.fulfilled]: (state, action) => {
      state.isLoadingUserReview = false;
      state.userReview = { ...action.payload };
    },
    [fetReviewOfUser.rejected]: (state) => {
      state.isLoadingUserReview = false;
      state.userReview = {};
    },
    //---END get review of user by courseID--
  },
});

const { actions, reducer } = ReviewSlice;

export const ReviewReducer = reducer;
export const ReviewActions = actions;
