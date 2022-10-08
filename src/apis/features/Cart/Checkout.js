import { instance } from "apis/apis";

export const Checkout = (cart) => {
    return instance.post("/api/Checkout", cart);
};

export const CheckoutSuccess = (token) => {
    return instance.get(`/api/Checkout/CheckoutSuccess${token}`);
};