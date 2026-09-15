/** Mode terbatas: publik hanya boleh modul yang sudah terbit. Admin tetap membuka seluruh situs. */
export function situsHanyaAdmin(): boolean {
  return true;
}

export const KELAS_TERBUKA_PUBLIK = "1 SD";
export const MAPEL_TERBUKA_PUBLIK =
  "Pendidikan Agama Islam dan Budi Pekerti";
export const MAPEL_TERBUKA_PUBLIK_LAIN = [
  "Matematika",
  "Pendidikan Pancasila",
] as const;

export const PESAN_MATERI_TERKUNCI_PUBLIK =
  "Untuk publik, saat ini hanya materi yang sudah terbit yang dapat dibuka.";

export function daftarMapelTerbukaPublik(): string[] {
  return [MAPEL_TERBUKA_PUBLIK, ...MAPEL_TERBUKA_PUBLIK_LAIN];
}

export function adalahKelasTerbukaPublik(kelas: string): boolean {
  const k = kelas.trim();
  return /^1\s*SD\b/i.test(k) || /^kelas\s*1(\s+SD)?\b/i.test(k);
}

export function adalahMapelPaiTerbuka(mapel: string): boolean {
  const n = mapel
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’‘ʻ`´]/g, "'")
    .replace(/\s+/g, " ");
  return (
    n === "pai" ||
    n === "agama islam" ||
    n === "pendidikan agama islam" ||
    n === "pendidikan agama islam dan budi pekerti" ||
    n === "pendidikan agama dan budi pekerti"
  );
}

export function adalahMapelTerbukaPublik(mapel: string): boolean {
  const n = mapel
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’‘ʻ`´]/g, "'")
    .replace(/\s+/g, " ");
  return (
    adalahMapelPaiTerbuka(mapel) ||
    n === "matematika" ||
    n === "pendidikan pancasila" ||
    n === "ppkn" ||
    n === "pkn"
  );
}

export function materiTerbukaUntukPublik(kelas: string, mapel: string): boolean {
  return adalahKelasTerbukaPublik(kelas) && adalahMapelTerbukaPublik(mapel);
}

export function ruteHalamanPublikSaatTerkunci(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/tutor" ||
    pathname.startsWith("/tutor/") ||
    pathname === "/ruang-belajar" ||
    pathname.startsWith("/ruang-belajar/")
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
