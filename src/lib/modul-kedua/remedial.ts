import { AMBANG_TUNTAS } from "./penguasaan";

/** Aturan remedial: skor tahap di bawah 80 -> penjelasan ulang + soal lebih mudah; maksimal 2 putaran. */
export const PUTARAN_REMEDIAL_MAKS = 2;

export function perluRemedial(indeksTahap: number): boolean {
  return indeksTahap < AMBANG_TUNTAS;
}

/**
 * Siswa boleh lanjut jika tuntas, atau sudah menjalani putaran remedial maksimal
 * (supaya tidak terjebak; tahap itu ditandai "belum tuntas" di data).
 */
export function bolehLanjut(indeksTahap: number, putaranRemedial: number): { lanjut: boolean; tuntas: boolean } {
  const tuntas = !perluRemedial(indeksTahap);
  return { lanjut: tuntas || putaranRemedial >= PUTARAN_REMEDIAL_MAKS, tuntas };
}
