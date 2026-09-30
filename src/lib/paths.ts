/**
 * Prefix for files in /public when the site is served from a sub-path
 * (GitHub Pages serves this repo at /powerhouseStudio). Empty everywhere else.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
