import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseAPI } from "apis/features/CreateCourse/CreateCourseAPI";

export const createCourse = createAsyncThunk("createCourse", async (params) => {
  const courseItem = {
    ...params.basic,
    ...params.media,
    ...params.price,
    sections: [...params.sections],
  };
  courseItem.sections.forEach((section, index) => {
    let lectures = [];
    let quizzes = [];
    let assignments = [];
    section.contents.forEach((item, index) => {
      if (item.type === "Lecture") {
        lectures = [
          ...lectures,
          {
            ...item,
            ordinalNumber: index + 1,
            totalTime: item.totalTime.toFixed(),
          },
        ];
      }
      if (item.type === "Quiz") {
        quizzes = [...quizzes, { ...item, ordinalNumber: index + 1 }];
      }
      if (item.type === "Assignment") {
        assignments = [...assignments, { ...item, ordinalNumber: index + 1 }];
      }
    });
    section = { ...section, lectures, quizzes, assignments };
    courseItem.sections[index] = section;
    delete courseItem.sections[index].contents;
  });
  const response = (await createCourseAPI(courseItem)).data;
  const data = response.data;
  return data;
});
