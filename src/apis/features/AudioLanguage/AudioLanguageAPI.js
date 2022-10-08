import { nonAuthenInstance } from "apis/apis";

export const getAllAudioLanguage = () => {
  return nonAuthenInstance.get("/api/AudioLanguage");
};
