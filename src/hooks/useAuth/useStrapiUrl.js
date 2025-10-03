import { useMemo } from "react";

const DEFAULT_STRAPI_URL = "http://localhost:1337";

function sanitizeBaseUrl(url) {
  if (!url) {
    return DEFAULT_STRAPI_URL;
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getStrapiBaseUrl() {
  return sanitizeBaseUrl(process.env.NEXT_PUBLIC_STRAPI_URL);
}

export default function useStrapiUrl() {
  return useMemo(() => getStrapiBaseUrl(), []);
}

export function buildStrapiUrl(path = "") {
  const baseUrl = getStrapiBaseUrl();

  if (!path) {
    return baseUrl;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
