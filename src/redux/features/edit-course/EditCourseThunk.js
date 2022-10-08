import { createAsyncThunk } from "@reduxjs/toolkit";
import * as courses from "apis/features/Courses/Courses";
import { editCourseAPI } from "apis/features/EditCourse/EditCourseAPI";
export const getCourseById = createAsyncThunk(
  "editCourse/getCourseById",
  async (params) => {
    const response = (await courses.getCourseById(params)).data;
    const data = response.data;
    const courseItem = {};
    let basic = {
      title: data?.title,
      shortDescription: data?.shortDescription,
      description: data?.description,
      objective: data?.objective,
      requirements: data?.requirements,
      levelIds: data?.levels.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      audioLanguageIds: data?.audioLanguages.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      closeCaptionIds: data?.closeCaptions.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      categoryIds: data?.categories.reduce((a, b) => {
        return [...a, b.id];
      }, []),
    };
    let price = {
      price: data?.price,
      salePrice: data?.salePrice,
      isFree: data?.isFree,
      isRequiredEnroll: data?.isRequiredEnroll,
    };
    const sectionsArray = data?.sections;
    sectionsArray.forEach((section) => {
      section.lectures?.forEach((lecture) => {
        lecture.type = "Lecture";
        lecture.key = lecture.title;
        lecture.attachments.forEach((attachment) => {
          delete attachment.lectureId;
          delete attachment.assignmentId;
        });
      });
      section.quizzes?.forEach((quiz) => {
        quiz.type = "Quiz";
        quiz.key = quiz.title;
        quiz.questions?.forEach((question) => {
          question.key = question.title;
          delete question.quizId;
          question.options.forEach((option) => {
            delete option.questionId;
          });
        });
      });
      section.assignments?.forEach((assignment) => {
        assignment.type = "Assignment";
        assignment.key = assignment.title;
        assignment.attachments.forEach((attachment) => {
          delete attachment.lectureId;
          delete attachment.assignmentId;
        });
      });
      const tempArray = section.lectures.concat(
        section.quizzes,
        section.assignments
      );
      tempArray.sort((a, b) => a.ordinalNumber > b.ordinalNumber);
      delete section.lectures;
      delete section.quizzes;
      delete section.assignments;
      section.contents = tempArray;
    });
    courseItem.id = data?.id;
    courseItem.sections = sectionsArray;
    courseItem.basic = basic;
    courseItem.price = price;
    courseItem.media = {
      previewVideoType: data?.previewVideoType,
      previewVideoUrl: data?.previewVideoUrl,
      previewVideoId: data?.previewVideoId,
      imageUrl: data?.imageUrl,
      previewVideoName: data?.previewVideoName,
    };
    if (data?.previewVideoType === "HTML5(MP4)") {
      courseItem.media.localVideoUrl = data?.previewVideoUrl;
    }

    return courseItem;
  }
);
export const editCourse = createAsyncThunk("editCourse", async (params) => {
  const courseItem = {
    ...params.basic,
    ...params.media,
    ...params.price,
    sections: [...params.sections],
    id: params.id,
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
  const response = (await editCourseAPI(courseItem)).data;
  const data = response.data;
  return data;
});
