import { instance } from "apis/apis";

export const reviewAPI = {
  createCourseReview: (data) => {
    return instance.post("/api/CourseReviews", data);
  },
  getCourseReviewOfUser: (courseId) => {
    return instance.get("/api/CourseReviews/GetReviewByCourseUser", {
      params: { courseId: courseId },
    });
  },
  updateCourseReview: (id, data) => {
    return instance.put(`/api/CourseReviews/${id}`, data);
  },
  getCourseReviewOfAllUser: (id) => {
    return instance.get("/api/CourseReviews/GetReviewByCourse", {
      params: { id },
    });
  },

  getAllMyReviews: () => {
    return instance.get("/api/CourseReviews/GetAllReviewByUser");
  },

  getAllMyStudentsReviews: () => {
    return instance.get("/api/CourseReviews/GetReviewOfInstructor");
  },


  // updateCourseReviewOfUser: () => {
  //   return instance.put("");
  // },
};
