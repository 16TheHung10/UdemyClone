import { nonAuthenInstance, instance } from "apis/apis";

export const getAllCategory = () => {
  return nonAuthenInstance.get("/api/Category");
};

export const getCategoryById = (id) => {
  return nonAuthenInstance.get(`/api/Category/${id}`);
};

export const postNewCategory = (data) => {
  return instance.post("/api/Category", data);
};

export const putCategory = (data) => {
  console.log(data);
  return instance.put("/api/Category", data);
};

export const deleteCategory = (idDelete) => {
  return instance.delete(`/api/Category/${idDelete}`);
};

export const getTopCategories = () => {
  return nonAuthenInstance.get(`/api/Category/GetTopCategory`);
}