import { createSlice } from "@reduxjs/toolkit";
import { getCourseDetail } from "./DownloadCourseThunk";
const initialState = {
  isLoading: false,
  coursesDetail: [],
  errorMessage: "",
};

export const DownloadCoursesSlice = createSlice({
  name: "download-courses",
  initialState,
  reducers: {},
  extraReducers: {
    //get Course Detail
    [getCourseDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getCourseDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coursesDetail = action.payload;
    },
    [getCourseDetail.rejected]: (state) => {
      state.isLoading = false;
    },
    //---End get Course Detail--
  },
});

const { actions, reducer } = DownloadCoursesSlice;

export const DownloadCoursesReducer = reducer;
export const DownloadCoursesActions = actions;
