/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab D "Lapak Ikan Dibuka",
 * akhir cerita Akuarium Ikan Hias Abang. Angka Story (guppy lima belas dan koki dua belas, sisa tiga; tiga akuarium delapan belas,
 * sembilan, tiga belas; pesanan Pak RT enam belas dan tetangga sembilan belas) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai akuarium dan bilangan lain dan melanjutkan "Misi Lapak Ikan" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-lapak-k1b5d.mjs.
 */
import type { AkuariumSim, ArahUrut, Cara, Langkah, LangkahDasar, LangkahSoal, PembeliSim, Posisi, Rupa, SoalMisi, Tanya, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

export { EMOJI, NAMA_BENDA, WARNA_BENDA } from "../ikan-k1b5a/data";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: payung lapak (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PAYUNG = "Membandingkan dan mengurutkan";
export const KELOMPOK_PAYUNG: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan pesanan", ikon: "\u{1F4CB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di papan pesanan." },
  metode: { nama: "Penyelesaian", letak: "Rusuk payung", ikon: "\u{2602}\u{FE0F}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di rusuk payung yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Papan buka", ikon: "\u{1F380}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah jambu. Tempelkan di papan buka berpita." },
};
export const TEMPAT_PAYUNG: Tempat[] = [
  tp("pp-1", "masalah", "Banyaknya berbeda-beda"),
  tp("pp-2", "masalah", "Mana yang cukup?"),
  tp("pp-3", "masalah", "Urutan belum jelas"),
  tp("rs-1", "metode", "Pasangkan satu-satu", 1),
  tp("rs-2", "metode", "Hitung yang tanpa pasangan", 2),
  tp("rs-3", "metode", "Puluhan dulu, lalu satuan", 3),
  tp("rs-4", "metode", "Cari paling banyak dan sedikit", 4),
  tp("rs-5", "metode", "Urutkan terkecil dan terbesar", 5),
  tp("rs-6", "metode", "Menara kubus", 6),
  tp("rs-7", "metode", "Urut di garis bilangan", 7),
  tp("pb-1", "hasil", "Ada sisa: lebih banyak"),
  tp("pb-2", "hasil", "Tanpa sisa: sama banyak"),
  tp("pb-3", "hasil", "Puluhan besar, lebih banyak"),
  tp("pb-4", "hasil", "Makin kanan, makin besar"),
];
export const PETUNJUK_URUT_PAYUNG = "Warnanya sudah benar. Nomor rusuknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAYUNG =
  "Ini payung lapak. Papan pesanan berisi masalah. Tujuh rusuk payung bernomor berisi langkah yang berurutan, ikuti nomornya dari kiri ke kanan. Papan buka berpita berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan pesanan ------------------------------ */
export const KOLOM_PESANAN = ["Bilangan", "Hasil", "Catatan"] as const;
export const BARIS_PESANAN: { ikon: string; nama: string; bilangan: string; hasil: string; catatan: string }[] = [
  { ikon: "\u{1F420}", nama: "Guppy dan koki", bilangan: "15 dan 12", hasil: "guppy lebih banyak", catatan: "pasangkan, sisa 3" },
  { ikon: "\u{2696}\u{FE0F}", nama: "Dua akuarium", bilangan: "pasangan pas", hasil: "sama banyak", catatan: "tanpa sisa" },
  { ikon: "\u{1F3C6}", nama: "Tiga akuarium", bilangan: "18, 9, 13", hasil: "paling banyak 18", catatan: "paling sedikit 9" },
  { ikon: "\u{1F4CF}", nama: "Urutan", bilangan: "terkecil dulu", hasil: "9, 13, 18", catatan: "terbesar: 18, 13, 9" },
  { ikon: "\u{1F4DD}", nama: "Pak RT dan tetangga", bilangan: "16 dan 19", hasil: "19 lebih banyak", catatan: "puluhan sama, cek satuan" },
];
export const TEMPAT_PESANAN: Tempat[] = BARIS_PESANAN.flatMap((b, i) => [tp(`p${i}-bilangan`, "bilangan", b.bilangan), tp(`p${i}-hasil`, "hasil", b.hasil), tp(`p${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_PESANAN: Record<string, string> = {
  bilangan: "Label ini bilangan yang dibandingkan. Tempelkan di kolom Bilangan.",
  hasil: "Label ini hasil membandingkan. Tempelkan di kolom Hasil.",
  catatan: "Label ini catatan caranya. Tempelkan di kolom Catatan.",
};
export const SUARA_PESANAN =
  "Ini papan pesanan lapak, dari cerita pembukaan lapak ikan. Tiap baris satu perbandingan. Tempelkan bilangannya, hasilnya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Lapak Ikan bagian satu, lapak ikan ------------------------------ */
/** Akuarium di lapak (berbeda dari Story). Sama dengan ISI_LAPAK_D di misi. */
export const AKUARIUM_SIM: readonly AkuariumSim[] = [
  { id: "cupang", nama: "Cupang", jenis: "tropis", isi: 14 },
  { id: "molly", nama: "Molly", jenis: "ikan", isi: 11 },
  { id: "buntal", nama: "Buntal", jenis: "buntal", isi: 17 },
  { id: "udang", nama: "Udang", jenis: "udang", isi: 6 },
  { id: "siput", nama: "Siput", jenis: "siput", isi: 11 },
];
/** Antrean pembeli (berbeda dari Story). Sama dengan PESANAN_LAPAK_D di misi. */
export const PEMBELI_SIM: readonly PembeliSim[] = [
  { id: "p1", nama: "Pembeli pertama", ikon: "\u{1F468}", mau: 10 },
  { id: "p2", nama: "Pembeli kedua", ikon: "\u{1F469}", mau: 17 },
  { id: "p3", nama: "Pembeli ketiga", ikon: "\u{1F474}", mau: 7 },
];
export const MISI_LAPAK =
  "Misi Lapak Ikan: pasangkan isi dua akuarium, tandai yang paling banyak dan paling sedikit, urutkan akuarium, layani pembeli, lalu buka lapak.";

/* ------------------------------ CPA: lanjutan Misi Lapak Ikan ------------------------------ */
const banding = (a: number, b: number, tanya: Tanya, jenis = "titik"): Langkah => ({ tipe: "banding", a, b, tanya, jenis });
const pasang = (a: number, b: number, tanya: Tanya | "sisa", jenis = "titik"): Langkah => ({ tipe: "pasang", a, b, tanya, jenis });
const menara = (isi: [number, number, number], tanya: Tanya, jenis = "titik"): Langkah => ({ tipe: "menara", isi, tanya, jenis });
const urut = (isi: number[], arah: ArahUrut, tanya: Posisi, jenis = "titik"): Langkah => ({ tipe: "urut", isi, arah, tanya, jenis });
const salah = (dasar: Langkah, tokoh: string, jawabTokoh: number, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): Langkah => ({
  tipe: "salah",
  dasar: dasar as LangkahDasar,
  tokoh,
  jawabTokoh,
  kataTokoh,
  alasan,
  benar,
  keliru,
});

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Lapak Ikan 2: terpal lapak", "Abang menggelar terpal biru dan ember ikan. Bantu Igil membandingkan isinya.", [
    salah(
      banding(14, 8, "banyak", "tropis"),
      "Igil",
      8,
      "Delapan lebih banyak, karena angka delapan itu besar, angka empat kecil.",
      ["Igil benar, angka delapan memang besar.", "Empat belas punya satu puluhan, delapan tidak punya puluhan. Puluhan dulu.", "Keduanya sama banyak."],
      1,
      "Igil hanya melihat angka satuan. Empat belas punya satu puluhan, jadi bandingkan puluhan dulu.",
    ),
    pasang(7, 10, "banyak", "ikan"),
    menara([6, 11, 4], "sedikit", "buntal"),
    urut([17, 5, 10], "naik", "tengah", "udang"),
  ]),
  C(2, "kanvas", "Misi Lapak Ikan 3: catatan Kaka", "Kaka mencatat isi ember di lapak. Lingkari atau beri tanda, lalu tulis jawabanmu.", [
    banding(11, 17, "sedikit", "kepiting"),
    pasang(9, 6, "sedikit", "siput"),
    menara([2, 7, 5], "banyak", "tropis"),
    urut([20, 1, 8], "turun", "pertama", "ikan"),
  ]),
  C(3, "suara", "Misi Lapak Ikan 4: panggilan Abang", "Abang bertanya dari ujung terpal. Jawab dengan suaramu.", [
    banding(17, 10, "banyak", "udang"),
    pasang(8, 2, "sisa", "buntal"),
    menara([8, 2, 5], "banyak", "kepiting"),
    urut([1, 14, 5], "naik", "pertama", "siput"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Lapak Ikan 5: lintasan bernomor", "Abang menggambar lintasan bernomor untuk mengurutkan pesanan.", [
    banding(10, 6, "sedikit"),
    pasang(11, 8, "banyak"),
    menara([14, 17, 11], "banyak"),
    salah(
      urut([4, 20, 7], "naik", "pertama"),
      "Kaka",
      20,
      "Dari yang terkecil: dua puluh, tujuh, empat. Yang paling depan dua puluh.",
      ["Kaka benar, dua puluh paling besar jadi paling depan.", "Urutannya bebas, semua sama saja.", "Diminta dari yang terkecil, jadi paling depan bilangan yang paling kecil."],
      2,
      "Kaka mengurutkan dari yang terbesar, padahal diminta dari yang terkecil.",
    ),
  ]),
  P(2, "kanvas", "Misi Lapak Ikan 6: denah pesanan", "Kaka menggambar pesanan dengan kotak dan titik polos. Lingkari atau beri tanda, lalu tulis jawabanmu.", [
    banding(14, 20, "banyak"),
    pasang(5, 9, "sedikit"),
    menara([10, 8, 2], "sedikit"),
    urut([11, 1, 5], "naik", "terakhir"),
  ]),
  P(3, "suara", "Misi Lapak Ikan 7: lapor ke Mamah", "Abang melaporkan isi lapak kepada Mamah. Sebutkan jawabanmu.", [
    banding(17, 14, "sedikit"),
    pasang(10, 5, "sisa"),
    menara([5, 10, 8], "banyak"),
    urut([5, 1, 8], "turun", "terakhir"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Lapak Ikan 8: spanduk angka", "Spanduk pembukaan hanya berisi kata dan angka.", [
    salah(
      banding(20, 17, "sedikit"),
      "Igil",
      20,
      "Dua puluh lebih sedikit, karena angka nol itu kecil, angka tujuh besar.",
      ["Dua puluh punya dua puluhan, tujuh belas satu puluhan. Jadi tujuh belas lebih sedikit.", "Igil benar, nol memang paling kecil.", "Satuan dulu, puluhan tidak penting."],
      0,
      "Igil membandingkan satuan dulu, padahal puluhannya beda. Lihat puluhan dulu.",
    ),
    pasang(6, 4, "banyak"),
    menara([11, 14, 10], "sedikit"),
    urut([8, 1, 6], "naik", "tengah"),
  ]),
  A(2, "kanvas", "Misi Lapak Ikan 9: tulis di spanduk", "Kaka meminta Igil menulis bilangan di kanvas.", [banding(4, 14, "banyak"), pasang(7, 11, "banyak"), menara([5, 2, 7], "sedikit"), urut([20, 11, 14], "turun", "pertama")]),
  A(3, "suara", "Misi Lapak Ikan 10: lapak siap dibuka", "Lapak hampir dibuka. Bacakan jawaban terakhir untuk Abang.", [banding(8, 10, "sedikit"), pasang(11, 6, "sisa"), menara([4, 11, 7], "banyak"), urut([7, 1, 4], "turun", "tengah")]),
];

export const POIN_PENTING = [
  "Pasangkan satu-satu. Yang punya sisa lebih banyak, yang habis duluan lebih sedikit.",
  "Kalau tidak ada sisa, dua kumpulan sama banyak.",
  "Bandingkan puluhan dulu, lalu satuan. 14 lebih banyak dari 8, karena 14 punya satu puluhan.",
  "Paling banyak adalah bilangan terbesar, paling sedikit adalah bilangan terkecil.",
  "Urutkan dari terkecil: 4, 11, 20. Dari terbesar: 20, 11, 4.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const PERAYAAN = "Lapak Ikan Abang resmi buka! Semua pesanan terlayani berurutan. Cerita Akuarium Ikan Hias Abang selesai.";
export const PERAYAAN_SUARA = "Lapak Ikan Abang resmi buka! Semua pesanan terlayani berurutan. Cerita Akuarium Ikan Hias Abang selesai. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F41F}", nama: "Concrete", cara: "Ember dan akuarium di terpal: pindahkan, ketuk, dan ucapkan" },
  pictorial: { ikon: "\u{1F3C1}", nama: "Pictorial", cara: "Kotak, titik, dan lintasan polos: pindahkan, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Kata dan angka saja: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LAPAK, PICTORIAL as PICTORIAL_LAPAK, ABSTRACT as ABSTRACT_LAPAK, TEMA_TAHAP as TEMA_LAPAK };
