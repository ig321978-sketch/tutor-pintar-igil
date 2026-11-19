/**
 * Data Simulasi (Meja Catat) Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra", awal cerita Pentas Seni Sekolah.
 * Mind-map dan Infografis memakai data kartu (data-kartu.ts). Simulasi memakai benda panggung lain dari Story (lampu, kursi lipat, kabel, mikrofon) dan banyak benda lain
 * (tujuh, lima, tiga, lima), serta data jawaban sendiri tentang warna kostum (empat, tiga, dua). Diuji: scripts/uji-turus-k2b8a.mjs.
 */
export type BendaSim = { id: string; nama: string; emoji: string; banyak: number };
/** Empat jenis benda panggung yang bercampur di tumpukan. Kursi lipat dan mikrofon sama banyak; lampu paling banyak; kabel paling sedikit. */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "lampu", nama: "lampu", emoji: "\u{1F4A1}", banyak: 7 },
  { id: "kursi", nama: "kursi lipat", emoji: "\u{1FA91}", banyak: 5 },
  { id: "kabel", nama: "kabel", emoji: "\u{1F50C}", banyak: 3 },
  { id: "mikrofon", nama: "mikrofon", emoji: "\u{1F3A4}", banyak: 5 },
];
/** Tiga pilihan lebihnya (lampu dari kabel): satu yang tepat. */
export const PILIHAN_LEBIH: readonly number[] = [3, 4, 5];

/** Mengumpulkan data sendiri: sembilan anak menjawab warna kostum yang paling disukai. */
export type WarnaData = { id: string; nama: string; emoji: string };
export const WARNA_DATA: readonly WarnaData[] = [
  { id: "merah", nama: "merah", emoji: "\u{1F7E5}" },
  { id: "biru", nama: "biru", emoji: "\u{1F7E6}" },
  { id: "kuning", nama: "kuning", emoji: "\u{1F7E8}" },
];
/** Jawaban sembilan anak urut (nomor warna dalam WARNA_DATA): merah empat, biru tiga, kuning dua. */
export const JAWABAN_DATA: readonly number[] = [0, 1, 0, 2, 0, 1, 2, 0, 1];

export const MISI_CATAT_TEKS = "Pilah benda panggung ke barisnya, tulis turus, lengkapi tabel, lalu baca hasilnya. Urutannya bebas.";
