import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseById } from "apis/features/Courses/Courses";
export const getCourseDetail = createAsyncThunk(
  "downloadCourse",
  async (id, { rejectWithValue }) => {
    const response = await getCourseById(id);
    const { data } = response.data;
    return data;
  }
);
