import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioLanguages: [],
};

export const audioLanguageSlice = createSlice({
  name: "audioLanguages",
  initialState,
  reducers: {
    getAudioLanguage: (state, action) => {
      state.audioLanguages = action?.payload;
      return state;
    },
  },
});

const { actions, reducer } = audioLanguageSlice;

export const audioLanguageReducer = reducer;
export const audioLanguageAction = actions;
