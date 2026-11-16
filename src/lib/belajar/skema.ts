/**
 * Skema data modul belajar baru (draf Tahap 1, menunggu persetujuan).
 * Murni tipe, tanpa React, tanpa impor dari src/lib/opsi2. Lihat docs/rancangan-k1b2-fresh.md.
 */

export type Status = "draf-perlu-review" | "disetujui";

/** Satu keterampilan = satu pelabuhan. */
export type Skill = {
  id: string; // mis. "k1b2-s6"
  nama: string;
  prasyarat: string[]; // id skill lain
  rentang: [number, number];
  rujukan: string; // CP/ATP atau penanda topik (bukan salinan judul buku)
  status: Status;
};

/** Kekeliruan nyata anak; dipakai untuk memetakan pengecoh. */
export type Miskonsepsi = {
  id: string; // mis. "m-hitung-dobel"
  skillId: string;
  deskripsi: string;
  bantuan: "petunjuk" | "contoh-ulang" | "kembali-ke-benda";
};

export type Pengecoh = { label: string; miskonsepsi: string };

/** Soal dibuat dari spesifikasi berparameter + benih, bukan ditulis tetap. */
export type SpesifikasiSoal = {
  skillId: string;
  bentuk: "benda" | "diagram" | "lambang";
  rentang: [number, number];
  pengecoh: string[]; // id miskonsepsi yang boleh dipakai
};

/** Satu-satunya status yang disimpan sebagai penguasaan (hasil cek pelabuhan, bukan latihan). */
export type StatusSkill = {
  skillId: string;
  kotak: 0 | 1 | 2 | 3 | 4 | 5; // kotak Leitner
  lulusTerakhir: string | null; // ISO tanggal
  jatuhTempo: string | null; // ISO tanggal
};

export const SELANG_ULANG_HARI = [1, 3, 7, 14, 30] as const;

/** Cek pelabuhan: 5 soal, tanpa petunjuk. Lulus bila benar minimal 4. */
export const CEK = { jumlahSoal: 5, minimalBenar: 4 } as const;

/** Catatan miskonsepsi untuk laporan guru/orang tua. Bukan skor mode belajar. */
export type CatatanCek = {
  skillId: string;
  tanggal: string;
  benar: number;
  miskonsepsiTerdeteksi: string[];
};

export function hitungJatuhTempo(kotak: StatusSkill["kotak"], dari: Date): Date {
  const hari = SELANG_ULANG_HARI[Math.min(kotak, SELANG_ULANG_HARI.length - 1)];
  return new Date(dari.getTime() + hari * 86400000);
}

export function lulusCek(benar: number): boolean {
  return benar >= CEK.minimalBenar;
}

/** Lulus naik satu kotak (maks 5); gagal kembali ke 0. */
export function kotakBerikut(kotak: StatusSkill["kotak"], lulus: boolean): StatusSkill["kotak"] {
  if (!lulus) return 0;
  return Math.min(5, kotak + 1) as StatusSkill["kotak"];
}
