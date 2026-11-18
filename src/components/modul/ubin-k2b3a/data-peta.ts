/**
 * Isi Mind-map (Pagar Petak), Infografis (Papan Pengumuman), dan Simulasi (Petak Ubin) Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain",
 * awal cerita Taman Bermain Sekolah. Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (sarang lebah enam sisi, papan perosotan,
 * rumah burung, ubin tiga sisi, uang logam, ubin telur). Simulasi memakai ubin lain (bendera, layang-layang, pos jaga, kolam bata, papan petunjuk,
 * roda, kolam oval). Diuji: scripts/uji-ubin-k2b3a.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";
import type { UbinSim } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: pagar taman dengan papan petak ------------------------------ */
export const PUSAT_PAGAR = "Bangun datar: segi banyak dan bentuk lengkung";
export const KELOMPOK_PAGAR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Petak ini kuning. Pasang di papan bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Papan tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Petak ini biru. Pasang di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Papan atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Petak ini hijau. Pasang di papan atas, tempat hasil." },
};
export const TEMPAT_PAGAR: Tempat[] = [
  tp("pg-m1", "masalah", "Bentuk belum dikenali"),
  tp("pg-m2", "masalah", "Sisi terhitung dua kali"),
  tp("pg-m3", "masalah", "Tepi lurus dan lengkung tercampur"),
  tp("pg-p1", "metode", "Lihat tepi: lurus atau lengkung", 1),
  tp("pg-p2", "metode", "Tandai Awal, Hitung Berputar", 2),
  tp("pg-p3", "metode", "Papan Paku: karet jadi sisi", 3),
  tp("pg-p4", "metode", "Diagram Venn: dua ciri sekaligus", 4),
  tp("pg-p5", "metode", "Berburu Bentuk di sekitar", 5),
  tp("pg-p6", "metode", "Beri nama dari banyak sisi", 6),
  tp("pg-p7", "metode", "Lingkaran: cetak lalu putar", 7),
  tp("pg-h1", "hasil", "Segi banyak: tepi lurus"),
  tp("pg-h2", "hasil", "Bentuk lengkung: tepi melengkung"),
  tp("pg-h3", "hasil", "Nama sesuai banyak sisi"),
  tp("pg-h4", "hasil", "Lingkaran selalu pas diputar"),
];
export const PETUNJUK_URUT_PAGAR = "Warnanya sudah benar. Nomor petaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAGAR =
  "Ini pagar taman bermain dengan papan petak. Papan bawah berisi masalah. Papan tengah punya tujuh petak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Papan atas berisi hasil. Ketuk label, lalu ketuk petak yang cocok.";

/* ------------------------------ Infografis: papan pengumuman taman ------------------------------ */
export const KOLOM_PAPAN = ["Tepinya", "Hitungan sisi", "Nama bentuk"] as const;
export const BARIS_PAPAN: { ikon: string; nama: string; tepi: string; sisi: string; bentuk: string }[] = [
  { ikon: "\u{1F41D}", nama: "Sarang lebah", tepi: "lurus, tanpa celah", sisi: "6 sisi, bukan 7", bentuk: "segi enam" },
  { ikon: "\u{1F3A2}", nama: "Perosotan", tepi: "lurus, empat sudut", sisi: "4 sisi dari tanda", bentuk: "segi empat" },
  { ikon: "\u{1F426}", nama: "Rumah burung", tepi: "lurus, atap runcing", sisi: "5 sisi satu putaran", bentuk: "segi lima" },
  { ikon: "\u{1F53A}", nama: "Ubin tiga sisi", tepi: "lurus, tiga ujung", sisi: "3 sisi saja", bentuk: "segitiga" },
  { ikon: "\u{2B55}", nama: "Uang logam", tepi: "melengkung, bulat", sisi: "tidak ada sisi lurus", bentuk: "lingkaran" },
  { ikon: "\u{1F95A}", nama: "Ubin telur", tepi: "melengkung, lonjong", sisi: "sisi lurus tak ada", bentuk: "bentuk lengkung" },
];
export const TEMPAT_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [tp(`p${i}-tepi`, "tepi", b.tepi), tp(`p${i}-sisi`, "sisi", b.sisi), tp(`p${i}-bentuk`, "bentuk", b.bentuk)]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  tepi: "Label ini tentang tepinya, lurus atau melengkung. Tempelkan di kolom Tepinya.",
  sisi: "Label ini tentang hitungan sisi. Tempelkan di kolom Hitungan sisi.",
  bentuk: "Label ini nama bentuk. Tempelkan di kolom Nama bentuk.",
};
export const SUARA_PAPAN = "Ini papan pengumuman taman bermain, dari cerita ubin untuk taman bermain. Tiap baris satu benda. Tempelkan tepinya, hitungan sisinya, dan nama bentuknya.";

/* ------------------------------ Simulasi: Petak Ubin (berbeda dari Story) ------------------------------ */
/**
 * Delapan ubin di keranjang, petak ke-i hanya muat ubin ke-i: bendera tiga sisi, layang-layang empat sisi, pos jaga lima sisi, kolam bata enam sisi,
 * papan petunjuk delapan sisi (pengayaan), roda (lingkaran), dan kolam oval (lengkung tetapi tidak bulat sempurna).
 */
export const UBIN_SIM: readonly UbinSim[] = [
  { id: "bendera", nama: "bendera", emoji: "\u{1F6A9}", warna: "#FCA5A5", jenis: "lurus", sisi: 3, bentuk: "segitiga" },
  { id: "layang", nama: "layang-layang", emoji: "\u{1FA81}", warna: "#93C5FD", jenis: "lurus", sisi: 4, bentuk: "layang" },
  { id: "pos", nama: "pos jaga", emoji: "\u{1F3E0}", warna: "#FDBA74", jenis: "lurus", sisi: 5, bentuk: "lima" },
  { id: "kolam", nama: "kolam bata", emoji: "\u{1F4A7}", warna: "#86EFAC", jenis: "lurus", sisi: 6, bentuk: "enam" },
  { id: "papan", nama: "papan petunjuk", emoji: "\u{1F6D1}", warna: "#F9A8D4", jenis: "lurus", sisi: 8, bentuk: "delapan" },
  { id: "roda", nama: "roda ayun", emoji: "\u{1F3A1}", warna: "#FDE047", jenis: "lengkung", sisi: 0, bentuk: "lingkaran" },
  { id: "oval", nama: "kolam oval", emoji: "\u{1F41F}", warna: "#A5B4FC", jenis: "lengkung", sisi: 0, bentuk: "lonjong" },
];
export const NAMA_UBIN_SIM: string[] = UBIN_SIM.map((u) => u.nama);
export const MISI_PETAK =
  "Misi Petak Ubin: hitung sisi sebuah ubin mulai dari tanda awal, lihat namanya, pilah ubin ke keranjang yang pas, lalu pasang ubin pada petak yang tepat. Urutannya bebas.";
