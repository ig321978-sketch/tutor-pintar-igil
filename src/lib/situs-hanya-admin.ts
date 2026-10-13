/** Pilot publik: hanya Matematika kelas 1–6 SD. Admin tetap membuka seluruh situs. */
export function situsHanyaAdmin(): boolean {
  return true;
}

export const KELAS_PILOT_SD = ["1 SD", "2 SD", "3 SD", "4 SD", "5 SD", "6 SD"] as const;
export const KELAS_TERBUKA_PUBLIK = "1 SD";
export const MAPEL_TERBUKA_PUBLIK = "Matematika";

export const PESAN_MATERI_TERKUNCI_PUBLIK =
  "Untuk publik, saat ini hanya modul Matematika kelas 1 sampai 6 SD yang dapat dibuka.";

export function daftarMapelTerbukaPublik(): string[] {
  return [MAPEL_TERBUKA_PUBLIK];
}

export function adalahKelasPilotSd(kelas: string): boolean {
  const k = kelas.trim().toLowerCase().replace(/\s+/g, " ");
  return /^(?:kelas\s+)?[1-6](?:\s+sd)?$/.test(k);
}

export function adalahKelasTerbukaPublik(kelas: string): boolean {
  return adalahKelasPilotSd(kelas);
}

export function adalahMapelMatematika(mapel: string): boolean {
  const n = mapel
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\s+/g, " ");
  return n === "matematika" || n === "mtk" || n === "math" || n === "mathematics";
}

export function adalahMapelTerbukaPublik(mapel: string): boolean {
  return adalahMapelMatematika(mapel);
}

export function adalahPilotMatematikaSd(kelas: string, mapel: string): boolean {
  return adalahKelasPilotSd(kelas) && adalahMapelMatematika(mapel);
}

export function materiTerbukaUntukPublik(kelas: string, mapel: string): boolean {
  return adalahPilotMatematikaSd(kelas, mapel);
}

export function ruteAsetIkonPublik(pathname: string): boolean {
  return (
    pathname === "/manifest.webmanifest" ||
    pathname === "/manifest" ||
    pathname === "/icon" ||
    pathname.startsWith("/icon/") ||
    pathname === "/apple-icon" ||
    pathname.startsWith("/apple-icon/")
  );
}

export function ruteHalamanPublikSaatTerkunci(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/tutor" ||
    pathname.startsWith("/tutor/") ||
    pathname === "/ruang-belajar" ||
    pathname.startsWith("/ruang-belajar/") ||
    ruteAsetIkonPublik(pathname)
  );
}

export function ruteApiPublikSaatTerkunci(pathname: string): boolean {
  return (
    pathname === "/api/tutor" ||
    pathname.startsWith("/api/tutor/") ||
    pathname === "/api/modul" ||
    pathname.startsWith("/api/modul/") ||
    pathname === "/api/kuis-tulis" ||
    pathname === "/api/tts"
  );
}
