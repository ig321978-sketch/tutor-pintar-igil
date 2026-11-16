/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab A
 * "Merapikan Lemari Mainan Igil". Semua angka contoh Story (mobil 5, boneka 4, bola 3, balok 10, kereta 0) hanya dipakai
 * di Mind-map dan Infografis; Simulasi dan CPA memakai angka lain dan melanjutkan misi "Rumah Rapi" sampai akhir sub-bab.
 * Instruksi dan suara langkah dibuat dari templat (`instruksi`) supaya data tetap pendek. Diuji: scripts/uji-lemari-k1b1a.mjs.
 */
import type { Langkah, LangkahSoal, Metode, Rupa, SoalMisi, Tempat } from "./logika";
import { kata } from "./logika";

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
 * Pohon belajar: akar = masalah matematikanya, daun cabang = cara menghitung (empat metode di Story: metode kurikulum dan tiga
 * metode luar), buah = hasil yang diharapkan. Tanpa poin cerita (mainan, lemari, tokoh). Tiap kelompok punya warna sendiri;
 * label dan tempat kosong memakai warna yang sama, dan label sekelompok boleh ditempel di cabang kosong berwarna itu.
 */
export const PUSAT_POHON = "Menghitung benda";
export const KELOMPOK_POHON: Record<string, { nama: string; letak: string; ikon: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "akar", ikon: "\u{1F331}", petunjuk: "Warna label ini cokelat. Tempelkan di akar yang cokelat." },
  metode: { nama: "Cara", letak: "daun", ikon: "\u{1F343}", petunjuk: "Warna label ini hijau. Tempelkan di daun yang hijau." },
  hasil: { nama: "Hasil", letak: "buah", ikon: "\u{1F34E}", petunjuk: "Warna label ini merah. Tempelkan di buah yang merah." },
};
const tp = (id: string, kelompok: string, kunci: string): Tempat => ({ id, kelompok, kunci });
export const TEMPAT_POHON: Tempat[] = [
  tp("akar-1", "masalah", "Berapa banyaknya?"),
  tp("akar-2", "masalah", "Angkanya ditulis apa?"),
  tp("daun-1", "metode", "Hitung, baca, tulis"),
  tp("daun-2", "metode", "Tunjuk satu, sebut satu"),
  tp("daun-3", "metode", "Angka terakhir = banyaknya"),
  tp("daun-4", "metode", "Lihat sekilas"),
  tp("buah-1", "hasil", "Tahu banyaknya benda"),
  tp("buah-2", "hasil", "Bisa baca dan tulis angka"),
  tp("buah-3", "hasil", "Tahu arti nol"),
];
export const SUARA_POHON =
  "Ini pohon belajar menghitung. Setiap label punya warna. Ketuk label, lalu ketuk tempat kosong yang warnanya sama.";

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
const ARAH: Record<string, string> = { kiri: "kiri", kanan: "kanan" };

/** Instruksi singkat (layar dan suara) dibuat dari jenis langkah dan rupa. Tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa): string {
  const b = (j: string) => NAMA[j] ?? j;
  switch (l.tipe) {
    case "pisah":
      return rupa === "lambang" ? "Pisahkan lambang dan nama angka. Ketuk kartu, lalu ketuk wadahnya." : "Pisahkan yang sejenis. Ketuk satu benda, lalu ketuk wadahnya.";
    case "tunjuk":
      return rupa === "lambang" ? "Ketuk kartu angka berurutan, mulai dari satu. Lalu pilih banyaknya." : `Tunjuk satu, sebut satu. Ketuk tiap ${b(l.jenis)} sekali. Lalu pilih banyaknya.`;
    case "pindah":
      return `Pindahkan ${b(l.jenis)} satu per satu ke ${b(l.wadah)}. Lalu pilih banyaknya.`;
    case "pasang":
      return rupa === "lambang" ? "Pasangkan tiap nama angka dengan lambangnya. Ketuk nama, lalu ketuk lambang." : `Pasangkan tiap ${b(l.jenis)} dengan satu kartu angka. Ketuk ${b(l.jenis)}, lalu ketuk kartu.`;
    case "dobel":
      return l.cara === "dobel" ? "Ada yang dihitung dua kali. Ketuk yang mana." : "Ada yang terlewat, tidak dihitung. Ketuk yang mana.";
    case "terakhir":
      return `Lihat hitungan dari ${ARAH[l.arah]}. Angka terakhir adalah banyaknya. Pilih banyaknya.`;
    case "sekilas":
      return "Lihat sekilas, jangan dihitung. Lalu pilih banyaknya.";
    case "laci":
      return `Isi laci sepuluh kotak. Satu kotak, satu ${b(l.jenis)}. Lalu pilih banyaknya.`;
    case "nol":
      return "Ketuk kotak yang tidak ada isinya. Banyaknya nol.";
    case "tabel":
      return "Catat banyak tiap baris di tabel. Ketuk kotak, lalu pilih angkanya.";
    case "baca":
      return l.ke === "kata" ? "Lambang ini dibaca apa? Pilih namanya." : "Pilih lambang untuk nama angka ini.";
  }
}

const L = (metode: Metode, langkah: Langkah, rupa: Rupa): LangkahSoal => {
  const s = instruksi(langkah, rupa);
  return { metode, judul: s, suara: s, langkah };
};
const p = (...a: number[]) => a;
const soal = (rupa: Rupa) => (nomor: number, judul: string, cerita: string, isi: [Metode, Langkah][]): SoalMisi => ({
  nomor,
  judul,
  cerita,
  langkah: isi.map(([m, l]) => L(m, l, rupa)),
});

const C = soal("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "Misi Rumah Rapi 2: kamar Abang", "Kamar Abang juga berantakan. Robot dan bola tercampur.", [
    ["igil", { tipe: "pisah", jenis: ["robot", "bola", "robot", "bola", "bola", "robot", "bola"], wadah: ["robot", "bola"] }],
    ["satu", { tipe: "pasang", n: 4, jenis: "mobil" }],
    ["kardinal", { tipe: "terakhir", n: 6, jenis: "dino", arah: "kanan", pilihan: p(5, 6, 7) }],
    ["sekilas", { tipe: "sekilas", n: 3, jenis: "yoyo", pola: "dadu", pilihan: p(2, 3, 4) }],
  ]),
  C(2, "Misi Rumah Rapi 3: ruang tamu", "Boneka dan kelereng ada di bawah meja ruang tamu.", [
    ["igil", { tipe: "tunjuk", n: 7, jenis: "boneka", pilihan: p(6, 7, 8) }],
    ["satu", { tipe: "pindah", n: 5, jenis: "kelereng", wadah: "wadah", pilihan: p(4, 5, 6) }],
    ["kardinal", { tipe: "terakhir", n: 8, jenis: "yoyo", arah: "kiri", pilihan: p(7, 8, 9) }],
    ["sekilas", { tipe: "sekilas", n: 5, jenis: "bola", pola: "dadu", pilihan: p(4, 5, 6) }],
  ]),
  C(3, "Misi Rumah Rapi 4: teras", "Balok dan mobil tertinggal di teras.", [
    ["igil", { tipe: "laci", n: 9, jenis: "balok", pilihan: p(8, 9, 10) }],
    ["satu", { tipe: "dobel", n: 6, jenis: "mobil", salah: 2, cara: "dobel" }],
    ["kardinal", { tipe: "terakhir", n: 4, jenis: "kereta", arah: "kanan", pilihan: p(3, 4, 5) }],
    ["sekilas", { tipe: "sekilas", n: 2, jenis: "robot", pola: "baris", pilihan: p(1, 2, 3) }],
  ]),
  C(4, "Misi Rumah Rapi 5: kotak mainan", "Mamah punya tiga kotak mainan. Satu kotak kosong.", [
    ["igil", { tipe: "nol", kotak: [{ jenis: "yoyo", n: 3 }, { jenis: "pesawat", n: 0 }, { jenis: "boneka", n: 2 }] }],
    ["satu", { tipe: "dobel", n: 7, jenis: "yoyo", salah: 4, cara: "lewat" }],
    ["kardinal", { tipe: "terakhir", n: 10, jenis: "robot", arah: "kiri", pilihan: p(9, 10, 8) }],
    ["sekilas", { tipe: "sekilas", n: 4, jenis: "dino", pola: "dadu", pilihan: p(3, 4, 5) }],
  ]),
];

const P = soal("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "Misi Rumah Rapi 6: gambar catatan", "Igil menggambar titik dan petak untuk tiap mainan.", [
    ["igil", { tipe: "pisah", jenis: ["bulat", "kotak", "kotak", "bulat", "kotak", "bulat", "bulat"], wadah: ["bulat", "kotak"] }],
    ["satu", { tipe: "pasang", n: 5, jenis: "bulat" }],
    ["kardinal", { tipe: "terakhir", n: 7, jenis: "bulat", arah: "kanan", pilihan: p(6, 7, 8) }],
    ["sekilas", { tipe: "sekilas", n: 4, jenis: "bulat", pola: "dadu", pilihan: p(3, 4, 5) }],
  ]),
  P(2, "Misi Rumah Rapi 7: gambar dapur", "Ada mainan di dapur. Igil menggantinya dengan titik.", [
    ["igil", { tipe: "tunjuk", n: 8, jenis: "bulat", pilihan: p(7, 8, 9) }],
    ["satu", { tipe: "pindah", n: 6, jenis: "kotak", wadah: "bingkai", pilihan: p(5, 6, 7) }],
    ["kardinal", { tipe: "terakhir", n: 5, jenis: "segitiga", arah: "kiri", pilihan: p(4, 5, 6) }],
    ["sekilas", { tipe: "sekilas", n: 6, jenis: "bulat", pola: "dadu", pilihan: p(5, 6, 4) }],
  ]),
  P(3, "Misi Rumah Rapi 8: gambar laci", "Abang menggambar laci sepuluh kotak.", [
    ["igil", { tipe: "laci", n: 7, jenis: "bulat", pilihan: p(6, 7, 8) }],
    ["satu", { tipe: "dobel", n: 5, jenis: "bulat", salah: 1, cara: "lewat" }],
    ["kardinal", { tipe: "terakhir", n: 9, jenis: "kotak", arah: "kanan", pilihan: p(8, 9, 10) }],
    ["sekilas", { tipe: "sekilas", n: 3, jenis: "bulat", pola: "baris", pilihan: p(2, 3, 4) }],
  ]),
  P(4, "Misi Rumah Rapi 9: tabel gambar", "Kaka membuat tabel dari gambar titik.", [
    ["igil", { tipe: "tabel", baris: [{ jenis: "bulat", n: 4 }, { jenis: "kotak", n: 0 }, { jenis: "segitiga", n: 6 }] }],
    ["satu", { tipe: "pasang", n: 6, jenis: "kotak" }],
    ["kardinal", { tipe: "terakhir", n: 3, jenis: "bulat", arah: "kiri", pilihan: p(2, 3, 4) }],
    ["sekilas", { tipe: "sekilas", n: 5, jenis: "bulat", pola: "dadu", pilihan: p(4, 5, 6) }],
  ]),
];

const A = soal("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "Misi Rumah Rapi 10: kartu nama rak", "Igil membuat kartu nama untuk rak baru.", [
    ["igil", { tipe: "baca", n: 7, ke: "kata", pilihan: p(6, 7, 9) }],
    ["satu", { tipe: "pasang", n: 5, jenis: "kata" }],
    ["kardinal", { tipe: "terakhir", n: 6, jenis: "kata", arah: "kanan", pilihan: p(5, 6, 7) }],
    ["sekilas", { tipe: "sekilas", n: 8, jenis: "lambang", pola: "baris", pilihan: p(3, 8, 6) }],
  ]),
  A(2, "Misi Rumah Rapi 11: urutan kartu", "Kartu angka Kaka jatuh dan tercampur.", [
    ["igil", { tipe: "tunjuk", n: 6, jenis: "lambang", pilihan: p(5, 6, 7) }],
    ["satu", { tipe: "dobel", n: 6, jenis: "lambang", salah: 3, cara: "dobel" }],
    ["kardinal", { tipe: "terakhir", n: 9, jenis: "kata", arah: "kiri", pilihan: p(8, 9, 10) }],
    ["sekilas", { tipe: "sekilas", n: 4, jenis: "lambang", pola: "baris", pilihan: p(4, 7, 1) }],
  ]),
  A(3, "Misi Rumah Rapi 12: tulis label", "Abang meminta Igil menulis label rak.", [
    ["igil", { tipe: "baca", n: 10, ke: "lambang", pilihan: p(1, 10, 0) }],
    ["satu", { tipe: "pasang", n: 7, jenis: "kata" }],
    ["kardinal", { tipe: "terakhir", n: 3, jenis: "kata", arah: "kanan", pilihan: p(2, 3, 4) }],
    ["sekilas", { tipe: "sekilas", n: 2, jenis: "lambang", pola: "baris", pilihan: p(2, 5, 9) }],
  ]),
  A(4, "Misi Rumah Rapi 13: tabel akhir", "Rumah sudah rapi. Kaka menempel tabel terakhir.", [
    ["igil", { tipe: "tabel", baris: [{ jenis: "robot", n: 6 }, { jenis: "pesawat", n: 0 }, { jenis: "kelereng", n: 8 }] }],
    ["satu", { tipe: "dobel", n: 8, jenis: "lambang", salah: 5, cara: "lewat" }],
    ["kardinal", { tipe: "terakhir", n: 10, jenis: "kata", arah: "kiri", pilihan: p(9, 10, 1) }],
    ["sekilas", { tipe: "sekilas", n: 5, jenis: "lambang", pola: "baris", pilihan: p(5, 2, 3) }],
  ]),
];

export const PITA_TAHAP = {
  concrete: { ikon: "\u{1F9F8}", nama: "Concrete", cara: "Mainan nyata: ketuk, pindahkan, pasangkan", warna: "#FDE68A" },
  pictorial: { ikon: "\u{1F535}", nama: "Pictorial", cara: "Gambar titik, petak, dan laci sepuluh kotak", warna: "#BFDBFE" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Lambang dan nama angka", warna: "#DDD6FE" },
} as const;
