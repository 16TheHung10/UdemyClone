import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getCourseById,
  getMyCreatedCourses,
  getMyPurchasedCourses,
  getNumberEnrollmentByCourse,
  getCoursesOrderByViews,
  getNewestCourses
} from "./coursesThunk";

const initialState = {
  isLoading: false,
  courses: [],
  featureCourses: [],
  newestCourses: [],
  coursesById: [],
  myPurchasedCourses: [],
  courseByEnrollment: {},
  myCreatedCourses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all courses
    [getAllCourses.pending]: (state) => { },
    [getAllCourses.fulfilled]: (state, action) => {
      state.courses = action.payload.result.filter((item) => item?.status === 1);
    },
    [getAllCourses.rejected]: (state) => { },

    // Get courses by id
    [getCourseById.pending]: (state) => { },
    [getCourseById.fulfilled]: (state, action) => {
      state.coursesById = action.payload.filter((item) => !item.isDeleted);
    },
    [getCourseById.rejected]: (state) => { },
    // Get my created courses
    [getMyCreatedCourses.pending]: (state) => {
      state.isLoading = true
    },
    [getMyCreatedCourses.fulfilled]: (state, action) => {
      state.myCreatedCourses = action.payload.filter((item) => !item.isDeleted);
      state.isLoading = false
    },
    [getMyCreatedCourses.rejected]: (state) => {
      state.isLoading = false
    },
    // Get enroll course
    [getMyPurchasedCourses.pending]: (state) => { },
    [getMyPurchasedCourses.fulfilled]: (state, action) => {
      state.myPurchasedCourses = action.payload;
    },
    [getMyPurchasedCourses.rejected]: (state) => { },
    // Get number of enrollment for each course
    [getNumberEnrollmentByCourse.pending]: (state) => { },
    [getNumberEnrollmentByCourse.fulfilled]: (state, action) => {
      state.courseByEnrollment = action.payload;
    },
    [getNumberEnrollmentByCourse.rejected]: (state) => { },
    // Get feature courses
    [getCoursesOrderByViews.pending]: (state) => { },
    [getCoursesOrderByViews.fulfilled]: (state, action) => {
      state.featureCourses = action.payload;
    },
    [getCoursesOrderByViews.rejected]: (state) => { },
    // Get newest courses
    [getNewestCourses.pending]: (state) => { },
    [getNewestCourses.fulfilled]: (state, action) => {
      state.newestCourses = action.payload;
    },
    [getNewestCourses.rejected]: (state) => { },
  },
});

const { actions, reducer } = coursesSlice;

export const CoursesReducer = reducer;
export const CoursesAction = actions;
