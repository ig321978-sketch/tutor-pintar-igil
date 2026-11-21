/**
 * Data Mind-map (label kosong, meja kemas Pak Joko) Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko": enam kotak bingkisan di meja, tiap kotak bergambar kecil sendiri dan berlabel kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab D (tulis faktor, lingkari yang sama, pilih yang terbesar, bagi ke kotak, tiga bilangan, cek tanpa sisa).
 * Diuji: scripts/uji-kotak-k5b2d.mjs.
 */
export type GambarMini = "daftar" | "sama" | "besar" | "bagi" | "tiga" | "cek";
export type LangkahPeta = { judul: string; arti: string; gambar: GambarMini };

export const LANGKAH_KOTAK: LangkahPeta[] = [
  { judul: "Tulis faktor", arti: "Langkah satu. Tulis semua faktor tiap bilangan, mulai dari satu sampai bilangan itu sendiri.", gambar: "daftar" },
  { judul: "Lingkari yang sama", arti: "Langkah dua. Lingkari faktor yang muncul di kedua daftar. Faktor yang sama itu disebut faktor persekutuan, seperti lubang congklak yang berisi dua biji.", gambar: "sama" },
  { judul: "Pilih terbesar", arti: "Langkah tiga. Dari semua faktor persekutuan, pilih yang paling besar. Itulah FPB, bukan yang pertama kali kamu temukan.", gambar: "besar" },
  { judul: "Bagi ke kotak", arti: "Langkah empat. Bagi sama rata ke kotak sebanyak-banyaknya. Banyak kotak sama dengan FPB, dan isi tiap kotak adalah bilangan dibagi FPB.", gambar: "bagi" },
  { judul: "Tiga bilangan", arti: "Langkah lima. Untuk tiga bilangan, ambil faktor yang ada pada ketiganya, lalu pilih yang terbesar.", gambar: "tiga" },
  { judul: "Cek tanpa sisa", arti: "Langkah enam. Cek bahwa banyak kotak membagi tiap jenis sampai habis tanpa sisa.", gambar: "cek" },
];

export const JUDUL_PETA = "Meja Kemas Pak Joko";
export const PETUNJUK_PETA = "Meja kemas Pak Joko. Ketuk tanda tanya di setiap kotak untuk melihat langkahnya.";
export const SELESAI_PETA = "Meja kemas lengkap! Enam langkah sudah kamu buka.";
