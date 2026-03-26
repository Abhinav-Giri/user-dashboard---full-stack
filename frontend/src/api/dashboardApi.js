import api from "./axios";

export const getItems = (token) =>
  api.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createItem = (data, token) =>
  api.post("/dashboard", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateItem = (id, data, token) =>
  api.put(`/dashboard/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteItem = (id, token) =>
  api.delete(`/dashboard/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });