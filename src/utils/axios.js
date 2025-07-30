import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://tution-portal-backend.vercel.app";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Always send cookies
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to include Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage or sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 errors
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
