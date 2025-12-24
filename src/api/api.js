import axios from "axios";
const baseURL = ["https://ojus-sport26.onrender.com/", "http://127.0.0.1:8000/", "https://34.180.73.149/", "https://publication-factor-relax-advertiser.trycloudflare.com"];
const axiosInstance = axios.create({
  baseURL: baseURL[3],
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
