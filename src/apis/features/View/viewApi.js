import { instance, nonAuthenInstance } from "apis/apis";

export const updateView = (id) => {
    return nonAuthenInstance.put(`/api/Course/updateView/${id}`);
};