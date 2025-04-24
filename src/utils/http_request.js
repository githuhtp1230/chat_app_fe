import axios from "axios";
import { cookieUtils } from "./cookie_util";
import SECURITY from "../constants/security";

const httpRequest = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpRequest.interceptors.request.use((config) => {
  const token = cookieUtils.getStorage(SECURITY.KEY_ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handlerRequest = (promise) => {
  return promise
    .then((data) => {
      return [undefined, data.data];
    })
    .catch((err) => [err, undefined]);
};

export default httpRequest;
