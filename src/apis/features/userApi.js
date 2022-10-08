import { instance, nonAuthenInstance } from "apis/apis";

export const createRequestUpdateRole = (data) => {
  return instance.post("/api/RoleUpdate/CreateRequest", data);
};

export const updateUserProfile = (data) => {
  return instance.post("/api/User/UpdateUser", data);
}

export const toggleActiveUser = (id) => {
  return instance.put(`/api/User/${id}`);
}

export const getUserByRole = (role) => {
  return nonAuthenInstance.get(`/api/User/role/${role}`);
}

export const getAllUserRequest = () => {
  return instance.get(`/api/RoleUpdate`);
}

export const updateUserRole = (data) => {
  return instance.put(`/api/RoleUpdate/UpdateUserRole`, data)
}