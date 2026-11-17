/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab D "Tiba di Rumah Nenek",
 * akhir cerita Kereta ke Rumah Nenek. Angka Story (kue enam diberikan dua, jeruk sepuluh tinggal tujuh, permen sembilan dimakan dua lalu
 * diberikan empat, teh delapan diminum lima; pisang sembilan dan tiga, rambutan tujuh dan lima, ayam sepuluh, tiga, dan dua) hanya dipakai di
 * Mind-map dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Rumah Nenek" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-rumah-k1b3d.mjs.
 */
import type { Cara, Kalimat, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { KURANG, URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = {
  kue: "\u{1F370}",
  jeruk: "\u{1F34A}",
  permen: "\u{1F36C}",
  teh: "\u{1F375}",
  rambutan: "\u{1F352}",
  nenek: "\u{1F475}",
  rumah: "\u{1F3E0}",
};

/* ------------------------------ Mind-map: halaman rumah Nenek (hanya poin pelajaran) ------------------------------ */
export const PUSAT_RUMAH = "Cerita hitungan pengurangan";
export const KELOMPOK_RUMAH: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan nama desa", ikon: "\u{1F3F7}\u{FE0F}", isi: "#FDE68A", garis: "#92400E", petunjuk: "Label ini kuning tua. Tempelkan di papan nama desa." },
  metode: { nama: "Penyelesaian", letak: "Tali jemuran", ikon: "\u{1F455}", isi: "#BAE6FD", garis: "#0369A1", petunjuk: "Label ini biru muda. Tempelkan di baju jemuran yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Tikar makan bersama", ikon: "\u{1F35A}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah muda. Tempelkan di tikar makan bersama." },
};
export const TEMPAT_RUMAH: Tempat[] = [
  tp("pd-1", "masalah", "Cerita punya pertanyaan"),
  tp("pd-2", "masalah", "Salah baca, jawaban keliru"),
  tp("pd-3", "masalah", "Benda berkurang dua kali"),
  tp("jm-1", "metode", "Baca cerita dengan teliti", 1),
  tp("jm-2", "metode", "Lingkari bilangan", 2),
  tp("jm-3", "metode", "Kotaki kata kunci", 3),
  tp("jm-4", "metode", "Gambar model batang", 4),
  tp("jm-5", "metode", "Tulis kalimat pengurangan", 5),
  tp("jm-6", "metode", "Jawab kalimat lengkap", 6),
  tp("jm-7", "metode", "Periksa dengan penjumlahan", 7),
  tp("tk-1", "hasil", "Jawaban tepat"),
  tp("tk-2", "hasil", "Bisa membuat cerita sendiri"),
  tp("tk-3", "hasil", "Dua kali berkurang terhitung"),
];
export const PETUNJUK_URUT_RUMAH = "Warnanya sudah benar. Nomor bajunya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_RUMAH =
  "Ini halaman rumah Nenek untuk belajar cerita hitungan pengurangan. Papan nama desa berisi masalah. Baju bernomor di tali jemuran berisi langkah yang berurutan, ikuti nomornya. Tikar makan bersama berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: kartu resep Nenek ------------------------------ */
export const KOLOM_RESEP = ["Kata kunci", "Kalimat", "Jawaban"] as const;
export const BARIS_RESEP: { benda: string; nama: string; kunci: string; kalimat: string; jawaban: string }[] = [
  { benda: "kue", nama: "Kue", kunci: "kuberikan", kalimat: `6 ${KURANG} 2 = 4`, jawaban: "4 kue" },
  { benda: "jeruk", nama: "Jeruk", kunci: "dibagikan", kalimat: `10 ${KURANG} 7 = 3`, jawaban: "3 jeruk" },
  { benda: "permen", nama: "Permen", kunci: "dimakan, diberikan", kalimat: `9 ${KURANG} 6 = 3`, jawaban: "3 permen" },
  { benda: "teh", nama: "Teh", kunci: "diminum", kalimat: `8 ${KURANG} 5 = 3`, jawaban: "3 gelas teh" },
];
export const TEMPAT_RESEP: Tempat[] = BARIS_RESEP.flatMap((b, i) => [tp(`r${i}-kunci`, "kunci", b.kunci), tp(`r${i}-kalimat`, "kalimat", b.kalimat), tp(`r${i}-jawaban`, "jawaban", b.jawaban)]);
export const KELOMPOK_RESEP: Record<string, string> = {
  kunci: "Label ini kata kunci yang berarti berkurang. Tempelkan di kolom Kata kunci.",
  kalimat: "Label ini kalimat pengurangan. Tempelkan di kolom Kalimat.",
  jawaban: "Label ini jawaban lengkap. Tempelkan di kolom Jawaban.",
};
export const SUARA_RESEP = "Ini kartu resep Nenek berisi cerita hitungan tadi. Tiap kartu satu cerita. Tempelkan kata kuncinya, kalimat pengurangannya, dan jawabannya.";

/* ------------------------------ Simulasi: Misi Rumah Nenek bagian satu, pembuat cerita ------------------------------ */
/** Bilangan awal berbeda dari Story: tujuh, tiga dimakan. */
export const AWAL_SIM = { a: 7, b: 3 };
export const MISI_CERITA = "Misi Rumah Nenek: buat cerita hitunganmu sendiri, periksa jawabannya dengan penjumlahan, lalu kirim ke Nenek.";

/* ------------------------------ CPA: lanjutan Misi Rumah Nenek ------------------------------ */
/** Tiga kartu kalimat: satu cocok, satu sisanya salah, satu bilangannya bukan dari cerita. Urutan digeser `geser`. */
export function pilihanKalimat(a: number, b: number, geser: number): Kalimat[] {
  const c = a - b;
  const salahHasil: Kalimat = [a, b, c < 10 ? c + 1 : c - 1];
  const salahBilangan: Kalimat = a < 10 ? [a + 1, b, c + 1] : b < a ? [a, b + 1, c - 1] : [a - 1, b - 1, c];
  const tiga: Kalimat[] = [[a, b, c], salahHasil, salahBilangan];
  return tiga.map((_, i) => tiga[(i + geser) % 3]);
}
/** Kata pengecoh yang berarti bertambah. */
const TAMBAH: [string, string] = ["dibeli lagi", "datang"];

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
  C(1, "klik", "Misi Rumah Nenek 2: meja makan", "Tetangga bercerita di meja makan. Bantu Igil menjawab.", [
    { tipe: "cerita", benda: "kue", a: 8, b: 3, kata: "dimakan", pilihan: pilihanKalimat(8, 3, 1) },
    { tipe: "batang", benda: "jeruk", a: 7, b: 6, cari: "sisa" },
    { tipe: "kunci", benda: "rambutan", a: 9, b: 5, kata: "diberikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "permen", a: 10, b: 4, c: 1 },
  ]),
  C(2, "kanvas", "Misi Rumah Nenek 3: taplak meja", "Igil menggambar di atas kertas di meja Nenek. Beri tanda dan tulis jawabanmu.", [
    { tipe: "cerita", benda: "teh", a: 5, b: 4, kata: "diminum", pilihan: pilihanKalimat(5, 4, 2) },
    { tipe: "batang", benda: "kue", a: 6, b: 4, cari: "pergi" },
    { tipe: "kunci", benda: "jeruk", a: 8, b: 1, kata: "dibagikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "rambutan", a: 9, b: 1, c: 2 },
  ]),
  C(3, "suara", "Misi Rumah Nenek 4: Nenek bertanya", "Nenek bertanya dari dapur. Jawab dengan suaramu.", [
    { tipe: "jawab", benda: "kue", a: 4, b: 4, kata: "dimakan" },
    { tipe: "batang", benda: "rambutan", a: 10, b: 1, cari: "sisa" },
    { tipe: "kunci", benda: "permen", a: 5, b: 2, kata: "diberikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "jeruk", a: 10, b: 1, c: 1 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Rumah Nenek 5: surat untuk Mamah", "Igil menulis surat bergambar titik dan batang.", [
    { tipe: "cerita", benda: "kue", a: 7, b: 3, kata: "dimakan", pilihan: pilihanKalimat(7, 3, 0) },
    { tipe: "batang", benda: "jeruk", a: 8, b: 2, cari: "sisa" },
    { tipe: "kunci", benda: "rambutan", a: 10, b: 9, kata: "dibagikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "permen", a: 9, b: 3, c: 3 },
  ]),
  P(2, "kanvas", "Misi Rumah Nenek 6: perangko surat", "Kaka menambahkan gambar di surat. Lingkari, beri tanda, dan tulis.", [
    { tipe: "cerita", benda: "teh", a: 6, b: 5, kata: "diminum", pilihan: pilihanKalimat(6, 5, 1) },
    { tipe: "batang", benda: "kue", a: 9, b: 4, cari: "pergi" },
    { tipe: "kunci", benda: "jeruk", a: 8, b: 8, kata: "diberikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "rambutan", a: 10, b: 2, c: 4 },
  ]),
  P(3, "suara", "Misi Rumah Nenek 7: membaca surat", "Abang membacakan surat untuk Nenek. Sebutkan jawabanmu.", [
    { tipe: "jawab", benda: "jeruk", a: 9, b: 1, kata: "dimakan" },
    { tipe: "batang", benda: "kue", a: 10, b: 0, cari: "pergi" },
    { tipe: "kunci", benda: "teh", a: 4, b: 2, kata: "diminum", pengecoh: TAMBAH },
    { tipe: "dua", benda: "permen", a: 10, b: 2, c: 1 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Rumah Nenek 8: papan tulis Nenek", "Nenek punya papan tulis kecil. Kaka menulis dengan angka dan tanda saja.", [
    { tipe: "cerita", benda: "jeruk", a: 10, b: 6, kata: "dibagikan", pilihan: pilihanKalimat(10, 6, 2) },
    { tipe: "batang", benda: "kue", a: 5, b: 3, cari: "sisa" },
    { tipe: "kunci", benda: "teh", a: 6, b: 1, kata: "diminum", pengecoh: TAMBAH },
    { tipe: "dua", benda: "permen", a: 8, b: 2, c: 3 },
  ]),
  A(2, "kanvas", "Misi Rumah Nenek 9: tulis jawaban", "Kaka meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "cerita", benda: "rambutan", a: 9, b: 8, kata: "dimakan", pilihan: pilihanKalimat(9, 8, 0) },
    { tipe: "batang", benda: "jeruk", a: 7, b: 1, cari: "pergi" },
    { tipe: "kunci", benda: "kue", a: 10, b: 10, kata: "dibagikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "rambutan", a: 10, b: 1, c: 2 },
  ]),
  A(3, "suara", "Misi Rumah Nenek 10: perpisahan", "Malam di rumah Nenek. Bacakan jawaban terakhir untuk semua.", [
    { tipe: "jawab", benda: "teh", a: 5, b: 4, kata: "diminum" },
    { tipe: "batang", benda: "permen", a: 8, b: 4, cari: "sisa" },
    { tipe: "kunci", benda: "jeruk", a: 10, b: 1, kata: "diberikan", pengecoh: TAMBAH },
    { tipe: "dua", benda: "kue", a: 10, b: 1, c: 1 },
  ]),
];

export const POIN_PENTING = [
  "Baca cerita dengan teliti: apa yang ada, apa yang pergi, dan apa yang ditanya.",
  "Lingkari bilangan dan kotaki kata kunci. Dimakan, diberikan, dan diminum berarti berkurang.",
  "Model batang: utuh dikurangi bagian yang diketahui sama dengan bagian yang ditanya.",
  `Berkurang dua kali boleh dikurangi satu per satu: 9 ${KURANG} 2 ${KURANG} 4 = 3.`,
  "Jawab dengan kalimat lengkap, misalnya: Jadi, tersisa tiga kue.",
  `Periksa dengan penjumlahan: 6 ${KURANG} 2 = 4, sebab 4 + 2 = 6.`,
];
/** Poin penting untuk suara (tanpa lambang dan digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(`: 9 ${KURANG} 2 ${KURANG} 4 = 3.`, ", misalnya sembilan dikurangi dua dikurangi empat sama dengan tiga.")
    .replace(`: 6 ${KURANG} 2 = 4, sebab 4 + 2 = 6.`, ", misalnya enam dikurangi dua sama dengan empat, sebab empat ditambah dua sama dengan enam."),
);

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F370}", nama: "Concrete", cara: "Kue, jeruk, dan permen: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F4EE}", nama: "Pictorial", cara: "Titik dan model batang: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
