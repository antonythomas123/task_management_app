import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const signup = (data) => API.post("/auth/signup", data);


export const signin = (data) => API.post("/auth/login", data);

export const getTasks = (params) => API.get("/tasks", { params });
export const getTaskById = (id) => API.get(`/tasks/${id}`);
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
