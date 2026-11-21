/**
 * Data Mind-map (label kosong, tangga tribun) Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto": lima undakan tribun dengan label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab B (banyak angka, bandingkan dari kiri dan geser, tanda, urutan naik dan turun, garis bilangan dengan patokan).
 * Diuji: scripts/uji-urutan-k5b1b.mjs.
 */
export type LangkahPeta = { judul: string; arti: string; ikon: string };

export const LANGKAH_URUTAN: LangkahPeta[] = [
  { judul: "Banyak angka", arti: "Langkah satu. Hitung banyak angka tiap bilangan lebih dulu. Bilangan yang angkanya lebih banyak pasti lebih besar.", ikon: "\u{1F522}" },
  { judul: "Kiri dulu", arti: "Langkah dua. Kalau banyak angkanya sama, bandingkan dari kolom paling kiri. Kalau angkanya sama, geser ke kanan sampai angkanya berbeda.", ikon: "\u{1F448}" },
  { judul: "Pasang tanda", arti: "Langkah tiga. Pasang tanda lebih besar, lebih kecil, atau sama dengan. Mulut tanda selalu terbuka ke bilangan yang lebih besar.", ikon: "\u{2696}\u{FE0F}" },
  { judul: "Naik atau turun", arti: "Langkah empat. Urutan dari yang paling kecil ke yang paling besar disebut naik, dan kalau dibalik disebut turun.", ikon: "\u{1F53C}" },
  { judul: "Garis patokan", arti: "Langkah lima. Letakkan bilangan di garis bilangan yang berpatokan. Makin ke kanan makin besar, dan patokan membantu menaruh bilangan.", ikon: "\u{1F4CF}" },
];

export const JUDUL_PETA = "Tangga Tribun Pak Hasto";
export const IKON_JUDUL_PETA = "\u{1F3DF}\u{FE0F}";
export const PETUNJUK_PETA = "Tangga tribun Pak Hasto. Ketuk tanda tanya di tiap undakan untuk melihat langkahnya.";
export const SELESAI_PETA = "Tangga tribun lengkap! Lima langkah sudah kamu buka.";
