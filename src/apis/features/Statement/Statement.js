import { instance } from "apis/apis";

export const getAllPurchaseCourse = () => {
  return instance.get(`/api/User/purchased`);
};
