/**
 * Data Mind-map (label kosong, papan diagram bazar) Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi": diagram batang bertingkat dengan lima label kosong yang diketuk.
 * Isi = LANGKAH rangkuman semua materi Sub-Bab B (membaca sumbu dan tingkatan, batang tegak, batang mendatar, membandingkan dan selisih, jumlah).
 * Diuji: scripts/uji-bazar-k4b6b.mjs.
 */
export type LangkahPeta = { judul: string; arti: string; ikon: string };

export const LANGKAH_BAZAR: LangkahPeta[] = [
  { judul: "Baca sumbu", arti: "Langkah satu. Lihat judul dan satuan sumbu, lalu periksa tingkatan angkanya: naik satu, dua, lima, atau sepuluh tiap garis.", ikon: "\u{1F4CF}" },
  { judul: "Batang tegak", arti: "Langkah dua. Pada diagram tegak, batang berdiri dari sumbu bawah. Telusuri garis dari ujung batang ke sumbu angka, dan ujungnya tepat di garis.", ikon: "\u{1F4CA}" },
  { judul: "Batang mendatar", arti: "Langkah tiga. Diagram bisa diputar menjadi mendatar. Panjang batang yang dibaca, dan banyak datanya tetap sama.", ikon: "\u{1F504}" },
  { judul: "Adu batang", arti: "Langkah empat. Bandingkan batang pada sumbu yang sama. Yang lebih tinggi atau lebih panjang lebih banyak, dan selisihnya dicari dengan mengurangkan.", ikon: "\u{1F94A}" },
  { judul: "Hitung jumlah", arti: "Langkah lima. Jumlah semua data dicari dengan menambahkan banyak tiap batang, dan satuannya selalu ditulis.", ikon: "\u{2795}" },
];

export const JUDUL_PETA = "Papan Diagram Pak Dodi";
export const IKON_JUDUL_PETA = "\u{1F4CA}";
export const PETUNJUK_PETA = "Papan diagram Pak Dodi. Ketuk tanda tanya di atas tiap batang untuk melihat langkahnya.";
export const SELESAI_PETA = "Papan diagram lengkap! Lima langkah sudah kamu buka.";
