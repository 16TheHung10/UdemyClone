export const selectBasic = (state) => {
  return state.editCourse.courseItem.basic;
};
export const selectMedia = (state) => {
  return state.editCourse.courseItem.media;
};
export const selectEditCourseLoading = (state) => {
  return state.editCourse.isLoading;
};
export const selectEditCourseSuccess = (state) => {
  return state.editCourse.isEditSuccess;
};
export const selectPrice = (state) => {
  return state.editCourse.courseItem.price;
};
export const selectCourseItem = (state) => {
  return state.editCourse.courseItem;
};
export const selectSections = (state) => {
  return state.editCourse.courseItem.sections;
};
export const selectContentsById = (state, id) => {
  return state.editCourse.courseItem.sections[id]?.contents;
};
