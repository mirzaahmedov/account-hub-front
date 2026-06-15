import axios, { type InternalAxiosRequestConfig } from "axios";
import { emitter } from "./emitter";

const baseURL = import.meta.env.PROD ? "/api/v1" : "http://localhost:3001/api/v1";

const publicApi = axios.create({
  baseURL,
});

publicApi.interceptors.response.use((res) => res, errorHandler);

const privateApi = axios.create({
  baseURL,
});

privateApi.interceptors.request.use(requestHandler);
privateApi.interceptors.response.use((res) => res, errorHandler);

function requestHandler(config: InternalAxiosRequestConfig<unknown>) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

function errorHandler(error: any) {
  if (axios.isAxiosError(error)) {
    const statusCode = error?.response?.status;
    const message = error?.response?.data?.message ?? "An error occurred";
    const reason = error?.response?.data?.reason;

    if (statusCode === 403 && reason === "Unverified") {
      emitter.emit("auth:verify-email");
      return;
    }

    return Promise.reject(new Error(message));
  } else if (error instanceof Error) {
    return Promise.reject(error);
  } else {
    return Promise.reject(new Error(error as any));
  }
}

export { publicApi, privateApi };
