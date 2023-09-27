export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "http://45.8.96.218:8080"
    : "http://localhost:8080";
