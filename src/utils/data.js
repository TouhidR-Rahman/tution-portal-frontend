// Use environment variable or fallback to production URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://tution-portal-backend.vercel.app";

export const USER_API_ENDPOINT = `${API_BASE_URL}/api/user`;
export const TUTOR_OPPORTUNITY_API_ENDPOINT = `${API_BASE_URL}/api/tutor-opportunity`;
export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/api/application`;
export const TUTION_CENTER_API_ENDPOINT = `${API_BASE_URL}/api/tution-center`;
export const RATING_API_ENDPOINT = `${API_BASE_URL}/api/v1/rating`;
