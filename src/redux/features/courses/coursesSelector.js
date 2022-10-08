export const selectCourses = (state) => {
  return state.courses.courses;
};

export const selectCoursesById = (state) => {
  return state.courses.coursesById;
};

export const selectMyCreatedCourses = (state) => {
  return state.courses.myCreatedCourses;
};

export const selectPurchasedCourses = (state) => {
  return state.courses.myPurchasedCourses;
};

export const selectCourseByEnrollment = (state) => {
  return state.courses.courseByEnrollment;
};

export const selectIsLoading = (state) => {
  return state.courses.isLoading;
};

export const selectFeatureCourses = (state) => {
  return state.courses.featureCourses;
};

export const selectNewestCourses = (state) => {
  return state.courses.newestCourses;
};
