/**
 * Data Mind-map Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto": rak ember Pak Anto dengan empat alat yang digambar sungguhan (gelas ukur berair, balok kubus, botol dan ember dengan tangga liter, kubus kecil dengan tetes air).
 * Tiap alat punya label kosong yang diketuk; judul langkah muncul dan dibacakan guru. Isi = LANGKAH rangkuman semua metode Sub-Bab B dan sesuai Story
 * (Isi dan Tuang, Susun Lapisan, Tangga Liter, dan satu sentimeter kubik sama dengan satu mililiter). Diuji: scripts/uji-ember-k4b4b.mjs.
 */
export type LangkahPeta = { judul: string; arti: string; ikon: string; gambar: "gelas" | "blok" | "tangga" | "kubik" };

export const LANGKAH_EMBER: LangkahPeta[] = [
  { judul: "Isi dan tuang ke gelas ukur", arti: "Langkah satu. Isi wadah dengan air, lalu tuang ke gelas ukur dan baca garisnya dalam mililiter.", ikon: "\u{1F95B}\u{1F4A7}", gambar: "gelas" },
  { judul: "Lapisan kali tinggi", arti: "Langkah dua. Susun kubus satuan: kubus tiap lapisan dikali banyak lapisan sama dengan volume.", ikon: "\u{1F3B2}", gambar: "blok" },
  { judul: "Tangga liter: kali atau bagi seribu", arti: "Langkah tiga. Turun tangga dari liter ke mililiter dikali seribu, dan naik tangga dari mililiter ke liter dibagi seribu.", ikon: "\u{1F522}", gambar: "tangga" },
  { judul: "Kubik sama dengan mililiter", arti: "Langkah empat. Satu sentimeter kubik sama besar dengan satu mililiter. Tulis satuan di belakang bilangan.", ikon: "\u{1F4A7}", gambar: "kubik" },
];

export const JUDUL_PETA = "Rak Ember Pak Anto";
export const IKON_JUDUL_PETA = "\u{1F95B}";
export const PETUNJUK_PETA = "Rak ember Pak Anto. Ketuk tanda tanya di tiap alat untuk melihat langkahnya.";
export const SELESAI_PETA = "Rak ember rapi! Empat langkah sudah kamu buka.";
