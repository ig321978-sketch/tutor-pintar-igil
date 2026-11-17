/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab A
 * "Merapikan Lemari Mainan Igil". Semua angka contoh Story (mobil 5, boneka 4, bola 3, balok 10, kereta 0) hanya dipakai
 * di Mind-map dan Infografis; Simulasi dan CPA memakai angka lain dan melanjutkan misi "Rumah Rapi" sampai akhir sub-bab.
 * CPA: tiap tahap dua belas soal (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode).
 * Instruksi dan suara langkah dibuat dari templat (`instruksi`) supaya data tetap pendek. Diuji: scripts/uji-lemari-k1b1a.mjs.
 */
import type { Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, kata } from "./logika";

/* ------------------------------ Gambar dan nama benda ------------------------------ */
export const EMOJI: Record<string, string> = {
  robot: "\u{1F916}",
  mobil: "\u{1F697}",
  bola: "\u{1F3C0}",
  boneka: "\u{1F9F8}",
  dino: "\u{1F996}",
  kelereng: "\u{1F535}",
  yoyo: "\u{1FA80}",
  kereta: "\u{1F682}",
  pesawat: "\u{1F6E9}️",
  balok: "\u{1F7E6}",
};
export const NAMA: Record<string, string> = {
  robot: "robot",
  mobil: "mobil",
  bola: "bola",
  boneka: "boneka",
  dino: "dinosaurus",
  kelereng: "kelereng",
  yoyo: "yoyo",
  kereta: "kereta",
  pesawat: "pesawat",
  balok: "balok",
  bulat: "titik",
  kotak: "petak",
  segitiga: "segitiga",
  wadah: "wadah",
  bingkai: "bingkai",
};

/* ------------------------------ Mind-map: pohon menghitung (hanya poin pelajaran matematika) ------------------------------ */
/**
 * Pohon belajar menurut panduan pemilik: akar = Masalah (tiga pertanyaan), daun = Penyelesaian (enam langkah BERURUTAN bernomor: empat dari panduan pemilik + dua metode luar
 * di Story: Angka terakhir = banyaknya (Cardinality) dan Lihat sekilas (Subitizing), jadi keempat metode Story masuk ke cabang), buah = Hasil (tiga kemampuan).
 * Tanpa poin cerita (mainan, lemari, tokoh). Tiap kelompok punya warna sendiri; label dan tempat kosong memakai warna yang sama,
 * dan label sekelompok boleh ditempel di tempat kosong mana pun yang sewarna.
 */
export const PUSAT_POHON = "Menghitung benda";
export const KELOMPOK_POHON: Record<string, { nama: string; letak: string; ikon: string; warna: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "akar", ikon: "\u{1F331}", warna: "cokelat", petunjuk: "Warna label ini cokelat. Tempelkan di akar yang cokelat." },
  metode: { nama: "Penyelesaian", letak: "daun", ikon: "\u{1F343}", warna: "hijau", petunjuk: "Warna label ini hijau. Tempelkan di daun yang hijau." },
  hasil: { nama: "Hasil", letak: "buah", ikon: "\u{1F34E}", warna: "merah", petunjuk: "Warna label ini merah. Tempelkan di buah yang merah." },
};
const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });
export const TEMPAT_POHON: Tempat[] = [
  tp("akar-1", "masalah", "Berapa jumlahnya?"),
  tp("akar-2", "masalah", "Bagaimana menulisnya?"),
  tp("akar-3", "masalah", "Bagaimana membacanya?"),
  // Penyelesaian: langkah BERURUTAN, diberi nomor. Urutan belajar menghitung: kelompokkan, hitung satu-satu, angka terakhir,
  // lihat sekilas (jalan pintas untuk jumlah kecil), tuliskan angkanya, dan terakhir kasus khusus kosong = nol.
  tp("daun-1", "metode", "Kelompokkan", 1),
  tp("daun-2", "metode", "Hitung satu-satu", 2),
  tp("daun-3", "metode", "Angka terakhir = banyaknya", 3),
  tp("daun-4", "metode", "Lihat sekilas", 4),
  tp("daun-5", "metode", "Tuliskan", 5),
  tp("daun-6", "metode", "Kosong = nol", 6),
  tp("buah-1", "hasil", "Bisa menghitung"),
  tp("buah-2", "hasil", "Bisa menulis"),
  tp("buah-3", "hasil", "Bisa membaca"),
];
/** Petunjuk saat label sewarna tetapi salah nomor pada langkah berurutan. Kalimat pendek, tanpa digit. */
export const PETUNJUK_URUTAN = "Warnanya sudah benar. Urutan langkahnya belum pas. Mana yang dikerjakan lebih dulu?";
export const SUARA_POHON =
  "Ini pohon belajar menghitung. Setiap label punya warna. Daun hijau berisi langkah yang berurutan, ikuti nomornya. Ketuk label, lalu ketuk tempat kosong yang cocok.";

/* ------------------------------ Infografis: rak tabel data ------------------------------ */
export const KOLOM_RAK = ["Cara menghitung", "Angka", "Dibaca"] as const;
export const BARIS_RAK: { jenis: string; cara: string; n: number }[] = [
  { jenis: "mobil", cara: "Tunjuk satu, sebut satu", n: 5 },
  { jenis: "boneka", cara: "Angka terakhir", n: 4 },
  { jenis: "bola", cara: "Lihat sekilas", n: 3 },
  { jenis: "balok", cara: "Laci sepuluh kotak", n: 10 },
  { jenis: "kereta", cara: "Kotak kosong", n: 0 },
];
export const TEMPAT_RAK: Tempat[] = BARIS_RAK.flatMap((b, i) => [
  tp(`r${i}-cara`, "cara", b.cara),
  tp(`r${i}-angka`, "angka", String(b.n)),
  tp(`r${i}-baca`, "baca", kata(b.n)),
]);
export const KELOMPOK_RAK: Record<string, string> = {
  cara: "Label ini cara menghitung. Tempelkan di kolom Cara.",
  angka: "Label ini lambang angka. Tempelkan di kolom Angka.",
  baca: "Label ini nama angka. Tempelkan di kolom Dibaca.",
};
export const SUARA_RAK = "Ini rak catatan mainan Igil. Tiap papan rak satu baris. Isi cara menghitung, angkanya, dan cara membacanya.";

/* ------------------------------ Simulasi: Misi Rumah Rapi bagian satu, kamar Kaka ------------------------------ */
/** Rak kamar Kaka. Banyak berbeda dari Story: robot 6, yoyo 2, kelereng 8 (laci sepuluh kotak), pesawat 0. */
export const RAK_KAMAR: { jenis: string; banyak: number; laci?: boolean }[] = [
  { jenis: "robot", banyak: 6 },
  { jenis: "yoyo", banyak: 2 },
  { jenis: "kelereng", banyak: 8, laci: true },
  { jenis: "pesawat", banyak: 0 },
];
export const MISI_RUMAH_RAPI = "Misi Rumah Rapi: bantu Kaka, Abang, dan Igil merapikan seluruh rumah, satu ruang demi satu ruang.";

/* ------------------------------ CPA: lanjutan Misi Rumah Rapi ------------------------------ */
/*
 * Tiap tahap = dua belas soal = tiga kelompok cara (Klik, Tulis di kanvas, Rekam suara) x empat metode
 * (Metode IGIL, One-to-One, Cardinality, Subitizing), masing-masing tepat sekali per kelompok.
 * Angka jawaban dalam satu tahap tidak kembar dan berbeda dari Story untuk benda yang sama.
 */
const ARAH: Record<string, string> = { kiri: "kiri", kanan: "kanan" };

/** Akhir instruksi menurut cara menjawab angka. */
const AKHIR_CARA: Record<Cara, string> = {
  klik: "Lalu pilih banyaknya.",
  kanvas: "Lalu tulis angkanya di kanvas.",
  suara: "Lalu ucapkan banyaknya.",
};

/** Instruksi singkat (layar dan suara) dibuat dari jenis langkah, rupa, dan cara menjawab. Tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara = "klik"): string {
  const b = (j: string) => NAMA[j] ?? j;
  const akhir = AKHIR_CARA[cara];
  switch (l.tipe) {
    case "pisah":
      return rupa === "lambang" ? "Pisahkan lambang dan nama angka. Ketuk kartu, lalu ketuk wadahnya." : "Pisahkan yang sejenis. Ketuk satu benda, lalu ketuk wadahnya.";
    case "tunjuk":
      return rupa === "lambang" ? `Ketuk kartu angka berurutan, mulai dari satu. ${akhir}` : `Tunjuk satu, sebut satu. Ketuk tiap ${b(l.jenis)} sekali. ${akhir}`;
    case "pindah":
      return `Pindahkan ${b(l.jenis)} satu per satu ke ${b(l.wadah)}. ${akhir}`;
    case "pasang":
      return rupa === "lambang" ? "Pasangkan tiap nama angka dengan lambangnya. Ketuk nama, lalu ketuk lambang." : `Pasangkan tiap ${b(l.jenis)} dengan satu kartu angka. Ketuk ${b(l.jenis)}, lalu ketuk kartu.`;
    case "dobel":
      return l.cara === "dobel" ? "Ada yang dihitung dua kali. Ketuk yang mana." : "Ada yang terlewat, tidak dihitung. Ketuk yang mana.";
    case "terakhir":
      return `Lihat hitungan dari ${ARAH[l.arah]}. Angka terakhir adalah banyaknya. ${akhir}`;
    case "sekilas":
      return `Lihat sekilas, jangan dihitung. ${akhir}`;
    case "laci":
      return `Isi laci sepuluh kotak. Satu kotak, satu ${b(l.jenis)}. ${akhir}`;
    case "nol":
      return cara === "suara" ? "Satu kotak tidak ada isinya. Berapa isinya? Ucapkan." : "Ketuk kotak yang tidak ada isinya. Banyaknya nol.";
    case "tabel":
      return "Catat banyak tiap baris di tabel. Ketuk kotak, lalu pilih angkanya.";
    case "baca":
      if (l.ke === "kata") return cara === "suara" ? "Lambang ini dibaca apa? Ucapkan namanya." : "Lambang ini dibaca apa? Pilih namanya.";
      return cara === "kanvas" ? "Tulis lambang untuk nama angka ini di kanvas." : "Pilih lambang untuk nama angka ini.";
    case "lingkari":
      return `Lingkari semua ${b(l.target)}, yang lain jangan. ${akhir}`;
    case "centang":
      return `Beri satu tanda pada tiap ${b(l.jenis)}. Satu benda, satu tanda. ${akhir}`;
    case "titik":
      return "Lihat sekilas, jangan dihitung. Lalu gambar titik sebanyak yang kamu lihat.";
    case "hubung":
      return rupa === "lambang" ? "Tarik garis dari tiap nama angka ke lambangnya." : `Tarik garis dari tiap ${b(l.jenis)} ke satu kartu angka.`;
  }
}

const p = (...a: number[]) => a;
/** Satu kelompok cara: empat langkah berurutan igil, satu, kardinal, sekilas. */
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
  C(1, "klik", "Misi Rumah Rapi 2: kamar Abang", "Kamar Abang berantakan. Robot dan bola tercampur.", [
    { tipe: "pisah", jenis: ["robot", "bola", "robot", "bola", "bola", "robot", "bola"], wadah: ["robot", "bola"] },
    { tipe: "dobel", n: 6, jenis: "mobil", salah: 2, cara: "dobel" },
    { tipe: "terakhir", n: 7, jenis: "dino", arah: "kanan", pilihan: p(6, 7, 8) },
    { tipe: "sekilas", n: 5, jenis: "yoyo", pola: "dadu", pilihan: p(4, 5, 6) },
  ]),
  C(2, "kanvas", "Misi Rumah Rapi 3: ruang tamu", "Mainan tertinggal di karpet ruang tamu. Ambil pensil ajaib, lalu gambar di kanvas.", [
    { tipe: "lingkari", benda: ["robot", "bola", "robot", "yoyo", "robot", "robot", "bola", "robot", "yoyo", "robot"], target: "robot" },
    { tipe: "centang", n: 8, jenis: "kelereng" },
    { tipe: "terakhir", n: 9, jenis: "boneka", arah: "kiri", pilihan: p(8, 9, 10) },
    { tipe: "titik", n: 4, jenis: "dino", pola: "dadu" },
  ]),
  C(3, "suara", "Misi Rumah Rapi 4: teras", "Abang memanggil dari teras. Jawab dengan suaramu yang keras.", [
    { tipe: "nol", kotak: [{ jenis: "yoyo", n: 3 }, { jenis: "pesawat", n: 0 }, { jenis: "boneka", n: 2 }] },
    { tipe: "pindah", n: 3, jenis: "boneka", wadah: "wadah", pilihan: p(2, 3, 4) },
    { tipe: "terakhir", n: 10, jenis: "robot", arah: "kanan", pilihan: p(9, 10, 8) },
    { tipe: "sekilas", n: 2, jenis: "bola", pola: "baris", pilihan: p(1, 2, 3) },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Rumah Rapi 5: gambar catatan", "Igil menggambar titik, petak, dan segitiga untuk tiap mainan.", [
    { tipe: "tabel", baris: [{ jenis: "bulat", n: 4 }, { jenis: "kotak", n: 0 }, { jenis: "segitiga", n: 6 }] },
    { tipe: "pasang", n: 5, jenis: "bulat" },
    { tipe: "terakhir", n: 8, jenis: "kotak", arah: "kanan", pilihan: p(7, 8, 9) },
    { tipe: "sekilas", n: 6, jenis: "bulat", pola: "dadu", pilihan: p(5, 6, 4) },
  ]),
  P(2, "kanvas", "Misi Rumah Rapi 6: gambar dapur", "Kaka meminjamkan papan gambar. Lingkari, tarik garis, dan tulis di kanvas.", [
    { tipe: "lingkari", benda: ["segitiga", "bulat", "segitiga", "kotak", "segitiga", "bulat", "segitiga", "kotak", "bulat", "segitiga"], target: "segitiga" },
    { tipe: "hubung", n: 4, jenis: "kotak" },
    { tipe: "terakhir", n: 9, jenis: "segitiga", arah: "kiri", pilihan: p(8, 9, 10) },
    { tipe: "sekilas", n: 3, jenis: "kotak", pola: "baris", pilihan: p(2, 3, 4) },
  ]),
  P(3, "suara", "Misi Rumah Rapi 7: gambar laci", "Abang menggambar laci sepuluh kotak. Sebutkan jawabanmu.", [
    { tipe: "laci", n: 10, jenis: "bulat", pilihan: p(9, 10, 8) },
    { tipe: "tunjuk", n: 7, jenis: "bulat", pilihan: p(6, 7, 8) },
    { tipe: "terakhir", n: 4, jenis: "bulat", arah: "kiri", pilihan: p(3, 4, 5) },
    { tipe: "sekilas", n: 2, jenis: "segitiga", pola: "dadu", pilihan: p(1, 2, 3) },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Rumah Rapi 8: tabel rak", "Kaka menempel tabel rak yang baru.", [
    { tipe: "tabel", baris: [{ jenis: "yoyo", n: 7 }, { jenis: "kereta", n: 0 }, { jenis: "dino", n: 9 }] },
    { tipe: "dobel", n: 8, jenis: "lambang", salah: 5, cara: "lewat" },
    { tipe: "terakhir", n: 6, jenis: "kata", arah: "kanan", pilihan: p(5, 6, 7) },
    { tipe: "sekilas", n: 4, jenis: "lambang", pola: "baris", pilihan: p(4, 7, 1) },
  ]),
  A(2, "kanvas", "Misi Rumah Rapi 9: tulis label", "Abang meminta Igil menulis label rak di kanvas.", [
    { tipe: "baca", n: 9, ke: "lambang", pilihan: p(6, 9, 4) },
    { tipe: "hubung", n: 5, jenis: "kata" },
    { tipe: "terakhir", n: 10, jenis: "kata", arah: "kiri", pilihan: p(9, 10, 1) },
    { tipe: "sekilas", n: 3, jenis: "lambang", pola: "baris", pilihan: p(3, 8, 2) },
  ]),
  A(3, "suara", "Misi Rumah Rapi 10: rumah rapi", "Rumah sudah rapi. Bacakan kartu terakhir untuk Mamah.", [
    { tipe: "baca", n: 7, ke: "kata", pilihan: p(1, 7, 4) },
    { tipe: "tunjuk", n: 8, jenis: "lambang", pilihan: p(7, 8, 9) },
    { tipe: "terakhir", n: 5, jenis: "kata", arah: "kanan", pilihan: p(4, 5, 6) },
    { tipe: "sekilas", n: 2, jenis: "lambang", pola: "baris", pilihan: p(2, 5, 9) },
  ]),
];

export const PITA_TAHAP = {
  concrete: { ikon: "\u{1F9F8}", nama: "Concrete", cara: "Mainan nyata: ketuk, gambar, dan ucapkan", warna: "#FDE68A" },
  pictorial: { ikon: "\u{1F535}", nama: "Pictorial", cara: "Gambar titik, petak, dan segitiga: ketuk, gambar, dan ucapkan", warna: "#BFDBFE" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Lambang dan nama angka: ketuk, tulis, dan ucapkan", warna: "#DDD6FE" },
} as const;
