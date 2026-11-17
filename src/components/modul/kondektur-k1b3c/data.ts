/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab C "Kondektur dan Penumpang",
 * lanjutan Kereta ke Rumah Nenek. Angka Story (keluarga tiga, empat, tujuh; sembilan dikurangi lima diperiksa empat ditambah lima; enam ditambah
 * berapa sama dengan sembilan; keluarga dua, enam, delapan; segitiga satu, sembilan, sepuluh; tujuh ditambah dua sama dengan sembilan) hanya
 * dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai keluarga bilangan lain dan melanjutkan "Misi Kondektur" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-kondektur-k1b3c.mjs.
 */
import type { Cara, KalimatOp, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { KURANG, URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = {
  penumpang: "\u{1F9D1}",
  kursi: "\u{1F4BA}",
  karcis: "\u{1F3AB}",
  kondektur: "\u{1F9D1}",
  noda: "\u{1F4A7}",
};

/* ------------------------------ Mind-map: lampu sinyal (hanya poin pelajaran) ------------------------------ */
export const PUSAT_SINYAL = "Tambah dan kurang berkebalikan";
export const KELOMPOK_SINYAL: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Tiang sinyal merah", ikon: "\u{1F6A6}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di tiang sinyal merah." },
  metode: { nama: "Penyelesaian", letak: "Lampu sinyal", ikon: "\u{1F4A1}", isi: "#FEF08A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di lampu sinyal yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Palang terbuka", ikon: "\u{2705}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di palang yang terbuka." },
};
export const TEMPAT_SINYAL: Tempat[] = [
  tp("ms-1", "masalah", "Penumpang naik dan turun"),
  tp("ms-2", "masalah", "Catatan harus cocok"),
  tp("ms-3", "masalah", "Bilangan kena noda"),
  tp("ls-1", "metode", "Tukar tempat penjumlahan", 1),
  tp("ls-2", "metode", "Tiga bilangan sekeluarga", 2),
  tp("ls-3", "metode", "Dua tambah, dua kurang", 3),
  tp("ls-4", "metode", "Kurang tak boleh ditukar", 4),
  tp("ls-5", "metode", "Periksa dengan penjumlahan", 5),
  tp("ls-6", "metode", "Segitiga fakta", 6),
  tp("ls-7", "metode", "Cari yang hilang", 7),
  tp("pl-1", "hasil", "Catatan cocok semua"),
  tp("pl-2", "hasil", "Tahu empat kalimat"),
  tp("pl-3", "hasil", "Yakin jawabannya benar"),
];
export const PETUNJUK_URUT_SINYAL = "Warnanya sudah benar. Nomor lampunya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_SINYAL =
  "Ini peta lampu sinyal belajar hubungan tambah dan kurang. Tiang sinyal merah berisi masalah. Lampu sinyal bernomor berisi langkah yang berurutan, ikuti nomornya. Palang yang terbuka berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan catatan kondektur ------------------------------ */
export const KOLOM_CATATAN = ["Kalimat", "Kebalikannya", "Keluarga"] as const;
const t = (a: number, b: number) => `${a} + ${b} = ${a + b}`;
const k = (a: number, b: number) => `${a} ${KURANG} ${b} = ${a - b}`;
export const BARIS_CATATAN: { nama: string; ikon: string; kalimat: string; balik: string; keluarga: string }[] = [
  { nama: "Naik", ikon: "\u{2B06}\u{FE0F}", kalimat: t(4, 3), balik: k(7, 3), keluarga: "3, 4, 7" },
  { nama: "Turun", ikon: "\u{2B07}\u{FE0F}", kalimat: k(9, 5), balik: t(4, 5), keluarga: "4, 5, 9" },
  { nama: "Noda", ikon: "\u{1F4A7}", kalimat: "6 + ? = 9", balik: k(9, 6), keluarga: "3, 6, 9" },
];
export const TEMPAT_CATATAN: Tempat[] = BARIS_CATATAN.flatMap((b, i) => [tp(`c${i}-kalimat`, "kalimat", b.kalimat), tp(`c${i}-balik`, "balik", b.balik), tp(`c${i}-keluarga`, "keluarga", b.keluarga)]);
export const KELOMPOK_CATATAN: Record<string, string> = {
  kalimat: "Label ini catatan kondektur. Tempelkan di kolom Kalimat.",
  balik: "Label ini kalimat kebalikannya. Tempelkan di kolom Kebalikannya.",
  keluarga: "Label ini tiga bilangan sekeluarga. Tempelkan di kolom Keluarga.",
};
export const SUARA_CATATAN = "Ini papan catatan kondektur dari cerita. Tiap baris satu catatan. Tempelkan kalimatnya, kalimat kebalikannya, dan tiga bilangan keluarganya.";

/* ------------------------------ Simulasi: Misi Kondektur bagian satu, papan kondektur ------------------------------ */
/** Bilangan awal berbeda dari Story: dua biru dan lima merah. */
export const AWAL_SIM = { x: 2, y: 5 };
export const MISI_KELUARGA = "Misi Kondektur: atur penumpang biru dan merah, catat empat kalimat keluarganya, lalu tutup pojok segitiga dan tebak.";

/* ------------------------------ CPA: lanjutan Misi Kondektur ------------------------------ */
/** Tiga kartu: penjumlahan pemeriksa yang benar, penjumlahan dengan hasil salah, dan pengurangan lain (bukan penjumlahan). */
export function pilihanPeriksa(a: number, b: number, geser: number): KalimatOp[] {
  const c = a - b;
  const benar: KalimatOp = { x: c, op: "+", y: b, z: a };
  const salahHasil: KalimatOp = { x: c, op: "+", y: b, z: a < 10 ? a + 1 : a - 1 };
  const kurangLain: KalimatOp = { x: a, op: "-", y: c, z: b };
  const tiga = [benar, salahHasil, kurangLain];
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
  C(1, "klik", "penumpang", "Misi Kondektur 2: lantai gerbong", "Penumpang naik dan turun di gerbong. Bantu Abang memeriksa catatannya.", [
    { tipe: "periksa", a: 6, b: 4, pilihan: pilihanPeriksa(6, 4, 1), tokoh: "Igil" },
    { tipe: "keluarga", x: 1, y: 4 },
    { tipe: "segitiga", x: 2, y: 5, tutup: "z" },
    { tipe: "hilang", a: 2, b: 1 },
  ]),
  C(2, "kanvas", "penumpang", "Misi Kondektur 3: kaca jendela", "Igil menggambar di kaca jendela. Beri tanda dan tulis jawabanmu.", [
    { tipe: "periksa", a: 10, b: 7, pilihan: pilihanPeriksa(10, 7, 2) },
    { tipe: "keluarga", x: 1, y: 6 },
    { tipe: "segitiga", x: 4, y: 2, tutup: "y" },
    { tipe: "hilang", a: 2, b: 5 },
  ]),
  C(3, "suara", "penumpang", "Misi Kondektur 4: pertanyaan kondektur", "Kondektur bertanya kepada Abang. Jawab dengan suaramu.", [
    { tipe: "tukar", a: 1, b: 8 },
    { tipe: "keluarga", x: 7, y: 3 },
    { tipe: "segitiga", x: 4, y: 6, tutup: "z" },
    { tipe: "hilang", a: 2, b: 8 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "penumpang", "Misi Kondektur 5: lembar karbon", "Kondektur menyalin catatan dengan titik di lembar karbon biru.", [
    { tipe: "periksa", a: 9, b: 1, pilihan: pilihanPeriksa(9, 1, 0), tokoh: "Abang" },
    { tipe: "keluarga", x: 5, y: 2 },
    { tipe: "segitiga", x: 1, y: 8, tutup: "z" },
    { tipe: "hilang", a: 4, b: 6 },
  ]),
  P(2, "kanvas", "penumpang", "Misi Kondektur 6: salinan karbon", "Abang menandai salinan karbon. Lingkari, beri tanda, dan tulis.", [
    { tipe: "periksa", a: 7, b: 5, pilihan: pilihanPeriksa(7, 5, 1) },
    { tipe: "keluarga", x: 2, y: 8 },
    { tipe: "segitiga", x: 1, y: 4, tutup: "y" },
    { tipe: "hilang", a: 7, b: 3 },
  ]),
  P(3, "suara", "penumpang", "Misi Kondektur 7: lapor ke masinis", "Kondektur melapor lewat radio. Sebutkan jawabanmu.", [
    { tipe: "tukar", a: 2, b: 3 },
    { tipe: "keluarga", x: 5, y: 1 },
    { tipe: "segitiga", x: 1, y: 6, tutup: "z" },
    { tipe: "hilang", a: 6, b: 0 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "penumpang", "Misi Kondektur 8: plat gerbong", "Kaka menulis hitungan dengan angka dan tanda saja.", [
    { tipe: "periksa", a: 10, b: 4, pilihan: pilihanPeriksa(10, 4, 2), tokoh: "Kaka" },
    { tipe: "keluarga", x: 2, y: 5 },
    { tipe: "segitiga", x: 1, y: 8, tutup: "z" },
    { tipe: "hilang", a: 1, b: 3 },
  ]),
  A(2, "kanvas", "penumpang", "Misi Kondektur 9: tulis jawaban", "Kaka meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "periksa", a: 5, b: 2, pilihan: pilihanPeriksa(5, 2, 0) },
    { tipe: "keluarga", x: 3, y: 7 },
    { tipe: "segitiga", x: 1, y: 7, tutup: "z" },
    { tipe: "hilang", a: 3, b: 2 },
  ]),
  A(3, "suara", "penumpang", "Misi Kondektur 10: hampir tiba", "Kereta hampir tiba di desa Nenek. Bacakan jawaban terakhir untuk kondektur.", [
    { tipe: "tukar", a: 2, b: 4 },
    { tipe: "keluarga", x: 4, y: 0 },
    { tipe: "segitiga", x: 8, y: 1, tutup: "y" },
    { tipe: "hilang", a: 6, b: 4 },
  ]),
];

export const POIN_PENTING = [
  "Penjumlahan dan pengurangan saling berkebalikan.",
  "Penjumlahan boleh ditukar tempatnya: 4 + 3 = 3 + 4.",
  "Pengurangan tidak boleh ditukar. Bilangan terbesar ditulis di depan.",
  "Tiga bilangan sekeluarga membuat dua penjumlahan dan dua pengurangan.",
  `Periksa pengurangan dengan penjumlahan: 9 ${KURANG} 5 = 4 diperiksa 4 + 5 = 9.`,
  "Bilangan yang hilang dicari dengan kebalikannya atau hitung maju.",
];
/** Poin penting untuk suara (tanpa lambang dan digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(": 4 + 3 = 3 + 4.", ", misalnya empat ditambah tiga sama dengan tiga ditambah empat.")
    .replace(`: 9 ${KURANG} 5 = 4 diperiksa 4 + 5 = 9.`, ", misalnya sembilan dikurangi lima sama dengan empat, diperiksa dengan empat ditambah lima sama dengan sembilan."),
);

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9D1}", nama: "Concrete", cara: "Penumpang dan kursi: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F53A}", nama: "Pictorial", cara: "Titik dan segitiga: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F529}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
