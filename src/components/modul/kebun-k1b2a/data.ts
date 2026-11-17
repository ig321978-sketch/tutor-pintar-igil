/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 2 Sub-Bab A "Bibit Kiriman Nenek",
 * awal cerita Kebun Sayur Mamah. Angka Story (cabai empat datang dua, tomat tiga dan lima, selada tujuh dan nol, sawi enam dan empat;
 * wortel tujuh dan dua, terong dua dan tiga, jagung lima dan tiga) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Kebun" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-kebun-k1b2a.mjs.
 */
import type { Cara, Kalimat, Langkah, LangkahSoal, Rupa, Sayur, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = {
  bibit: "\u{1F331}",
  cabai: "\u{1F336}\u{FE0F}",
  tomat: "\u{1F345}",
  selada: "\u{1F96C}",
  sawi: "\u{1F33F}",
  wortel: "\u{1F955}",
  terong: "\u{1F346}",
  jagung: "\u{1F33D}",
  timun: "\u{1F952}",
  kentang: "\u{1F954}",
  bawang: "\u{1F9C5}",
  keranjang: "\u{1F9FA}",
};

/* ------------------------------ Mind-map: peta kebun (hanya poin pelajaran) ------------------------------ */
export const PUSAT_KEBUN = "Penjumlahan";
export const KELOMPOK_KEBUN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan pagar", ikon: "\u{1F4CB}", isi: "#FED7AA", garis: "#C2410C", petunjuk: "Label ini oranye. Tempelkan di papan pagar." },
  metode: { nama: "Penyelesaian", letak: "Bedeng", ikon: "\u{1F331}", isi: "#D9F99D", garis: "#4D7C0F", petunjuk: "Label ini hijau muda. Tempelkan di bedeng yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Keranjang panen", ikon: "\u{1F9FA}", isi: "#FEF08A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di keranjang panen." },
};
export const TEMPAT_KEBUN: Tempat[] = [
  tp("pg-1", "masalah", "Bibit datang lagi"),
  tp("pg-2", "masalah", "Bibit di dua keranjang"),
  tp("pg-3", "masalah", "Berapa lubang semuanya?"),
  tp("bd-1", "metode", "Hitung yang pertama", 1),
  tp("bd-2", "metode", "Tambah yang datang lagi", 2),
  tp("bd-3", "metode", "Gabungkan dua kumpulan", 3),
  tp("bd-4", "metode", "Tulis dengan + dan =", 4),
  tp("bd-5", "metode", "Menghitung maju", 5),
  tp("bd-6", "metode", "Bagian-bagian-utuh", 6),
  tp("bd-7", "metode", "Bingkai sepuluh", 7),
  tp("kj-1", "hasil", "Tahu banyak semuanya"),
  tp("kj-2", "hasil", "Bisa menulis kalimat"),
  tp("kj-3", "hasil", "Tambah nol tetap sama"),
];
export const PETUNJUK_URUT_KEBUN = "Warnanya sudah benar. Nomor bedengnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_KEBUN =
  "Ini peta kebun belajar penjumlahan. Papan pagar berisi masalah. Bedeng bernomor di sepanjang jalan setapak berisi langkah yang berurutan, ikuti nomornya. Keranjang panen berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: teralis catatan tanam ------------------------------ */
export const KOLOM_TERALIS = ["Mula-mula", "Ditambah", "Kalimat"] as const;
export const BARIS_TERALIS: { benda: string; nama: string; mula: string; tambah: string; kalimat: string }[] = [
  { benda: "cabai", nama: "Cabai", mula: "4", tambah: "datang 2", kalimat: "4 + 2 = 6" },
  { benda: "tomat", nama: "Tomat", mula: "3", tambah: "digabung 5", kalimat: "3 + 5 = 8" },
  { benda: "selada", nama: "Selada", mula: "7", tambah: "kosong 0", kalimat: "7 + 0 = 7" },
  { benda: "sawi", nama: "Sawi", mula: "6", tambah: "datang 4", kalimat: "6 + 4 = 10" },
];
export const TEMPAT_TERALIS: Tempat[] = BARIS_TERALIS.flatMap((b, i) => [tp(`t${i}-mula`, "mula", b.mula), tp(`t${i}-tambah`, "tambah", b.tambah), tp(`t${i}-kalimat`, "kalimat", b.kalimat)]);
export const KELOMPOK_TERALIS: Record<string, string> = {
  mula: "Label ini banyak bibit mula-mula. Tempelkan di kolom Mula-mula.",
  tambah: "Label ini bibit yang ditambahkan. Tempelkan di kolom Ditambah.",
  kalimat: "Label ini kalimat penjumlahan. Tempelkan di kolom Kalimat.",
};
export const SUARA_TERALIS = "Ini teralis catatan tanam dari cerita. Tiap baris satu bedeng. Gantungkan banyak bibit mula-mula, bibit yang ditambahkan, dan kalimat penjumlahannya.";

/* ------------------------------ Simulasi: Misi Kebun bagian satu, bedeng Mamah ------------------------------ */
/** Bilangan berbeda dari Story: timun tiga datang empat, kentang lima datang lima, bawang enam dengan keranjang kosong. */
export const MULA_SIM: Record<Sayur, number> = { timun: 3, kentang: 5, bawang: 6 };
export const DATANG_SIM: Record<Sayur, number> = { timun: 4, kentang: 5, bawang: 0 };
export const MISI_KEBUN = "Misi Kebun: tanam bibit kiriman ke bedeng Mamah, lihat kalimat penjumlahannya, lalu catat setiap kalimat yang kamu buat.";

/* ------------------------------ CPA: lanjutan Misi Kebun ------------------------------ */
/** Tiga kartu kalimat: satu cocok, satu hasilnya salah, satu bilangannya bukan dari cerita. Urutan digeser `geser`. */
export function pilihanKalimat(a: number, b: number, geser: number): Kalimat[] {
  const c = a + b;
  const salahHasil: Kalimat = [a, b, c === 10 ? 9 : c + 1];
  const salahBilangan: Kalimat = c < 10 ? [a + 1, b, c + 1] : a > 0 ? [a - 1, b, c - 1] : [a, b - 1, c - 1];
  const tiga: Kalimat[] = [[a, b, c], salahHasil, salahBilangan];
  return tiga.map((_, i) => tiga[(i + geser) % 3]);
}

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, benda: string, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    benda,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "wortel", "Misi Kebun 2: keranjang wortel", "Kiriman bibit wortel datang lagi. Bantu Mamah menghitung semuanya.", [
    { tipe: "kalimat", a: 2, b: 5, adegan: "gabung", pilihan: pilihanKalimat(2, 5, 1) },
    { tipe: "maju", a: 5, b: 2 },
    { tipe: "bagian", a: 1, b: 3, cari: "utuh" },
    { tipe: "bingkai", a: 6, b: 3 },
  ]),
  C(2, "kanvas", "tomat", "Misi Kebun 3: gambar di tanah", "Kaka menggambar di tanah dengan ranting. Beri tanda dan tulis jawabanmu.", [
    { tipe: "kalimat", a: 3, b: 3, adegan: "datang", pilihan: pilihanKalimat(3, 3, 2) },
    { tipe: "maju", a: 8, b: 2 },
    { tipe: "bagian", a: 2, b: 0, cari: "utuh" },
    { tipe: "bingkai", a: 4, b: 1 },
  ]),
  C(3, "suara", "jagung", "Misi Kebun 4: Nenek bertanya", "Nenek menelepon dan bertanya berapa bibitnya. Jawab dengan suaramu.", [
    { tipe: "datang", a: 5, b: 1 },
    { tipe: "maju", a: 7, b: 1 },
    { tipe: "bagian", a: 3, b: 1, cari: "b" },
    { tipe: "bingkai", a: 1, b: 2 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "bibit", "Misi Kebun 5: denah bedeng", "Abang menggambar denah bedeng dengan titik.", [
    { tipe: "kalimat", a: 1, b: 5, adegan: "datang", pilihan: pilihanKalimat(1, 5, 0) },
    { tipe: "maju", a: 6, b: 2 },
    { tipe: "bagian", a: 4, b: 3, cari: "utuh" },
    { tipe: "bingkai", a: 5, b: 5 },
  ]),
  P(2, "kanvas", "bibit", "Misi Kebun 6: papan denah", "Abang meminjamkan papan denah. Lingkari, beri tanda, dan tulis.", [
    { tipe: "kalimat", a: 4, b: 4, adegan: "gabung", pilihan: pilihanKalimat(4, 4, 1) },
    { tipe: "maju", a: 4, b: 1 },
    { tipe: "bagian", a: 0, b: 6, cari: "utuh" },
    { tipe: "bingkai", a: 8, b: 1 },
  ]),
  P(3, "suara", "bibit", "Misi Kebun 7: laporan denah", "Abang melaporkan denahnya ke Mamah. Sebutkan jawabanmu.", [
    { tipe: "datang", a: 2, b: 2 },
    { tipe: "maju", a: 2, b: 1 },
    { tipe: "bagian", a: 5, b: 0, cari: "b" },
    { tipe: "bingkai", a: 1, b: 1 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "bibit", "Misi Kebun 8: papan catatan", "Kaka menulis catatan kebun dengan angka dan tanda saja.", [
    { tipe: "kalimat", a: 5, b: 4, adegan: "gabung", pilihan: pilihanKalimat(5, 4, 2) },
    { tipe: "maju", a: 4, b: 3 },
    { tipe: "bagian", a: 6, b: 0, cari: "utuh" },
    { tipe: "bingkai", a: 7, b: 3 },
  ]),
  A(2, "kanvas", "bibit", "Misi Kebun 9: tulis jawaban", "Abang meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "kalimat", a: 0, b: 8, adegan: "datang", pilihan: pilihanKalimat(0, 8, 0) },
    { tipe: "maju", a: 8, b: 1 },
    { tipe: "bagian", a: 2, b: 6, cari: "utuh" },
    { tipe: "bingkai", a: 1, b: 4 },
  ]),
  A(3, "suara", "bibit", "Misi Kebun 10: siap disiram", "Semua bibit tertanam. Bacakan jawaban terakhir untuk Mamah.", [
    { tipe: "datang", a: 3, b: 1 },
    { tipe: "maju", a: 1, b: 2 },
    { tipe: "bagian", a: 1, b: 1, cari: "b" },
    { tipe: "bingkai", a: 2, b: 0 },
  ]),
];

export const POIN_PENTING = [
  "Penjumlahan berarti bertambah atau menggabungkan.",
  "Tanda + dibaca ditambah. Tanda = dibaca sama dengan, lalu hasilnya.",
  "Hitung maju: mulai dari bilangan pertama, lalu sebut bilangan berikutnya.",
  "Bagian dan bagian digabung menjadi utuh.",
  "Bingkai sepuluh: satu baris penuh berisi lima, kotak kosong menunjukkan berapa lagi sampai sepuluh.",
  "Ditambah nol, hasilnya tetap sama.",
];
/** Poin penting untuk suara (tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace("Tanda + dibaca", "Tanda tambah dibaca").replace("Tanda = dibaca", "Tanda sama dengan dibaca"));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F955}", nama: "Concrete", cara: "Bibit dan sayur: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F51F}", nama: "Pictorial", cara: "Titik, bingkai, dan tikar: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
