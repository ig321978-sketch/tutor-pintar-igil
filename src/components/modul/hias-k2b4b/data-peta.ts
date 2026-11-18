/**
 * Isi Mind-map (Pita Hias), Infografis (Lembar Hiasan), dan teks misi Simulasi (Meja Rangkai) Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola),
 * akhir cerita Pameran Kerajinan Sekolah. Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (pola jingga jingga biru, bintang bulat,
 * membungkuk berdiri, tepuk keras pelan, dan susunan sesuka hati). Diuji: scripts/uji-hias-k2b4b.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: pita hias bertingkat ------------------------------ */
export const PUSAT_PITA = "Pola: hal yang berulang dan teratur";
export const KELOMPOK_PITA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Pita bawah", ikon: "\u{1F9F5}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Kotak ini kuning. Pasang di pita bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Pita tengah", ikon: "\u{1F380}", isi: "#DDD6FE", garis: "#6D28D9", petunjuk: "Kotak ini ungu. Pasang di kotak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Pita atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Kotak ini hijau. Pasang di pita atas, tempat hasil." },
};
export const TEMPAT_PITA: Tempat[] = [
  tp("pt-m1", "masalah", "Pola belum dikenali"),
  tp("pt-m2", "masalah", "Hanya melihat unsur terakhir"),
  tp("pt-m3", "masalah", "Susunan acak dikira pola"),
  tp("pt-p1", "metode", "Cari satuan dari awal", 1),
  tp("pt-p2", "metode", "Ulangi urutan satuan yang sama", 2),
  tp("pt-p3", "metode", "Periksa dari awal sampai ujung", 3),
  tp("pt-p4", "metode", "Pita Pola: isi kotak lalu ulangi", 4),
  tp("pt-p5", "metode", "Kode Huruf: satu huruf satu unsur", 5),
  tp("pt-p6", "metode", "Tepuk Irama: dengar satuan bunyi", 6),
  tp("pt-p7", "metode", "Buat pola dari dua unsur atau lebih", 7),
  tp("pt-h1", "hasil", "Pola berulang dan teratur"),
  tp("pt-h2", "hasil", "Satuan: susunan terkecil yang berulang"),
  tp("pt-h3", "hasil", "Ada pola bentuk, warna, gerakan, suara"),
  tp("pt-h4", "hasil", "Semuanya sama atau acak: bukan pola"),
];
export const PETUNJUK_URUT_PITA = "Warnanya sudah benar. Nomor kotaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PITA =
  "Ini pita hias bertingkat. Pita bawah berisi masalah. Pita tengah punya tujuh kotak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Pita atas berisi hasil. Ketuk label, lalu ketuk kotak yang cocok.";

/* ------------------------------ Infografis: lembar hiasan ------------------------------ */
export const KOLOM_LEMBAR = ["Contoh", "Satuan pola", "Kode huruf"] as const;
export const BARIS_LEMBAR: { ikon: string; nama: string; contoh: string; satuan: string; kode: string }[] = [
  { ikon: "\u{1F9F5}", nama: "Pola warna", contoh: "jingga, jingga, biru, jingga, jingga", satuan: "jingga, jingga, biru", kode: "A A B" },
  { ikon: "\u{2B50}", nama: "Pola bentuk", contoh: "bintang, bulat, bintang, bulat", satuan: "bintang, bulat", kode: "A B A B" },
  { ikon: "\u{1F647}", nama: "Pola gerakan", contoh: "membungkuk, berdiri, membungkuk", satuan: "membungkuk, berdiri", kode: "A B A" },
  { ikon: "\u{1F44F}", nama: "Pola suara", contoh: "keras, pelan, keras, pelan, keras", satuan: "keras, pelan", kode: "A B A B A" },
  { ikon: "\u{1F300}", nama: "Bukan pola", contoh: "merah, biru, biru, merah, biru", satuan: "tidak ada satuan", kode: "tidak teratur" },
];
export const TEMPAT_LEMBAR: Tempat[] = BARIS_LEMBAR.flatMap((b, i) => [tp(`l${i}-contoh`, "contoh", b.contoh), tp(`l${i}-satuan`, "satuan", b.satuan), tp(`l${i}-kode`, "kode", b.kode)]);
export const KELOMPOK_LEMBAR: Record<string, string> = {
  contoh: "Label ini contoh susunan dari cerita. Tempelkan di kolom Contoh.",
  satuan: "Label ini satuan pola, susunan terkecil yang berulang. Tempelkan di kolom Satuan pola.",
  kode: "Label ini kode huruf. Tempelkan di kolom Kode huruf.",
};
export const SUARA_LEMBAR = "Ini lembar hiasan dari cerita pita hias. Tiap baris satu jenis pola. Tempelkan contohnya, satuan polanya, dan kode hurufnya.";

/* ------------------------------ Teks misi Simulasi ------------------------------ */
export const MISI_HIAS_TEKS =
  "Misi Meja Rangkai: rangkai pita lalu periksa apakah polanya benar, tandai satuan pola pada kartu pita, dan ketuk irama keras dan pelan. Urutannya bebas.";
