import { instance, nonAuthenInstance } from "apis/apis";

export const getAllCourses = (pagination) => {
  return nonAuthenInstance.get(`/api/Course?Text=${pagination.Text}&PageNumber=${pagination.PageNumber}&PageSize=${pagination.PageSize}&OrderBy=${pagination.OrderBy}`);
};

export const deleteCourse = (id) => {
  return instance.delete(`/api/Course/${id}`);
};

export const getCourseById = (id) => {
  return instance.get(`/api/Course/${id}`);
};

export const getCourseByUserId = (id) => {
  return nonAuthenInstance.get(`/api/Course/user/${id}`);
};

// Only use for admin
export const getAllCreatedCourses = () => {
  return instance.get(`/api/Filter/Search?Status=0`);
};

// Only use for admin
export const getAllProcessedCourses = (status) => {
  return instance.get(`/api/Filter/Search?Status=${status}&PageSize=1000`);
};

export const putCreatedCourse = (data) => {
  return instance.put(`/api/Course/ApprovalCourse`, data);
};

export const getPropertiesFilter = () => {
  return nonAuthenInstance.get(`/api/Filter`);
};

export const filterAndSearchCourse = (searchQuery) => {
  return nonAuthenInstance.get(`/api/Filter/Search${searchQuery}`);
};

// Get all of enrolled courses by current user

export const getEnrolledCoursesByCurrentUser = () => {
  return instance.get(`/api/Enrollment/GetByUser`);
};

export const getCoursesByOrderAndPage = (pageNumber, pageSize, orderBy, order) => {
  return instance.get(`/api/Filter/Search?PageNumber=${pageNumber}&PageSize=${pageSize}&OrderBy=${orderBy}%20${order}&Status=1`);
};
