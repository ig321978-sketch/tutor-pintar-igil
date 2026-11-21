/**
 * Data Mind-map (label kosong, papan jepit Pak Darmo) Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo": lima baris catatan dengan label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab D (jumlah dengan menyimpan, kurang dengan meminjam, pisah pengali lalu kali, bagi per kolom, cek dengan operasi kebalikan).
 * Diuji: scripts/uji-hitung-k5b1d.mjs.
 */
export type GambarMini = "simpan" | "pinjam" | "pisah" | "bagi" | "balik";
export type LangkahPeta = { judul: string; arti: string; gambar: GambarMini };

export const LANGKAH_HITUNG: LangkahPeta[] = [
  { judul: "Jumlah dan simpan", arti: "Langkah satu. Susun bilangan dengan kolom lurus dan jumlahkan dari kolom kanan. Kalau satu kolom lebih dari sembilan, tulis satu angka dan simpan sisanya ke kolom kiri.", gambar: "simpan" },
  { judul: "Kurang dan pinjam", arti: "Langkah dua. Kurangkan dari kolom kanan. Kalau angka atas lebih kecil, pinjam dari kolom kiri yang tidak nol, dan pinjaman bisa bergulir melewati nol.", gambar: "pinjam" },
  { judul: "Pisah pengali", arti: "Langkah tiga. Pisah pengali menurut kolomnya, misalnya dua belas menjadi sepuluh dan dua. Kalikan tiap bagian, lalu jumlahkan hasilnya.", gambar: "pisah" },
  { judul: "Bagi per kolom", arti: "Langkah empat. Bagi dari kolom paling kiri. Sisa di satu kolom ditukar menjadi sepuluh di kolom sebelah kanannya.", gambar: "bagi" },
  { judul: "Balik untuk cek", arti: "Langkah lima. Cek dengan operasi kebalikan: tambah dengan kurang, kali dengan bagi. Hasilnya harus kembali ke bilangan awal.", gambar: "balik" },
];

export const JUDUL_PETA = "Papan Jepit Pak Darmo";
export const PETUNJUK_PETA = "Papan jepit Pak Darmo. Ketuk tanda tanya di setiap baris untuk melihat langkahnya.";
export const SELESAI_PETA = "Papan jepit lengkap! Lima langkah sudah kamu buka.";
