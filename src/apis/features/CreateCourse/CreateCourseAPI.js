import { instance } from "../../apis";

export const uploadFile = (data) => {
  return instance.post("/api/File", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createCourseAPI = (data) => {
  return instance.post("/api/Course", data);
};
export const deleteFileAPI = (id) => {
  return instance.delete(`/api/File/${id}`);
};
