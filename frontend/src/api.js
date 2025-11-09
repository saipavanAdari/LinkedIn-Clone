import axios from "axios";

const API = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  baseURL: "https://linkedin-clone1-vr3g.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if present
API.interceptors.request.use(
  (config) => {
    const stored = sessionStorage.getItem("auth");
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {}
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Auth
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Posts
export const createPost = (data) => API.post("/posts", data);
export const getAllPosts = (params = {}) => API.get("/posts", { params });
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.post(`/posts/${id}/like`);
export const commentPost = (id, comment) =>
  API.post(`/posts/${id}/comment`, { text: comment });

export default API;
