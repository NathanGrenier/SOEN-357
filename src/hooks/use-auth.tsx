import { createContext, useContext, useState } from "react";
import { User } from "@/lib/types";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const initialState: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: () => null,
  logout: () => null,
};

const LOCAL_STORAGE_AUTH_KEY = import.meta.env.LOCAL_STORAGE_AUTH_KEY as string;

const AuthContext = createContext<AuthContextType>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Load from localStorage during initialization
    const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth) as AuthState;
      } catch (e) {
        console.error("Failed to parse auth data from localStorage", e);
      }
    }
    return { isAuthenticated: false, user: null };
  });

  // Login function to store user data
  const login = (userData: User) => {
    const newState = { isAuthenticated: true, user: userData };
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newState));
    setAuthState(newState);
  };

  // Logout function to clear data
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setAuthState({ isAuthenticated: false, user: null });
  };

  const value = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
