export function formatShowtime(time: string | undefined): string {
  if (!time) return "";
  return decodeURIComponent(time).replace("-", ":");
}