export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.BACKEND_URL;
