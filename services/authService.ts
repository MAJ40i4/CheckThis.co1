
import { UserState, PlanTier } from "../types";

// Simulation of a backend User DB
const MOCK_DB_DELAY = 800;
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 Days

const DEFAULT_USER_STATS = {
  trustScore: 0.5,
  free_receipt_scans: 3, // ONBOARDING RULE: 3 Free Scans
  scanCredits: 0,
  pricePoints: 0,
  accountAgeDays: 1,
  scanHistory: {
    total: 0,
    accepted: 0,
    rejected: 0,
    fraud: 0
  }
};

const createNewGuestSession = (): UserState => ({
  isLoggedIn: false,
  plan: 'FREE',
  role: 'user',
  sessionExpiry: Date.now() + SESSION_DURATION_MS,
  ...DEFAULT_USER_STATS
});

export const authService = {
  
  // Initialize from LocalStorage with Sliding Expiration
  initSession: (): UserState => {
    try {
      const stored = localStorage.getItem('checkthis_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        const now = Date.now();

        // Check if session has explicitly expired
        if (parsed.sessionExpiry && now > parsed.sessionExpiry) {
           console.warn("Session expired, resetting to guest.");
           localStorage.removeItem('checkthis_user');
           return createNewGuestSession();
        }

        // SLIDING WINDOW: Refresh session expiry if valid
        // Migration support: if no expiry exists, give it a fresh one
        const refreshedUser = {
            ...DEFAULT_USER_STATS, // Ensure new fields exist
            ...parsed,
            sessionExpiry: now + SESSION_DURATION_MS
        };

        // Update storage with refreshed timestamp
        localStorage.setItem('checkthis_user', JSON.stringify(refreshedUser));
        return refreshedUser;
      }
    } catch (e) {
      console.error("Session restore failed", e);
    }
    
    // No session found, create durable guest session
    const guest = createNewGuestSession();
    localStorage.setItem('checkthis_user', JSON.stringify(guest));
    return guest;
  },

  // Save Session
  persistSession: (user: UserState) => {
    // Ensure we preserve or update the expiry
    const userWithExpiry = {
        ...user,
        sessionExpiry: user.sessionExpiry || (Date.now() + SESSION_DURATION_MS)
    };
    localStorage.setItem('checkthis_user', JSON.stringify(userWithExpiry));
  },

  clearSession: () => {
    localStorage.removeItem('checkthis_user');
    // Immediately re-initialize a fresh guest session so app state doesn't crash
    const guest = createNewGuestSession();
    localStorage.setItem('checkthis_user', JSON.stringify(guest));
  },

  // Login Logic
  login: async (email: string, password?: string): Promise<UserState> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DB_DELAY));

    const sessionExpiry = Date.now() + SESSION_DURATION_MS;

    // ADMIN RULE: Master Account
    if (email.toLowerCase() === 'admin@checkthis.co') {
      if (password && password !== 'admin') throw new Error("Invalid password");
      return {
        isLoggedIn: true,
        email: email,
        name: 'Admin User',
        plan: 'PRO',
        role: 'admin',
        authProvider: 'email',
        sessionExpiry,
        ...DEFAULT_USER_STATS,
        trustScore: 1.0, 
        free_receipt_scans: 9999,
        scanCredits: 9999
      };
    }

    // TEST USER RULE
    if (email.toLowerCase().includes('test')) {
      return {
        isLoggedIn: true,
        email: email,
        name: 'Test User',
        plan: 'FREE', 
        role: 'user',
        authProvider: 'email',
        sessionExpiry,
        ...DEFAULT_USER_STATS
      };
    }

    // Regular User Simulation
    return {
      isLoggedIn: true,
      email: email,
      name: email.split('@')[0],
      plan: 'FREE',
      role: 'user',
      authProvider: 'email',
      sessionExpiry,
      ...DEFAULT_USER_STATS
    };
  },

  // Social Login Simulation
  socialLogin: async (provider: 'google' | 'apple'): Promise<UserState> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DB_DELAY));
    return {
      isLoggedIn: true,
      email: `user_${provider}@example.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      plan: 'FREE',
      role: 'user',
      authProvider: provider,
      sessionExpiry: Date.now() + SESSION_DURATION_MS,
      ...DEFAULT_USER_STATS
    };
  }
};
