import { useCallback, useEffect, useState } from "react";

const TOKEN_STORAGE_KEY = "jwt";

function readToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export default function useAuth() {
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setToken(readToken());
    setInitializing(false);

    const handleStorage = (event) => {
      if (event.key === TOKEN_STORAGE_KEY) {
        setToken(readToken());
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const login = useCallback((nextToken) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
  }, []);

  return {
    token,
    isAuthenticated: Boolean(token),
    initializing,
    login,
    logout,
  };
}
