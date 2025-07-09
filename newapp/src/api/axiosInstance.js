import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: "a1bd5a1de5b5482a930e07e22c04d212",
  },
});

export default axiosInstance;
