/**
 * Data Mind-map Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (dirancang sendiri, bukan kartu geser): muka loket beratap rumbia dengan lima bagian bergambar
 * (papan nama empat tempat, kartu angka berwarna, tiket 3.406 dengan nol yang redup, tulisan salah 3.46 yang diperbaiki, papan pengumuman bercentang).
 * Tiap bagian punya label kosong di sebelahnya; diketuk, judul langkah muncul dan dibacakan Guru. Isi = LANGKAH rangkuman tiga metode global
 * (Kartu Angka, Baca Per Bagian, Periksa Nol) dan sesuai Story A. Diuji: scripts/uji-tiket-k4b1a.mjs.
 */
export type LangkahLoket = { judul: string; arti: string };

export const LANGKAH_LOKET: readonly LangkahLoket[] = [
  { judul: "Empat tempat angka", arti: "Langkah satu. Bilangan empat angka punya empat tempat: ribuan, ratusan, puluhan, dan satuan. Bacalah dan tulislah selalu mulai dari tempat paling kiri." },
  { judul: "Kartu Angka dari ribuan", arti: "Langkah dua. Kartu Angka: taruh tiap angka pada satu kartu, lalu susun dari ribuan sampai satuan. Urutan kartu menunjukkan tempat tiap angka." },
  { judul: "Baca Per Bagian dari kiri", arti: "Langkah tiga. Baca Per Bagian: baca dari kiri, sebut ribu, ratus, dan puluh pada bagian yang berisi angka. Tiket pemenang dibaca tiga ribu empat ratus enam." },
  { judul: "Periksa Nol: isi kosong", arti: "Langkah empat. Periksa Nol: hitung banyak angka, lalu isi tempat yang kosong dengan nol. Nol tidak dibaca, tetapi menjaga tempat supaya angka lain tidak bergeser." },
  { judul: "Baca ulang, baru umumkan", arti: "Langkah lima. Baca ulang tulisanmu dari ribuan. Kalau bacaannya sama dengan ucapan, nomor siap diumumkan di papan." },
];

export const JUDUL_PETA_LOKET = "Loket Tiket Bu Maya";
export const IKON_JUDUL_PETA_LOKET = "\u{1F3AB}";
export const PETUNJUK_PETA_LOKET = "Ketuk tanda tanya di tiap bagian loket untuk melihat langkahnya.";
export const SELESAI_PETA_LOKET = "Loket lengkap! Lima langkah membaca dan menulis bilangan sudah terbuka.";
