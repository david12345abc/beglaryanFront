import axios from "axios";
import i18n from "./i18n";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const MEDIA_BASE = API_URL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const lang = i18n.language || localStorage.getItem("lang") || "hy";
  config.params = { ...(config.params || {}), lang };
  config.headers = { ...(config.headers || {}), "Accept-Language": lang };
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        original._retry = true;
        try {
          const r = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
          localStorage.setItem("access", r.data.access);
          original.headers.Authorization = `Bearer ${r.data.access}`;
          return api(original);
        } catch (e) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      }
    }
    return Promise.reject(error);
  }
);

// ---------- Публичный API ----------
export const fetchSettings = () => api.get("/public/settings/").then((r) => r.data);
export const fetchMenu = () => api.get("/public/menu/").then((r) => r.data);
export const fetchPage = (slug) => api.get(`/public/pages/${slug}/`).then((r) => r.data);
export const fetchServices = () => api.get("/public/services/").then((r) => r.data);
export const fetchNews = () => api.get("/public/news/").then((r) => r.data);
export const fetchReviews = () => api.get("/public/reviews/").then((r) => r.data);

// ---------- Auth ----------
export const login = (username, password) =>
  axios.post(`${API_URL}/auth/login/`, { username, password }).then((r) => r.data);
export const me = () => api.get("/auth/me/").then((r) => r.data);

// ---------- Админский API ----------
export const adminList = (resource) => api.get(`/admin/${resource}/`).then((r) => r.data);
export const adminCreate = (resource, data) => {
  const isFormData = data instanceof FormData;
  return api.post(`/admin/${resource}/`, data, isFormData ? {
    headers: { "Content-Type": "multipart/form-data" },
  } : {}).then((r) => r.data);
};
export const adminUpdate = (resource, id, data) => {
  const isFormData = data instanceof FormData;
  return api.patch(`/admin/${resource}/${id}/`, data, isFormData ? {
    headers: { "Content-Type": "multipart/form-data" },
  } : {}).then((r) => r.data);
};
export const adminDelete = (resource, id) =>
  api.delete(`/admin/${resource}/${id}/`).then((r) => r.data);

export const adminSettings = () => api.get("/admin/settings/").then((r) => r.data);
export const adminSettingsUpdate = (data) => {
  const isFormData = data instanceof FormData;
  return api.patch("/admin/settings/", data, isFormData ? {
    headers: { "Content-Type": "multipart/form-data" },
  } : {}).then((r) => r.data);
};

export default api;
