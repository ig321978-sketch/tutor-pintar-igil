export type KodePhase = "FASE_A" | "FASE_B" | "FASE_C";

/** Memetakan teks kelas ("3 SD", "Kelas 3", "3") ke kode fase. Kelas di luar 1–6 menghasilkan null. */
export function faseDariKelas(kelas: string | number): KodePhase | null {
  const cocok = String(kelas).match(/[1-6]/);
  if (!cocok) return null;
  const angka = Number(cocok[0]);
  if (angka <= 2) return "FASE_A";
  if (angka <= 4) return "FASE_B";
  return "FASE_C";
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
