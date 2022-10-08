import { instance } from "apis/apis";

export const getAllFavorites = () => {
    return instance.get(`api/Favourite`);
}

export const addFavorite = (data) => {
    return instance.post(`/api/Favourite`, data);
}

export const removeFavorite = (id) => {
    return instance.delete(`/api/Favourite/${id}`);
}