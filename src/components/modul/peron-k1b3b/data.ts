/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab B "Pindah Kereta di Stasiun Besar",
 * lanjutan Kereta ke Rumah Nenek. Angka Story (barang tujuh: lima dan dua, troli empat dikurangi nol dan empat, peron delapan mundur tiga,
 * kursi sepuluh terisi tujuh dan enam; karcis sembilan dan enam, stasiun tujuh dan empat, jendela sepuluh dan delapan) hanya dipakai di
 * Mind-map dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Pindah Kereta" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-peron-k1b3b.mjs.
 */
import type { Cara, Kalimat, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { KURANG, URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = {
  koper: "\u{1F9F3}",
  tas: "\u{1F45C}",
  bungkus: "\u{1F381}",
  penumpang: "\u{1F9D1}",
  kursi: "\u{1F4BA}",
  gerbong: "\u{1F683}",
  stasiun: "\u{1F689}",
  igil: "\u{1F467}",
};

/* ------------------------------ Mind-map: peta peron (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PERON = "Berbagai cara mengurangi";
export const KELOMPOK_PERON: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan pengumuman", ikon: "\u{1F4E2}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di papan pengumuman." },
  metode: { nama: "Penyelesaian", letak: "Jalur peron", ikon: "\u{1F6E4}\u{FE0F}", isi: "#C7D2FE", garis: "#4338CA", petunjuk: "Label ini ungu muda. Tempelkan di jalur peron yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Kereta lanjutan", ikon: "\u{1F686}", isi: "#A7F3D0", garis: "#047857", petunjuk: "Label ini hijau. Tempelkan di jendela kereta lanjutan." },
};
export const TEMPAT_PERON: Tempat[] = [
  tp("pu-1", "masalah", "Kereta segera berangkat"),
  tp("pu-2", "masalah", "Tidak sempat hitung satu-satu"),
  tp("pu-3", "masalah", "Butuh cara cepat"),
  tp("jl-1", "metode", "Pisahkan utuh jadi bagian", 1),
  tp("jl-2", "metode", "Gambar bagan pasangan", 2),
  tp("jl-3", "metode", "Satu bagan, dua kalimat", 3),
  tp("jl-4", "metode", "Dikurangi nol tetap", 4),
  tp("jl-5", "metode", "Dikurangi sama jadi nol", 5),
  tp("jl-6", "metode", "Mundur di garis bilangan", 6),
  tp("jl-7", "metode", "Pasangan sepuluh", 7),
  tp("kl-1", "hasil", "Sisa didapat dengan cepat"),
  tp("kl-2", "hasil", "Bisa menulis dua kalimat"),
  tp("kl-3", "hasil", "Hafal pasangan sepuluh"),
];
export const PETUNJUK_URUT_PERON = "Warnanya sudah benar. Nomor jalurnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PERON =
  "Ini peta peron belajar berbagai cara mengurangi. Papan pengumuman berisi masalah. Jalur peron bernomor berisi langkah yang berurutan, ikuti nomornya. Kereta lanjutan berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: label bagasi ------------------------------ */
export const KOLOM_BAGASI = ["Utuh", "Diketahui", "Dicari", "Kalimat"] as const;
const kal = (a: number, b: number) => `${a} ${KURANG} ${b} = ${a - b}`;
export const BARIS_BAGASI: { benda: string; nama: string; utuh: string; tahu: string; cari: string; kalimat: string }[] = [
  { benda: "koper", nama: "Barang", utuh: "7", tahu: "koper 5", cari: "tas 2", kalimat: kal(7, 5) },
  { benda: "bungkus", nama: "Troli", utuh: "4", tahu: "diambil 0", cari: "tetap 4", kalimat: kal(4, 0) },
  { benda: "stasiun", nama: "Peron", utuh: "8", tahu: "mundur 3", cari: "peron 5", kalimat: kal(8, 3) },
  { benda: "kursi", nama: "Kursi", utuh: "10", tahu: "terisi 7", cari: "kosong 3", kalimat: kal(10, 7) },
];
export const TEMPAT_BAGASI: Tempat[] = BARIS_BAGASI.flatMap((b, i) => [
  tp(`b${i}-utuh`, "utuh", b.utuh),
  tp(`b${i}-tahu`, "tahu", b.tahu),
  tp(`b${i}-cari`, "cari", b.cari),
  tp(`b${i}-kalimat`, "kalimat", b.kalimat),
]);
export const KELOMPOK_BAGASI: Record<string, string> = {
  utuh: "Label ini banyak semuanya. Tempelkan di kolom Utuh.",
  tahu: "Label ini yang sudah diketahui. Tempelkan di kolom Diketahui.",
  cari: "Label ini yang dicari. Tempelkan di kolom Dicari.",
  kalimat: "Label ini kalimat pengurangan. Tempelkan di kolom Kalimat.",
};
export const SUARA_BAGASI = "Ini label bagasi dari cerita pindah kereta. Tiap label satu cerita. Tempelkan utuhnya, yang sudah diketahui, yang dicari, dan kalimat pengurangannya.";

/* ------------------------------ Simulasi: Misi Pindah Kereta bagian satu, kursi kereta lanjutan ------------------------------ */
/** Bilangan berbeda dari Story: lima kursi, dua terisi. */
export const AWAL_SIM = { utuh: 5, terisi: 2 };
export const MISI_KURSI = "Misi Pindah Kereta: atur banyak kursi dan kursi yang terisi, lihat bagan, garis bilangan, dan dua kalimatnya, lalu catat.";

/* ------------------------------ CPA: lanjutan Misi Pindah Kereta ------------------------------ */
/** Tiga kartu kalimat untuk langkah dua: satu kalimat kedua yang benar, kalimat pertama (sudah ditulis), dan satu yang sisanya salah. */
export function pilihanDua(u: number, a: number, geser: number): Kalimat[] {
  const b = u - a;
  const kedua: Kalimat = [u, b, a];
  const pertama: Kalimat = [u, a, b];
  const salah: Kalimat = [u, b, a < 10 ? a + 1 : a - 1];
  const tiga: Kalimat[] = [kedua, pertama, salah];
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
  C(1, "klik", "koper", "Misi Pindah Kereta 2: troli koper", "Koper diturunkan dari kereta pertama. Bantu Abang menghitung dengan cepat.", [
    { tipe: "dua", u: 8, a: 5, pilihan: pilihanDua(8, 5, 1) },
    { tipe: "bagan", u: 6, a: 4 },
    { tipe: "garis", a: 9, b: 4 },
    { tipe: "sepuluh", b: 1 },
  ]),
  C(2, "kanvas", "tas", "Misi Pindah Kereta 3: lantai peron", "Igil menggambar di papan tulis kecil di peron. Beri tanda dan tulis jawabanmu.", [
    { tipe: "dua", u: 5, a: 1, pilihan: pilihanDua(5, 1, 2) },
    { tipe: "bagan", u: 7, a: 3 },
    { tipe: "garis", a: 3, b: 2 },
    { tipe: "sepuluh", b: 3 },
  ]),
  C(3, "suara", "bungkus", "Misi Pindah Kereta 4: pengumuman stasiun", "Petugas stasiun bertanya lewat pengeras suara. Jawab dengan suaramu.", [
    { tipe: "nolsama", a: 6, b: 6 },
    { tipe: "bagan", u: 9, a: 1 },
    { tipe: "garis", a: 5, b: 2 },
    { tipe: "sepuluh", b: 0 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "koper", "Misi Pindah Kereta 5: peta rute", "Abang membuka peta rute kereta dan menggambar dengan titik dan garis.", [
    { tipe: "dua", u: 9, a: 2, pilihan: pilihanDua(9, 2, 0) },
    { tipe: "bagan", u: 8, a: 2 },
    { tipe: "garis", a: 10, b: 3 },
    { tipe: "sepuluh", b: 9 },
  ]),
  P(2, "kanvas", "koper", "Misi Pindah Kereta 6: catatan rute", "Abang menulis di pinggir peta rute. Lingkari, beri tanda, dan tulis.", [
    { tipe: "dua", u: 6, a: 1, pilihan: pilihanDua(6, 1, 1) },
    { tipe: "bagan", u: 9, a: 4 },
    { tipe: "garis", a: 4, b: 2 },
    { tipe: "sepuluh", b: 2 },
  ]),
  P(3, "suara", "koper", "Misi Pindah Kereta 7: lapor ke Mamah", "Abang melaporkan hitungannya ke Mamah. Sebutkan jawabanmu.", [
    { tipe: "nolsama", a: 9, b: 9 },
    { tipe: "bagan", u: 6, a: 2 },
    { tipe: "garis", a: 4, b: 1 },
    { tipe: "sepuluh", b: 0 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "koper", "Misi Pindah Kereta 8: jendela malam", "Hari mulai gelap. Kaka menulis hitungan dengan angka dan tanda saja.", [
    { tipe: "dua", u: 10, a: 4, pilihan: pilihanDua(10, 4, 2) },
    { tipe: "bagan", u: 9, a: 5 },
    { tipe: "garis", a: 8, b: 2 },
    { tipe: "sepuluh", b: 5 },
  ]),
  A(2, "kanvas", "koper", "Misi Pindah Kereta 9: tulis jawaban", "Kaka meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "dua", u: 7, a: 3, pilihan: pilihanDua(7, 3, 0) },
    { tipe: "bagan", u: 3, a: 1 },
    { tipe: "garis", a: 10, b: 1 },
    { tipe: "sepuluh", b: 10 },
  ]),
  A(3, "suara", "koper", "Misi Pindah Kereta 10: kondektur datang", "Kondektur sebentar lagi datang. Bacakan jawaban terakhir untuk Mamah.", [
    { tipe: "nolsama", a: 7, b: 0 },
    { tipe: "bagan", u: 8, a: 7 },
    { tipe: "garis", a: 6, b: 3 },
    { tipe: "sepuluh", b: 2 },
  ]),
];

export const POIN_PENTING = [
  "Satu bagan pasangan memberi dua kalimat pengurangan.",
  "Utuh dikurangi satu bagian sama dengan bagian yang lain.",
  `Dikurangi nol hasilnya tetap: 5 ${KURANG} 0 = 5.`,
  `Dikurangi bilangan yang sama hasilnya nol: 5 ${KURANG} 5 = 0.`,
  "Garis bilangan: mulai dari bilangan pertama, lalu lompat mundur ke kiri.",
  "Sepuluh dikurangi satu bilangan sama dengan pasangan sepuluhnya.",
];
/** Poin penting untuk suara (tanpa lambang dan digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p.replace(`: 5 ${KURANG} 0 = 5.`, ", misalnya lima dikurangi nol sama dengan lima.").replace(`: 5 ${KURANG} 5 = 0.`, ", misalnya lima dikurangi lima sama dengan nol."),
);

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9F3}", nama: "Concrete", cara: "Koper, tas, dan kursi: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F5FA}\u{FE0F}", nama: "Pictorial", cara: "Titik, bagan, dan garis: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F319}", nama: "Abstract", cara: "Angka dan tanda saja: ketuk, tulis, dan ucapkan" },
} as const;
