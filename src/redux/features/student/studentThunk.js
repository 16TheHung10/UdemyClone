import { createAsyncThunk } from "@reduxjs/toolkit";
import * as student from "apis/features/Student/Student";

export const getAllStudent = createAsyncThunk(
    "student/getAll",
    async () => {
        const response = (await student.getAllStudent()).data;
        const data = response.data;
        return data;
    }
);
