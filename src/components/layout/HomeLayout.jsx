"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import useAuth from "@/hooks/useAuth/useAuth";
import Sidebar from "../navbar/Sidebar";
import styles from "./HomeLayout.module.scss";

function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = routing.locales.includes(maybeLocale);
  const normalized = hasLocale ? `/${segments.slice(1).join("/")}` : pathname;

  if (normalized.endsWith("/") && normalized !== "/") {
    return normalized.slice(0, -1);
  }

  return normalized || "/";
}

export default function HomeLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, initializing } = useAuth();

  const normalizedPath = useMemo(
    () => normalizePathname(pathname),
    [pathname]
  );
  const isAuthRoute = normalizedPath.startsWith("/auth");

  useEffect(() => {
    if (initializing) {
      return;
    }

    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/auth/sign-in");
    }

    if (isAuthenticated && isAuthRoute) {
      router.replace("/");
    }
  }, [initializing, isAuthenticated, isAuthRoute, router]);

  return (
    <div className={styles.layout}>
      {!isAuthRoute && <Sidebar />}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
