import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: `${getBaseUrl()}/api/axios`, // Your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add other default headers as needed
  },
});

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  },
);

export const api = axiosInstance;
