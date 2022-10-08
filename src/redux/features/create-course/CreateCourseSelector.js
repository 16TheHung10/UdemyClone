export const selectBasic = (state) => {
  return state.createCourse.courseItem.basic;
};
export const selectMedia = (state) => {
  return state.createCourse.courseItem.media;
};
export const selectPrice = (state) => {
  return state.createCourse.courseItem.price;
};
export const selectCreateLoading = (state) => {
  return state.createCourse.isLoading;
};
export const selectCreateSuccess = (state) => {
  return state.createCourse.isCreateSuccess;
};
export const selectCourseItem = (state) => {
  return state.createCourse.courseItem;
};
export const selectSections = (state) => {
  return state.createCourse.courseItem.sections;
};
export const selectContentsById = (state, id) => {
  return state.createCourse.courseItem.sections[id]?.contents;
};
