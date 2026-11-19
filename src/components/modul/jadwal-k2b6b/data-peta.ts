/**
 * Isi Mind-map (Lintasan Lari) dan Infografis (Spanduk Acara) Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga
 * Sekolah. Mind-map hanya memuat poin pelajaran (tanpa nama tokoh atau benda cerita). Infografis memakai data Story (pembukaan pukul tujuh pagi, lomba lari
 * pukul sembilan pagi, makan siang pukul dua belas siang, tarik tambang pukul empat sore, pesta penutupan pukul tujuh malam). Data simulasi ada di data-sim.ts.
 * Diuji: scripts/uji-jadwal-k2b6b.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";

export { MISI_JADWAL_TEKS } from "./data-sim";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });
const beriContoh = (d: Tempat[], ids: string[]): Tempat[] => d.map((x) => (ids.includes(x.id) ? { ...x, contoh: true } : x));

/* ------------------------------ Mind-map: lintasan lari tiga lajur ------------------------------ */
export const PUSAT_LINTASAN = "Waktu dan jam: kegiatan tepat waktu";
export const KELOMPOK_LINTASAN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Lajur satu", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Taruh di lajur satu, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Lajur dua", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Taruh di rintangan bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Lajur tiga", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Taruh di lajur tiga, tempat hasil." },
};
const DASAR_LINTASAN: Tempat[] = [
  tp("ll-m1", "masalah", "Kegiatan harus mulai tepat waktu"),
  tp("ll-m2", "masalah", "Jarum jam salah dibaca"),
  tp("ll-m3", "masalah", "Kegiatan bisa bertabrakan"),
  tp("ll-p1", "metode", "Jarum pendek jam, jarum panjang menit", 1),
  tp("ll-p2", "metode", "Jarum panjang di dua belas: pukul tepat", 2),
  tp("ll-p3", "metode", "Jam digital: dua angka jam, dua angka menit", 3),
  tp("ll-p4", "metode", "Sebut pagi, siang, sore, atau malam", 4),
  tp("ll-p5", "metode", "Garis Waktu Hari: urutkan kegiatan", 5),
  tp("ll-p6", "metode", "Jalur Jam: hitung kotak jam", 6),
  tp("ll-p7", "metode", "Batang Lama Kegiatan: banding batang", 7),
  tp("ll-h1", "hasil", "Waktu lebih awal lebih dulu"),
  tp("ll-h2", "hasil", "Pukul enam bisa pagi atau sore"),
  tp("ll-h3", "hasil", "Lama kegiatan dari selisih jam"),
  tp("ll-h4", "hasil", "Batang lebih panjang berarti lebih lama"),
];
export const TEMPAT_LINTASAN: Tempat[] = beriContoh(DASAR_LINTASAN, ["ll-m1","ll-p1","ll-p2","ll-p7","ll-h1"]);
export const PETUNJUK_URUT_LINTASAN = "Warnanya sudah benar. Nomor rintangannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_LINTASAN =
  "Ini lintasan lari dengan tiga lajur. Lajur satu berisi masalah. Lajur dua berisi tujuh rintangan penyelesaian yang berurutan, ikuti nomornya dari satu sampai tujuh. Lajur tiga berisi hasil. Beberapa kotak sudah terisi sebagai contoh, jadi lihat dulu sebagai petunjuk. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: spanduk acara ------------------------------ */
export const KOLOM_SPANDUK = ["Urutan acara", "Ditulis dengan kata", "Jam digital"] as const;
export const BARIS_SPANDUK: { ikon: string; nama: string; urutan: string; kata: string; digital: string }[] = [
  { ikon: "\u{1F6A9}", nama: "Pembukaan", urutan: "pertama", kata: "pukul tujuh pagi", digital: "07.00" },
  { ikon: "\u{1F3C3}", nama: "Lomba lari", urutan: "kedua", kata: "pukul sembilan pagi", digital: "09.00" },
  { ikon: "\u{1F35A}", nama: "Makan siang", urutan: "ketiga", kata: "pukul dua belas siang", digital: "12.00" },
  { ikon: "\u{1F91D}", nama: "Tarik tambang", urutan: "keempat", kata: "pukul empat sore", digital: "16.00" },
  { ikon: "\u{1F3C6}", nama: "Pesta penutupan", urutan: "kelima", kata: "pukul tujuh malam", digital: "19.00" },
];
const DASAR_SPANDUK: Tempat[] = BARIS_SPANDUK.flatMap((b, i) => [tp(`s${i}-urutan`, "urutan", b.urutan), tp(`s${i}-kata`, "kata", b.kata), tp(`s${i}-digital`, "digital", b.digital)]);
export const TEMPAT_SPANDUK: Tempat[] = beriContoh(DASAR_SPANDUK, ["s0-urutan","s0-kata","s0-digital","s1-urutan","s2-kata","s3-digital","s4-urutan"]);
export const KELOMPOK_SPANDUK: Record<string, string> = {
  urutan: "Label ini urutan acara. Tempelkan di kolom Urutan acara.",
  kata: "Label ini jam yang ditulis dengan kata. Tempelkan di kolom Ditulis dengan kata.",
  digital: "Label ini jam digital dua puluh empat jam. Tempelkan di kolom Jam digital.",
};
export const SUARA_SPANDUK = "Ini spanduk jadwal acara Hari Olahraga, dari cerita Bu Ratna. Tiap baris satu kegiatan. Tempelkan urutannya, jamnya dengan kata, dan jam digitalnya. Beberapa kotak sudah terisi sebagai contoh, jadi lihat dulu sebagai petunjuk.";
