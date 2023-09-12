export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : process.env.NEXT_PUBLIC_BACKEND_URL;
