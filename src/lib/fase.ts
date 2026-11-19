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

/** NISN opsional. Bila diisi, harus 10 angka. Awalan NISN tidak menandakan kelas, jadi tidak dicocokkan. */
export function nisnFormatBenar(nisn: string): boolean {
  return /^[0-9]{10}$/.test(nisn);
}
