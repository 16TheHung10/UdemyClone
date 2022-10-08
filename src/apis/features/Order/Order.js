import { instance, nonAuthenInstance } from "apis/apis";

// get all order of web
export const getAllOrder = () => {
    return instance.get("/api/Order");
};