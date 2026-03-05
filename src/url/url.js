const PROD_API_URL = "https://animexbackend.onrender.com";
const DEV_API_URL = "http://localhost:5000";

export const serverUrl = (
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL)
).replace(/\/+$/, "");
