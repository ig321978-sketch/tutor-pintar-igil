export type KodePhase = "FASE_A" | "FASE_B" | "FASE_C";

export const LABEL_FASE: Record<KodePhase, string> = {
  FASE_A: "Fase A (Kelas 1–2 SD)",
  FASE_B: "Fase B (Kelas 3–4 SD)",
  FASE_C: "Fase C (Kelas 5–6 SD)",
};

/** Kelas SD yang boleh dibuka di dalam satu fase (lintas-kelas dalam fase diizinkan). */
export function kelasDalamFase(fase: KodePhase): readonly number[] {
  if (fase === "FASE_A") return [1, 2];
  if (fase === "FASE_B") return [3, 4];
  return [5, 6];
}

/** Memetakan teks kelas ("3 SD", "Kelas 3", "3") ke kode fase. Kelas di luar 1–6 menghasilkan null. */
export function faseDariKelas(kelas: string | number): KodePhase | null {
  const cocok = String(kelas).match(/[1-6]/);
  if (!cocok) return null;
  const angka = Number(cocok[0]);
  if (angka <= 2) return "FASE_A";
  if (angka <= 4) return "FASE_B";
  return "FASE_C";
}

/** Ambil nomor kelas dari slug modul (`mtk-4-bab5` → 4, `mtk-1-blok1` → 1). */
export function kelasDariSlugBab(slug: string): number | null {
  const cocok = slug.match(/^mtk-([1-6])(?:-|$)/i);
  if (!cocok) return null;
  return Number(cocok[1]);
}

/** Fase modul dari slug bab Ruang Belajar. */
export function faseDariSlugBab(slug: string): KodePhase | null {
  const kelas = kelasDariSlugBab(slug);
  return kelas === null ? null : faseDariKelas(kelas);
}

/** True jika fase siswa cocok dengan fase modul (atau modul belum punya fase). */
export function bolehAksesFase(
  faseSiswa: KodePhase | string | null | undefined,
  faseModul: KodePhase | string | null | undefined,
): boolean {
  if (!faseModul) return true;
  if (!faseSiswa) return false;
  return faseSiswa === faseModul;
}

/** Rentang awalan NISN yang diterima per fase (Bagian 6 .cursorrules). Hanya untuk pengecekan awal di formulir. */
export const AWALAN_NISN_PER_FASE: Record<KodePhase, readonly [number, number]> = {
  FASE_A: [18, 20],
  FASE_B: [16, 18],
  FASE_C: [14, 16],
};

/** Cek format NISN dan awalannya terhadap fase kelas. Nomor tidak disimpan di mana pun. */
export function nisnCocokFase(nisn: string, fase: KodePhase): boolean {
  if (!/^\d{10}$/.test(nisn)) return false;
  const awalan = Number(nisn.slice(0, 3));
  const [bawah, atas] = AWALAN_NISN_PER_FASE[fase];
  return awalan >= bawah && awalan <= atas;
}
