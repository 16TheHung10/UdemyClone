import { instance, nonAuthenInstance } from "apis/apis";

export const getEnrollment = () => {
    return instance.get(`/api/Enrollment`);
}

export const getEnrollmentByCourseId = (id) => {
    return nonAuthenInstance.get(`/api/Enrollment/GetEnrollStudentsByCourse?id=${id}`);
}

export const postEnrollment = (data) => {
    return instance.post(`/api/Enrollment`, data);
}