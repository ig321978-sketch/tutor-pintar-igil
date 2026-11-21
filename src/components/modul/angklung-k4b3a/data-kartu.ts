/**
 * Data Mind-map dan Infografis Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (dirancang sendiri, tanpa komponen kartu bersama).
 * Mind-map: rak angklung bertingkat di lapangan Kampung Senandung. Rak atas = deret tumbuh (dua, empat, enam, delapan, lalu sepuluh), rak bawah = deret penabuh (tujuh, lima, tiga, satu, lalu habis),
 * satu papan kecil memuat tiga cara pintar. Enam label kosong menempel pada bagian rak yang cocok; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu. Kartu 1 = tabel selisih dua deret dari Story (dua, empat, enam, delapan, sepuluh; tujuh, lima, tiga, satu) dengan gambar angklung sungguhan sebanyak datanya.
 * Kartu 2 = kartu pegangan Bu Ratri: enam kebiasaan pola gambar (membesar, mengecil, berhenti di nol, tiga cara pintar). Digital saja.
 * Suara tanpa digit: bilangan dieja lewat eja-k4b3.ts. Diuji: scripts/uji-angklung-k4b3a.mjs.
 */
import { ejaK4B3 } from "../eja-k4b3";

export type LangkahPeta = { judul: string; arti: string };

/** Enam langkah Mind-map (urut): selisih, membesar, melanjutkan, mengecil, berhenti di nol, tiga cara pintar. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_ANGKLUNG: LangkahPeta[] = [
  {
    judul: "Hitung selisih tiap deret",
    arti: "Langkah satu. Bandingkan banyak angklung dua deret yang berurutan, lalu hitung selisihnya. Dua, empat, enam selisihnya selalu tambah dua. Selisih yang tetap membuat susunan gambar menjadi pola.",
  },
  {
    judul: "Selisih tambah: membesar",
    arti: "Langkah dua. Kalau tiap deret bertambah dengan selisih yang sama, polanya makin lama makin banyak. Pola itu kita sebut pola membesar.",
  },
  {
    judul: "Lanjutkan deret",
    arti: "Langkah tiga. Untuk melanjutkan deret, tambahkan selisih yang sama lagi. Dua, empat, enam, delapan, lalu sepuluh angklung.",
  },
  {
    judul: "Selisih kurang: mengecil",
    arti: "Langkah empat. Kalau tiap deret berkurang dengan selisih yang sama, polanya mengecil. Tujuh, lima, tiga selisihnya kurang dua. Lihat arah perubahan, bukan besar angkanya.",
  },
  {
    judul: "Berhenti di nol",
    arti: "Langkah lima. Kurangi dua terus, tujuh, lima, tiga, satu, lalu angklungnya habis. Pola mengecil berhenti di nol, karena benda tidak bisa kurang dari tidak ada.",
  },
  {
    judul: "Pilih cara pintar",
    arti: "Langkah enam. Pilih cara yang pas. Gambar Berikutnya untuk membayangkan deret berikutnya. Tabel Selisih untuk memastikan selisihnya sama. Susun Per Lima untuk menghitung benda yang banyak dengan cepat.",
  },
];
export const JUDUL_RAK_ATAS = "Rak deret tumbuh";
export const JUDUL_RAK_BAWAH = "Rak deret penabuh";
export const JUDUL_PAPAN_CARA = "Papan cara";
export const PETUNJUK_PETA_ANGKLUNG = "Ketuk tanda tanya di rak untuk membuka langkahnya.";
export const SELESAI_PETA_ANGKLUNG = "Rak lengkap! Enam langkah sudah kamu buka.";

/** Baris rak: banyak angklung, selisih dari baris sebelumnya (kosong = baris pertama), hantu = belum ada (gambar putus-putus). */
export type BarisRak = { n: number; d?: number; hantu?: boolean; habis?: boolean };
export const RAK_ATAS: readonly BarisRak[] = [{ n: 2 }, { n: 4, d: 2 }, { n: 6, d: 2 }, { n: 8, d: 2 }, { n: 10, d: 2, hantu: true }];
export const RAK_BAWAH: readonly BarisRak[] = [{ n: 7 }, { n: 5, d: -2 }, { n: 3, d: -2 }, { n: 1, d: -2 }, { n: 0, habis: true }];
/** Letak tiap label pada rak: zona 0 = rak atas, 1 = rak bawah, 2 = papan cara; baris mulai dari 1 dan banyak baris yang dijangkau label. */
export const LETAK_LABEL: readonly { zona: 0 | 1 | 2; dari: number; banyak: number }[] = [
  { zona: 0, dari: 1, banyak: 2 },
  { zona: 0, dari: 3, banyak: 2 },
  { zona: 0, dari: 5, banyak: 1 },
  { zona: 1, dari: 1, banyak: 3 },
  { zona: 1, dari: 4, banyak: 2 },
  { zona: 2, dari: 1, banyak: 1 },
];
/** Tiga gambar kecil di papan cara. */
export const CARA_PAPAN = ["Gambar", "Tabel", "Per Lima"] as const;

/* ------------------------------ Infografis kartu 1: tabel selisih ------------------------------ */
export type DeretInfo = { kunci: string; nama: string; banyak: number[]; terlihat: number; jenis: string; suaraJenis: string };
const kata = (t: string) => ejaK4B3(t);
export const DERET_INFO: readonly DeretInfo[] = [
  {
    kunci: "a",
    nama: "Deret angklung Bu Ratri",
    banyak: [2, 4, 6, 8, 10],
    terlihat: 3,
    jenis: "Pola membesar",
    suaraJenis: kata("Selisihnya selalu +2, jadi tiap deret makin banyak. Ini pola membesar."),
  },
  {
    kunci: "b",
    nama: "Deret penabuh",
    banyak: [7, 5, 3, 1],
    terlihat: 3,
    jenis: "Pola mengecil",
    suaraJenis: kata("Selisihnya selalu −2, jadi tiap deret makin sedikit. Ini pola mengecil, walau angka 7 terlihat besar."),
  },
];
export const teksSelisih = (d: number) => (d >= 0 ? `+${d}` : `−${Math.abs(d)}`);
/** Selisih deret ke-i (mulai 1) terhadap deret sebelumnya; kosong untuk deret pertama. */
export const selisihKe = (banyak: readonly number[], i: number): number | null => (i <= 0 ? null : banyak[i] - banyak[i - 1]);
export const suaraBanyak = (d: DeretInfo, i: number) =>
  kata(`Deret ke-${i + 1} berisi ${d.banyak[i]} angklung.${i > 0 ? ` Itu ${d.banyak[i - 1]} ${d.banyak[i] > d.banyak[i - 1] ? "ditambah" : "dikurangi"} ${Math.abs(d.banyak[i] - d.banyak[i - 1])}.` : ""}`);
export const suaraSelisih = (d: DeretInfo, i: number) => {
  const s = selisihKe(d.banyak, i) as number;
  return kata(`Dari ${d.banyak[i - 1]} ke ${d.banyak[i]} selisihnya ${teksSelisih(s)}. Angklungnya ${s > 0 ? "bertambah" : "berkurang"} ${Math.abs(s)}.`);
};
export const PETUNJUK1_INFO_ANGKLUNG =
  "Ketuk tanda tanya untuk membuka isinya, sampai semua terbuka.";
export const SELESAI1_INFO_ANGKLUNG = "Tabel selisih lengkap! Selisih tetap tambah itu membesar, selisih tetap kurang itu mengecil.";

/* ------------------------------ Infografis kartu 2: kartu pegangan ------------------------------ */
export type PeganganInfo = { kunci: string; gambar: "tumbuh" | "kecil" | "habis" | "gambar" | "tabel" | "lima"; kiri: string; isi: string; suara: string };
export const PEGANGAN_INFO: readonly PeganganInfo[] = [
  { kunci: "tumbuh", gambar: "tumbuh", kiri: "2, 4, 6", isi: "Pola membesar", suara: kata("Selisih tetap tambah, polanya membesar. 2, 4, 6, lalu 8.") },
  { kunci: "kecil", gambar: "kecil", kiri: "7, 5, 3", isi: "Pola mengecil", suara: kata("Selisih tetap kurang, polanya mengecil. Lihat arah perubahan, bukan besar angka 7.") },
  { kunci: "habis", gambar: "habis", kiri: "7, 5, 3, 1, …", isi: "Berhenti di nol", suara: kata("Dikurangi 2 lagi, angklungnya habis. Pola mengecil berhenti di nol.") },
  { kunci: "gambar", gambar: "gambar", kiri: "Gambar Berikutnya", isi: "Bayangkan deret berikutnya", suara: kata("Gambar Berikutnya: gambar deret selanjutnya dengan perubahan yang sama, supaya pola terlihat jelas.") },
  { kunci: "tabel", gambar: "tabel", kiri: "Tabel Selisih", isi: "Pastikan selisih sama", suara: kata("Tabel Selisih: tulis banyak tiap deret, lalu selisihnya di bawah. Selisih yang sama membuktikan pola.") },
  { kunci: "lima", gambar: "lima", kiri: "Susun Per Lima", isi: "Hitung benda banyak dengan cepat", suara: kata("Susun Per Lima: susun benda dalam baris berisi 5, jadi banyaknya terbaca sekilas.") },
];
export const PETUNJUK2_INFO_ANGKLUNG = "Ketuk tanda tanya untuk melihat arti gambarnya.";
export const SELESAI2_INFO_ANGKLUNG = "Kartu pegangan lengkap! Lihat selisihnya dulu, baru tentukan polanya.";
