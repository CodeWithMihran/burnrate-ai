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

export const getOgImageUrl = () => {
  if (typeof window !== "undefined") {
    return new URL("/og-share-preview.png", window.location.origin).toString();
  }

  const configuredFrontendAppUrl = import.meta.env.VITE_FRONTEND_APP_URL;

  if (configuredFrontendAppUrl) {
    return `${configuredFrontendAppUrl.replace(/\/$/, "")}/og-share-preview.png`;
  }

  return "/og-share-preview.png";
};

export default api;
