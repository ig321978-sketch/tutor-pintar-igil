/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab C "Kemas Pakan dan Kantong",
 * lanjutan cerita Akuarium Ikan Hias Abang. Angka Story (enam belas bungkus pakan, tiga belas kantong ikan, dua puluh kerikil hias, sebelas)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai barang dan bilangan lain dan melanjutkan "Misi Lapak Ikan" bagian
 * satu sampai sepuluh. Diuji: scripts/uji-kemas-k1b5c.mjs.
 */
import type { BarangSim, Cara, Langkah, LangkahSoal, Rupa, SalahPaham, SoalMisi, Tempat, Tempat2, Tokoh } from "./logika";
import { URUT_METODE, instruksi, kata } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar barang lapak ikan (kunci = jenis). */
export const EMOJI: Record<string, string> = {
  botol: "\u{1F9F4}",
  tanaman: "\u{1F33F}",
  jaring: "\u{1F945}",
  kerang: "\u{1F41A}",
  pakan: "\u{1F96B}",
  sedotan: "\u{1F964}",
};
/** Warna bungkus plastik di belakang barang (Concrete). */
export const WARNA_BENDA: Record<string, [string, string]> = {
  botol: ["#FBCFE8", "#BE185D"],
  tanaman: ["#BBF7D0", "#15803D"],
  jaring: ["#BFDBFE", "#1D4ED8"],
  kerang: ["#FED7AA", "#C2410C"],
  pakan: ["#FDE68A", "#B45309"],
  sedotan: ["#DDD6FE", "#6D28D9"],
};
/** Nama barang untuk pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  botol: "botol vitamin ikan",
  tanaman: "pot tanaman air",
  jaring: "jaring kecil",
  kerang: "kerang hias",
  pakan: "kaleng pakan",
  sedotan: "sedotan",
};
/** Gambar tokoh di soal Cari kesalahan (hanya Concrete). */
export const EMOJI_TOKOH: Record<Tokoh, string> = { Igil: "\u{1F989}", Kaka: "\u{1F467}", Abang: "\u{1F466}" };

/* ------------------------------ Mind-map: ban berjalan pengemasan (hanya poin pelajaran) ------------------------------ */
export const PUSAT_BAN = "Puluhan dan satuan";
export const KELOMPOK_BAN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Mesin segel", ikon: "\u{2699}\u{FE0F}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah. Tempelkan di mesin segel kantong." },
  metode: { nama: "Penyelesaian", letak: "Kantong tersegel", ikon: "\u{1F6CD}\u{FE0F}", isi: "#FEF08A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di kantong yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Peti siap jual", ikon: "\u{1F4E6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di peti siap jual." },
};
export const TEMPAT_BAN: Tempat[] = [
  tp("ms-1", "masalah", "Barang berserakan"),
  tp("ms-2", "masalah", "Sulit dihitung cepat"),
  tp("ms-3", "masalah", "Catatan belum rapi"),
  tp("kn-1", "metode", "Ikat tiap sepuluh", 1),
  tp("kn-2", "metode", "Sisanya jadi satuan", 2),
  tp("kn-3", "metode", "Angka kiri puluhan", 3),
  tp("kn-4", "metode", "Angka kanan satuan", 4),
  tp("kn-5", "metode", "Balok puluhan", 5),
  tp("kn-6", "metode", "Tabel puluhan dan satuan", 6),
  tp("kn-7", "metode", "Ikat sedotan", 7),
  tp("pt-1", "hasil", "Sepuluh jadi satu puluhan"),
  tp("pt-2", "hasil", "Angka sama, tempat beda"),
  tp("pt-3", "hasil", "Dua puluh: dua puluhan"),
  tp("pt-4", "hasil", "Mudah dihitung dan dicatat"),
];
export const PETUNJUK_URUT_BAN = "Warnanya sudah benar. Nomor kantongnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_BAN =
  "Ini ban berjalan pengemasan. Mesin segel berisi masalah. Kantong tersegel bernomor di ban berjalan berisi langkah yang berurutan, ikuti nomornya dari kiri. Peti siap jual berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan persediaan bermagnet ------------------------------ */
export const KOLOM_PAPAN = ["Banyak", "Puluhan dan satuan", "Catatan"] as const;
export const BARIS_PAPAN: { ikon: string; nama: string; banyak: number; puluhan: number; satuan: number; catatan: string }[] = [
  { ikon: "\u{1F96B}", nama: "Pakan", banyak: 16, puluhan: 1, satuan: 6, catatan: "diikat karet" },
  { ikon: "\u{1F6CD}\u{FE0F}", nama: "Kantong ikan", banyak: 13, puluhan: 1, satuan: 3, catatan: "keranjang isi sepuluh" },
  { ikon: "\u{1F311}", nama: "Kerikil hias", banyak: 20, puluhan: 2, satuan: 0, catatan: "dua ikat, tanpa sisa" },
  { ikon: "\u{1F522}", nama: "Sebelas", banyak: 11, puluhan: 1, satuan: 1, catatan: "dua angka 1 beda tempat" },
];
export const TEMPAT_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [
  tp(`p${i}-banyak`, "banyak", String(b.banyak)),
  tp(`p${i}-tempat`, "tempat", `${b.puluhan} puluhan ${b.satuan} satuan`),
  tp(`p${i}-catatan`, "catatan", b.catatan),
]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  banyak: "Label ini lambang bilangan. Tempelkan di kolom Banyak.",
  tempat: "Label ini puluhan dan satuannya. Tempelkan di kolom Puluhan dan satuan.",
  catatan: "Label ini cara mengemasnya. Tempelkan di kolom Catatan.",
};
export const SUARA_PAPAN =
  "Ini papan persediaan bermagnet, dari cerita kemas pakan dan kantong. Tiap baris satu barang. Tempelkan banyaknya, puluhan dan satuannya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Lapak Ikan bagian satu, meja kemas ------------------------------ */
/** Barang berbeda dari Story: jaring kecil empat belas, botol vitamin delapan belas, pot tanaman air dua belas. Sama dengan TOTAL_KEMAS_C di misi. */
export const BARANG_SIM: BarangSim[] = [
  { id: "jaring", nama: "jaring kecil", jenis: "jaring", total: 14 },
  { id: "botol", nama: "botol vitamin ikan", jenis: "botol", total: 18 },
  { id: "pot", nama: "pot tanaman air", jenis: "tanaman", total: 12 },
];
export const MISI_KEMAS = "Misi Lapak Ikan bagian satu: ikat tiap sepuluh barang dengan karet, sisanya satuan, lalu isi tabel puluhan dan satuan.";

/* ------------------------------ CPA: lanjutan Misi Lapak Ikan ------------------------------ */
const ikat = (n: number, tanya: "bilangan" | "satuan", jenis = "titik"): Langkah => ({ tipe: "ikat", n, tanya, jenis });
const balok = (n: number, tanya: "bilangan" | "puluhan" | "satuan", jenis = "titik"): Langkah => ({ tipe: "balok", n, tanya, jenis });
const tabel = (n: number, tanya: "puluhan" | "satuan" | "tempat", sorot: Tempat2 = "puluhan", jenis = "titik"): Langkah => ({ tipe: "tabel", n, tanya, sorot, jenis });
const sedotan = (n: number, tanya: "bilangan" | "ikat" | "lepas", jenis = "titik"): Langkah => ({ tipe: "sedotan", n, tanya, jenis });
const cari = (n: number, tokoh: Tokoh, salah: SalahPaham, jenis = "titik"): Langkah => ({ tipe: "cari", n, tokoh, salah, jenis });

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
  C(1, "klik", "Misi Lapak Ikan 2: meja kemas", "Barang lapak ikan menumpuk di meja. Bantu Igil mengemasnya.", [
    ikat(17, "bilangan", "botol"),
    balok(14, "satuan", "kerang"),
    cari(12, "Igil", "jumlah", "pakan"),
    sedotan(19, "lepas", "sedotan"),
  ]),
  C(2, "kanvas", "Misi Lapak Ikan 3: catatan Kaka", "Kaka mencatat barang yang sudah dikemas. Beri tanda, lalu tulis jawabanmu.", [
    ikat(12, "satuan", "tanaman"),
    balok(18, "bilangan", "botol"),
    tabel(19, "tempat", "puluhan", "jaring"),
    sedotan(15, "bilangan", "sedotan"),
  ]),
  C(3, "suara", "Misi Lapak Ikan 4: pesan Abang", "Abang bertanya dari teras. Jawab dengan suaramu.", [
    ikat(10, "satuan", "jaring"),
    balok(7, "bilangan", "tanaman"),
    tabel(12, "puluhan", "puluhan", "kerang"),
    sedotan(18, "lepas", "sedotan"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Lapak Ikan 5: catatan persediaan", "Abang mencatat barang dengan kotak polos di kertas kotak hijau.", [
    ikat(14, "satuan"),
    balok(12, "bilangan"),
    cari(17, "Kaka", "kiri"),
    sedotan(15, "lepas"),
  ]),
  P(2, "kanvas", "Misi Lapak Ikan 6: kolom kertas", "Kaka menandai kotak di kertas pembukuan. Beri tanda, lalu tulis jawabanmu.", [
    ikat(19, "bilangan"),
    balok(20, "puluhan"),
    tabel(14, "tempat", "satuan"),
    sedotan(17, "bilangan"),
  ]),
  P(3, "suara", "Misi Lapak Ikan 7: lapor ke Mamah", "Abang melaporkan isi persediaan kepada Mamah. Sebutkan jawabanmu.", [
    ikat(18, "satuan"),
    balok(9, "bilangan"),
    tabel(10, "satuan"),
    sedotan(12, "ikat"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Lapak Ikan 8: label harga", "Label harga di lapak hanya berisi kata dan angka.", [ikat(15, "bilangan"), balok(19, "satuan"), cari(14, "Abang", "lepas"), sedotan(14, "ikat")]),
  A(2, "kanvas", "Misi Lapak Ikan 9: tulis label", "Kaka meminta Igil menulis angka di label kemasan.", [ikat(17, "satuan"), balok(10, "bilangan"), tabel(12, "tempat", "puluhan"), sedotan(14, "bilangan")]),
  A(3, "suara", "Misi Lapak Ikan 10: kemasan siap", "Semua kemasan hampir siap. Bacakan jawaban terakhir untuk Abang.", [ikat(12, "bilangan"), balok(5, "bilangan"), tabel(20, "puluhan"), sedotan(10, "lepas")]),
];

export const POIN_PENTING = [
  "Sepuluh satuan diikat menjadi satu puluhan. Sisanya tetap satuan.",
  "Angka kiri adalah puluhan, angka kanan adalah satuan. 17 adalah 1 puluhan 7 satuan.",
  "Angka sama bisa beda arti menurut tempatnya. Di 11, angka 1 kiri berarti sepuluh, angka 1 kanan berarti satu.",
  "20 adalah 2 puluhan 0 satuan.",
  "Jangan menjumlah dua angkanya: 12 bukan 1 tambah 2, tetapi sepuluh dan dua.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F535}", nama: "Concrete", cara: "Barang di plastik gelembung: ketuk, tandai, dan ucapkan" },
  pictorial: { ikon: "\u{1F4D7}", nama: "Pictorial", cara: "Kotak polos di kertas pembukuan: ketuk, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F3F7}\u{FE0F}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KEMAS, PICTORIAL as PICTORIAL_KEMAS, ABSTRACT as ABSTRACT_KEMAS, TEMA_TAHAP as TEMA_KEMAS };
