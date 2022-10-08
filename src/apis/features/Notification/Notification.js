import { instance } from "apis/apis";

export const getMyNotification = () => {
    return instance.get(`/api/Notification/user`);
}

export const deleteMyNotification = (id) => {
    return instance.delete(`/api/Notification/${id}`);
}

export const postNotification = (data) => {
    return instance.post(`/api/Notification`,data);
}
