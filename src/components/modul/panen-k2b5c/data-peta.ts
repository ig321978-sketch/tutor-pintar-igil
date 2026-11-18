/**
 * Isi Mind-map (Petak Empat) dan Infografis (Jadwal Panen) Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh), akhir cerita
 * Kebun Sekolah. Mind-map hanya memuat poin pelajaran (tanpa nama tokoh atau benda cerita). Infografis memakai data Story (labu, petak tanah, kertas
 * dilipat tegak dan mendatar, kertas dilipat pojok ke pojok, lingkaran dengan dua garis). Data simulasi ada di data-sim.ts. Diuji: scripts/uji-panen-k2b5c.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: petak kebun dibagi empat ------------------------------ */
export const PUSAT_PETAK = "Seperempat: satu dari empat bagian sama besar";
export const KELOMPOK_PETAK: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Petak kiri atas", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Petak ini kuning. Taruh di petak kiri atas, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Dua petak tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Petak ini biru. Taruh di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Petak kanan bawah", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Petak ini hijau. Taruh di petak kanan bawah, tempat hasil." },
};
export const TEMPAT_PETAK: Tempat[] = [
  tp("pk-m1", "masalah", "Satu benda harus dibagi empat"),
  tp("pk-m2", "masalah", "Empat bagian tidak sama besar"),
  tp("pk-m3", "masalah", "Garis kedua miring"),
  tp("pk-p1", "metode", "Bagi jadi dua bagian sama besar", 1),
  tp("pk-p2", "metode", "Bagi tiap setengah jadi dua lagi", 2),
  tp("pk-p3", "metode", "Seperempat adalah setengah dari setengah", 3),
  tp("pk-p4", "metode", "Periksa semua bagian sama besar", 4),
  tp("pk-p5", "metode", "Belah Dua Kali: membelah dua kali", 5),
  tp("pk-p6", "metode", "Dinding Pecahan: membandingkan pita", 6),
  tp("pk-p7", "metode", "Lipat dan Warnai: lipat dua kali", 7),
  tp("pk-h1", "hasil", "Empat bagian sama besar adalah seperempat"),
  tp("pk-h2", "hasil", "Dua seperempat sama dengan satu setengah"),
  tp("pk-h3", "hasil", "Empat seperempat sama dengan satu utuh"),
  tp("pk-h4", "hasil", "Dua garis tegak lurus membagi sama besar"),
];
export const PETUNJUK_URUT_PETAK = "Warnanya sudah benar. Nomor petaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PETAK =
  "Ini petak kebun yang dibagi empat. Petak kiri atas berisi masalah. Dua petak tengah berisi tujuh langkah penyelesaian yang berurutan, ikuti nomornya dari satu sampai tujuh. Petak kanan bawah berisi hasil. Ketuk label, lalu ketuk petak yang cocok.";

/* ------------------------------ Infografis: jadwal panen ------------------------------ */
export const KOLOM_JADWAL = ["Cara membagi", "Bentuk bagian", "Hasil"] as const;
export const BARIS_JADWAL: { ikon: string; nama: string; cara: string; bentuk: string; hasil: string }[] = [
  { ikon: "\u{1F7E0}", nama: "Labu", cara: "dibelah dua kali", bentuk: "potongan labu", hasil: "satu potong tiap regu" },
  { ikon: "\u{1F7EB}", nama: "Petak tanah", cara: "dua tali tegak lurus", bentuk: "petak persegi", hasil: "empat petak sama besar" },
  { ikon: "\u{1F4C4}", nama: "Kertas persegi", cara: "lipat tegak lalu mendatar", bentuk: "persegi kecil", hasil: "satu persegi diwarnai" },
  { ikon: "\u{1F4D0}", nama: "Kertas pojok", cara: "lipat pojok ke pojok", bentuk: "segitiga", hasil: "satu segitiga diwarnai" },
  { ikon: "\u{2B55}", nama: "Lingkaran", cara: "dua garis lewat pusat", bentuk: "sektor bundar", hasil: "pas bila tegak lurus" },
];
export const TEMPAT_JADWAL: Tempat[] = BARIS_JADWAL.flatMap((b, i) => [tp(`j${i}-cara`, "cara", b.cara), tp(`j${i}-bentuk`, "bentuk", b.bentuk), tp(`j${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_JADWAL: Record<string, string> = {
  cara: "Label ini cara membagi. Tempelkan di kolom Cara membagi.",
  bentuk: "Label ini bentuk tiap bagian. Tempelkan di kolom Bentuk bagian.",
  hasil: "Label ini hasil pembagian. Tempelkan di kolom Hasil.",
};
export const SUARA_JADWAL = "Ini papan jadwal panen raya, dari cerita Pak Joko. Tiap baris satu benda yang dibagi empat. Tempelkan cara membaginya, bentuk tiap bagian, dan hasilnya.";
