/**
 * Data Mind-map (label kosong, pohon bilangan Kak Lintang) Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang": lima cabang dengan label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab E (saring bilangan prima, pecah pohon faktor, hasil kali prima, pasangkan prima untuk KPK dan FPB, bagi berulang).
 * Diuji: scripts/uji-papan-k5b2e.mjs.
 */
export type GambarMini = "saring" | "pohon" | "kali" | "pasang" | "bagi";
export type LangkahPeta = { judul: string; arti: string; gambar: GambarMini };

export const LANGKAH_PAPAN: LangkahPeta[] = [
  { judul: "Saring prima", arti: "Langkah satu. Tulis tabel bilangan, hapus satu, lalu ambil bilangan prima berikutnya dan hapus semua kelipatannya. Yang tersisa adalah bilangan prima.", gambar: "saring" },
  { judul: "Pecah pohon", arti: "Langkah dua. Pecah bilangan menjadi dua faktor, lalu pecah lagi sampai semua ujung pohon faktor adalah bilangan prima.", gambar: "pohon" },
  { judul: "Kali daun prima", arti: "Langkah tiga. Tulis semua daun prima sebagai hasil kali berulang. Itulah faktorisasi prima, dan hasil kalinya kembali ke bilangan semula.", gambar: "kali" },
  { judul: "Pasangkan prima", arti: "Langkah empat. Samakan dua faktorisasi. Prima yang berpasangan ditulis sekali untuk KPK, dan hanya yang berpasangan dikalikan untuk FPB. Tanpa pasangan, FPB-nya satu.", gambar: "pasang" },
  { judul: "Bagi berulang", arti: "Langkah lima. Bagi bilangan dengan prima terkecil yang bisa sampai semuanya satu. KPK hasil kali semua pembagi, dan FPB hasil kali pembagi yang membagi semua bilangan.", gambar: "bagi" },
];

export const JUDUL_PETA = "Pohon Bilangan Kak Lintang";
export const PETUNJUK_PETA = "Pohon bilangan Kak Lintang. Ketuk tanda tanya di setiap cabang untuk melihat langkahnya.";
export const SELESAI_PETA = "Pohon lengkap! Lima langkah sudah kamu buka.";
