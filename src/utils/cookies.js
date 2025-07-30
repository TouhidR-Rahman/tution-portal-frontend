// Cookie utilities for handling JWT tokens
export const cookieUtils = {
  // Get cookie value by name
  getCookie: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  },

  // Set cookie
  setCookie: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=none`;
  },

  // Delete cookie
  deleteCookie: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  // Extract JWT token from cookies
  getTokenFromCookies: () => {
    // Try common JWT cookie names
    const possibleNames = ["token", "jwt", "authToken", "access_token"];

    for (const name of possibleNames) {
      const token = cookieUtils.getCookie(name);
      if (token) {
        return token;
      }
    }

    return null;
  },
};
