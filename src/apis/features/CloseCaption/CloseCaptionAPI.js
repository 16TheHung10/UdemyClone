import { nonAuthenInstance } from "apis/apis";

export const getAllCloseCaption = () => {
  return nonAuthenInstance.get("/api/CloseCaption");
};
