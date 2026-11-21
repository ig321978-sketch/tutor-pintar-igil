/**
 * Data Mind-map Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (dirancang sendiri): RAK GUDANG empat tingkat dari atas ke bawah (dua peti, tiga kotak, tidak ada ikat, empat lembar,
 * tepat isi gudang di Story B) dan satu papan tukar angka di bawah rak. Tiap tingkat punya label kosong berbentuk tag kardus yang diketuk; judul langkah muncul dan dibacakan Guru.
 * Isi = LANGKAH rangkuman tiga metode global (Balok Cacah, Bagan Tempat, Tukar Tempat) dan sesuai Story B. Diuji: scripts/uji-handuk-k4b1b.mjs.
 */
export type LangkahGudang = { judul: string; arti: string };

export const LANGKAH_GUDANG: readonly LangkahGudang[] = [
  { judul: "Balok Cacah: kali sepuluh", arti: "Langkah satu. Balok Cacah: satu peti berisi sepuluh kotak, satu kotak berisi sepuluh ikat, dan satu ikat berisi sepuluh lembar. Tiap tempat sepuluh kali tempat di kanannya." },
  { judul: "Banyaknya tiap angka", arti: "Langkah dua. Banyaknya tiap angka bergantung pada tempatnya. Tiga kotak berisi tiga ratus lembar, jadi angka tiga di ratusan berarti tiga ratus, bukan tiga." },
  { judul: "Nol menjaga tempat", arti: "Langkah tiga. Nol menjaga tempat. Tidak ada ikat berarti puluhan berisi nol, dan nol itu menjaga supaya angka lain tetap di tempat yang benar." },
  { judul: "Bagan Tempat: catat", arti: "Langkah empat. Bagan Tempat: gambar bagan berkolom ribuan, ratusan, puluhan, dan satuan, lalu tulis satu angka pada tiap kolom. Isi gudang tadi dua, tiga, nol, empat, yaitu dua ribu tiga ratus empat." },
  { judul: "Tukar Tempat", arti: "Langkah lima. Tukar Tempat: tukar dua angka lalu lihat bilangannya. Angka yang sama di tempat lain berarti lain, jadi tempat angka sangat penting." },
];

export const JUDUL_PETA_GUDANG = "Rak Gudang Pak Laode";
export const IKON_JUDUL_PETA_GUDANG = "\u{1F4E6}";
export const PETUNJUK_PETA_GUDANG = "Ketuk tanda tanya pada tag di tiap tingkat rak.";
export const SELESAI_PETA_GUDANG = "Gudang rapi! Lima langkah tempat angka sudah terbuka.";
