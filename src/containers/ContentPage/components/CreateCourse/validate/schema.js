import * as yup from "yup";
export const schemaBasic = yup
  .object({
    title: yup
      .string()
      .max(100, "Maximum Characters")
      .required("Please Enter Course Title!"),
    description: yup.string().required("Please Enter Description Title!"),
    shortDescription: yup
      .string()
      .required("Please Enter Short Description Title!"),
    objective: yup.string().required("Please Enter Objective!"),
    requirements: yup.string().required("Please Enter Requirement Title!"),
    levelIds: yup
      .array()
      .min(1, "Course level field must have at least 1 item")
      .required("Please Enter Level Title!"),
    audioLanguageIds: yup
      .array()
      .min(1, "Audio Language field must have at least 1 item")
      .required("Please Enter Audio Language Title!"),
    closeCaptionIds: yup
      .array()
      .min(1, "Close Caption  field must have at least 1 item")
      .required("Please Enter Close Caption Title!"),
    categoryIds: yup
      .array()
      .min(1, "Category  field must have at least 1 item")
      .required("Please Enter Category Title!"),
  })
  .required();
export const schemaQuiz = yup
  .object({
    title: yup.string().required("Please Enter Quiz Title!"),
    description: yup.string().required("Please Enter Description Title!"),
    timeLimit: yup
      .number()
      .integer("Time Limit must be an integer!")
      .typeError("Time Limit must be a number!")
      .min(0, "Time Limit can't negative")
      .required("Please Enter Time Limit!"),
    passingScore: yup
      .number()
      .integer("Passing Score must be an integer!")
      .typeError("Passing Score must be a number!")
      .min(1, "Passing Score > 1")
      .max(100, "100% is maximum of Passing Score")
      .required("Please Enter Passing Score!"),
    questionsLimit: yup
      .number()
      .integer("Limit Question must be an integer")
      .typeError("Limit Question must be a number")
      .min(1, "Limit Question > 1")
      .max(100, "100% is maximum of Question Limit")
      .required("Please Enter Limit Question"),
    questions: yup.array().min(1, "Questions can't be empty"),
  })
  .required();
export const schemaLecture = yup
  .object({
    title: yup.string().required("Please Enter Lecture Title!"),
    description: yup.string().required("Please Enter Description!"),
    totalTime: yup
      .number()
      .typeError("Run Time must be a number")
      .min(1, "Please Enter Run Time")
      .required("Please Enter Run Time!"),
    videoUrl: yup.string().required("Please Upload File or Enter Video Url!"),
    videoPoster: yup.string().required("Please Upload or Capture Poster!"),
  })
  .required();
export const schemaAssignment = yup
  .object({
    title: yup.string().required("Please Enter Assignment Title!"),
    description: yup.string().required("Please Enter Description Title!"),
    duration: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .min(0, "Duration is not negative")
      .required("Please Enter Duration!"),
    totalNumber: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .min(1, "Total Number > 1")
      .max(100, "100 is maximum score")
      .required("Please Enter Total Number!"),
    minimumPassScore: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .min(1, "Total Number > 1")
      .max(100, "100 is maximum score")
      .max(yup.ref("totalNumber"), "Less than Total Number")
      .required("Please Enter Total Number!"),
    filesLimit: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .min(1, "Attachment Limit > 0")
      .required("Please Enter Attachment Limit!"),
    maxSizeLimit: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .min(0, "Max Size Limit > 0"),
    attachments: yup.array().min(1, "Attachments can't be empty"),
  })
  .required();
export const schemaQuestionLine = yup
  .object({
    title: yup.string().required("Please Enter Question Title!"),
    score: yup
      .number()
      .typeError("Must be a number")
      .min(0, "Score is positive number!")
      .required("Please Enter Section Score!"),
    imageUrl: yup.string().required("Image Required!"),
  })
  .required();
export const schemaQuestionChoice = yup
  .object({
    title: yup.string().required("Please Enter Question Title!"),
    score: yup
      .number()
      .typeError("Must be a number")
      .min(0, "Score is positive number!")
      .required("Please Enter Section Score!"),
    options: yup
      .array()
      .min(1, "Please Add Options!")
      .required("Please Add Options!"),
    imageUrl: yup.string().required("Image Required!"),
  })
  .required();
export const schemaMedia = yup
  .object({
    previewVideoUrl: yup
      .string()
      .required("Please Upload File or Enter Video Url!"),
    imageUrl: yup.string().required("Thumbnail is required!"),
  })
  .required();
export const schemaPrice = yup
  .object({
    price: yup
      .number()
      .min(0, "Price is positive number")
      .typeError("Must be a number"),
    salePrice: yup
      .number()
      .min(0, "Discount is positive number")
      .typeError("Must be a number")
      .max(
        yup.ref("price"),
        "Discount Price must equal or smaller than Regular Price"
      ),
  })
  .required();
