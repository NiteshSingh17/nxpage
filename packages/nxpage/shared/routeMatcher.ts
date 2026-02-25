export type RoutePattern = string | RegExp;

type RouteMatcherOptions = {
  includeRoutePatterns?: RoutePattern[];
  blockRoutePatterns?: RoutePattern[];
};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const globToRegExp = (pattern: string): RegExp => {
  const normalized = pattern.trim();
  const placeholder = "__DOUBLE_STAR__";
  const withPlaceholder = normalized.replace(/\*\*/g, placeholder);
  const escaped = escapeRegExp(withPlaceholder);
  const withSingleStar = escaped.replace(/\*/g, "[^/]*");
  const finalPattern = withSingleStar.replace(
    new RegExp(placeholder, "g"),
    ".*"
  );
  return new RegExp(`^${finalPattern}$`);
};
const normalizePattern = (pattern: string) =>
  pattern.startsWith("/") ? pattern : `/${pattern}`;

const matchesPattern = (routePath: string, pattern: RoutePattern) => {
  if (pattern instanceof RegExp) return pattern.test(routePath);
  return globToRegExp(normalizePattern(pattern)).test(routePath);
};

export const normalizeRoutePath = (input: string): string => {
  const withoutQuery = input.split("?")[0]?.split("#")[0] ?? "";
  if (!withoutQuery || withoutQuery === "/") return "/index";

  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const cleaned = withSlash.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return cleaned || "/index";
};

export const routePathFromBuildFile = (relativeHtmlPath: string): string => {
  const withoutExtension = relativeHtmlPath.replace(/\.html$/i, "");
  const withoutServerAppPrefix = withoutExtension
    .replace(/^server\/app\//, "")
    .replace(/^app\//, "");

  if (!withoutServerAppPrefix || withoutServerAppPrefix === "index") return "/index";
  return normalizeRoutePath(withoutServerAppPrefix);
};

export const shouldProcessRoute = (
  routePath: string,
  options: RouteMatcherOptions
): boolean => {
  const includePatterns = options.includeRoutePatterns ?? [];
  const blockPatterns = options.blockRoutePatterns ?? [];

  if (includePatterns.length > 0) {
    const included = includePatterns.some((pattern) => matchesPattern(routePath, pattern));
    if (!included) return false;
  }

  if (blockPatterns.length > 0) {
    const blocked = blockPatterns.some((pattern) => matchesPattern(routePath, pattern));
    if (blocked) return false;
  }

  return true;
};
