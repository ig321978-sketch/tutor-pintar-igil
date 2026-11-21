/**
 * Data Mind-map (label kosong, dua jalur lonceng yang bertemu) Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno": lima label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab B (dua daftar kelipatan, bilangan yang sama, yang terkecil, bertemu lagi, tiga bilangan).
 * Diuji: scripts/uji-jadwal-k5b2b.mjs.
 */
export type LangkahPeta = { judul: string; arti: string; ikon: string };

export const LANGKAH_JADWAL: LangkahPeta[] = [
  { judul: "Dua daftar", arti: "Langkah satu. Tulis daftar kelipatan bilangan pertama, lalu daftar kelipatan bilangan kedua di bawahnya, dan buat cukup panjang.", ikon: "\u{1F4DD}" },
  { judul: "Cari yang sama", arti: "Langkah dua. Cari bilangan yang muncul di kedua daftar. Bilangan yang sama itu disebut kelipatan persekutuan.", ikon: "\u{1F50D}" },
  { judul: "Ambil terkecil", arti: "Langkah tiga. Dari semua kelipatan persekutuan, ambil yang paling kecil. Itulah KPK, kelipatan persekutuan terkecil.", ikon: "\u{1F947}" },
  { judul: "Bertemu lagi", arti: "Langkah empat. Pada jadwal berulang, dua kegiatan bertemu lagi sesudah KPK, lalu sesudah KPK berikutnya, dengan jarak yang sama.", ikon: "\u{1F501}" },
  { judul: "Tiga bilangan", arti: "Langkah lima. Untuk tiga bilangan, tulis tiga daftar kelipatan dan ambil bilangan terkecil yang ada di ketiganya.", ikon: "\u{1F514}" },
];

export const JUDUL_PETA = "Dua Jalur Pak Tarno";
export const IKON_JUDUL_PETA = "\u{1F362}";
export const PETUNJUK_PETA = "Dua jalur lonceng Pak Tarno bertemu di satu titik. Ketuk tanda tanya di tiap lonceng untuk melihat langkahnya.";
export const SELESAI_PETA = "Dua jalur bertemu! Lima langkah sudah kamu buka.";
