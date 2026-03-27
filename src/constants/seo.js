export const SITE_URL = "https://rabyeol-web.pages.dev";
export const SITE_NAME = "라별커뮤니케이션즈";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo3.png`;

export function buildAbsoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
