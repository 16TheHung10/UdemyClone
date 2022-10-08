import { instance, nonAuthenInstance } from "apis/apis";

export const getAllInstructors = () => {
    return nonAuthenInstance.get("/api/User/role/Instructor");
};

export const deleteInstructor = (id) => {
    return instance.delete(`/api/Course/${id}`);
};

export const getInstructorById = (id) => {
    return nonAuthenInstance.get(`/api/User/${id}`);
}

export const getInstructorByKeyWord = (data) => {
    return nonAuthenInstance.get(`api/User/SearchUser?KeyWord=${data}`);
}