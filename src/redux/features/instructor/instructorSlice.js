import { createSlice } from "@reduxjs/toolkit";
import { getAllInstructors } from "./instructorThunk";

const initialState = {
    isLoading: false,
    instructors: [],
};

export const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllInstructors.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllInstructors.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.instructors = action.payload;
        },
        [getAllInstructors.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

const { actions, reducer } = instructorSlice;

export const InstructorReducer = reducer;
export const InstructorAction = actions;