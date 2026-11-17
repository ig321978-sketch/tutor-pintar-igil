/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab A "Bekal untuk Nenek",
 * awal cerita Kereta ke Rumah Nenek. Angka Story (kue delapan diambil dua, penumpang tujuh turun tiga, minuman sepuluh diminum tiga,
 * bangku depan tiga turun tiga, kue enam diambil nol; roti sembilan dan empat, jeruk enam dan dua, pisang sepuluh dan dua)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Perjalanan" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-bekal-k1b3a.mjs.
 */
import type { Bekal, Cara, Kalimat, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { KURANG, URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = {
  kue: "\u{1F370}",
  roti: "\u{1F35E}",
  jeruk: "\u{1F34A}",
  pisang: "\u{1F34C}",
  minuman: "\u{1F9C3}",
  penumpang: "\u{1F9D1}",
  karcis: "\u{1F3AB}",
  kereta: "\u{1F686}",
  stasiun: "\u{1F689}",
};

/* ------------------------------ Mind-map: peta rel (hanya poin pelajaran) ------------------------------ */
export const PUSAT_REL = "Pengurangan";
export const KELOMPOK_REL: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan keberangkatan", ikon: "\u{1F6A9}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di papan keberangkatan." },
  metode: { nama: "Penyelesaian", letak: "Gerbong", ikon: "\u{1F683}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di gerbong yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Stasiun tujuan", ikon: "\u{1F689}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di stasiun tujuan." },
};
export const TEMPAT_REL: Tempat[] = [
  tp("pb-1", "masalah", "Bekal dimakan sedikit-sedikit"),
  tp("pb-2", "masalah", "Penumpang turun di stasiun"),
  tp("pb-3", "masalah", "Berapa yang tersisa?"),
  tp("gb-1", "metode", "Hitung yang mula-mula", 1),
  tp("gb-2", "metode", "Cari yang berkurang", 2),
  tp("gb-3", "metode", "Hitung yang tersisa", 3),
  tp("gb-4", "metode", `Tulis dengan ${KURANG} dan =`, 4),
  tp("gb-5", "metode", "Mengambil", 5),
  tp("gb-6", "metode", "Menghitung mundur", 6),
  tp("gb-7", "metode", "Bingkai sepuluh", 7),
  tp("st-1", "hasil", "Tahu banyak sisanya"),
  tp("st-2", "hasil", "Bisa menulis kalimat"),
  tp("st-3", "hasil", "Dikurangi nol tetap sama"),
  tp("st-4", "hasil", "Diambil semua, sisa nol"),
];
export const PETUNJUK_URUT_REL = "Warnanya sudah benar. Nomor gerbongnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_REL =
  "Ini peta rel belajar pengurangan. Papan keberangkatan berisi masalah. Gerbong bernomor yang berangkai berisi langkah yang berurutan, ikuti nomornya. Stasiun tujuan berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: jendela gerbong ------------------------------ */
export const KOLOM_JENDELA = ["Mula-mula", "Berkurang", "Sisa", "Kalimat"] as const;
const kal = (a: number, b: number) => `${a} ${KURANG} ${b} = ${a - b}`;
export const BARIS_JENDELA: { benda: string; nama: string; mula: string; kurang: string; sisa: string; kalimat: string }[] = [
  { benda: "kue", nama: "Kue", mula: "8", kurang: "dimakan 2", sisa: "sisa 6", kalimat: kal(8, 2) },
  { benda: "penumpang", nama: "Bangku", mula: "7", kurang: "turun 3", sisa: "sisa 4", kalimat: kal(7, 3) },
  { benda: "minuman", nama: "Minuman", mula: "10", kurang: "diminum 3", sisa: "sisa 7", kalimat: kal(10, 3) },
  { benda: "stasiun", nama: "Depan", mula: "3", kurang: "turun semua", sisa: "sisa 0", kalimat: kal(3, 3) },
];
export const TEMPAT_JENDELA: Tempat[] = BARIS_JENDELA.flatMap((b, i) => [
  tp(`j${i}-mula`, "mula", b.mula),
  tp(`j${i}-kurang`, "kurang", b.kurang),
  tp(`j${i}-sisa`, "sisa", b.sisa),
  tp(`j${i}-kalimat`, "kalimat", b.kalimat),
]);
export const KELOMPOK_JENDELA: Record<string, string> = {
  mula: "Label ini banyak mula-mula. Tempelkan di kolom Mula-mula.",
  kurang: "Label ini yang berkurang. Tempelkan di kolom Berkurang.",
  sisa: "Label ini sisanya. Tempelkan di kolom Sisa.",
  kalimat: "Label ini kalimat pengurangan. Tempelkan di kolom Kalimat.",
};
export const SUARA_JENDELA = "Ini jendela gerbong berisi catatan dari cerita. Tiap jendela satu cerita. Tempelkan banyak mula-mula, yang berkurang, sisanya, dan kalimat pengurangannya.";

/* ------------------------------ Simulasi: Misi Perjalanan bagian satu, kotak bekal ------------------------------ */
/** Bilangan berbeda dari Story: roti enam, jeruk sembilan, pisang empat. */
export const MULA_SIM: Record<Bekal, number> = { roti: 6, jeruk: 9, pisang: 4 };
export const MISI_BEKAL = "Misi Perjalanan: ambil bekal dari kotak bersekat, lihat sisa dan kalimat pengurangannya, lalu catat setiap kalimat yang kamu buat.";

/* ------------------------------ CPA: lanjutan Misi Perjalanan ------------------------------ */
/** Tiga kartu kalimat: satu cocok, satu sisanya salah, satu bilangannya bukan dari cerita. Urutan digeser `geser`. */
export function pilihanKalimat(a: number, b: number, geser: number): Kalimat[] {
  const c = a - b;
  const salahHasil: Kalimat = [a, b, c < 10 ? c + 1 : c - 1];
  const salahBilangan: Kalimat = a < 10 ? [a + 1, b, c + 1] : b < a ? [a, b + 1, c - 1] : [a - 1, b - 1, c];
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
  C(1, "klik", "roti", "Misi Perjalanan 2: meja makan kereta", "Bekal roti dibuka di meja kereta. Bantu Mamah menghitung sisanya.", [
    { tipe: "kalimat", a: 9, b: 6, adegan: "makan", pilihan: pilihanKalimat(9, 6, 1), tokoh: "Abang" },
    { tipe: "ambil", a: 7, b: 2 },
    { tipe: "mundur", a: 5, b: 1 },
    { tipe: "bingkai", a: 10, b: 4 },
  ]),
  C(2, "kanvas", "jeruk", "Misi Perjalanan 3: jendela berembun", "Igil menggambar di kaca jendela yang berembun. Beri tanda dan tulis jawabanmu.", [
    { tipe: "kalimat", a: 5, b: 3, adegan: "turun", pilihan: pilihanKalimat(5, 3, 2) },
    { tipe: "ambil", a: 4, b: 4 },
    { tipe: "mundur", a: 9, b: 2 },
    { tipe: "bingkai", a: 8, b: 5 },
  ]),
  C(3, "suara", "pisang", "Misi Perjalanan 4: Nenek menelepon", "Nenek menelepon dan bertanya sisa bekalnya. Jawab dengan suaramu.", [
    { tipe: "pergi", a: 3, b: 2 },
    { tipe: "ambil", a: 9, b: 1 },
    { tipe: "mundur", a: 4, b: 2 },
    { tipe: "bingkai", a: 10, b: 0 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "kue", "Misi Perjalanan 5: denah gerbong", "Abang menggambar denah gerbong dengan titik.", [
    { tipe: "kalimat", a: 7, b: 5, adegan: "turun", pilihan: pilihanKalimat(7, 5, 0), tokoh: "Igil" },
    { tipe: "ambil", a: 8, b: 1 },
    { tipe: "mundur", a: 6, b: 3 },
    { tipe: "bingkai", a: 10, b: 5 },
  ]),
  P(2, "kanvas", "kue", "Misi Perjalanan 6: papan jadwal", "Abang memakai papan jadwal kosong di stasiun. Lingkari, beri tanda, dan tulis.", [
    { tipe: "kalimat", a: 10, b: 6, adegan: "makan", pilihan: pilihanKalimat(10, 6, 1) },
    { tipe: "ambil", a: 5, b: 5 },
    { tipe: "mundur", a: 7, b: 1 },
    { tipe: "bingkai", a: 9, b: 7 },
  ]),
  P(3, "suara", "kue", "Misi Perjalanan 7: lapor ke kondektur", "Abang melaporkan denahnya ke kondektur. Sebutkan jawabanmu.", [
    { tipe: "pergi", a: 9, b: 0 },
    { tipe: "ambil", a: 5, b: 1 },
    { tipe: "mundur", a: 2, b: 1 },
    { tipe: "bingkai", a: 8, b: 0 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "kue", "Misi Perjalanan 8: balik karcis", "Kaka menulis hitungan di balik karcis dengan angka dan tanda saja.", [
    { tipe: "kalimat", a: 8, b: 4, adegan: "makan", pilihan: pilihanKalimat(8, 4, 2), tokoh: "Kaka" },
    { tipe: "ambil", a: 6, b: 1 },
    { tipe: "mundur", a: 9, b: 3 },
    { tipe: "bingkai", a: 7, b: 7 },
  ]),
  A(2, "kanvas", "kue", "Misi Perjalanan 9: tulis jawaban", "Kaka meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "kalimat", a: 4, b: 1, adegan: "turun", pilihan: pilihanKalimat(4, 1, 0) },
    { tipe: "ambil", a: 10, b: 1 },
    { tipe: "mundur", a: 3, b: 1 },
    { tipe: "bingkai", a: 10, b: 6 },
  ]),
  A(3, "suara", "kue", "Misi Perjalanan 10: hampir sampai", "Kereta hampir tiba di stasiun besar. Bacakan jawaban terakhir untuk Mamah.", [
    { tipe: "pergi", a: 8, b: 0 },
    { tipe: "ambil", a: 5, b: 2 },
    { tipe: "mundur", a: 8, b: 1 },
    { tipe: "bingkai", a: 2, b: 1 },
  ]),
];

export const POIN_PENTING = [
  "Pengurangan berarti berkurang: diambil, dimakan, atau pergi.",
  `Tanda ${KURANG} dibaca dikurangi. Tanda = dibaca sama dengan, lalu sisanya.`,
  "Mula-mula dikurangi yang pergi sama dengan sisa.",
  "Hitung mundur: mulai dari bilangan pertama, lalu mundur satu per satu.",
  "Bingkai sepuluh: kosongkan sekat dari belakang, sekat yang masih terisi adalah sisanya.",
  "Dikurangi nol tetap sama. Diambil semua, sisanya nol.",
];
/** Poin penting untuk suara (tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(`Tanda ${KURANG} dibaca`, "Tanda kurang dibaca").replace("Tanda = dibaca", "Tanda sama dengan dibaca"));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F370}", nama: "Concrete", cara: "Bekal dan penumpang: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F51F}", nama: "Pictorial", cara: "Titik dan bingkai: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F3AB}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
