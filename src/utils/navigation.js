// Navigation utilities to prevent redirect loops
export const navigationUtils = {
  // Key for storing navigation attempts
  NAV_ATTEMPTS_KEY: "nav_attempts",

  // Maximum allowed navigation attempts before stopping
  MAX_ATTEMPTS: 3,

  // Reset navigation attempts
  resetAttempts: () => {
    localStorage.removeItem(navigationUtils.NAV_ATTEMPTS_KEY);
  },

  // Check if we should allow navigation (to prevent loops)
  canNavigate: (fromPath, toPath) => {
    const attempts = navigationUtils.getAttempts();
    const key = `${fromPath}->${toPath}`;

    if (attempts[key] && attempts[key] >= navigationUtils.MAX_ATTEMPTS) {
      console.warn(`Navigation loop detected: ${key}. Stopping navigation.`);
      return false;
    }

    return true;
  },

  // Record a navigation attempt
  recordAttempt: (fromPath, toPath) => {
    const attempts = navigationUtils.getAttempts();
    const key = `${fromPath}->${toPath}`;

    attempts[key] = (attempts[key] || 0) + 1;
    localStorage.setItem(
      navigationUtils.NAV_ATTEMPTS_KEY,
      JSON.stringify(attempts)
    );
  },

  // Get current navigation attempts
  getAttempts: () => {
    try {
      const stored = localStorage.getItem(navigationUtils.NAV_ATTEMPTS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  // Clear old attempts (call this periodically)
  clearOldAttempts: () => {
    localStorage.removeItem(navigationUtils.NAV_ATTEMPTS_KEY);
  },
};
