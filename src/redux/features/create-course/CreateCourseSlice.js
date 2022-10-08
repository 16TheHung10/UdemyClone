import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { createCourse } from "./CreateCourseThunk";
const initialState = {
  isLoading: false,
  isCreateSuccess: false,
  courseItem: {
    basic: {
      title: "",
      shortDescription: "",
      description: "",
      objective: "",
      requirements: "",
      levelIds: [],
      audioLanguageIds: [],
      closeCaptionIds: [],
      categoryIds: [],
    },
    sections: [],
    media: {
      previewVideoType: "HTML5(MP4)",
      previewVideoUrl: "",
      previewVideoId: "",
      imageUrl: "",
      previewVideoName: "",
      localVideoUrl: "",
    },
    price: {
      price: 0,
      salePrice: 0,
      isFree: true,
      isRequiredEnroll: false,
    },
  },
};

export const createCourseSlice = createSlice({
  name: "createCourse",
  initialState,
  reducers: {
    createBasic: (state, action) => {
      state.courseItem.basic = action.payload;
    },
    createSection: (state, action) => {
      const index = state.courseItem.sections.findIndex((item) => {
        return item.title === action.payload.title;
      });
      if (index === -1) {
        state.courseItem.sections.push(action.payload);
      } else message.error("Section title was exist");
    },
    updateSection: (state, action) => {
      const index = state.courseItem.sections.findIndex((item) => {
        return item.title === action.payload.data.title;
      });
      if (index === -1) {
        state.courseItem.sections[action.payload.id].title =
          action.payload.data.title;
      } else message.error("Section title was exist");
    },
    deleteSection: (state, action) => {
      state.courseItem.sections.splice(action.payload, 1);
    },
    addContent: (state, action) => {
      action.payload.data.key = action.payload.data.title;
      state.courseItem.sections[action.payload.id].contents.push(
        action.payload.data
      );
    },
    updateContent: (state, action) => {
      state.courseItem.sections[action.payload.id].contents[
        action.payload.idEdit
      ] = action.payload.data;
    },
    updateContentList: (state, action) => {
      state.courseItem.sections[action.payload.id].contents =
        action.payload.data;
    },
    deleteContentItem: (state, action) => {
      let index = state.courseItem.sections[
        action.payload.id
      ].contents.findIndex((item) => {
        return item.title === action.payload.title;
      });
      if (index !== -1) {
        state.courseItem.sections[action.payload.id].contents.splice(index, 1);
      }
    },
    createMedia: (state, action) => {
      state.courseItem.media = action.payload;
    },
    createPrice: (state, action) => {
      state.courseItem.price = action.payload;
    },
    deletePreviewVideoMedia: (state) => {
      state.courseItem.media.previewVideoUrl = "";
      state.courseItem.media.previewVideoName = "";
      state.courseItem.media.previewVideoId = "";
      state.courseItem.media.localVideoUrl = "";
    },
    deleteThumbnailImage: (state) => {
      state.courseItem.media.imageUrl = "";
    },
    addVideoUrl: (state, action) => {
      state.courseItem.media.previewVideoUrl = action.payload.previewVideoUrl;
      state.courseItem.media.previewVideoName = action.payload.previewVideoName;
      state.courseItem.media.previewVideoId = action.payload.previewVideoId;
      state.courseItem.media.localVideoUrl = action.payload.localVideoUrl;
    },
    addThumbnailImage: (state, action) => {
      state.courseItem.media.imageUrl = action.payload;
    },
    resetDefault: (state) => {
      state.courseItem = initialState.courseItem;
      state.isCreateSuccess = false;
    },
  },
  extraReducers: {
    [createCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [createCourse.fulfilled]: (state) => {
      state.isLoading = false;
      state.isCreateSuccess = true;
    },
    [createCourse.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = createCourseSlice;

export const createCourseReducer = reducer;
export const createCourseAction = actions;
