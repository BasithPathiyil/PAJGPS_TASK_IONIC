import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://connect.paj-gps.de/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
