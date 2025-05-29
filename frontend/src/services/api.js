import axios from "axios";

// Creating an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: "https://ghumne-chalein-bckend.onrender.com",
  // baseURL: "http://172.20.10.3:5002",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding a request interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
