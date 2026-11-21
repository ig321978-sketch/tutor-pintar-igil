/**
 * Data Mind-map (pola label kosong) Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi": gambar tangga keramik dengan empat label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua metode Sub-Bab B (Pasang Keping, Bagi dari titik tengah, Bagi dari satu sudut, dan Mosaik Banyak Cara).
 * Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */
export type LangkahPeta = { judul: string; arti: string; ikon: string };

export const LANGKAH_MOSAIK: LangkahPeta[] = [
  { judul: "Pasang dua keping", arti: "Langkah satu. Pertemukan sisi yang sama panjang dari dua keping, tanpa celah dan tanpa tumpukan, lalu lihat bangun baru yang lahir.", ikon: "\u{1F9E9}" },
  { judul: "Bagi dari titik tengah", arti: "Langkah dua. Tarik garis dari titik tengah ke tiap sudut, dan banyak segitiga sama dengan banyak sisi bangun beraturan.", ikon: "\u{1F53A}" },
  { judul: "Bagi dari satu sudut", arti: "Langkah tiga. Tarik garis dari satu sudut ke sudut yang tidak bersebelahan, dan segitiga yang terbentuk dua kurang dari banyak sisi.", ikon: "\u{1F4D0}" },
  { judul: "Coba banyak cara", arti: "Langkah empat. Satu bangun bisa disusun dengan banyak cara, dan hasilnya tetap sama besar. Periksa bahwa tidak ada celah.", ikon: "\u{1F3A8}" },
];

export const JUDUL_PETA = "Tangga Mosaik Pak Rudi";
export const IKON_JUDUL_PETA = "\u{1F9E9}";
export const PETUNJUK_PETA = "Tangga mosaik Pak Rudi. Ketuk tanda tanya di tiap anak tangga untuk melihat langkahnya.";
export const SELESAI_PETA = "Tangga mosaik rapi! Empat langkah sudah kamu buka.";
