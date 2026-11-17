import { useSyncExternalStore } from "react";

/**
 * Mode periksa pemilik: semua kunci tahap, Latihan, dan Ujian-per-bab dibuka tanpa menyelesaikan tahap sebelumnya.
 * Aktif bila (1) `next dev` atau halaman dibuka dari localhost, atau (2) pengguna yang masuk berperan ADMIN (juga di situs produksi).
 * Siswa biasa tidak pernah terkena: kunci tetap aktif untuk mereka. Aturan murni di `bukaSemuaKunciDari` (diuji: scripts/uji-buka-kunci.mjs).
 */

export function bukaSemuaKunciDari(opsi: { dev: boolean; host: string; admin: boolean }): boolean {
  const lokal = opsi.host === "localhost" || opsi.host === "127.0.0.1" || opsi.host === "[::1]";
  return opsi.dev || lokal || opsi.admin;
}

const dev = () => process.env.NODE_ENV === "development";

/* ------------------------------ Peran admin: satu kali baca per muat halaman, dibagi ke semua pemakai hook ------------------------------ */
let admin = false;
let sudahMinta = false;
const pendengar = new Set<() => void>();

function mintaPeran(): void {
  if (sudahMinta || typeof window === "undefined") return;
  sudahMinta = true;
  void fetch("/api/auth/saya", { cache: "no-store" })
    .then((r) => r.json() as Promise<{ masuk?: boolean; adalahAdmin?: boolean }>)
    .then((j) => {
      // Keputusan peran dari server (sesi + tabel peran), bukan dari penyimpanan di perangkat.
      admin = j.masuk === true && j.adalahAdmin === true;
    })
    .catch(() => {
      admin = false;
    })
    .finally(() => pendengar.forEach((f) => f()));
}

function langganan(kabar: () => void): () => void {
  pendengar.add(kabar);
  mintaPeran();
  return () => {
    pendengar.delete(kabar);
  };
}

const ambil = () => bukaSemuaKunciDari({ dev: dev(), host: window.location.hostname, admin });

export function useBukaSemuaKunci(): boolean {
  return useSyncExternalStore(langganan, ambil, dev);
}
