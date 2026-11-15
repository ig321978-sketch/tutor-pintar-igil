import { useSyncExternalStore } from "react";

// Pemilik memeriksa modul di komputernya sendiri: bebas kunci bila `next dev` atau halaman dibuka dari localhost.
// Di situs produksi (Vercel) kunci tetap aktif untuk siswa.
const ambil = () => {
  if (process.env.NODE_ENV === "development") return true;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
};
const langganan = () => () => {};

export function useBukaSemuaKunci(): boolean {
  return useSyncExternalStore(langganan, ambil, () => process.env.NODE_ENV === "development");
}
