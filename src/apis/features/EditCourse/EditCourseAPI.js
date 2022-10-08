import { instance } from "../../apis";
export const editCourseAPI = (data) => {
  return instance.put("/api/Course", data);
};
