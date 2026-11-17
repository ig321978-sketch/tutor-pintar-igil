/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab B
 * "Hadiah Nenek untuk Rak yang Lebih Sedikit". Angka Story (mobil 5 dan boneka 6, lalu 6 dan 6, kereta 0 dan bola 3,
 * bingkai mobil 6 dan bola 3, garis boneka 4 dan robot 7, kelereng 5 jadi 6 dan 4) hanya dipakai di Mind-map dan Infografis;
 * Simulasi dan CPA memakai pasangan angka lain dan melanjutkan "Misi Hadiah Nenek" bagian satu sampai sepuluh.
 * CPA: tiap tahap dua belas soal (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Diuji: scripts/uji-banding-k1b1b.mjs.
 */
import type { Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

export const EMOJI: Record<string, string> = {
  robot: "\u{1F916}",
  mobil: "\u{1F697}",
  bola: "\u{1F3C0}",
  boneka: "\u{1F9F8}",
  dino: "\u{1F996}",
  kelereng: "\u{1F535}",
  yoyo: "\u{1FA80}",
  pesawat: "\u{1F6E9}\u{FE0F}",
  kereta: "\u{1F682}",
};

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: rel kereta belajar (hanya poin pelajaran) ------------------------------ */
/** Stasiun Masalah (tiga pertanyaan), gerbong Penyelesaian bernomor berurutan (semua metode Story), stasiun Hasil (tiga kemampuan). */
export const PUSAT_REL = "Membandingkan banyak benda";
export const KELOMPOK_REL: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Stasiun awal", ikon: "\u{2753}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di stasiun awal yang biru." },
  metode: { nama: "Penyelesaian", letak: "Gerbong", ikon: "\u{1F683}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di gerbong kuning yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Stasiun akhir", ikon: "\u{1F3C1}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di stasiun akhir yang hijau." },
};
export const TEMPAT_REL: Tempat[] = [
  tp("st-1", "masalah", "Mana yang lebih banyak?"),
  tp("st-2", "masalah", "Mana yang lebih sedikit?"),
  tp("st-3", "masalah", "Apakah sama banyak?"),
  tp("gb-1", "metode", "Pasangkan satu-satu", 1),
  tp("gb-2", "metode", "Yang bersisa lebih banyak", 2),
  tp("gb-3", "metode", "Tanpa sisa: sama banyak", 3),
  tp("gb-4", "metode", "Hitung, lalu bandingkan", 4),
  tp("gb-5", "metode", "Bingkai lebih penuh", 5),
  tp("gb-6", "metode", "Angka lebih kanan", 6),
  tp("gb-7", "metode", "Satu lebih, satu sedikit", 7),
  tp("sa-1", "hasil", "Tahu lebih banyak"),
  tp("sa-2", "hasil", "Tahu lebih sedikit"),
  tp("sa-3", "hasil", "Tahu sama banyak"),
];
export const PETUNJUK_URUT_REL = "Warnanya sudah benar. Nomor gerbongnya belum pas. Mana yang dikerjakan lebih dulu?";
export const SUARA_REL =
  "Ini rel kereta belajar membandingkan. Stasiun awal berisi masalah. Gerbong kuning berisi langkah yang berurutan, ikuti nomornya. Stasiun akhir berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan kapur data banding ------------------------------ */
export const KOLOM_PAPAN = ["Angka", "Cara", "Hasil"] as const;
export const BARIS_PAPAN: { benda: [string, string]; angka: string; cara: string; hasil: string }[] = [
  { benda: ["mobil", "boneka"], angka: "5 dan 6", cara: "Pasangkan", hasil: "Boneka lebih banyak" },
  { benda: ["mobil", "boneka"], angka: "6 dan 6", cara: "Tanpa sisa", hasil: "Sama banyak" },
  { benda: ["kereta", "bola"], angka: "0 dan 3", cara: "Nol paling sedikit", hasil: "Kereta lebih sedikit" },
  { benda: ["mobil", "bola"], angka: "6 dan 3", cara: "Bingkai sepuluh", hasil: "Mobil lebih banyak" },
  { benda: ["boneka", "robot"], angka: "4 dan 7", cara: "Garis bilangan", hasil: "Robot lebih banyak" },
  { benda: ["kelereng", "kelereng"], angka: "5 lalu 6", cara: "Satu lebih banyak", hasil: "Enam lebih banyak" },
];
export const TEMPAT_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [tp(`p${i}-angka`, "angka", b.angka), tp(`p${i}-cara`, "cara", b.cara), tp(`p${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  angka: "Label ini berisi angka. Tempelkan di kolom Angka.",
  cara: "Label ini cara membandingkan. Tempelkan di kolom Cara.",
  hasil: "Label ini hasil banding. Tempelkan di kolom Hasil.",
};
export const SUARA_PAPAN = "Ini papan kapur catatan banding dari cerita. Tiap baris satu perbandingan. Tempelkan angkanya, caranya, dan hasilnya.";

/* ------------------------------ Simulasi: Misi Hadiah Nenek bagian satu, gudang hadiah ------------------------------ */
/** Banyak awal berbeda dari Story: robot Igil 2, yoyo Kaka 7, kotak hadiah 6. */
export const AWAL_GUDANG = { igil: 2, kaka: 7, kotak: 6 } as const;
export const JENIS_GUDANG = { igil: "robot", kaka: "yoyo" } as const;
export const MISI_HADIAH = "Misi Hadiah Nenek: bagikan hadiah Nenek dengan adil. Bandingkan dulu, baru beri hadiah ke rak yang lebih sedikit.";

/* ------------------------------ CPA: lanjutan Misi Hadiah Nenek ------------------------------ */
const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Hadiah Nenek 2: rak robot dan rak bola", "Kotak hadiah kedua datang. Siapa yang raknya lebih sedikit?", [
    { tipe: "pasang", a: 4, b: 8, ja: "robot", jb: "bola", renggang: true, tanya: "kata" },
    { tipe: "bingkai", a: 8, b: 5, ja: "dino", jb: "kelereng", tanya: "banyak" },
    { tipe: "garis", a: 3, b: 8, ja: "boneka", jb: "mobil", tanya: "sedikit" },
    { tipe: "satu", a: 9, arah: "lebih", ja: "yoyo" },
  ]),
  C(2, "kanvas", "Misi Hadiah Nenek 3: lantai ruang tengah", "Mainan berjajar di lantai. Ambil pensil ajaib, lalu gambar di kanvas.", [
    { tipe: "pasang", a: 5, b: 3, ja: "pesawat", jb: "robot", tanya: "tandai" },
    { tipe: "bingkai", a: 6, b: 4, ja: "mobil", jb: "bola", tanya: "banyak" },
    { tipe: "garis", a: 2, b: 5, ja: "dino", jb: "boneka", tanya: "banyak" },
    { tipe: "satu", a: 3, arah: "lebih", ja: "kelereng" },
  ]),
  C(3, "suara", "Misi Hadiah Nenek 4: teras depan", "Nenek menelepon dan ingin mendengar hasilnya. Jawab dengan suaramu.", [
    { tipe: "pasang", a: 7, b: 7, ja: "yoyo", jb: "robot", tanya: "sama" },
    { tipe: "bingkai", a: 9, b: 6, ja: "robot", jb: "dino", tanya: "banyak" },
    { tipe: "garis", a: 0, b: 4, ja: "pesawat", jb: "kelereng", tanya: "sedikit" },
    { tipe: "satu", a: 2, arah: "sedikit", ja: "boneka" },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Hadiah Nenek 5: denah rak", "Abang menggambar isi rak sebagai titik. Bandingkan gambarnya.", [
    { tipe: "pasang", a: 5, b: 5, ja: "titik", jb: "titik", renggang: true, tanya: "kata" },
    { tipe: "bingkai", a: 9, b: 4, ja: "titik", jb: "titik", tanya: "banyak" },
    { tipe: "garis", a: 2, b: 7, ja: "titik", jb: "titik", tanya: "sedikit" },
    { tipe: "satu", a: 7, arah: "lebih", ja: "titik" },
  ]),
  P(2, "kanvas", "Misi Hadiah Nenek 6: gambar di papan", "Kaka meminjamkan papan gambar. Tarik garis, lingkari, dan tulis.", [
    { tipe: "pasang", a: 8, b: 5, ja: "titik", jb: "titik", tanya: "sisa" },
    { tipe: "bingkai", a: 4, b: 6, ja: "titik", jb: "titik", tanya: "banyak" },
    { tipe: "garis", a: 10, b: 5, ja: "titik", jb: "titik", tanya: "banyak" },
    { tipe: "satu", a: 3, arah: "lebih", ja: "titik" },
  ]),
  P(3, "suara", "Misi Hadiah Nenek 7: laporan gambar", "Abang membawa gambar ke Mamah. Sebutkan jawabanmu.", [
    { tipe: "pasang", a: 7, b: 5, ja: "titik", jb: "titik", tanya: "banyak" },
    { tipe: "bingkai", a: 5, b: 8, ja: "titik", jb: "titik", tanya: "sedikit" },
    { tipe: "garis", a: 0, b: 6, ja: "titik", jb: "titik", tanya: "sedikit" },
    { tipe: "satu", a: 2, arah: "sedikit", ja: "titik" },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Hadiah Nenek 8: kartu angka", "Kaka menulis banyak isi rak dengan angka saja.", [
    { tipe: "pasang", a: 7, b: 2, ja: "angka", jb: "angka", tanya: "kata" },
    { tipe: "bingkai", a: 6, b: 4, ja: "angka", jb: "angka", tanya: "banyak" },
    { tipe: "garis", a: 8, b: 5, ja: "angka", jb: "angka", tanya: "sedikit" },
    { tipe: "satu", a: 3, arah: "lebih", ja: "angka" },
  ]),
  A(2, "kanvas", "Misi Hadiah Nenek 9: tulis catatan", "Abang meminta Igil menulis catatan banding di kanvas.", [
    { tipe: "pasang", a: 9, b: 6, ja: "angka", jb: "angka", tanya: "banyak" },
    { tipe: "bingkai", a: 10, b: 2, ja: "angka", jb: "angka", tanya: "banyak" },
    { tipe: "garis", a: 3, b: 1, ja: "angka", jb: "angka", tanya: "banyak" },
    { tipe: "satu", a: 8, arah: "sedikit", ja: "angka" },
  ]),
  A(3, "suara", "Misi Hadiah Nenek 10: surat untuk Nenek", "Semua hadiah sudah dibagi adil. Bacakan hasilnya untuk Nenek.", [
    { tipe: "pasang", a: 0, b: 5, ja: "angka", jb: "angka", tanya: "sedikit" },
    { tipe: "bingkai", a: 2, b: 8, ja: "angka", jb: "angka", tanya: "sedikit" },
    { tipe: "garis", a: 8, b: 4, ja: "angka", jb: "angka", tanya: "banyak" },
    { tipe: "satu", a: 0, arah: "lebih", ja: "angka" },
  ]),
];

export const POIN_PENTING = [
  "Panjang barisan belum tentu lebih banyak.",
  "Pasangkan satu-satu. Yang bersisa lebih banyak.",
  "Tanpa sisa berarti sama banyak.",
  "Angka yang disebut lebih akhir lebih banyak.",
  "Bingkai yang lebih penuh, isinya lebih banyak.",
  "Angka yang lebih kanan di garis bilangan lebih banyak.",
  "Nol paling sedikit.",
];

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F381}", nama: "Concrete", cara: "Mainan nyata: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Titik, bingkai, dan garis: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Angka dan kata: ketuk, tulis, dan ucapkan" },
} as const;
