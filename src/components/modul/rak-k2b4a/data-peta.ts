/**
 * Isi Mind-map (Rak Kayu), Infografis (Kartu Denah), dan Simulasi (Rak Pameran) Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan", awal cerita Pameran
 * Kerajinan Sekolah. Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (guci, kendi, topeng, wayang kertas, boneka kain). Simulasi memakai
 * benda lain (payung kertas, topi anyaman, bunga kertas, keranjang, layang-layang, lonceng). Diuji: scripts/uji-rak-k2b4a.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";
import type { BendaSim, TekaSim, TugasBaca } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: rak kayu bertingkat ------------------------------ */
export const PUSAT_RAK = "Posisi benda: enam kata posisi";
export const KELOMPOK_RAK: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Tingkat bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Petak ini kuning. Taruh di tingkat bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Tingkat tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Petak ini biru. Taruh di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Tingkat atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Petak ini hijau. Taruh di tingkat atas, tempat hasil." },
};
export const TEMPAT_RAK: Tempat[] = [
  tp("rk-m1", "masalah", "Benda salah letak"),
  tp("rk-m2", "masalah", "Kanan dan kiri tertukar"),
  tp("rk-m3", "masalah", "Petunjuk letak kurang jelas"),
  tp("rk-p1", "metode", "Tentukan dulu siapa yang melihat", 1),
  tp("rk-p2", "metode", "Pakai benda acuan", 2),
  tp("rk-p3", "metode", "Sebut kata posisinya", 3),
  tp("rk-p4", "metode", "Susun kalimat tiga bagian", 4),
  tp("rk-p5", "metode", "Simon Berkata: dengar katanya", 5),
  tp("rk-p6", "metode", "Peta Harta Karun: geser kotak", 6),
  tp("rk-p7", "metode", "Permainan Sekat: gabung petunjuk", 7),
  tp("rk-h1", "hasil", "Enam kata posisi"),
  tp("rk-h2", "hasil", "Setiap kata punya lawan"),
  tp("rk-h3", "hasil", "Kalimat posisi yang tepat"),
  tp("rk-h4", "hasil", "Dua petunjuk sisakan satu"),
];
export const PETUNJUK_URUT_RAK = "Warnanya sudah benar. Nomor petaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_RAK =
  "Ini rak kayu bertingkat. Tingkat bawah berisi masalah. Tingkat tengah punya tujuh petak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Tingkat atas berisi hasil. Ketuk label, lalu ketuk petak yang cocok.";

/* ------------------------------ Infografis: kartu denah Bu Sari ------------------------------ */
export const KOLOM_DENAH = ["Kata posisi", "Kalimat posisi", "Kalimat lawannya"] as const;
export const BARIS_DENAH: { ikon: string; nama: string; kata: string; kalimat: string; lawan: string }[] = [
  { ikon: "\u{1F3FA}", nama: "Guci", kata: "di atas", kalimat: "guci di atas rak", lawan: "rak di bawah guci" },
  { ikon: "\u{1F375}", nama: "Kendi", kata: "di bawah", kalimat: "kendi di bawah rak", lawan: "rak di atas kendi" },
  { ikon: "\u{1F3AD}", nama: "Topeng", kata: "di depan", kalimat: "topeng di depan lampion", lawan: "lampion di belakang topeng" },
  { ikon: "\u{1F9CD}", nama: "Wayang kertas", kata: "di sebelah kanan", kalimat: "wayang di kanan guci", lawan: "guci di kiri wayang" },
  { ikon: "\u{1F9F8}", nama: "Boneka kain", kata: "di atas dan kanan", kalimat: "boneka di kanan lampion", lawan: "lampion di kiri boneka" },
];
export const TEMPAT_DENAH: Tempat[] = BARIS_DENAH.flatMap((b, i) => [tp(`d${i}-kata`, "kata", b.kata), tp(`d${i}-kalimat`, "kalimat", b.kalimat), tp(`d${i}-lawan`, "lawan", b.lawan)]);
export const KELOMPOK_DENAH: Record<string, string> = {
  kata: "Label ini kata posisi. Tempelkan di kolom Kata posisi.",
  kalimat: "Label ini kalimat posisi dengan tiga bagian. Tempelkan di kolom Kalimat posisi.",
  lawan: "Label ini kalimat lawannya, benda dan acuan bertukar tempat. Tempelkan di kolom Kalimat lawannya.",
};
export const SUARA_DENAH = "Ini kartu denah Bu Sari, dari cerita rak pameran Pak Hasan. Tiap baris satu karya. Tempelkan kata posisinya, kalimat posisinya, dan kalimat lawannya.";

/* ------------------------------ Simulasi: Rak Pameran (berbeda dari Story) ------------------------------ */
/**
 * Enam karya di baki, rak berpetak tiga kolom dua baris. Tiap karya punya kartu denah yang menyebut letaknya terhadap karya lain, sehingga petak tujuannya
 * dapat dihitung: payung kertas di atas keranjang, topi anyaman di kanan payung kertas, bunga kertas di kanan topi anyaman, keranjang di bawah payung kertas,
 * layang-layang di bawah topi anyaman, lonceng di kanan layang-layang.
 */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "payung", nama: "payung kertas", emoji: "\u{1F302}", warna: "#FCA5A5", kol: 0, bar: 0, kartu: { kata: "atas", acuan: 3 } },
  { id: "topi", nama: "topi anyaman", emoji: "\u{1F452}", warna: "#FDE68A", kol: 1, bar: 0, kartu: { kata: "kanan", acuan: 0 } },
  { id: "bunga", nama: "bunga kertas", emoji: "\u{1F338}", warna: "#F9A8D4", kol: 2, bar: 0, kartu: { kata: "kanan", acuan: 1 } },
  { id: "keranjang", nama: "keranjang", emoji: "\u{1F9FA}", warna: "#FDBA74", kol: 0, bar: 1, kartu: { kata: "bawah", acuan: 0 } },
  { id: "layang", nama: "layang-layang", emoji: "\u{1FA81}", warna: "#93C5FD", kol: 1, bar: 1, kartu: { kata: "bawah", acuan: 1 } },
  { id: "lonceng", nama: "lonceng", emoji: "\u{1F514}", warna: "#FDE047", kol: 2, bar: 1, kartu: { kata: "kanan", acuan: 4 } },
];
export const KOLOM_SIM = 3;
export const BARIS_SIM = 2;
/** Tugas Baca: anak membelakangi kita, jadi kanan dan kiri sama dengan kita. */
export const TUGAS_BACA: readonly TugasBaca[] = [
  { acuan: 0, kata: "kanan", jawab: 1 },
  { acuan: 2, kata: "kiri", jawab: 1 },
  { acuan: 4, kata: "kiri", jawab: 3 },
  { acuan: 4, kata: "kanan", jawab: 5 },
];
/** Teka-teki Gabung: dua petunjuk digabung sampai tinggal satu benda. */
export const TEKA_SIM: readonly TekaSim[] = [
  { petunjuk: [{ j: "tingkat", bar: 0 }, { j: "rel", kata: "kanan", acuan: 1 }], jawab: 2 },
  { petunjuk: [{ j: "tingkat", bar: 1 }, { j: "rel", kata: "kiri", acuan: 4 }], jawab: 3 },
  { petunjuk: [{ j: "tingkat", bar: 1 }, { j: "rel", kata: "kanan", acuan: 4 }], jawab: 5 },
];
export const MISI_RAK_TEKS =
  "Misi Rak Pameran: taruh karya di petak sesuai kartu denah, lihat kalimat lawannya, baca kanan dan kiri dari posisi pembaca, lalu gabungkan dua petunjuk sampai tinggal satu benda. Urutannya bebas.";
