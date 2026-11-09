/**
 * Data murni Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): Sub-Bab A (pengukuran panjang dengan satuan baku)
 * dan Sub-Bab B (hubungan antarsatuan baku panjang). Tanpa React, tanpa acak, tanpa jaringan. Kunci selalu dihitung
 * dari bilangan, tidak ditulis dua kali. Uji: scripts/uji-data-k3b3.mjs.
 */
import type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektif } from "./data-k3b1";

export const HURUF = ["A", "B", "C", "D", "E", "F"];

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/** Urutan tampil yang harus diurutkan siswa: putaran tetap yang dijamin berbeda dari urutan kunci. */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan teks: satu benar dan dua pengecoh, kunci berpindah tempat. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/** Bilangan Indonesia dengan titik ribuan, mis. 5.000. */
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Tiga pilihan bilangan: kunci, satu lebih, dan satu kurang. Kunci berpindah tempat. */
export function opsiAngka(n: number, nomor: number): number[] {
  const semua = [n, n + 1, n >= 2 ? n - 1 : n + 2];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/* ====================================================================== */
/* Benda yang diukur                                                        */
/* ====================================================================== */

export type JenisBenda = "pensil" | "krayon" | "penghapus" | "sendok" | "sikat";
export const NAMA_BENDA: Record<JenisBenda, string> = { pensil: "pensil", krayon: "krayon", penghapus: "penghapus", sendok: "sendok", sikat: "sikat gigi" };
export type SoalBenda = { jenis: JenisBenda; cm: number };
export type Geser = { jenis: JenisBenda; cm: number; awal: number };
export type BendaAlat = { emoji: string; nama: string; alat: "penggaris" | "meteran" };

/** Panjang tampil sebagai "30 cm" atau "2 m" (bila pas meter, 100 cm atau lebih). */
export const labelUkur = (cm: number): string => (cm >= 100 && cm % 100 === 0 ? `${cm / 100} m` : `${cm} cm`);
/** Benda sampai 30 cm cocok diukur dengan penggaris, selebihnya dengan meteran. */
export const alatUntuk = (cm: number): "penggaris" | "meteran" => (cm <= 30 ? "penggaris" : "meteran");
/** Selisih dua panjang dibaca dari angka yang sama. */
export const sebutBenda = (s: SoalBenda): string => `${NAMA_BENDA[s.jenis]}, ${s.cm} cm`;

/** Tiga pilihan panjang pada Geser Ukur: kunci, angka di ujung kanan sebelum digeser, dan kunci dikurangi satu. */
export function opsiGeser(cm: number, awal: number, nomor: number): number[] {
  const semua = [cm, cm + awal, Math.max(1, cm - 1) === cm + awal ? cm + 1 : Math.max(1, cm - 1)];
  const geser = ((nomor % 3) + 3) % 3;
  return [0, 1, 2].map((i) => semua[(i + geser * 2) % 3]);
}
/* ====================================================================== */
/* SUB-BAB A. Pengukuran panjang dengan satuan baku                         */
/* ====================================================================== */

/* ------------------------------ Concrete A ------------------------------ */

/** CA1 Geser ke Angka Nol: ujung kiri benda mulai dari `awal`, geser ke 0, lalu baca panjangnya. Penggaris 15 cm. */
export const RONDE_GESER_CA: Geser[][] = [
  [{ jenis: "pensil", cm: 9, awal: 3 }, { jenis: "krayon", cm: 6, awal: 2 }],
  [{ jenis: "sendok", cm: 11, awal: 4 }, { jenis: "penghapus", cm: 4, awal: 2 }],
  [{ jenis: "sikat", cm: 14, awal: 1 }, { jenis: "pensil", cm: 11, awal: 3 }],
];
/** CA2 Baca Panjang Benda: benda mulai dari angka 0. */
export const RONDE_BACA_CA: SoalBenda[][] = [
  [{ jenis: "pensil", cm: 8 }, { jenis: "sendok", cm: 13 }],
  [{ jenis: "krayon", cm: 7 }, { jenis: "sikat", cm: 10 }],
  [{ jenis: "penghapus", cm: 5 }, { jenis: "pensil", cm: 14 }],
];
/** CA3 Ketuk Ujung Benda: panjang paling banyak 10 cm (garis angka 0 sampai 10). */
export const RONDE_UJUNG_CA: SoalBenda[][] = [
  [{ jenis: "krayon", cm: 6 }, { jenis: "penghapus", cm: 4 }],
  [{ jenis: "pensil", cm: 9 }, { jenis: "sendok", cm: 8 }],
  [{ jenis: "sikat", cm: 10 }, { jenis: "krayon", cm: 7 }],
];
/** CA4 Pilih Alat Ukur: benda sehari-hari dan alat ukur yang tepat. */
export const BENDA_ALAT: Record<string, BendaAlat> = {
  pensil: { emoji: "✏️", nama: "pensil", alat: "penggaris" },
  buku: { emoji: "📖", nama: "buku", alat: "penggaris" },
  pulpen: { emoji: "🖊️", nama: "pulpen", alat: "penggaris" },
  kunci: { emoji: "🔑", nama: "kunci", alat: "penggaris" },
  sendok: { emoji: "🥄", nama: "sendok", alat: "penggaris" },
  pintu: { emoji: "🚪", nama: "pintu", alat: "meteran" },
  kasur: { emoji: "🛏️", nama: "tempat tidur", alat: "meteran" },
  jalan: { emoji: "🛣️", nama: "jalan", alat: "meteran" },
  televisi: { emoji: "📺", nama: "televisi", alat: "meteran" },
  pohon: { emoji: "🌳", nama: "pohon", alat: "meteran" },
};
export const RONDE_ALAT_CA: BendaAlat[][] = [
  [BENDA_ALAT.pensil, BENDA_ALAT.pintu],
  [BENDA_ALAT.buku, BENDA_ALAT.kasur],
  [BENDA_ALAT.sendok, BENDA_ALAT.jalan],
];
export const NAMA_ALAT: Record<"penggaris" | "meteran", string> = { penggaris: "Penggaris", meteran: "Meteran" };
/** CA5 Jodohkan Benda dan Panjang. */
export const RONDE_JODOH_CA: SoalBenda[][] = [
  [{ jenis: "pensil", cm: 7 }, { jenis: "krayon", cm: 5 }, { jenis: "sendok", cm: 10 }],
  [{ jenis: "penghapus", cm: 3 }, { jenis: "sikat", cm: 9 }, { jenis: "pensil", cm: 8 }],
  [{ jenis: "krayon", cm: 6 }, { jenis: "sendok", cm: 9 }, { jenis: "sikat", cm: 10 }],
];
/** CA6 Memori Benda dan Panjang. */
export const RONDE_MEMORI_CA: SoalBenda[][] = [
  [{ jenis: "pensil", cm: 6 }, { jenis: "krayon", cm: 9 }, { jenis: "sendok", cm: 10 }, { jenis: "penghapus", cm: 4 }],
  [{ jenis: "sikat", cm: 8 }, { jenis: "pensil", cm: 7 }, { jenis: "krayon", cm: 5 }, { jenis: "sendok", cm: 9 }],
  [{ jenis: "penghapus", cm: 5 }, { jenis: "sikat", cm: 10 }, { jenis: "pensil", cm: 8 }, { jenis: "krayon", cm: 6 }],
];
/** CA7 Ketuk Benda dengan Panjang Tertentu. */
export const RONDE_KETUK_CA: { item: SoalBenda[]; tanya: number[] }[] = [
  { item: [{ jenis: "pensil", cm: 8 }, { jenis: "krayon", cm: 5 }, { jenis: "sendok", cm: 10 }], tanya: [5, 10] },
  { item: [{ jenis: "sikat", cm: 9 }, { jenis: "penghapus", cm: 4 }, { jenis: "pensil", cm: 7 }], tanya: [9, 4] },
  { item: [{ jenis: "krayon", cm: 7 }, { jenis: "sendok", cm: 10 }, { jenis: "sikat", cm: 8 }], tanya: [10, 7] },
];
/** CA8 Ketuk Semua Benda yang Tepat dengan Alat Ukur Tertentu. */
export const RONDE_SEMUA_CA: { alat: "penggaris" | "meteran"; item: BendaAlat[] }[] = [
  { alat: "penggaris", item: [BENDA_ALAT.pensil, BENDA_ALAT.buku, BENDA_ALAT.pintu, BENDA_ALAT.kasur] },
  { alat: "meteran", item: [BENDA_ALAT.televisi, BENDA_ALAT.kunci, BENDA_ALAT.pohon, BENDA_ALAT.sendok] },
  { alat: "penggaris", item: [BENDA_ALAT.pulpen, BENDA_ALAT.pohon, BENDA_ALAT.jalan, BENDA_ALAT.kunci] },
];
/** CA9 Papan Panjang Benda. */
export const RONDE_PAPAN_CA: SoalBenda[][] = [
  [{ jenis: "pensil", cm: 12 }, { jenis: "sendok", cm: 9 }],
  [{ jenis: "krayon", cm: 10 }, { jenis: "sikat", cm: 13 }],
  [{ jenis: "pensil", cm: 15 }, { jenis: "penghapus", cm: 6 }],
];
/** CA10 Urutkan Benda menurut Panjang. */
export const RONDE_URUT_CA: { item: SoalBenda[]; dari: "kecil" | "besar" }[] = [
  { item: [{ jenis: "pensil", cm: 8 }, { jenis: "krayon", cm: 5 }, { jenis: "sendok", cm: 12 }], dari: "kecil" },
  { item: [{ jenis: "sikat", cm: 9 }, { jenis: "penghapus", cm: 4 }, { jenis: "pensil", cm: 13 }], dari: "besar" },
  { item: [{ jenis: "krayon", cm: 7 }, { jenis: "sendok", cm: 10 }, { jenis: "sikat", cm: 14 }], dari: "kecil" },
];
export const idBenda = (s: SoalBenda): string => `${s.jenis}${s.cm}`;

/* ------------------------------ Picture A ------------------------------ */

/** PA1 Geser Batang ke Nol. Penggaris 15 cm: awal + cm paling banyak 15. */
export const RONDE_GESER_PA: { cm: number; awal: number }[][] = [[{ cm: 7, awal: 3 }, { cm: 10, awal: 2 }], [{ cm: 11, awal: 4 }, { cm: 5, awal: 2 }], [{ cm: 8, awal: 1 }, { cm: 12, awal: 3 }]];
/** PA2 Baca Panjang Batang. */
export const RONDE_BACA_PA: number[][] = [[9, 13], [6, 11], [14, 8]];
/** PA3 Ketuk Ujung Batang: paling banyak 10 cm. */
export const RONDE_UJUNG_PA: number[][] = [[7, 4], [9, 6], [10, 8]];
/** PA4 Jodohkan Batang dan Panjang. */
export const RONDE_JODOH_PA: number[][] = [[6, 10, 4], [5, 9, 8], [7, 3, 10]];
/** PA5 Memori Batang dan Panjang. */
export const RONDE_MEMORI_PA: number[][] = [[5, 8, 6, 9], [4, 7, 10, 3], [6, 9, 7, 5]];
/** PA6 Pilah Panjang: penggaris (sampai 30 cm) atau meteran. */
export const RONDE_PILAH_PA: number[][] = [[12, 150, 25, 200, 18, 300], [30, 120, 8, 400, 20, 100], [15, 250, 28, 500, 10, 180]];
/** PA7 Ketuk Semua Batang Lebih atau Kurang dari Acuan. */
export const RONDE_SEMUA_PA: { acuan: number; arah: "lebih" | "kurang"; item: number[] }[] = [
  { acuan: 8, arah: "lebih", item: [5, 9, 12, 7] },
  { acuan: 10, arah: "kurang", item: [6, 13, 9, 15] },
  { acuan: 9, arah: "lebih", item: [4, 11, 14, 6] },
];
export const cocokBanding = (cm: number, acuan: number, arah: "lebih" | "kurang"): boolean => (arah === "lebih" ? cm > acuan : cm < acuan);
/** PA8 Urutkan Langkah Mengukur. */
export const RONDE_LANGKAH_PA: { judul: string; langkah: string[] }[] = [
  { judul: "Mengukur panjang pensil", langkah: ["Siapkan pensil dan penggaris", "Letakkan ujung pensil di angka 0", "Lihat angka di ujung pensil yang lain", "Tulis hasilnya dengan satuan cm"] },
  { judul: "Mengukur panjang buku tulis", langkah: ["Letakkan penggaris di tepi buku", "Pastikan ujung buku tepat di angka 0", "Baca angka di ujung buku yang lain", "Tulis panjangnya dengan satuan cm"] },
  { judul: "Mengukur panjang meja dengan meteran", langkah: ["Siapkan meteran gulung", "Tarik meteran dari angka 0 di ujung meja", "Baca angka di ujung meja yang lain", "Tulis hasilnya dengan satuan m atau cm"] },
];
/** PA9 Papan Panjang Batang. */
export const RONDE_PAPAN_PA: number[][] = [[11, 7], [14, 9], [12, 5]];
/** PA10 Selisih Dua Batang: kedua batang mulai dari 0. */
export const RONDE_SELISIH_PA: [number, number][][] = [[[12, 7], [10, 4]], [[14, 9], [11, 6]], [[13, 5], [15, 8]]];

/* ------------------------------ Abstract A ------------------------------ */

export type SoalTeks = { tanya: string; benar: string; salah: [string, string]; pesan: string };
const SATUAN = (tanya: string, benar: "sentimeter (cm)" | "meter (m)", pesan: string): SoalTeks => ({
  tanya,
  benar,
  salah: benar === "sentimeter (cm)" ? ["meter (m)", "liter (L)"] : ["sentimeter (cm)", "liter (L)"],
  pesan,
});
/** QA1 Pilih Satuan Baku. */
export const RONDE_SATUAN_QA: SoalTeks[][] = [
  [SATUAN("Satuan baku yang tepat untuk panjang pensil adalah ...", "sentimeter (cm)", "Pensil pendek, jadi diukur dengan sentimeter."), SATUAN("Satuan baku yang tepat untuk panjang lapangan adalah ...", "meter (m)", "Lapangan panjang, jadi diukur dengan meter.")],
  [SATUAN("Satuan baku yang tepat untuk panjang penghapus adalah ...", "sentimeter (cm)", "Penghapus pendek, jadi diukur dengan sentimeter."), SATUAN("Satuan baku yang tepat untuk tinggi pintu adalah ...", "meter (m)", "Pintu cukup tinggi, jadi diukur dengan meter.")],
  [SATUAN("Satuan baku yang tepat untuk panjang jari tangan adalah ...", "sentimeter (cm)", "Jari tangan pendek, jadi diukur dengan sentimeter."), SATUAN("Satuan baku yang tepat untuk panjang jalan adalah ...", "meter (m)", "Jalan panjang, jadi diukur dengan meter.")],
];
const ALAT = (tanya: string, benar: "Penggaris" | "Meteran", pesan: string): SoalTeks => ({
  tanya,
  benar,
  salah: benar === "Penggaris" ? ["Meteran", "Timbangan"] : ["Penggaris", "Timbangan"],
  pesan,
});
/** QA2 Pilih Alat Ukur. */
export const RONDE_ALAT_QA: SoalTeks[][] = [
  [ALAT("Alat ukur yang tepat untuk panjang pulpen adalah ...", "Penggaris", "Pulpen pendek, jadi memakai penggaris."), ALAT("Alat ukur yang tepat untuk tinggi pintu adalah ...", "Meteran", "Pintu lebih panjang dari penggaris, jadi memakai meteran.")],
  [ALAT("Alat ukur yang tepat untuk panjang jari tangan adalah ...", "Penggaris", "Jari tangan pendek, jadi memakai penggaris."), ALAT("Alat ukur yang tepat untuk panjang meja adalah ...", "Meteran", "Meja melebihi panjang penggaris, jadi memakai meteran.")],
  [ALAT("Alat ukur yang tepat untuk tinggi badan adalah ...", "Meteran", "Tinggi badan melebihi penggaris, jadi memakai meteran atau pengukur tinggi badan."), ALAT("Alat ukur yang tepat untuk lingkar perut adalah ...", "Meteran", "Lingkar perut diukur dengan pita ukur atau meteran.")],
];
/** QA3 Lengkapi Kalimat Pengukuran. */
export const RONDE_KALIMAT_QA: KalimatIsian[][] = [
  [
    { depan: "Penggaris dipakai untuk mengukur benda yang", belakang: ".", opsi: ["pendek", "sangat panjang", "sangat berat"], benar: 0 },
    { depan: "Satuan baku pada penggaris adalah", belakang: ".", opsi: ["sentimeter", "kilogram", "liter"], benar: 0 },
    { depan: "Saat mengukur, ujung benda diletakkan di angka", belakang: ".", opsi: ["0", "1", "10"], benar: 0 },
  ],
  [
    { depan: "Meteran dipakai untuk mengukur benda yang", belakang: ".", opsi: ["panjang", "sangat pendek", "sangat ringan"], benar: 0 },
    { depan: "Satuan baku pada meteran adalah meter dan", belakang: ".", opsi: ["sentimeter", "kilogram", "liter"], benar: 0 },
    { depan: "Cara memakai meteran sama dengan penggaris: mulailah dari angka", belakang: ".", opsi: ["0", "5", "100"], benar: 0 },
  ],
  [
    { depan: "Panjang benda dibaca dari angka di ujung yang", belakang: "saat satu ujung di angka 0.", opsi: ["lain", "sama", "hilang"], benar: 0 },
    { depan: "Tinggi badan lebih tepat diukur dengan", belakang: ".", opsi: ["meteran", "sendok", "gelas"], benar: 0 },
    { depan: "Panjang penghapus lebih tepat ditulis dengan satuan", belakang: ".", opsi: ["cm", "m", "kg"], benar: 0 },
  ],
];
/** QA4 Jodohkan Benda dan Alat Ukur. */
export const RONDE_JODOH_QA: { kiri: string; kanan: string }[][] = [
  [{ kiri: "Panjang pensil", kanan: "Penggaris" }, { kiri: "Panjang lapangan", kanan: "Meteran gulung" }, { kiri: "Tinggi badan", kanan: "Pengukur tinggi badan" }],
  [{ kiri: "Panjang penghapus", kanan: "Penggaris" }, { kiri: "Tinggi pintu", kanan: "Meteran gulung" }, { kiri: "Tinggi badan Eri", kanan: "Pengukur tinggi badan" }],
  [{ kiri: "Panjang sendok", kanan: "Penggaris" }, { kiri: "Panjang pagar", kanan: "Meteran gulung" }, { kiri: "Tinggi badan adik", kanan: "Pengukur tinggi badan" }],
];
/** QA5 Memori Benda dan Ukuran yang Wajar. */
export const RONDE_MEMORI_QA: { a: string; b: string }[][] = [
  [{ a: "Panjang pensil", b: "15 cm" }, { a: "Tinggi pintu", b: "2 m" }, { a: "Panjang penghapus", b: "5 cm" }, { a: "Panjang lapangan", b: "50 m" }],
  [{ a: "Panjang buku tulis", b: "30 cm" }, { a: "Tinggi meja", b: "70 cm" }, { a: "Panjang kelas", b: "8 m" }, { a: "Panjang jari", b: "6 cm" }],
  [{ a: "Panjang sendok", b: "18 cm" }, { a: "Panjang mobil", b: "4 m" }, { a: "Tinggi siswa", b: "130 cm" }, { a: "Panjang kolam", b: "25 m" }],
];
/** QA6 Benar atau Salah. */
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Penggaris digunakan untuk mengukur benda yang pendek.", benar: true, penjelasan: "Penggaris panjangnya terbatas, jadi cocok untuk benda pendek seperti pensil." },
    { teks: "Saat mengukur, ujung benda diletakkan di angka 5 pada penggaris.", benar: false, penjelasan: "Ujung benda harus tepat di angka 0, baru kita baca angka di ujung yang lain." },
    { teks: "Satuan baku pada penggaris adalah sentimeter.", benar: true, penjelasan: "Penggaris memakai satuan sentimeter (cm)." },
    { teks: "Meteran dipakai untuk mengukur panjang pensil.", benar: false, penjelasan: "Pensil pendek, jadi lebih tepat diukur dengan penggaris." },
    { teks: "Pensil yang ujungnya di angka 9, dimulai dari angka 0, panjangnya 9 cm.", benar: true, penjelasan: "Angka di ujung yang lain, saat ujung pertama di angka 0, adalah panjang benda." },
  ],
  [
    { teks: "Tinggi pintu lebih tepat diukur dengan meteran.", benar: true, penjelasan: "Pintu lebih panjang daripada penggaris, jadi memakai meteran." },
    { teks: "Satuan baku panjang hanya sentimeter.", benar: false, penjelasan: "Satuan baku panjang adalah sentimeter (cm) dan meter (m)." },
    { teks: "Benda yang lebih panjang dari penggaris diukur dengan meteran.", benar: true, penjelasan: "Meteran digunakan untuk benda yang panjangnya melebihi penggaris." },
    { teks: "Penggaris 30 cm cocok untuk mengukur panjang papan tulis.", benar: false, penjelasan: "Papan tulis lebih panjang dari 30 cm, jadi memakai meteran." },
    { teks: "Cara memakai meteran sama dengan cara memakai penggaris, yaitu mulai dari angka 0.", benar: true, penjelasan: "Letakkan ujung benda di angka 0, lalu baca angka di ujung yang lain." },
  ],
];
/** QA7 Detektif Pengukuran. */
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: ["Aku panjang benda yang ujungnya di angka 9 saat dimulai dari angka 0.", "Aku kurang dari 10."], jawab: 9, opsi: [9, 10, 8], salah: "Ujung benda di angka 9, dan dimulai dari angka 0, jadi panjangnya 9 cm." },
  { klue: ["Aku panjang benda yang dimulai dari angka 3 dan berakhir di angka 11.", "Aku lebih dari 5."], jawab: 8, opsi: [8, 11, 14], salah: "11 − 3 = 8, jadi panjangnya 8 cm." },
  { klue: ["Dua pensil panjangnya 7 cm dan 12 cm. Aku selisih panjangnya.", "Aku kurang dari 10."], jawab: 5, opsi: [5, 19, 12], salah: "12 − 7 = 5, jadi selisihnya 5 cm." },
  { klue: ["Dua pita 6 cm dan 8 cm disambung. Aku panjang pita sekarang.", "Aku bilangan genap."], jawab: 14, opsi: [14, 2, 15], salah: "6 + 8 = 14, dan 14 bilangan genap." },
];
/** QA8 Peta Konsep Pengukuran Panjang. */
export const PETA_KONSEP_QA: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Alat ukur panjang",
    kotak: [
      { label: "Benda pendek diukur dengan", opsi: ["penggaris", "meteran gulung", "timbangan"], benar: 0 },
      { label: "Benda yang lebih panjang dari penggaris diukur dengan", opsi: ["meteran", "gelas", "sendok"], benar: 0 },
      { label: "Satuan baku pada penggaris adalah", opsi: ["sentimeter", "kilogram", "liter"], benar: 0 },
      { label: "Menurutku, tinggi pintu diukur dengan", opsi: ["meteran", "penggaris 15 cm", "timbangan"], benar: 0 },
    ],
  },
  {
    pusat: "Cara mengukur panjang",
    kotak: [
      { label: "Ujung benda diletakkan di angka", opsi: ["0", "5", "10"], benar: 0 },
      { label: "Panjang benda dibaca di ujung benda yang", opsi: ["lain", "pertama", "hilang"], benar: 0 },
      { label: "Hasil ditulis dengan", opsi: ["satuan baku", "gambar", "warna"], benar: 0 },
      { label: "Menurutku, pensil dari angka 0 sampai 8 panjangnya", opsi: ["8 cm", "0 cm", "80 cm"], benar: 0 },
    ],
  },
];
/** QA9 Soal Cerita Pengukuran: jawaban berupa bilangan sentimeter. */
export type CeritaUkur = { teks: string; jawab: number; pesan: string };
export const RONDE_CERITA_QA: CeritaUkur[][] = [
  [
    { teks: "Pensil Meutia panjangnya 15 cm dan pensil Alfa 12 cm. Berapa cm selisih panjang kedua pensil?", jawab: 3, pesan: "15 − 12 = 3, jadi selisihnya 3 cm." },
    { teks: "Pita merah 8 cm disambung dengan pita biru 9 cm. Berapa cm panjang pita setelah disambung?", jawab: 17, pesan: "8 + 9 = 17, jadi panjang pita 17 cm." },
  ],
  [
    { teks: "Tinggi tanaman di pot 1 adalah 14 cm dan di pot 2 adalah 9 cm. Berapa cm tanaman pot 1 lebih tinggi?", jawab: 5, pesan: "14 − 9 = 5, jadi pot 1 lebih tinggi 5 cm." },
    { teks: "Panjang jari tengah Galih 7 cm dan jari kelingkingnya 5 cm. Berapa cm selisih panjang kedua jari?", jawab: 2, pesan: "7 − 5 = 2, jadi selisihnya 2 cm." },
  ],
  [
    { teks: "Meutia menyambung dua tali, 12 cm dan 13 cm. Berapa cm panjang seluruhnya?", jawab: 25, pesan: "12 + 13 = 25, jadi panjang seluruhnya 25 cm." },
    { teks: "Sebatang krayon 10 cm dipotong 4 cm. Berapa cm sisa krayon?", jawab: 6, pesan: "10 − 4 = 6, jadi sisanya 6 cm." },
  ],
];
/** QA10 Susun Kata Pengukuran Panjang. */
export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Penggaris", "dipakai", "untuk", "mengukur", "benda", "yang", "pendek"], pengecoh: "berat" },
  { kata: ["Satuan", "baku", "panjang", "adalah", "sentimeter", "dan", "meter"], pengecoh: "kilogram" },
  { kata: ["Ujung", "benda", "diletakkan", "di", "angka", "nol", "pada", "penggaris"], pengecoh: "sepuluh" },
  { kata: ["Meteran", "dipakai", "untuk", "mengukur", "benda", "yang", "panjang"], pengecoh: "ringan" },
];

/* ====================================================================== */
/* SUB-BAB B. Hubungan antarsatuan baku panjang                             */
/* ====================================================================== */

/** 117 menjadi "1 m 17 cm", 300 menjadi "3 m", 5 menjadi "5 cm", 5000 menjadi "50 m". */
export function teksMeterCm(cm: number): string {
  const m = Math.floor(cm / 100);
  const s = cm % 100;
  if (m === 0) return `${s} cm`;
  return s === 0 ? `${titik(m)} m` : `${titik(m)} m ${s} cm`;
}
/** Ubah "1 m 17 cm" kembali menjadi 117 (untuk uji dan pemeriksaan). */
export function cmDariTeks(teks: string): number {
  const m = teks.match(/([\d.]+) m(?!\w)/);
  const c = teks.match(/([\d.]+) cm/);
  return (m ? Number(m[1].replace(/\./g, "")) * 100 : 0) + (c ? Number(c[1].replace(/\./g, "")) : 0);
}
export const teksCm = (cm: number): string => `${titik(cm)} cm`;
export const idCm = (cm: number): string => `c${cm}`;

/** Tiga pilihan panjang sentimeter: kunci, lebih sepuluh, dan kurang sepuluh. */
export function opsiCm(n: number, nomor: number): number[] {
  const semua = [n, n + 10 <= 999 ? n + 10 : n - 20, n >= 10 ? n - 10 : n + 20];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga pilihan panjang pada garis meteran: kunci, lebih 50 cm, dan kurang 50 cm. */
export function opsiCm50(n: number, nomor: number): number[] {
  const semua = [n, n + 50, n >= 100 ? n - 50 : n + 100];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/* ------------------------------ Concrete B ------------------------------ */

/** CB1 Rakit Panjang Pita (RakitTiga: meter, sepuluh sentimeter, sentimeter). */
export const RONDE_RAKIT_CB: number[][] = [[117, 205], [130, 308], [245, 162]];
/** CB2 Hitung Panjang dalam Sentimeter. */
export const RONDE_HITUNG_CB: number[][] = [[135, 222], [108, 340], [275, 119]];
/** CB3 Ubah Meter ke Sentimeter. */
export const RONDE_METER_CB: number[][] = [[2, 4], [3, 5], [6, 7]];
/** CB4 Ubah Sentimeter ke Meter. */
export const RONDE_SENTI_CB: number[][] = [[200, 400], [500, 300], [900, 700]];
/** CB5 Jodohkan Pita dan Panjang. */
export const RONDE_JODOH_CB: number[][] = [[117, 205, 310], [150, 230, 304], [108, 260, 415]];
/** CB6 Memori Pita dan Panjang. */
export const RONDE_MEMORI_CB: number[][] = [[135, 222, 108, 340], [275, 119, 150, 304], [215, 360, 126, 240]];
/** CB7 Ketuk Pita dengan Panjang Tertentu: label memakai meter dan sentimeter. */
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [117, 205, 310], tanya: [205, 117] },
  { item: [150, 230, 304], tanya: [230, 304] },
  { item: [108, 260, 415], tanya: [415, 108] },
];
/** CB8 Ketuk Semua yang Sama dengan: tiap ukuran ditulis [meter, sentimeter]. */
export type UkuranMC = [number, number];
export const nilaiMC = (u: UkuranMC): number => u[0] * 100 + u[1];
export const labelMC = (u: UkuranMC): string => (u[0] === 0 ? `${u[1]} cm` : u[1] === 0 ? `${u[0]} m` : `${u[0]} m ${u[1]} cm`);
export const RONDE_SEMUA_CB: { acuan: number; item: UkuranMC[] }[] = [
  { acuan: 200, item: [[2, 0], [1, 100], [0, 20], [2, 20]] },
  { acuan: 150, item: [[1, 50], [0, 150], [1, 5], [1, 15]] },
  { acuan: 300, item: [[3, 0], [0, 300], [2, 30], [3, 3]] },
];
/** CB9 Papan Sentimeter (PapanTiga): ubah meter dan sentimeter menjadi sentimeter. */
export const RONDE_PAPAN_CB: UkuranMC[][] = [[[3, 5], [2, 40]], [[1, 17], [4, 0]], [[1, 5], [2, 75]]];
/** CB10 Urutkan Pita menurut Panjang. */
export const RONDE_URUT_CB: { item: number[]; dari: "kecil" | "besar" }[] = [
  { item: [117, 105, 130], dari: "kecil" },
  { item: [205, 150, 230], dari: "besar" },
  { item: [310, 215, 300], dari: "kecil" },
];

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Hitung Garis Meteran (penanda tiap 50 cm). */
export const RONDE_HITUNG_PB: number[][] = [[150, 250], [100, 350], [200, 50]];
/** PB2 Lengkapi Kalimat Ubah Satuan: cm = m + cm. */
export const RONDE_KALIMAT_PB: number[] = [117, 235, 148];
export function kalimatKonversi(cm: number, nomor: number): KalimatIsian[] {
  const m = Math.floor(cm / 100);
  const s = cm % 100;
  const pil = (v: number, i: number) => {
    const a = v + 10 <= 999 ? v + 10 : v - 10;
    const b = v >= 2 ? v - 1 : v + 1;
    const opsi = urutanTetap(3, 2, nomor + i).map((x) => [v, a, b][x]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  return [
    { depan: `${cm} cm = ${m * 100} cm +`, belakang: "cm.", ...pil(s, 0) },
    { depan: `${m} m =`, belakang: "cm.", ...pil(m * 100, 1) },
    { depan: `${cm} cm =`, belakang: `m ${s} cm.`, ...pil(m, 2) },
  ];
}
/** PB3 Jodohkan Garis dan Ukuran. */
export const RONDE_JODOH_PB: number[][] = [[100, 150, 250], [50, 200, 350], [150, 300, 250]];
/** PB4 Memori Garis dan Ukuran. */
export const RONDE_MEMORI_PB: number[][] = [[50, 150, 250, 350], [100, 200, 300, 400], [100, 250, 300, 350]];
/** PB5 Isi Tabel Ubah Ukuran (Latihan tinggi badan). */
export type TabelUkur = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
export function tabelUkur(daftar: { label: string; jawab: string }[], asing: string, tambahan: number): TabelUkur {
  const kartu = urutanTetap(daftar.length + 1, 2, tambahan).map((i) => (i < daftar.length ? daftar[i].jawab : asing));
  return { kepala: ["Ukuran", "Ukuran lain"], baris: daftar, kartu };
}
export const RONDE_TABEL_PB: TabelUkur[] = [
  tabelUkur([117, 120, 100, 105].map((v) => ({ label: teksMeterCm(v), jawab: teksCm(v) })), "170 cm", 1),
  tabelUkur([115, 130, 140, 125].map((v) => ({ label: teksCm(v), jawab: teksMeterCm(v) })), "1 m 5 cm", 2),
  tabelUkur([{ label: "205 cm", jawab: "2 m 5 cm" }, { label: "3 m 50 cm", jawab: "350 cm" }, { label: "250 cm", jawab: "2 m 50 cm" }, { label: "4 m", jawab: "400 cm" }], "520 cm", 3),
];
/** PB6 Ketuk Semua Ukuran yang Sama (tanpa gambar benda). */
export const RONDE_SEMUA_PB: { acuan: number; item: UkuranMC[] }[] = [
  { acuan: 300, item: [[3, 0], [0, 300], [2, 100], [3, 10]] },
  { acuan: 120, item: [[1, 20], [0, 120], [1, 12], [1, 2]] },
  { acuan: 400, item: [[4, 0], [3, 100], [0, 40], [4, 4]] },
];
/** PB7 Pilah Ukuran: pas meter atau bersisa sentimeter. */
export const RONDE_PILAH_PB: number[][] = [[300, 250, 400, 117, 500, 135], [100, 205, 200, 150, 600, 310], [700, 108, 900, 240, 800, 365]];
export const pasMeter = (cm: number): boolean => cm % 100 === 0;
/** PB8 Urutkan Langkah Mengubah Satuan. */
export const RONDE_LANGKAH_PB: { judul: string; langkah: string[] }[] = [
  { judul: "Mengubah 117 cm menjadi meter dan sentimeter", langkah: ["Tulis 117 cm", "Ambil 100 cm, itu 1 m", "Sisanya 17 cm", "Tulis hasilnya 1 m 17 cm"] },
  { judul: "Mengubah 4 m menjadi sentimeter", langkah: ["Tulis ukuran 4 m", "Ingat 1 m sama dengan 100 cm", "Kalikan 4 dengan 100", "Tulis hasilnya 400 cm"] },
  { judul: "Menjumlahkan 1 m 20 cm dan 1 m 30 cm", langkah: ["Tulis kedua ukuran", "Jumlahkan meter: 1 m + 1 m = 2 m", "Jumlahkan sentimeter: 20 cm + 30 cm = 50 cm", "Tulis hasilnya 2 m 50 cm"] },
];
/** PB9 Papan dari Garis (PapanTiga). */
export const RONDE_PAPAN_PB: number[][] = [[150, 250], [200, 350], [300, 100]];
/** PB10 Sambung Dua Pita: panjang a lalu b. */
export const RONDE_SAMBUNG_PB: [number, number][][] = [[[100, 150], [50, 200]], [[150, 150], [100, 250]], [[200, 100], [250, 50]]];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Ubah Meter ke Sentimeter. */
export const RONDE_METER_QB: number[][] = [[4, 9], [2, 7], [3, 10]];
export function opsiMeterKeCm(m: number, nomor: number): { opsi: string[]; jawab: number } {
  return susunOpsi(teksCm(m * 100), [teksCm(m * 10), teksCm(m * 1000)], nomor);
}
/** QB2 Ubah Sentimeter ke Meter dan Sentimeter. */
export const RONDE_SENTI_QB: number[][] = [[135, 208], [242, 317], [450, 119]];
export function opsiMCm(cm: number, nomor: number): { opsi: string[]; jawab: number } {
  const m = Math.floor(cm / 100);
  const sisa = cm % 100;
  let tukar = sisa < 10 ? sisa * 10 : Number(String(sisa).split("").reverse().join(""));
  if (tukar === sisa) tukar = sisa + 1;
  return susunOpsi(`${m} m ${sisa} cm`, [`${Math.floor(cm / 10)} m ${cm % 10} cm`, `${m} m ${tukar} cm`], nomor);
}
/** QB3 Papan Ubah Satuan (PapanTiga). */
export const RONDE_PAPAN_QB: UkuranMC[][] = [[[2, 40], [1, 55]], [[3, 8], [4, 25]], [[5, 0], [2, 90]]];
/** QB4 Jodohkan Ukuran. */
export const RONDE_JODOH_QB: { kiri: string; kanan: string }[][] = [
  [{ kiri: "3 m", kanan: "300 cm" }, { kiri: "5 m 20 cm", kanan: "520 cm" }, { kiri: "117 cm", kanan: "1 m 17 cm" }],
  [{ kiri: "2 m", kanan: "200 cm" }, { kiri: "4 m 5 cm", kanan: "405 cm" }, { kiri: "250 cm", kanan: "2 m 50 cm" }],
  [{ kiri: "9 m", kanan: "900 cm" }, { kiri: "1 m 5 cm", kanan: "105 cm" }, { kiri: "340 cm", kanan: "3 m 40 cm" }],
];
/** QB5 Memori Ukuran. */
export const RONDE_MEMORI_QB: { a: string; b: string }[][] = [
  [{ a: "1 m", b: "100 cm" }, { a: "2 m 30 cm", b: "230 cm" }, { a: "400 cm", b: "4 m" }, { a: "175 cm", b: "1 m 75 cm" }],
  [{ a: "7 m", b: "700 cm" }, { a: "1 m 20 cm", b: "120 cm" }, { a: "500 cm", b: "5 m" }, { a: "260 cm", b: "2 m 60 cm" }],
  [{ a: "6 m", b: "600 cm" }, { a: "3 m 15 cm", b: "315 cm" }, { a: "800 cm", b: "8 m" }, { a: "430 cm", b: "4 m 30 cm" }],
];
/** QB6 Benar atau Salah. */
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "1 m = 100 cm.", benar: true, penjelasan: "Satu meter sama dengan seratus sentimeter." },
    { teks: "1 m = 10 cm.", benar: false, penjelasan: "1 meter sama dengan 100 cm, bukan 10 cm." },
    { teks: "200 cm = 2 m.", benar: true, penjelasan: "200 cm terdiri dari dua kali 100 cm, yaitu 2 m." },
    { teks: "3 m = 30 cm.", benar: false, penjelasan: "3 m = 3 × 100 cm = 300 cm." },
    { teks: "Panjang pintu 200 cm sama dengan 2 m.", benar: true, penjelasan: "Dua ratus sentimeter sama dengan dua meter, sebab 100 cm = 1 m." },
  ],
  [
    { teks: "117 cm = 1 m 17 cm.", benar: true, penjelasan: "117 cm = 100 cm + 17 cm = 1 m 17 cm." },
    { teks: "1 m 5 cm = 15 cm.", benar: false, penjelasan: "1 m 5 cm = 100 cm + 5 cm = 105 cm." },
    { teks: "5.000 cm = 50 m.", benar: true, penjelasan: "5.000 cm dibagi 100 sama dengan 50 m." },
    { teks: "4 m 37 cm ditambah 7 m 43 cm sama dengan 12 m 80 cm.", benar: false, penjelasan: "Jumlahkan meter: 4 + 7 = 11. Jumlahkan sentimeter: 37 + 43 = 80. Jadi 11 m 80 cm." },
    { teks: "Untuk mengubah meter ke sentimeter, kalikan dengan 100.", benar: true, penjelasan: "Contoh: 3 m = 3 × 100 cm = 300 cm." },
  ],
];
/** QB7 Detektif Satuan Panjang. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: ["Aku panjang 4 m dalam sentimeter.", "Aku punya dua angka nol."], jawab: 400, opsi: [400, 40, 4000], salah: "4 m = 4 × 100 cm = 400 cm." },
  { klue: ["Aku sama dengan 1 m 17 cm dalam sentimeter.", "Satuanku 7."], jawab: 117, opsi: [117, 171, 1017], salah: "1 m 17 cm = 100 cm + 17 cm = 117 cm." },
  { klue: ["Aku jumlah meter dari 700 cm.", "Aku kurang dari 10."], jawab: 7, opsi: [7, 70, 17], salah: "700 cm dibagi 100 sama dengan 7 m." },
  { klue: ["Aku sentimeter pada 2 m 40 cm.", "Aku bilangan genap kurang dari 50."], jawab: 40, opsi: [40, 240, 25], salah: "2 m 40 cm: sisa sentimeternya 40 cm. Angka 40 genap dan kurang dari 50." },

];
/** QB8 Peta Konsep Satuan Panjang. */
export const PETA_KONSEP_QB: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Meter dan sentimeter",
    kotak: [
      { label: "1 meter sama dengan", opsi: ["100 cm", "10 cm", "1.000 cm"], benar: 0 },
      { label: "Untuk mengubah meter ke sentimeter, kita", opsi: ["mengalikan dengan 100", "membagi dengan 100", "menambah 100"], benar: 0 },
      { label: "Untuk mengubah sentimeter ke meter, kita", opsi: ["membagi dengan 100", "mengalikan dengan 100", "mengurangi 100"], benar: 0 },
      { label: "Menurutku, 5 m sama dengan", opsi: ["500 cm", "50 cm", "5 cm"], benar: 0 },
    ],
  },
  {
    pusat: "Ukuran gabungan",
    kotak: [
      { label: "117 cm sama dengan", opsi: ["1 m 17 cm", "11 m 7 cm", "17 m 1 cm"], benar: 0 },
      { label: "Menjumlahkan 4 m 37 cm dan 7 m 43 cm: jumlahkan meter dan", opsi: ["jumlahkan sentimeter", "kalikan sentimeter", "abaikan sentimeter"], benar: 0 },
      { label: "Hasil 4 m 37 cm + 7 m 43 cm adalah", opsi: ["11 m 80 cm", "12 m 80 cm", "11 m 70 cm"], benar: 0 },
      { label: "Menurutku, 5.000 cm sama dengan", opsi: ["50 m", "5 m", "500 m"], benar: 0 },
    ],
  },
];
/** QB9 Soal Cerita: operasi pada sentimeter. Jenis "+" dijumlahkan, "−" dikurangkan, "u" diubah menjadi meter. */
export type CeritaMC = { teks: string; a: number; b: number; jenis: "+" | "−" | "u" };
export const jawabCerita = (c: CeritaMC): number => (c.jenis === "+" ? c.a + c.b : c.jenis === "−" ? c.a - c.b : c.a);
export function opsiCerita(c: CeritaMC, nomor: number): { opsi: string[]; jawab: number } {
  const j = jawabCerita(c);
  if (c.jenis === "u") return susunOpsi(teksMeterCm(j), [teksMeterCm(j / 10), teksMeterCm(j * 10)], nomor);
  return susunOpsi(teksMeterCm(j), [teksMeterCm(j + 100), teksMeterCm(j >= 10 ? j - 10 : j + 10)], nomor);
}
export const RONDE_CERITA_QB: CeritaMC[][] = [
  [
    { teks: "Meutia menyambung dua utas pita. Pita pertama panjangnya 4 m 37 cm dan pita kedua 7 m 43 cm. Berapa panjang pita setelah disambung?", a: 437, b: 743, jenis: "+" },
    { teks: "Penjaga toko punya kain katun 75 m 80 cm. Ia menjual 38 m 45 cm. Berapa sisa kain katun?", a: 7580, b: 3845, jenis: "−" },
  ],
  [
    { teks: "Dua utas tali disambung. Tali pertama 1 m 20 cm dan tali kedua 1 m 30 cm. Berapa panjang tali setelah disambung?", a: 120, b: 130, jenis: "+" },
    { teks: "Sebuah tali panjangnya 5 m. Tali itu dipotong 1 m 50 cm. Berapa sisa tali?", a: 500, b: 150, jenis: "−" },
  ],
  [
    { teks: "Kebun jagung Paman Meutia panjangnya 5.000 cm. Berapa panjang kebun itu dalam meter?", a: 5000, b: 0, jenis: "u" },
    { teks: "Pagar depan panjangnya 12 m 40 cm dan pagar belakang 8 m 60 cm. Berapa panjang kedua pagar bersama?", a: 1240, b: 860, jenis: "+" },
  ],
];
/** QB10 Susun Kata Satuan Panjang. */
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Satu", "meter", "sama", "dengan", "seratus", "sentimeter"], pengecoh: "sepuluh" },
  { kata: ["Untuk", "mengubah", "meter", "ke", "sentimeter", "kalikan", "dengan", "seratus"], pengecoh: "bagi" },
  { kata: ["Untuk", "mengubah", "sentimeter", "ke", "meter", "bagilah", "dengan", "seratus"], pengecoh: "kalikan" },
  { kata: ["Jumlahkan", "dulu", "satuan", "yang", "sama", "lalu", "tulis", "hasilnya"], pengecoh: "kurangkan" },
];

/* ====================================================================== */
/* Pembantu berat (Sub-Bab C dan D)                                         */
/* ====================================================================== */

/** 1250 menjadi "1.250 g". */
export const teksGram = (g: number): string => `${titik(g)} g`;
/** 2500 menjadi "2 kg 500 g", 2000 menjadi "2 kg", 500 menjadi "500 g". */
export function teksKgG(g: number): string {
  const k = Math.floor(g / 1000);
  const s = g % 1000;
  if (k === 0) return `${s} g`;
  return s === 0 ? `${titik(k)} kg` : `${titik(k)} kg ${s} g`;
}
/** Ubah teks berat kembali menjadi gram (untuk uji): "1.753 g", "2 kg 500 g", "3 ons", "3 kg". */
export function gramDariTeks(teks: string): number {
  const kg = teks.match(/([\d.]+) kg/);
  const ons = teks.match(/([\d.]+) ons/);
  const g = teks.match(/([\d.]+) g(?!\w)/);
  const angka = (m: RegExpMatchArray | null) => (m ? Number(m[1].replace(/\./g, "")) : 0);
  return angka(kg) * 1000 + angka(ons) * 100 + angka(g);
}
/** Tiga pilihan gram: kunci, lebih satu langkah, dan kurang satu langkah (langkah 10 bila di bawah 100, selain itu 50). */
export function opsiGram(n: number, nomor: number): number[] {
  const s = n >= 100 ? 50 : 10;
  const semua = [n, n + s, n > s ? n - s : n + 2 * s];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga pilihan berat pada garis (kelipatan 500 g): kunci, lebih 500 g, dan kurang 500 g (atau lebih 1 kg bila di bawah 1 kg). */
export function opsiBerat500(n: number, nomor: number): number[] {
  const semua = [n, n + 500, n >= 1000 ? n - 500 : n + 1000];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}
/** Tiga pilihan hasil gabungan (kg dan g): kunci, lebih 100 g, dan kurang 100 g (atau lebih 200 g bila di bawah 200 g). */
export function opsiKgG(g: number, nomor: number): { opsi: string[]; jawab: number } {
  return susunOpsi(teksKgG(g), [teksKgG(g + 100), teksKgG(g >= 200 ? g - 100 : g + 200)], nomor);
}

/* ====================================================================== */
/* SUB-BAB C. Pengukuran berat dengan satuan baku                           */
/* ====================================================================== */

export type JenisTimbangan = "digital" | "duduk" | "badan";
export const NAMA_TIMBANGAN: Record<JenisTimbangan, string> = { digital: "Timbangan digital", duduk: "Timbangan duduk", badan: "Timbangan badan" };
export type BendaBerat = { id: string; emoji: string; nama: string; satuan: "gram" | "kilogram"; timbangan: JenisTimbangan };
export const BENDA_BERAT: Record<string, BendaBerat> = {
  telur: { id: "telur", emoji: "🥚", nama: "telur", satuan: "gram", timbangan: "digital" },
  stroberi: { id: "stroberi", emoji: "🍓", nama: "stroberi", satuan: "gram", timbangan: "digital" },
  pensil: { id: "pensil", emoji: "✏️", nama: "pensil", satuan: "gram", timbangan: "digital" },
  buku: { id: "buku", emoji: "📖", nama: "buku", satuan: "gram", timbangan: "digital" },
  permen: { id: "permen", emoji: "🍬", nama: "permen", satuan: "gram", timbangan: "digital" },
  kunci: { id: "kunci", emoji: "🔑", nama: "kunci", satuan: "gram", timbangan: "digital" },
  apel: { id: "apel", emoji: "🍎", nama: "apel", satuan: "kilogram", timbangan: "duduk" },
  semangka: { id: "semangka", emoji: "🍉", nama: "semangka", satuan: "kilogram", timbangan: "duduk" },
  nanas: { id: "nanas", emoji: "🍍", nama: "nanas", satuan: "kilogram", timbangan: "duduk" },
  kentang: { id: "kentang", emoji: "🥔", nama: "kentang", satuan: "kilogram", timbangan: "duduk" },
  ayam: { id: "ayam", emoji: "🐔", nama: "ayam", satuan: "kilogram", timbangan: "duduk" },
  siswa: { id: "siswa", emoji: "🧒", nama: "berat badan siswa", satuan: "kilogram", timbangan: "badan" },
};
export type SoalBerat = { b: string; gram: number };
export const idBerat = (s: SoalBerat): string => `${s.b}${s.gram}`;

/* ------------------------------ Concrete C ------------------------------ */

/** CC1 Baca Timbangan Digital. */
export const RONDE_BACA_CC: SoalBerat[][] = [
  [{ b: "telur", gram: 250 }, { b: "stroberi", gram: 500 }],
  [{ b: "buku", gram: 200 }, { b: "permen", gram: 50 }],
  [{ b: "kunci", gram: 30 }, { b: "pensil", gram: 10 }],
];
/** CC2 Timbangan yang Siap: tiga timbangan duduk, tepat satu jarumnya di angka 0. */
export const RONDE_SIAP_CC: number[][] = [[500, 0, 1500], [0, 2000, 1000], [3000, 500, 0]];
/** CC3 Baca Timbangan Jarum (timbangan duduk, jarum pada kelipatan 500 g, paling banyak 4,5 kg). */
export const RONDE_BACA_JARUM_CC: SoalBerat[][] = [
  [{ b: "semangka", gram: 3000 }, { b: "nanas", gram: 2000 }],
  [{ b: "kentang", gram: 1500 }, { b: "ayam", gram: 2500 }],
  [{ b: "apel", gram: 1000 }, { b: "semangka", gram: 4000 }],
];
/** CC4 Pilih Timbangan. */
export const RONDE_TIMBANGAN_CC: string[][] = [["stroberi", "siswa"], ["semangka", "telur"], ["kunci", "kentang"]];
/** CC5 Jodohkan Benda dan Timbangan: tiga benda berbeda jenis timbangannya. */
export const RONDE_JODOH_CC: string[][] = [["permen", "semangka", "siswa"], ["buku", "nanas", "siswa"], ["pensil", "kentang", "siswa"]];
/** CC6 Memori Timbangan dan Berat (gram, kelipatan 50). */
export const RONDE_MEMORI_CC: number[][] = [[250, 500, 100, 50], [200, 350, 450, 150], [300, 600, 700, 800]];
/** CC7 Ketuk Timbangan dengan Berat. */
export const RONDE_KETUK_CC: { item: SoalBerat[]; tanya: number[] }[] = [
  { item: [{ b: "telur", gram: 250 }, { b: "stroberi", gram: 500 }, { b: "buku", gram: 200 }], tanya: [500, 200] },
  { item: [{ b: "permen", gram: 50 }, { b: "kunci", gram: 30 }, { b: "pensil", gram: 10 }], tanya: [30, 50] },
  { item: [{ b: "telur", gram: 150 }, { b: "buku", gram: 350 }, { b: "stroberi", gram: 450 }], tanya: [450, 150] },
];
/** CC8 Ketuk Semua yang Diukur dengan Gram atau Kilogram. */
export const RONDE_SEMUA_CC: { satuan: "gram" | "kilogram"; item: string[] }[] = [
  { satuan: "gram", item: ["telur", "apel", "pensil", "semangka"] },
  { satuan: "kilogram", item: ["kentang", "buku", "siswa", "kunci"] },
  { satuan: "gram", item: ["ayam", "permen", "nanas", "stroberi"] },
];
/** CC9 Papan Berat (gram, paling banyak 999). */
export const RONDE_PAPAN_CC: SoalBerat[][] = [
  [{ b: "telur", gram: 250 }, { b: "buku", gram: 120 }],
  [{ b: "stroberi", gram: 480 }, { b: "kunci", gram: 90 }],
  [{ b: "stroberi", gram: 750 }, { b: "pensil", gram: 60 }],
];
/** CC10 Urutkan Benda menurut Berat. */
export const RONDE_URUT_CC: { item: SoalBerat[]; dari: "kecil" | "besar" }[] = [
  { item: [{ b: "permen", gram: 50 }, { b: "buku", gram: 200 }, { b: "stroberi", gram: 500 }], dari: "kecil" },
  { item: [{ b: "telur", gram: 250 }, { b: "kunci", gram: 30 }, { b: "buku", gram: 120 }], dari: "besar" },
  { item: [{ b: "stroberi", gram: 400 }, { b: "pensil", gram: 10 }, { b: "telur", gram: 250 }], dari: "kecil" },
];

/* ------------------------------ Picture C ------------------------------ */

/** PC1 Baca Jarum dalam Kilogram (jarum tepat di angka kilogram 1 sampai 4). */
export const RONDE_JARUM_PC: number[][] = [[2, 4], [1, 3], [4, 2]];
/** PC2 Baca Layar Timbangan (gram, paling banyak 999). */
export const RONDE_LAYAR_PC: number[][] = [[250, 480], [120, 360], [750, 90]];
/** PC3 Jodohkan Jarum dan Berat (kilogram). */
export const RONDE_JODOH_PC: number[][] = [[1, 2, 4], [2, 3, 1], [3, 4, 2]];
/** PC4 Memori Layar dan Berat (gram). */
export const RONDE_MEMORI_PC: number[][] = [[250, 500, 100, 750], [200, 350, 450, 650], [300, 600, 150, 850]];
/** PC5 Ketuk Semua Jarum yang Siap (di angka 0): empat jarum, gram. */
export const RONDE_SIAP_PC: number[][] = [[0, 1000, 0, 2000], [500, 0, 3000, 0], [0, 4000, 1000, 0]];
/** PC6 Pilah Berat: gram atau kilogram (hanya nama benda sebagai kata). */
export const RONDE_PILAH_PC: string[][] = [
  ["telur", "pensil", "semangka", "kentang", "buku", "nanas"],
  ["permen", "ayam", "kunci", "siswa", "stroberi", "apel"],
  ["buku", "apel", "telur", "nanas", "pensil", "siswa"],
];
/** PC7 Ketuk Semua Layar Lebih atau Kurang dari Acuan. */
export const RONDE_SEMUA_PC: { acuan: number; arah: "lebih" | "kurang"; item: number[] }[] = [
  { acuan: 250, arah: "lebih", item: [100, 300, 500, 200] },
  { acuan: 400, arah: "kurang", item: [150, 600, 350, 450] },
  { acuan: 500, arah: "lebih", item: [250, 750, 450, 600] },
];
/** PC8 Urutkan Langkah Menimbang. */
export const RONDE_LANGKAH_PC: { judul: string; langkah: string[] }[] = [
  { judul: "Menimbang gula dengan timbangan digital", langkah: ["Pastikan layar menunjukkan angka 0", "Letakkan gula di atas timbangan", "Baca angka yang muncul pada layar", "Tulis hasilnya dengan satuan gram"] },
  { judul: "Menimbang buah dengan timbangan duduk", langkah: ["Pastikan jarum tepat di angka 0", "Letakkan buah di atas piringan", "Baca angka yang ditunjuk jarum", "Tulis hasilnya dengan satuan kg"] },
  { judul: "Menimbang berat badan dengan timbangan badan", langkah: ["Pastikan angka awal adalah 0", "Berdiri tegak di atas timbangan", "Baca angka yang muncul atau ditunjuk", "Tulis hasilnya dengan satuan kg"] },
];
/** PC9 Papan dari Layar (gram, paling banyak 999). */
export const RONDE_PAPAN_PC: number[][] = [[320, 140], [870, 450], [610, 230]];
/** PC10 Selisih Dua Layar: [lebih ringan, lebih berat]. */
export const RONDE_SELISIH_PC: [number, number][][] = [[[100, 500], [200, 700]], [[150, 450], [300, 800]], [[250, 650], [350, 950]]];

/* ------------------------------ Abstract C ------------------------------ */

const SATUAN_B = (tanya: string, benar: "gram (g)" | "kilogram (kg)", pesan: string): SoalTeks => ({
  tanya,
  benar,
  salah: benar === "gram (g)" ? ["kilogram (kg)", "sentimeter (cm)"] : ["gram (g)", "meter (m)"],
  pesan,
});
/** QC1 Pilih Satuan Berat. */
export const RONDE_SATUAN_QC: SoalTeks[][] = [
  [SATUAN_B("Satuan baku yang tepat untuk berat tepung adalah ...", "gram (g)", "Tepung ringan, jadi ditimbang dengan gram."), SATUAN_B("Satuan baku yang tepat untuk berat badan adalah ...", "kilogram (kg)", "Berat badan cukup berat, jadi memakai kilogram.")],
  [SATUAN_B("Satuan baku yang tepat untuk berat pensil adalah ...", "gram (g)", "Pensil sangat ringan, jadi ditimbang dengan gram."), SATUAN_B("Satuan baku yang tepat untuk berat sekarung beras adalah ...", "kilogram (kg)", "Sekarung beras berat, jadi memakai kilogram.")],
  [SATUAN_B("Satuan baku yang tepat untuk berat gula pasir adalah ...", "gram (g)", "Gula pasir ringan, jadi ditimbang dengan gram."), SATUAN_B("Satuan baku yang tepat untuk berat buah di keranjang adalah ...", "kilogram (kg)", "Buah di keranjang cukup berat, jadi memakai kilogram.")],
];
const TIMBANG = (tanya: string, benar: string, salah: [string, string], pesan: string): SoalTeks => ({ tanya, benar, salah, pesan });
/** QC2 Timbangan yang Tepat. */
export const RONDE_TIMBANGAN_QC: SoalTeks[][] = [
  [TIMBANG("Alat ukur yang tepat untuk berat telur adalah ...", "Timbangan digital", ["Timbangan badan", "Penggaris"], "Telur ringan dan ditimbang dalam gram, jadi memakai timbangan digital."), TIMBANG("Alat ukur yang tepat untuk berat badan siswa adalah ...", "Timbangan badan", ["Timbangan digital", "Meteran"], "Berat badan ditimbang dengan timbangan badan.")],
  [TIMBANG("Alat ukur yang tepat untuk berat tepung adalah ...", "Timbangan digital", ["Timbangan badan", "Meteran"], "Tepung ditimbang dalam gram dengan timbangan digital."), TIMBANG("Alat ukur yang tepat untuk berat semangka adalah ...", "Timbangan duduk", ["Penggaris", "Timbangan badan"], "Semangka cukup berat, jadi memakai timbangan duduk dalam kilogram.")],
  [TIMBANG("Alat ukur yang tepat untuk berat pensil adalah ...", "Timbangan digital", ["Meteran", "Timbangan badan"], "Pensil sangat ringan, jadi memakai timbangan digital dalam gram."), TIMBANG("Alat ukur yang tepat untuk berat nanas adalah ...", "Timbangan duduk", ["Timbangan badan", "Penggaris"], "Nanas ditimbang dalam kilogram dengan timbangan duduk.")],
];
/** QC3 Lengkapi Kalimat Pengukuran Berat. */
export const RONDE_KALIMAT_QC: KalimatIsian[][] = [
  [
    { depan: "Alat ukur untuk berat benda disebut", belakang: ".", opsi: ["timbangan", "penggaris", "meteran"], benar: 0 },
    { depan: "Satuan baku berat adalah gram dan", belakang: ".", opsi: ["kilogram", "sentimeter", "meter"], benar: 0 },
    { depan: "Sebelum menimbang, jarum harus tepat di angka", belakang: ".", opsi: ["0", "5", "10"], benar: 0 },
  ],
  [
    { depan: "Benda yang ringan ditimbang dengan satuan", belakang: ".", opsi: ["gram", "kilogram", "meter"], benar: 0 },
    { depan: "Benda yang lebih berat ditimbang dengan satuan", belakang: ".", opsi: ["kilogram", "gram", "sentimeter"], benar: 0 },
    { depan: "Satuan kilogram ditulis dengan huruf", belakang: ".", opsi: ["kg", "cm", "m"], benar: 0 },
  ],
  [
    { depan: "Berat badan diukur dengan timbangan", belakang: ".", opsi: ["badan", "digital kecil", "penggaris"], benar: 0 },
    { depan: "Berat dibaca dari jarum atau dari", belakang: "timbangan.", opsi: ["layar", "kertas", "pita"], benar: 0 },
    { depan: "Berat tepung lebih tepat ditulis dengan satuan", belakang: ".", opsi: ["gram", "kilogram", "liter"], benar: 0 },
  ],
];
/** QC4 Jodohkan Benda dan Timbangan. */
export const RONDE_JODOH_QC: { kiri: string; kanan: string }[][] = [
  [{ kiri: "Berat telur", kanan: "Timbangan digital" }, { kiri: "Berat badan", kanan: "Timbangan badan" }, { kiri: "Berat semangka", kanan: "Timbangan duduk" }],
  [{ kiri: "Berat tepung", kanan: "Timbangan digital" }, { kiri: "Berat badan adik", kanan: "Timbangan badan" }, { kiri: "Berat nanas", kanan: "Timbangan duduk" }],
  [{ kiri: "Berat pensil", kanan: "Timbangan digital" }, { kiri: "Berat badan Eri", kanan: "Timbangan badan" }, { kiri: "Berat kentang", kanan: "Timbangan duduk" }],
];
/** QC5 Memori Benda dan Berat yang Wajar. */
export const RONDE_MEMORI_QC: { a: string; b: string }[][] = [
  [{ a: "Telur", b: "60 g" }, { a: "Semangka", b: "3 kg" }, { a: "Pensil", b: "10 g" }, { a: "Siswa kelas 3", b: "30 kg" }],
  [{ a: "Buku tulis", b: "200 g" }, { a: "Kentang", b: "1 kg" }, { a: "Permen", b: "5 g" }, { a: "Karung beras", b: "25 kg" }],
  [{ a: "Kunci", b: "20 g" }, { a: "Nanas", b: "2 kg" }, { a: "Sepatu", b: "500 g" }, { a: "Ayam", b: "2 kg 500 g" }],
];
/** QC6 Benar atau Salah. */
export const RONDE_BENARSALAH_QC: Pernyataan[][] = [
  [
    { teks: "Timbangan digital adalah salah satu alat pengukur berat.", benar: true, penjelasan: "Timbangan digital dipakai untuk mengukur berat benda." },
    { teks: "Satuan baku berat adalah gram dan kilogram.", benar: true, penjelasan: "Gram (g) dan kilogram (kg) adalah satuan baku berat." },
    { teks: "Berat tepung lebih tepat ditulis dengan satuan kilogram.", benar: false, penjelasan: "Tepung ringan, jadi lebih tepat ditulis dengan gram." },
    { teks: "Berat badan lebih tepat ditulis dengan satuan kilogram.", benar: true, penjelasan: "Berat badan cukup berat, jadi memakai kilogram." },
    { teks: "Sebelum menimbang, jarum timbangan harus tepat di angka 0.", benar: true, penjelasan: "Menimbang harus dimulai dari angka 0 supaya hasilnya tepat." },
  ],
  [
    { teks: "Kilogram dapat ditulis dengan kg.", benar: true, penjelasan: "Kilogram ditulis kg dan gram ditulis g." },
    { teks: "Berat pensil lebih tepat ditulis dengan satuan kilogram.", benar: false, penjelasan: "Pensil sangat ringan, jadi lebih tepat ditulis dengan gram." },
    { teks: "Berat sekarung beras lebih tepat ditulis dengan satuan kilogram.", benar: true, penjelasan: "Sekarung beras berat, jadi memakai kilogram." },
    { teks: "Penggaris dipakai untuk mengukur berat benda.", benar: false, penjelasan: "Penggaris mengukur panjang. Untuk berat dipakai timbangan." },
    { teks: "Jarum timbangan boleh mulai dari angka 3 sebelum menimbang.", benar: false, penjelasan: "Jarum harus tepat di angka 0 sebelum menimbang." },
  ],
];
/** QC7 Detektif Berat. */
export const RONDE_DETEKTIF_QC: SoalDetektif[] = [
  { klue: ["Aku berat stroberi pada timbangan pertama, yaitu 100 gram.", "Aku kurang dari 500."], jawab: 100, opsi: [100, 500, 10], salah: "Timbangan pertama menunjukkan 100 gram." },
  { klue: ["Aku berat tepung dalam gram: 1 kg 250 g.", "Satuanku 0."], jawab: 1250, opsi: [1250, 1025, 2150], salah: "1 kg 250 g = 1.000 g + 250 g = 1.250 g." },
  { klue: ["Aku banyak gram pada 3 kg.", "Aku punya tiga angka nol."], jawab: 3000, opsi: [3000, 300, 30000], salah: "3 kg = 3 × 1.000 g = 3.000 g." },
  { klue: ["Aku berat telur pada timbangan digital: 250 gram.", "Aku bilangan genap."], jawab: 250, opsi: [250, 25, 205], salah: "Timbangan menunjukkan 250 gram dan 250 genap." },
];
/** QC8 Peta Konsep Pengukuran Berat. */
export const PETA_KONSEP_QC: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Pengukuran berat",
    kotak: [
      { label: "Alat ukur berat adalah", opsi: ["timbangan", "penggaris", "meteran"], benar: 0 },
      { label: "Satuan baku berat adalah gram dan", opsi: ["kilogram", "sentimeter", "liter"], benar: 0 },
      { label: "Benda ringan seperti tepung ditimbang dengan satuan", opsi: ["gram", "kilogram", "meter"], benar: 0 },
      { label: "Menurutku, berat badan ditulis dengan satuan", opsi: ["kg", "cm", "m"], benar: 0 },
    ],
  },
  {
    pusat: "Cara menimbang",
    kotak: [
      { label: "Sebelum menimbang, jarum harus di angka", opsi: ["0", "5", "10"], benar: 0 },
      { label: "Benda diletakkan di atas", opsi: ["piringan timbangan", "penggaris", "meja saja"], benar: 0 },
      { label: "Berat dibaca dari jarum atau", opsi: ["layar", "penggaris", "gelas"], benar: 0 },
      { label: "Menurutku, hasil ditulis dengan", opsi: ["satuan baku", "gambar", "warna"], benar: 0 },
    ],
  },
];
/** QC9 Soal Cerita Berat (hasil dalam gram). */
export const RONDE_CERITA_QC: CeritaMC[][] = [
  [
    { teks: "Meutia menimbang gula 1.000 gram dan tepung 1.250 gram. Berapa gram berat kedua bahan itu bersama?", a: 1000, b: 1250, jenis: "+" },
    { teks: "Berat stroberi pada timbangan pertama 100 gram dan pada timbangan kedua 500 gram. Berapa gram berat stroberi tambahan?", a: 500, b: 100, jenis: "−" },
  ],
  [
    { teks: "Telur seberat 250 gram dan mentega seberat 200 gram ditimbang bersama. Berapa gram berat keduanya?", a: 250, b: 200, jenis: "+" },
    { teks: "Gula 1.000 gram dipakai 350 gram untuk membuat kue. Berapa gram sisa gula?", a: 1000, b: 350, jenis: "−" },
  ],
  [
    { teks: "Dua kantong jeruk masing-masing 500 gram. Berapa gram berat kedua kantong jeruk?", a: 500, b: 500, jenis: "+" },
    { teks: "Tepung 1.250 gram dipakai 750 gram. Berapa gram sisa tepung?", a: 1250, b: 750, jenis: "−" },
  ],
];
/** Tiga pilihan hasil cerita dalam gram: kunci, lebih 100, dan kurang 100 (atau lebih 200 bila di bawah 200). */
export function opsiCeritaG(c: CeritaMC, nomor: number): { opsi: string[]; jawab: number } {
  const j = jawabCerita(c);
  return susunOpsi(teksGram(j), [teksGram(j + 100), teksGram(j >= 200 ? j - 100 : j + 200)], nomor);
}
/** QC10 Susun Kata Pengukuran Berat. */
export const RONDE_SUSUNKATA_QC: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Timbangan", "digital", "dipakai", "untuk", "mengukur", "berat", "benda"], pengecoh: "panjang" },
  { kata: ["Satuan", "baku", "berat", "adalah", "gram", "dan", "kilogram"], pengecoh: "meter" },
  { kata: ["Jarum", "timbangan", "harus", "tepat", "di", "angka", "nol"], pengecoh: "sepuluh" },
  { kata: ["Gram", "dipakai", "untuk", "menimbang", "benda", "yang", "ringan"], pengecoh: "berat" },
];

/* ====================================================================== */
/* SUB-BAB D. Hubungan antarsatuan baku berat                               */
/* ====================================================================== */

export type JenisBandul = "ss" | "s" | "d" | "sk" | "k";
/** Bandul timbangan kodok: 1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg. */
export const BANDUL: Record<JenisBandul, number> = { ss: 50, s: 100, d: 200, sk: 500, k: 1000 };
export const NAMA_BANDUL: Record<JenisBandul, string> = { ss: "1/2 ons", s: "1 ons", d: "2 ons", sk: "1/2 kg", k: "1 kg" };
export const URUT_BANDUL: JenisBandul[] = ["k", "sk", "d", "s", "ss"];
export type Susunan = Partial<Record<JenisBandul, number>>;
export const gramSusunan = (s: Susunan): number => URUT_BANDUL.reduce((jumlah, j) => jumlah + (s[j] ?? 0) * BANDUL[j], 0);
export const banyakBandul = (s: Susunan): number => URUT_BANDUL.reduce((jumlah, j) => jumlah + (s[j] ?? 0), 0);
/** Susunan menjadi teks, mis. "1 kg + 2 × 1 ons". */
export const teksSusunan = (s: Susunan): string =>
  URUT_BANDUL.filter((j) => (s[j] ?? 0) > 0)
    .map((j) => ((s[j] ?? 0) === 1 ? NAMA_BANDUL[j] : `${s[j]} × ${NAMA_BANDUL[j]}`))
    .join(" + ");
export const idSusunan = (s: Susunan): string => `g${gramSusunan(s)}`;

/* ------------------------------ Concrete D ------------------------------ */

/** CD1 Rakit Berat dengan Bandul (gram, kelipatan 50, paling banyak 2.500). */
export const RONDE_RAKIT_CD: number[][] = [[300, 1250], [750, 1500], [1100, 2050]];
/** CD2 Hitung Berat Bandul. */
export const RONDE_HITUNG_CD: Susunan[][] = [
  [{ k: 1, s: 2 }, { sk: 1, d: 1 }],
  [{ k: 2, ss: 1 }, { sk: 2, s: 3 }],
  [{ k: 1, sk: 1, s: 1 }, { d: 3, s: 1 }],
];
/** CD3 Ubah Kilogram ke Gram (banyak bandul 1 kg). */
export const RONDE_KGKEG_CD: number[][] = [[2, 4], [3, 5], [6, 7]];
/** CD4 Ubah Gram ke Kilogram (gram kelipatan 1.000). */
export const RONDE_GKEKG_CD: number[][] = [[2000, 4000], [5000, 3000], [6000, 7000]];
/** CD5 Jodohkan Bandul dan Berat. */
export const RONDE_JODOH_CD: Susunan[][] = [
  [{ k: 1, s: 2 }, { sk: 1, d: 1 }, { ss: 3 }],
  [{ k: 1, sk: 1 }, { d: 2, s: 1 }, { s: 2, ss: 1 }],
  [{ k: 2 }, { sk: 3 }, { d: 1, s: 1 }],
];
/** CD6 Memori Bandul dan Berat. */
export const RONDE_MEMORI_CD: Susunan[][] = [
  [{ k: 1 }, { sk: 1, s: 1 }, { d: 2 }, { s: 3, ss: 1 }],
  [{ k: 1, s: 2 }, { sk: 2 }, { d: 1, ss: 1 }, { s: 1 }],
  [{ k: 2, ss: 1 }, { sk: 1, d: 1 }, { d: 3 }, { k: 1, s: 1 }],
];
/** CD7 Ketuk Bandul dengan Berat. */
export const RONDE_KETUK_CD: { item: Susunan[]; tanya: number[] }[] = [
  { item: [{ k: 1, s: 2 }, { sk: 1, d: 1 }, { ss: 3 }], tanya: [700, 150] },
  { item: [{ k: 1, sk: 1 }, { d: 2, s: 1 }, { s: 2, ss: 1 }], tanya: [1500, 250] },
  { item: [{ k: 2 }, { sk: 3 }, { d: 1, s: 1 }], tanya: [300, 2000] },
];
/** CD8 Ketuk Semua yang Sama Berat. */
export const RONDE_SEMUA_CD: { acuan: number; item: Susunan[] }[] = [
  { acuan: 1000, item: [{ k: 1 }, { s: 10 }, { sk: 2 }, { s: 5 }] },
  { acuan: 500, item: [{ sk: 1 }, { s: 5 }, { d: 2, s: 1 }, { k: 1 }] },
  { acuan: 2000, item: [{ k: 2 }, { k: 1, sk: 2 }, { s: 10 }, { k: 1, s: 5 }] },
];
/** CD9 Ubah Ons ke Gram (banyak bandul 1 ons, paling banyak 9). */
export const RONDE_ONS_CD: number[][] = [[3, 5], [7, 4], [9, 6]];
/** CD10 Urutkan Bandul menurut Berat. */
export const RONDE_URUT_CD: { item: Susunan[]; dari: "kecil" | "besar" }[] = [
  { item: [{ ss: 3 }, { k: 1 }, { d: 1, s: 1 }], dari: "kecil" },
  { item: [{ sk: 1, s: 1 }, { d: 1 }, { k: 1, ss: 1 }], dari: "besar" },
  { item: [{ s: 2 }, { sk: 1 }, { d: 3 }], dari: "kecil" },
];

/* ------------------------------ Picture D ------------------------------ */

/** PD1 Hitung Garis Berat (kelipatan 500 g, paling banyak 4 kg). */
export const RONDE_GARIS_PD: number[][] = [[1500, 2500], [1000, 3500], [2000, 500]];
/** PD2 Lengkapi Kalimat Ubah Berat: g = kg + g. */
export const RONDE_KALIMAT_PD: number[] = [1250, 2300, 3750];
export function kalimatKonversiBerat(g: number, nomor: number): KalimatIsian[] {
  const k = Math.floor(g / 1000);
  const s = g % 1000;
  const pil = (v: number, i: number, langkah: number) => {
    const a = v + langkah;
    const b = v > langkah ? v - langkah : v + 2 * langkah;
    const opsi = urutanTetap(3, 2, nomor + i).map((x) => [v, a, b][x]);
    return { opsi: opsi.map(titik), benar: opsi.indexOf(v) };
  };
  return [
    { depan: `${titik(g)} g = ${titik(k * 1000)} g +`, belakang: "g.", ...pil(s, 0, 50) },
    { depan: `${k} kg =`, belakang: "g.", ...pil(k * 1000, 1, 1000) },
    { depan: `${titik(g)} g =`, belakang: `kg ${s} g.`, ...pil(k, 2, 1) },
  ];
}
/** PD3 Jodohkan Garis dan Berat. */
export const RONDE_JODOH_PD: number[][] = [[500, 1500, 2500], [1000, 2000, 3500], [1500, 3000, 4000]];
/** PD4 Memori Garis dan Berat. */
export const RONDE_MEMORI_PD: number[][] = [[500, 1500, 2500, 3500], [1000, 2000, 3000, 4000], [1000, 2500, 3000, 3500]];
/** PD5 Isi Tabel Ubah Berat. */
export const RONDE_TABEL_PD: TabelUkur[] = [
  tabelUkur([1250, 2500, 3100, 4700].map((v) => ({ label: teksKgG(v), jawab: teksGram(v) })), "1.520 g", 1),
  tabelUkur([1500, 2750, 3400, 1100].map((v) => ({ label: teksGram(v), jawab: teksKgG(v) })), "1 kg 5 g", 2),
  tabelUkur([{ label: "3 ons", jawab: "300 g" }, { label: "1 kg", jawab: "10 ons" }, { label: "700 g", jawab: "7 ons" }, { label: "5 ons", jawab: "500 g" }], "50 g", 3),
];
/** PD6 Ketuk Semua Berat yang Sama: tiap berat ditulis [kg, g]. */
export type BeratKG = [number, number];
export const gramKG = (u: BeratKG): number => u[0] * 1000 + u[1];
export const labelKG = (u: BeratKG): string => (u[0] === 0 ? teksGram(u[1]) : u[1] === 0 ? `${u[0]} kg` : `${u[0]} kg ${titik(u[1])} g`);
export const RONDE_SEMUA_PD: { acuan: number; item: BeratKG[] }[] = [
  { acuan: 2000, item: [[2, 0], [1, 1000], [0, 2000], [2, 100]] },
  { acuan: 1500, item: [[1, 500], [0, 1500], [1, 50], [1, 5]] },
  { acuan: 3000, item: [[3, 0], [0, 3000], [2, 1000], [3, 100]] },
];
/** PD7 Pilah Berat: pas kilogram atau bersisa gram. */
export const RONDE_PILAH_PD: number[][] = [[3000, 2500, 4000, 1750, 5000, 1300], [1000, 2050, 2000, 1500, 3000, 3100], [4000, 1080, 5000, 2400, 6000, 3650]];
export const pasKg = (g: number): boolean => g % 1000 === 0;
/** PD8 Urutkan Langkah Mengubah Berat. */
export const RONDE_LANGKAH_PD: { judul: string; langkah: string[] }[] = [
  { judul: "Mengubah 1.753 g menjadi kilogram dan gram", langkah: ["Tulis ukuran 1.753 g", "Ambil 1.000 g, itu 1 kg", "Sisanya 753 g", "Tulis hasilnya 1 kg 753 g"] },
  { judul: "Mengubah 4 kg menjadi gram", langkah: ["Tulis ukuran 4 kg", "Ingat 1 kg sama dengan 1.000 g", "Kalikan 4 dengan 1.000", "Tulis hasilnya 4.000 g"] },
  { judul: "Mengubah 3 ons menjadi gram", langkah: ["Tulis ukuran 3 ons", "Ingat 1 ons sama dengan 100 g", "Kalikan 3 dengan 100", "Tulis hasilnya 300 g"] },
];
/** PD9 Selisih Dua Garis Berat: [lebih berat, lebih ringan], kelipatan 500 g. */
export const RONDE_SELISIH_PD: [number, number][][] = [[[3000, 1500], [2500, 1000]], [[3500, 2000], [4000, 1500]], [[2000, 500], [3000, 500]]];
/** PD10 Sambung Dua Garis Berat: [pertama, kedua], gabungan paling banyak 4 kg. */
export const RONDE_SAMBUNG_PD: [number, number][][] = [[[1000, 1500], [500, 2000]], [[1500, 1500], [1000, 2500]], [[2000, 1000], [2500, 500]]];

/* ------------------------------ Abstract D ------------------------------ */

/** QD1 Ubah Kilogram ke Gram. */
export const RONDE_KG_QD: number[][] = [[4, 9], [2, 7], [3, 10]];
export function opsiKgKeG(m: number, nomor: number): { opsi: string[]; jawab: number } {
  return susunOpsi(teksGram(m * 1000), [teksGram(m * 100), teksGram(m * 10000)], nomor);
}
/** QD2 Ubah Gram ke Kilogram dan Gram. */
export const RONDE_G_QD: number[][] = [[1200, 2300], [3450, 1075], [4500, 2005]];
/** QD3 Ubah antara kilogram, ons, dan gram. */
export const RONDE_ONS_QD: SoalTeks[][] = [
  [
    { tanya: "1 kg = ... ons", benar: "10 ons", salah: ["100 ons", "1.000 ons"], pesan: "1 kilogram sama dengan 10 ons." },
    { tanya: "1 ons = ... g", benar: "100 g", salah: ["10 g", "1.000 g"], pesan: "1 ons sama dengan 100 gram." },
  ],
  [
    { tanya: "3 ons = ... g", benar: "300 g", salah: ["30 g", "3.000 g"], pesan: "3 ons = 3 × 100 g = 300 g." },
    { tanya: "5 kg = ... ons", benar: "50 ons", salah: ["500 ons", "5 ons"], pesan: "5 kg = 5 × 10 ons = 50 ons." },
  ],
  [
    { tanya: "700 g = ... ons", benar: "7 ons", salah: ["70 ons", "700 ons"], pesan: "700 g : 100 = 7 ons." },
    { tanya: "20 ons = ... kg", benar: "2 kg", salah: ["20 kg", "200 kg"], pesan: "20 ons : 10 = 2 kg." },
  ],
];
/** QD4 Jodohkan Berat. */
export const RONDE_JODOH_QD: { kiri: string; kanan: string }[][] = [
  [{ kiri: "3 kg", kanan: "3.000 g" }, { kiri: "1.200 g", kanan: "1 kg 200 g" }, { kiri: "5 ons", kanan: "500 g" }],
  [{ kiri: "2 kg", kanan: "2.000 g" }, { kiri: "4 kg 150 g", kanan: "4.150 g" }, { kiri: "10 ons", kanan: "1 kg" }],
  [{ kiri: "20 kg", kanan: "20.000 g" }, { kiri: "2.500 g", kanan: "2 kg 500 g" }, { kiri: "3 ons", kanan: "300 g" }],
];
/** QD5 Memori Berat. */
export const RONDE_MEMORI_QD: { a: string; b: string }[][] = [
  [{ a: "1 kg", b: "1.000 g" }, { a: "2 kg 500 g", b: "2.500 g" }, { a: "3.000 g", b: "3 kg" }, { a: "1 ons", b: "100 g" }],
  [{ a: "5 kg", b: "5.000 g" }, { a: "1.750 g", b: "1 kg 750 g" }, { a: "4 ons", b: "400 g" }, { a: "10 ons", b: "1 kg" }],
  [{ a: "6 kg", b: "6.000 g" }, { a: "3 kg 250 g", b: "3.250 g" }, { a: "8.000 g", b: "8 kg" }, { a: "7 ons", b: "700 g" }],
];
/** QD6 Benar atau Salah. */
export const RONDE_BENARSALAH_QD: Pernyataan[][] = [
  [
    { teks: "1 kg = 1.000 g.", benar: true, penjelasan: "Satu kilogram sama dengan seribu gram." },
    { teks: "1 kg = 100 g.", benar: false, penjelasan: "1 kilogram sama dengan 1.000 g, bukan 100 g." },
    { teks: "1 ons = 100 g.", benar: true, penjelasan: "Satu ons sama dengan seratus gram." },
    { teks: "3 kg = 300 g.", benar: false, penjelasan: "3 kg = 3 × 1.000 g = 3.000 g." },
    { teks: "1.753 g = 1 kg 753 g.", benar: true, penjelasan: "1.753 g = 1.000 g + 753 g = 1 kg 753 g." },
  ],
  [
    { teks: "2.000 g = 2 kg.", benar: true, penjelasan: "2.000 g dibagi 1.000 sama dengan 2 kg." },
    { teks: "1 kg = 100 ons.", benar: false, penjelasan: "1 kilogram sama dengan 10 ons, bukan 100 ons." },
    { teks: "4 kg 150 g = 4.150 g.", benar: true, penjelasan: "4 kg = 4.000 g, ditambah 150 g menjadi 4.150 g." },
    { teks: "1.200 g = 12 kg.", benar: false, penjelasan: "1.200 g = 1 kg 200 g, bukan 12 kg." },
    { teks: "Mangga 8.000 g sama dengan 80 kg.", benar: false, penjelasan: "8.000 g dibagi 1.000 sama dengan 8 kg." },
  ],
];
/** QD7 Detektif Satuan Berat. */
export const RONDE_DETEKTIF_QD: SoalDetektif[] = [
  { klue: ["Aku banyak gram pada 4 kg.", "Aku punya tiga angka nol."], jawab: 4000, opsi: [4000, 400, 40000], salah: "4 kg = 4 × 1.000 g = 4.000 g." },
  { klue: ["Aku banyak gram pada 1 kg 753 g.", "Satuanku 3."], jawab: 1753, opsi: [1753, 1357, 1537], salah: "1 kg 753 g = 1.000 g + 753 g = 1.753 g." },
  { klue: ["Aku banyak ons pada 1 kg.", "Aku bilangan genap kurang dari 20."], jawab: 10, opsi: [10, 100, 11], salah: "1 kg = 10 ons, dan 10 genap kurang dari 20." },
  { klue: ["Aku banyak kilogram pada 5.000 g.", "Aku kurang dari 10."], jawab: 5, opsi: [5, 50, 500], salah: "5.000 g dibagi 1.000 sama dengan 5 kg." },
];
/** QD8 Peta Konsep Satuan Berat. */
export const PETA_KONSEP_QD: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Kilogram dan gram",
    kotak: [
      { label: "1 kilogram sama dengan", opsi: ["1.000 g", "100 g", "10 g"], benar: 0 },
      { label: "Untuk mengubah kg ke g, kita", opsi: ["mengalikan dengan 1.000", "membagi dengan 1.000", "menambah 1.000"], benar: 0 },
      { label: "Untuk mengubah g ke kg, kita", opsi: ["membagi dengan 1.000", "mengalikan dengan 1.000", "mengurangi 1.000"], benar: 0 },
      { label: "Menurutku, 5 kg sama dengan", opsi: ["5.000 g", "500 g", "50 g"], benar: 0 },
    ],
  },
  {
    pusat: "Ons dan gram",
    kotak: [
      { label: "1 ons sama dengan", opsi: ["100 g", "10 g", "1.000 g"], benar: 0 },
      { label: "1 kilogram sama dengan", opsi: ["10 ons", "100 ons", "1 ons"], benar: 0 },
      { label: "1.753 g sama dengan", opsi: ["1 kg 753 g", "17 kg 53 g", "175 kg 3 g"], benar: 0 },
      { label: "Menurutku, 3 ons sama dengan", opsi: ["300 g", "30 g", "3.000 g"], benar: 0 },
    ],
  },
];
/** QD9 Soal Cerita: hasil dalam kilogram dan gram. Jenis "+" dijumlahkan, "−" dikurangkan, "u" diubah menjadi kg dan g. */
export const RONDE_CERITA_QD: CeritaMC[][] = [
  [
    { teks: "Meutia memanen mangga 8.000 gram. Ia menjual 4 kg. Berapa sisa mangga yang belum terjual?", a: 8000, b: 4000, jenis: "−" },
    { teks: "Dua kantong jeruk masing-masing 500 gram. Berapa berat kedua kantong jeruk bersama?", a: 500, b: 500, jenis: "+" },
  ],
  [
    { teks: "Karung pertama berisi beras 30 kg 250 g dan karung kedua 12 kg 500 g. Berapa berat beras seluruhnya?", a: 30250, b: 12500, jenis: "+" },
    { teks: "Pak Ahmad punya beras 20 kg. Ia menjual 7 kg 500 g. Berapa sisa beras?", a: 20000, b: 7500, jenis: "−" },
  ],
  [
    { teks: "Tepung yang ditimbang Meutia 1.753 gram. Berapa berat tepung itu dalam kilogram dan gram?", a: 1753, b: 0, jenis: "u" },
    { teks: "Berat semangka 2 kg 500 g dan berat nanas 1 kg 800 g. Berapa berat keduanya bersama?", a: 2500, b: 1800, jenis: "+" },
  ],
];
/** Tiga pilihan hasil cerita dalam kilogram dan gram. */
export function opsiCeritaKg(c: CeritaMC, nomor: number): { opsi: string[]; jawab: number } {
  return opsiKgG(jawabCerita(c), nomor);
}
/** QD10 Susun Kata Satuan Berat. */
export const RONDE_SUSUNKATA_QD: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Satu", "kilogram", "sama", "dengan", "seribu", "gram"], pengecoh: "sepuluh" },
  { kata: ["Satu", "ons", "sama", "dengan", "seratus", "gram"], pengecoh: "seribu" },
  { kata: ["Untuk", "mengubah", "kilogram", "ke", "gram", "kalikan", "seribu"], pengecoh: "bagi" },
  { kata: ["Timbangan", "kodok", "memakai", "bandul", "sebagai", "ukuran", "berat"], pengecoh: "panjang" },
];
