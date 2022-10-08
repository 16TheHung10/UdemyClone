import { instance, nonAuthenInstance } from "apis/apis";

export const getMyReport = () => {
    return instance.get(`/api/Report/MyReport`);
}

export const getAdminReport = () => {
    return instance.get(`/api/Report`);
}

export const updateAdminReport = (data) => {
    console.log(data);
    return instance.put(`/api/Report`,data);
}


export const postMyReport = (data) => {
    console.log(data);
    return instance.post(`/api/Report`,data);
}