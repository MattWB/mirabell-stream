export function getPublicAssetUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");

  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}
