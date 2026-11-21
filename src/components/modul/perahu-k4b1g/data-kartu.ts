/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (dirancang ulang, tanpa komponen kartu bersama).
 * Mind-map: "Rute Perahu", lima perahu berjalan zig-zag di air; tiap perahu membawa gambar satu langkah (jumlahkan berulang, urai, kali tiap bagian, susun satuan dulu, simpanan, periksa)
 * dan satu label kosong yang diketuk: judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu dari angka Story. Kartu 1 = papan penumpang (12 x 5 = 60 dan 11 x 5 = 55 dari materi, 14 x 4 = 56 dari metode global), titik penumpang digambar sebanyak datanya;
 * kartu 2 = kartu kali susun 12 x 5 (satuan dulu, tulis dan simpan, puluhan ditambah simpanan, hasil 60, dan salah Satria 10 x 5 + 2 = 52). Digital saja.
 * Suara tanpa digit (eja lewat eja-k4b1.ts). Diuji: scripts/uji-visual-k4b1ghi.mjs.
 */
import { kataBilK4B1 } from "../eja-k4b1";

export type LangkahPeta = { judul: string; arti: string };

/** Enam langkah Mind-map: Repeated Addition, Split and Multiply, dan Column Multiply (dengan simpanan), ditutup periksa dengan cara lain. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_PERAHU: LangkahPeta[] = [
  {
    judul: "Jumlahkan berulang",
    arti: "Langkah satu. Jumlahkan bilangan yang sama berulang kali. Dua belas penumpang di tiap perahu, pada lima perahu, berarti dua belas ditambah dua belas, sampai lima kali.",
  },
  {
    judul: "Urai puluhan dan satuan",
    arti: "Langkah dua. Uraikan dua belas menjadi sepuluh dan dua. Sepuluh adalah puluhan, dua adalah satuan.",
  },
  {
    judul: "Kali tiap bagian",
    arti: "Langkah tiga. Kalikan tiap bagian dengan lima. Sepuluh kali lima sama dengan lima puluh, dua kali lima sama dengan sepuluh. Jumlahkan keduanya, hasilnya enam puluh.",
  },
  {
    judul: "Susun, satuan dulu",
    arti: "Langkah empat. Tulis bilangan ke bawah, lalu kalikan satuan lebih dulu. Dua kali lima sama dengan sepuluh. Tulis nol, simpan satu. Lalu satu kali lima sama dengan lima, ditambah simpanan satu sama dengan enam. Hasilnya enam puluh.",
  },
  {
    judul: "Periksa cara lain",
    arti: "Langkah lima. Periksa hasilnya dengan cara lain, misalnya menjumlahkan dua belas sampai lima kali. Hasilnya harus sama.",
  },
];
export const JUDUL_PETA_PERAHU = "Rute Perahu Bu Marni";
export const IKON_JUDUL_PETA_PERAHU = "\u{26F5}";
export const PETUNJUK_PETA_PERAHU = "Ketuk tanda tanya di samping tiap perahu untuk membuka langkah.";
export const SELESAI_PETA_PERAHU = "Semua perahu sudah sampai! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: papan penumpang ------------------------------ */
export type SelInfo = { label: string; isi: string; suara: string };
export type BarisPenumpang = { kunci: string; nama: string; perahu: number; isi: number; sel: [SelInfo, SelInfo] };

const kata = kataBilK4B1;
const baris = (kunci: string, nama: string, isi: number, perahu: number): BarisPenumpang => ({
  kunci,
  nama,
  perahu,
  isi,
  sel: [
    { label: "Perkalian", isi: `${isi} × ${perahu}`, suara: `Perkalian. ${kata(isi)} penumpang tiap perahu, ${kata(perahu)} perahu, ditulis ${kata(isi)} dikali ${kata(perahu)}.` },
    { label: "Jumlah", isi: `${isi * perahu}`, suara: `Jumlah penumpang seluruhnya ${kata(isi * perahu)}.` },
  ],
});
/** Tiga baris dari Story: perahu penuh (12 x 5), perahu sebelas penumpang (11 x 5), dan contoh metode global (14 x 4). */
export const PENUMPANG_PERAHU: BarisPenumpang[] = [
  baris("penuh", "12 penumpang tiap perahu, 5 perahu", 12, 5),
  baris("sebelas", "11 penumpang tiap perahu, 5 perahu", 11, 5),
  baris("global", "14 penumpang tiap perahu, 4 perahu", 14, 4),
];
export const JUDUL_PAPAN_PERAHU = "Papan penumpang";
export const PETUNJUK1_INFO_PERAHU = "Titik biru puluhan, oranye satuan. Ketuk tanda tanya untuk melihat isinya.";
export const SELESAI1_INFO_PERAHU = "Papan penumpang lengkap! Banyak penumpang tiap perahu dikali banyak perahu.";

/* ------------------------------ Infografis kartu 2: kartu kali susun ------------------------------ */
export type LangkahSusun = { kunci: string; caption: string; isi: string; suara: string };
/** Kali susun dua belas kali lima dari Story G, ditutup salah Satria (satuan terlewat). */
export const SUSUN_PERAHU: LangkahSusun[] = [
  { kunci: "satuan", caption: "Satuan dikali dulu", isi: "2 × 5 = 10", suara: "Satuan dikali dulu. Dua kali lima sama dengan sepuluh." },
  { kunci: "simpan", caption: "Satuan ditulis, puluhan disimpan", isi: "tulis 0, simpan 1", suara: "Tulis nol, simpan satu." },
  { kunci: "puluhan", caption: "Puluhan dikali, tambah simpanan", isi: "1 × 5 + 1 = 6", suara: "Satu kali lima sama dengan lima, ditambah satu simpanan sama dengan enam." },
  { kunci: "hasil", caption: "Hasil akhir", isi: "60", suara: "Hasil akhirnya enam puluh penumpang." },
  { kunci: "salah", caption: "Satuan terlewat jadi", isi: "10 × 5 + 2 = 52, keliru", suara: "Kalau satuan dua tidak ikut dikali lima, hasilnya lima puluh dua. Itu keliru, karena seharusnya enam puluh." },
];
export const PETUNJUK2_INFO_PERAHU = "Ketuk tanda tanya di kanan untuk melihat tiap langkah susun.";
export const SELESAI2_INFO_PERAHU = "Kartu kali susun lengkap! Satuan dulu, simpan, lalu puluhan.";
