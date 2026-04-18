import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const userInfo   = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const token      = adminToken || userInfo?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllFoods        = ()           => API.get("/foods");
export const createFood         = (formData)   => API.post("/foods", formData);
export const updateFood         = (id, data)   => API.put(`/foods/${id}`, data);
export const deleteFood         = (id)         => API.delete(`/foods/${id}`);
export const placeOrder         = (data)       => API.post("/orders", data);
export const getAllOrders        = ()           => API.get("/orders");
export const updateOrderStatus  = (id, status) => API.put(`/orders/${id}/status`, { status });
export const verifyDeliveryOTP  = (id, otp)    => API.post(`/orders/${id}/verify-otp`, { otp });
export const adminLogin         = (data)       => API.post("/auth/login", data);
export const registerUser       = (data)       => API.post("/users/register", data);
export const loginUser          = (data)       => API.post("/users/login", data);
export const submitFeedback     = (data)       => API.post("/feedback", data);
export const getAllFeedback      = ()           => API.get("/feedback");
export const markFeedbackRead   = (id)         => API.put(`/feedback/${id}`);