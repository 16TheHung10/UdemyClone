import { createSlice } from "@reduxjs/toolkit";
import { getAllStudent } from "./studentThunk";

const initialState = {
    isLoading: false,
    students: [],
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllStudent.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllStudent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.students = action.payload;
        },
        [getAllStudent.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

const { actions, reducer } = studentSlice;

export const StudentReducer = reducer;
export const StudentAction = actions;