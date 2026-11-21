/**
 * Data Mind-map Kelas 4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (dirancang sendiri): DERMAGA kayu lurus dari atas ke bawah dengan lima titik bergambar
 * (dua papan 4.358 dan 4.385 dengan angka ribuan menyala, tiga lencana 4=4, 3=3, 5<8, tiga tanda < > =, tali garis bilangan dengan tiga pelampung, tiga kartu bilangan berurut).
 * Papan penunjuk berlabel kosong berselang-seling di kiri dan kanan dermaga; diketuk, judul langkah muncul dan dibacakan Guru.
 * Isi = LANGKAH rangkuman tiga metode global (Banding dari Kiri, Garis Bilangan, Urut Kartu) dan sesuai Story C. Diuji: scripts/uji-dermaga-k4b1c.mjs.
 */
export type LangkahDermaga = { judul: string; arti: string };

export const LANGKAH_DERMAGA: readonly LangkahDermaga[] = [
  { judul: "Banding dari Kiri", arti: "Langkah satu. Banding dari Kiri: bandingkan dua bilangan mulai dari tempat paling kiri, yaitu ribuan. Angka yang lebih besar menunjukkan bilangan yang lebih besar." },
  { judul: "Sama? Lanjut ke kanan", arti: "Langkah dua. Kalau angkanya sama, pindah ke tempat di kanannya: ratusan, lalu puluhan, lalu satuan. Berhenti di tempat pertama yang angkanya berbeda." },
  { judul: "Tanda < > dan =", arti: "Langkah tiga. Tulis hasilnya dengan tanda. Kurang dari untuk bilangan yang lebih kecil, lebih dari untuk yang lebih besar, dan sama dengan kalau semua tempat sama. Mulut tanda menghadap bilangan yang lebih besar." },
  { judul: "Garis Bilangan", arti: "Langkah empat. Garis Bilangan: taruh bilangan pada garis, yang kecil di kiri dan yang besar di kanan. Dari garis kita bisa melihat urutannya sekaligus." },
  { judul: "Urut Kartu: kecil ke besar", arti: "Langkah lima. Urut Kartu: tulis tiap bilangan pada satu kartu, lalu geser kartunya sampai urut dari terkecil ke terbesar. Kalau dibalik, urutannya dari terbesar ke terkecil." },
];

export const JUDUL_PETA_DERMAGA = "Dermaga Kak Tiara";
export const IKON_JUDUL_PETA_DERMAGA = "\u{1F6A4}";
export const PETUNJUK_PETA_DERMAGA = "Ketuk tanda tanya pada papan penunjuk di tepi dermaga.";
export const SELESAI_PETA_DERMAGA = "Dermaga lengkap! Lima langkah membandingkan dan mengurutkan sudah terbuka.";
