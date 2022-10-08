export const selectUser = (state) => {
  return state.auth.user;
};

export const selectToken = (state) => {
  return state.auth.token;
};
