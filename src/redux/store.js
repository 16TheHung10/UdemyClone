import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "redux/features/auth/AuthSlices";
import { audioLanguageReducer } from "./features/audioLanguage/AudioLanguageSlice";
import { CategoryReducer } from "./features/category/CategorySlice";
import { closeCaptionReducer } from "./features/closeCaption/CloseCaption";
//reducer
import { CartReducer } from "./features/cart/CartSlice";
import { CoursesReducer } from "./features/courses/coursesSlice";
import { createCourseReducer } from "./features/create-course/CreateCourseSlice";
import { DownloadCoursesReducer } from "./features/downloadCourseView/DownloadCourseSlice";
import { editCourseReducer } from "./features/edit-course/EditCourseSlice";
import { InstructorReducer } from "./features/instructor/instructorSlice";
import { LoadingReducer } from "./features/loading/LoadingSlices";
import { ReviewReducer } from "./features/review/reviewSlice";
import { sideBarReducer } from "./features/sidebar/sidebarSlice";
import { StudentReducer } from "./features/student/studentSlice";
import { subscriptionReducer } from "./features/subscription/subscriptionSlice";
import { wishlistReducer } from "./features/wishlist/WishlistSlice";
import { notificationReducer } from "./features/notification/notificationSlice";



const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "WA29HXHSvL",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ["createCourse", "auth"],
};
//reducer

const reducers = combineReducers({
  ///black-list
  cart: CartReducer,
  student: StudentReducer,
  instructor: InstructorReducer,
  courses: CoursesReducer,
  editCourse: editCourseReducer,
  loading: LoadingReducer,
  category: CategoryReducer,
  sidebarPage: sideBarReducer,
  audioLanguage: audioLanguageReducer,
  closeCaption: closeCaptionReducer,
  subscription: subscriptionReducer,
  wishlist: wishlistReducer,
  dowloadCourse: DownloadCoursesReducer,
  review: ReviewReducer,
  ///white-list
  createCourse: createCourseReducer,
  auth: AuthReducer,
  notification:notificationReducer
});

const appReducer = persistReducer(persistConfig, reducers);

const rootReducer = (state, action) => {
  if (action?.type === "auth/logout") {
    storage.removeItem("persist:root");
    state = {};
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
