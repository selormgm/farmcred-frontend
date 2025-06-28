"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserInfo,
  getUserRole,
  isAuthenticated,
  logout,
} from "@/lib/services/authService";

interface AuthContextType {
  user: any;
  userRole: string | null;
  isAuth: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isAuth: false,
  loading: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = () => {
    try {
      const authenticated = isAuthenticated();
      const userInfo = getUserInfo();
      const role = getUserRole();

      if (authenticated && userInfo) {
        setIsAuth(true);
        setUser(userInfo);
        setUserRole(role);
      } else {
        setIsAuth(false);
        setUser(null);
        setUserRole(null);

        const currentPath = window.location.pathname;
        if (
          !currentPath.startsWith("/login") &&
          !currentPath.startsWith("/signup")
        ) {
          console.log(
            "Not authenticated, redirecting to login from AuthContext"
          );
          router.replace("/login");
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuth(false);
      setUser(null);
      setUserRole(null);

      const currentPath = window.location.pathname;
      if (
        !currentPath.startsWith("/login") &&
        !currentPath.startsWith("/signup")
      ) {
        console.log("Auth check error, redirecting to login");
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    setUserRole(null);
    router.replace("/login");
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "access_token" ||
        e.key === "user_info" ||
        e.key === "refresh_token"
      ) {
        console.log("Storage changed, rechecking auth");
        checkAuth();
      }
    };

    const handleWindowFocus = () => {
      checkAuth();
    };

    // Listen for custom logout events
    const handleForceLogout = () => {
      console.log("Force logout event received");
      handleLogout();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("forceLogout", handleForceLogout);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("forceLogout", handleForceLogout);
    };
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, userRole, isAuth, loading, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
