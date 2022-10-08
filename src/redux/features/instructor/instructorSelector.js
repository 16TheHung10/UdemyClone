export const selectInstructors = (state) => {
  return state.instructor.instructors;
};

export const selectLoading = (state) => {
  return state.instructor.isLoading;
};
