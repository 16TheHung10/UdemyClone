import { instance, nonAuthenInstance } from "apis/apis";

export const getAllStudent = () => {
    return nonAuthenInstance.get("/api/User/role/Student");
};

export const deleteStudent = (id) => {
    return instance.delete(`/api/Course/${id}`);
};

export const getStudentById = (id) => {
    return nonAuthenInstance.get(`/api/User/${id}`);
}

export const getStudentByKeyWord = (data) => {
    return nonAuthenInstance.get(`api/User/SearchUser?KeyWord=${data}`);
}