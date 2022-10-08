export const selectStudents = (state) => {
  return state.student.students;
};

export const selectLoading = (state) => {
  return state.student.isLoading;
};
