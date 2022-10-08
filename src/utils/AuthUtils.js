import configuration, {
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_TOKEN_KEY,
  PREVIOUS_LOGED_IN_USER_KEY,
  USER_PROFILE,
} from "configuration";

//credential will return token
const setToken = (credential) => {
  //clean up token
  localStorage.removeItem(configuration.AUTH_TOKEN_KEY);
  localStorage.removeItem(configuration.AUTH_REFRESH_TOKEN_KEY);

  localStorage.setItem(
    configuration.AUTH_TOKEN_KEY,
    JSON.stringify(credential?.access)
  );
  localStorage.setItem(
    configuration.AUTH_REFRESH_TOKEN_KEY,
    JSON.stringify(credential?.refresh)
  );
};

const getToken = () => {
  const localToken = localStorage.getItem(configuration.AUTH_TOKEN_KEY);

  if (!!localToken) {
    return JSON.parse(localToken);
  } else {
    return null;
  }
};

const getRefreshToken = () => {
  const localToken = localStorage.getItem(configuration.AUTH_REFRESH_TOKEN_KEY);

  if (!!localToken) {
    return JSON.parse(localToken);
  } else {
    return null;
  }
};

const getUserProfile = () => {
  const localUserProfile = localStorage.getItem(configuration.USER_PROFILE);
  const sessionUserProfile = sessionStorage.getItem(configuration.USER_PROFILE);

  if (!!sessionUserProfile) {
    return JSON.parse(sessionUserProfile);
  } else {
    if (!!localUserProfile) {
      return JSON.parse(localUserProfile);
    } else {
      return null;
    }
  }
};

const setUserProfile = (userProfile) => {
  localStorage.removeItem(configuration.USER_PROFILE);

  localStorage.setItem(configuration.USER_PROFILE, JSON.stringify(userProfile));
};

const isAuthed = () => {
  if (!!getToken()) {
    //has token
    const tokenExpiry = new Date(getToken().expired);
    const currentTime = new Date();

    if (currentTime < tokenExpiry) {
      //not expired
      //need to check permission
      return true;
    } else {
      //need to clear previous session
      //expired => request to login again
      return false;
    }
  } else {
    //no token
    return false;
  }
};

const setPermission = (permissionList) => {
  localStorage.setItem(configuration.PERMISSION_INFO, permissionList);
};

const checkPermission = (key) => {
  const permissionJSON = localStorage.getItem(configuration.PERMISSION_INFO);
  if (permissionJSON) {
    const user = JSON.parse(permissionJSON);
    return user.includes(key);
  }
  return false;
};

const logout = () => {
  //cleanup old token
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_PROFILE);

  goLogin();
};

const goLogin = () => {
  window.location = "/sign-in";
};

export const setPreviousLogInUser = (user) => {
  let userStoredList = getPreviousLogInUser();
  let userIndex = userStoredList.findIndex((item) => item.id === user.id);
  if (userIndex !== -1) {
    userStoredList.splice(userIndex, 1);
  }
  userStoredList.push(user);
  return localStorage.setItem(
    PREVIOUS_LOGED_IN_USER_KEY,
    JSON.stringify(userStoredList)
  );
};

export const clearPreviousLogInUser = () => {
  localStorage.removeItem(PREVIOUS_LOGED_IN_USER_KEY);
};

export const deleteOnePreviousLogInUser = (id) => {
  let userStoredList = getPreviousLogInUser();
  const userIndex = userStoredList.findIndex((item) => item.id === id);
  if (userIndex !== -1) {
    userStoredList.splice(userIndex, 1);
  }
  return localStorage.setItem(
    PREVIOUS_LOGED_IN_USER_KEY,
    JSON.stringify(userStoredList)
  );
};
export const getPreviousLogInUser = () => {
  return localStorage.getItem(PREVIOUS_LOGED_IN_USER_KEY) === null
    ? []
    : JSON.parse(localStorage.getItem(PREVIOUS_LOGED_IN_USER_KEY));
};

const AuthUtils = {
  logout,
  goLogin,
  setToken,
  getToken,
  getRefreshToken,
  isAuthed,
  setUserProfile,
  getUserProfile,
  setPermission,
  checkPermission,
  getPreviousLogInUser,
  deleteOnePreviousLogInUser,
  clearPreviousLogInUser,
  setPreviousLogInUser,
};

export default AuthUtils;
