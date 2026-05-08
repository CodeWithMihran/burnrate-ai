import axios from "axios";

const defaultApiBaseUrl = "http://localhost:5000/api";
const resolvedApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl;

const api = axios.create({
  baseURL: resolvedApiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiBaseUrl = () => resolvedApiBaseUrl.replace(/\/$/, "");

export const getShareBaseUrl = () => {
  const configuredShareBaseUrl = import.meta.env.VITE_SHARE_BASE_URL;

  if (configuredShareBaseUrl) {
    return configuredShareBaseUrl.replace(/\/$/, "");
  }

  return getApiBaseUrl().replace(/\/api$/, "");
};

export default api;
