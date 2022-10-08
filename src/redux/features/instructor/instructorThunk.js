import { createAsyncThunk } from "@reduxjs/toolkit";
import * as instructor from "apis/features/Instructor/Instructor";

export const getAllInstructors = createAsyncThunk(
    "instructor/getAll",
    async () => {
        const response = (await instructor.getAllInstructors()).data;
        const data = response.data;
        return data;
    }
);
