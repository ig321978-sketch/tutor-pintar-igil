export function situsHanyaAdmin(): boolean {
  if (process.env.NODE_ENV === "development") return false;
  const nilai =
    process.env.SITUS_HANYA_ADMIN ??
    process.env.NEXT_PUBLIC_SITUS_HANYA_ADMIN ??
    "1";
  return nilai !== "0" && nilai.toLowerCase() !== "false";
}
