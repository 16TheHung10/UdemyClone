export const selectNotificationList = (state) => {
  return state.notification.notificationList;
};

export const selectNewNotificationList = (state) => {
  return state.notification.newNotificationList;
};

export const selectIsLoading = (state) => {
  return state.notification.isLoading;
};
