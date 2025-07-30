// Authentication utilities for handling tokens
import { cookieUtils } from "./cookies";

export const auth = {
  // Get token from storage or cookies
  getToken: () => {
    // First check localStorage and sessionStorage
    const storageToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storageToken) {
      return storageToken;
    }

    // Fallback to cookies
    return cookieUtils.getTokenFromCookies();
  },

  // Set token in storage
  setToken: (token, remember = false) => {
    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  },

  // Remove token from storage
  removeToken: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!auth.getToken();
  },

  // Get authorization headers
  getAuthHeaders: () => {
    const token = auth.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// Create authenticated request config
export const createAuthConfig = (additionalConfig = {}) => {
  return {
    withCredentials: true, // Send cookies
    headers: {
      ...auth.getAuthHeaders(), // Add Bearer token
      ...additionalConfig.headers,
    },
    ...additionalConfig,
  };
};
