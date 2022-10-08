import { instance } from "apis/apis";

export const AddToCart = (cart) => {
  return instance.post("/api/ShoppingCarts", cart);
};

export const GetCartItems = () => {
  return instance.get("/api/ShoppingCarts/MyCart");
}

export const UpdateCartItems = (courseIds) => {
  return instance.put("/api/ShoppingCarts", courseIds);
}
