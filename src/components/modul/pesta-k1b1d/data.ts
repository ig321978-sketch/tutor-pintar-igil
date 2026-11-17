/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab D "Pesta Rumah Rapi",
 * sub-bab terakhir dan akhir Misi Rumah Rapi. Angka Story (kue lima jadi dua dan tiga lalu empat dan satu, gelas tiga dan empat jadi tujuh,
 * semua pasangan enam, kursi sepuluh: tujuh dan tiga, delapan dan dua, lima dan lima, ikatan delapan, batang sembilan, rak manik empat dan enam)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai pasangan lain dan melanjutkan "Misi Pesta" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-pesta-k1b1d.mjs.
 */
import type { Barang, Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

export const EMOJI: Record<string, string> = { kue: "\u{1F9C1}", gelas: "\u{1F964}", kursi: "\u{1FA91}", balon: "\u{1F388}", manik: "\u{1F534}" };

/* ------------------------------ Mind-map: meja pesta (hanya poin pelajaran) ------------------------------ */
export const PUSAT_MEJA = "Pasangan bilangan";
export const KELOMPOK_MEJA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Kartu undangan", ikon: "\u{1F48C}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah muda. Tempelkan di kartu undangan." },
  metode: { nama: "Penyelesaian", letak: "Piring", ikon: "\u{1F37D}\u{FE0F}", isi: "#FEF3C7", garis: "#B45309", petunjuk: "Label ini krem. Tempelkan di piring yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Kado", ikon: "\u{1F381}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di kado yang hijau." },
};
export const TEMPAT_MEJA: Tempat[] = [
  tp("un-1", "masalah", "Bagaimana memisah bilangan?"),
  tp("un-2", "masalah", "Bagaimana menggabung bagian?"),
  tp("un-3", "masalah", "Apa saja pasangannya?"),
  tp("pr-1", "metode", "Pisahkan jadi dua bagian", 1),
  tp("pr-2", "metode", "Gabungkan jadi utuh", 2),
  tp("pr-3", "metode", "Cari semua pasangan urut", 3),
  tp("pr-4", "metode", "Ingat pasangan sepuluh", 4),
  tp("pr-5", "metode", "Ikatan bilangan", 5),
  tp("pr-6", "metode", "Model batang", 6),
  tp("pr-7", "metode", "Rak manik", 7),
  tp("kd-1", "hasil", "Tahu bagian dan utuh"),
  tp("kd-2", "hasil", "Bisa mencari pasangan"),
  tp("kd-3", "hasil", "Hafal pasangan sepuluh"),
];
export const PETUNJUK_URUT_MEJA = "Warnanya sudah benar. Nomor piringnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_MEJA =
  "Ini meja pesta belajar pasangan bilangan. Kartu undangan berisi masalah. Piring bernomor berisi langkah yang berurutan, ikuti nomornya. Kado berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: kartu menu pesta ------------------------------ */
export const KOLOM_MENU = ["Utuh", "Bagian", "Cara"] as const;
export const BARIS_MENU: { benda: string; nama: string; utuh: string; bagian: string; cara: string }[] = [
  { benda: "kue", nama: "Kue", utuh: "5", bagian: "2 dan 3", cara: "Pisahkan" },
  { benda: "kue", nama: "Kue lagi", utuh: "5", bagian: "4 dan 1", cara: "Pisahkan lagi" },
  { benda: "gelas", nama: "Gelas", utuh: "7", bagian: "3 dan 4", cara: "Gabungkan" },
  { benda: "balon", nama: "Balon", utuh: "6", bagian: "0 dan 6, 1 dan 5", cara: "Semua pasangan" },
  { benda: "kursi", nama: "Kursi", utuh: "10", bagian: "5 dan 5", cara: "Pasangan sepuluh" },
  { benda: "manik", nama: "Manik", utuh: "10", bagian: "4 dan 6", cara: "Rak manik" },
];
export const TEMPAT_MENU: Tempat[] = BARIS_MENU.flatMap((b, i) => [tp(`m${i}-utuh`, "utuh", b.utuh), tp(`m${i}-bagian`, "bagian", b.bagian), tp(`m${i}-cara`, "cara", b.cara)]);
export const KELOMPOK_MENU: Record<string, string> = {
  utuh: "Label ini bilangan utuh. Tempelkan di kolom Utuh.",
  bagian: "Label ini dua bagian. Tempelkan di kolom Bagian.",
  cara: "Label ini caranya. Tempelkan di kolom Cara.",
};
export const SUARA_MENU = "Ini kartu menu pesta dari cerita. Tiap baris satu benda pesta. Tempelkan utuhnya, bagian-bagiannya, dan caranya.";

/* ------------------------------ Simulasi: Misi Pesta bagian satu, meja pesta ------------------------------ */
/** Banyak berbeda dari Story (kue lima, gelas tujuh, kursi sepuluh): kue enam, gelas delapan, kursi sembilan. */
export const UTUH_SIM: Record<Barang, number> = { kue: 6, gelas: 8, kursi: 9 };
export const MISI_PESTA = "Misi Pesta: bagi kue, gelas, dan kursi ke meja dalam dan meja teras, lalu catat setiap pasangan yang kamu temukan.";

/* ------------------------------ CPA: lanjutan Misi Pesta ------------------------------ */
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
  C(1, "klik", "Misi Pesta 2: piring kue", "Tamu berdatangan. Kue harus dibagi ke dua piring.", [
    { tipe: "semua", utuh: 4, pilihan: [[1, 3], [2, 2], [3, 2], [0, 4], [4, 1], [3, 1]] },
    { tipe: "ikatan", a: 6, b: 2, cari: "b" },
    { tipe: "batang", a: 4, b: 5, cari: "utuh" },
    { tipe: "manik", utuh: 9, kiri: 2 },
  ]),
  C(2, "kanvas", "Misi Pesta 3: nampan bergambar", "Kaka menggambar pembagian di kanvas.", [
    { tipe: "pisah", utuh: 9, a: 4 },
    { tipe: "ikatan", a: 3, b: 0, cari: "b" },
    { tipe: "batang", a: 9, b: 1, cari: "b" },
    { tipe: "manik", utuh: 8, kiri: 0 },
  ]),
  C(3, "suara", "Misi Pesta 4: tamu bertanya", "Nenek bertanya dari meja teras. Jawab dengan suaramu.", [
    { tipe: "gabung", a: 1, b: 2 },
    { tipe: "ikatan", a: 5, b: 0, cari: "utuh" },
    { tipe: "batang", a: 5, b: 4, cari: "b" },
    { tipe: "manik", utuh: 7, kiri: 1 },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Pesta 5: gambar meja", "Abang menggambar isi meja dengan titik.", [
    { tipe: "semua", utuh: 7, pilihan: [[1, 6], [2, 5], [6, 2], [0, 7], [1, 5], [7, 0]] },
    { tipe: "ikatan", a: 1, b: 6, cari: "b" },
    { tipe: "batang", a: 2, b: 6, cari: "utuh" },
    { tipe: "manik", utuh: 10, kiri: 9 },
  ]),
  P(2, "kanvas", "Misi Pesta 6: papan gambar", "Kaka meminjamkan papan gambar. Tarik garis, lingkari, dan tulis.", [
    { tipe: "pisah", utuh: 8, a: 2 },
    { tipe: "ikatan", a: 5, b: 2, cari: "b" },
    { tipe: "batang", a: 1, b: 9, cari: "utuh" },
    { tipe: "manik", utuh: 8, kiri: 8 },
  ]),
  P(3, "suara", "Misi Pesta 7: laporan gambar", "Abang melaporkan gambarnya ke Mamah. Sebutkan jawabanmu.", [
    { tipe: "gabung", a: 2, b: 2 },
    { tipe: "ikatan", a: 4, b: 5, cari: "b" },
    { tipe: "batang", a: 6, b: 1, cari: "utuh" },
    { tipe: "manik", utuh: 10, kiri: 1 },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Pesta 8: kartu pasangan", "Kaka menulis pasangan dengan angka saja.", [
    { tipe: "semua", utuh: 8, pilihan: [[1, 7], [2, 5], [4, 4], [6, 2], [6, 3], [8, 0]] },
    { tipe: "ikatan", a: 0, b: 10, cari: "b" },
    { tipe: "batang", a: 5, b: 4, cari: "utuh" },
    { tipe: "manik", utuh: 3, kiri: 1 },
  ]),
  A(2, "kanvas", "Misi Pesta 9: tulis pasangan", "Abang meminta Igil menulis pasangan di kanvas.", [
    { tipe: "semua", utuh: 9, pilihan: [[4, 5], [3, 5], [9, 0], [2, 7], [6, 2]] },
    { tipe: "ikatan", a: 1, b: 7, cari: "b" },
    { tipe: "batang", a: 6, b: 2, cari: "utuh" },
    { tipe: "manik", utuh: 5, kiri: 5 },
  ]),
  A(3, "suara", "Misi Pesta 10: pesta selesai", "Pesta selesai dan rumah rapi. Bacakan pasangan terakhir untuk Mamah.", [
    { tipe: "gabung", a: 1, b: 0 },
    { tipe: "ikatan", a: 1, b: 3, cari: "b" },
    { tipe: "batang", a: 4, b: 5, cari: "b" },
    { tipe: "manik", utuh: 4, kiri: 0 },
  ]),
];

export const POIN_PENTING = [
  "Satu bilangan bisa dipisah menjadi dua bagian.",
  "Dua bagian digabung kembali menjadi utuh.",
  "Cari pasangan berurutan mulai dari nol supaya tidak terlewat.",
  "Pasangan sepuluh: sembilan dan satu, delapan dan dua, tujuh dan tiga, enam dan empat, lima dan lima.",
  "Ikatan bilangan, model batang, dan rak manik membantu melihat bagian dan utuh.",
];

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F9C1}", nama: "Concrete", cara: "Kue, kubus, dan manik: ketuk, gambar, dan ucapkan" },
  pictorial: { ikon: "\u{1F517}", nama: "Pictorial", cara: "Titik, ikatan, dan batang: ketuk, gambar, dan ucapkan" },
  abstract: { ikon: "\u{1F522}", nama: "Abstract", cara: "Angka saja: ketuk, tulis, dan ucapkan" },
} as const;
