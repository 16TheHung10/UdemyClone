import { instance } from "apis/apis";

export const getSubscription = () => {
    return instance.get(`/api/Subscription`);
}

export const getMySubscription = () => {
    return instance.get(`/api/Subscription/user`);
}

export const getAllSubscriberForUser = (id) => {
    return instance.get(`/api/Subscription/GetAllSubcriberForUser?UserId=${id}`);
}

export const postSubscription = (data) => {
    return instance.post(`/api/Subscription`, data);
}

export const deleteSubscription = (userId) => {
    return instance.delete(`/api/Subscription/${userId}`);
}