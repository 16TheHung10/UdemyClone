import { createAsyncThunk } from "@reduxjs/toolkit";
import * as courses from "apis/features/Courses/Courses";
import { getEnrollment } from "apis/features/Enrollment/EnrollmentAPI";

export const getAllCourses = createAsyncThunk("course", async (params) => {
  const response = (await courses.getAllCourses()).data;
  const data = response.data;
  return data;
});

export const getCourseById = createAsyncThunk(
  "course/getCourseById",
  async (params) => {
    const response = (await courses.getCourseByUserId(params)).data;
    const data = response.data;
    return data;
  }
);

export const getMyCreatedCourses = createAsyncThunk(
  "course/getMyCreateCourses",
  async (id) => {
    const response = (await courses.getCourseByUserId(id, true)).data;
    const data = response.data;
    return data;
  }
);

export const getMyPurchasedCourses = createAsyncThunk(
  "course/getMyPurchasedCoursed",
  async () => {
    // // Get các course enroll của ID
    // const responseGetEnrollment = (await getEnrollment()).data;
    // const listEnrollMent =await responseGetEnrollment.data;
    // const listEnrollMentOfId =listEnrollMent.filter(item=>item.user.id===params).map(item=>item.course.id)
    // // Refactor lại list courses
    // const responseGetCourseByUserId = (await courses.getAllCourses()).data;
    // const coursesResult =await responseGetCourseByUserId.data;
    // const data =coursesResult.filter(item=>listEnrollMentOfId.includes(item.id))
    const response = (await courses.getEnrolledCoursesByCurrentUser()).data;
    const data = response.data;
    return data;
  }
);

export const getNumberEnrollmentByCourse = createAsyncThunk(
  "course/getEnrollmentBycourse",
  async () => {
    // Get các course enroll của ID
    const responseGetEnrollment = (await getEnrollment()).data;
    const listEnrollMent = await responseGetEnrollment.data;
    // refactor data {courseId:number of enrollment}
    let data = {};
    for (let i = 0; i < listEnrollMent.length; i++) {
      if (data[listEnrollMent[i]?.course.id]) {
        data[listEnrollMent[i]?.course.id] =
          data[listEnrollMent[i]?.course.id] + 1;
      } else {
        data = { ...data, [listEnrollMent[i]?.course.id]: 1 };
      }
    }
    return data;
  }
);

export const getCoursesOrderByViews = createAsyncThunk(
  "course/getCoursesOrderByViews",
  async (params) => {
    const response = (
      await courses.getCoursesByOrderAndPage(1, 10, "viewNumber", "desc")
    ).data;
    const data = response.data.result;
    return data;
  }
);

export const getNewestCourses = createAsyncThunk(
  "course/getNewestCourses",
  async (params) => {
    const response = (
      await courses.getCoursesByOrderAndPage(1, 10, "createdAt", "desc")
    ).data;
    const data = response.data.result;
    return data;
  }
);
