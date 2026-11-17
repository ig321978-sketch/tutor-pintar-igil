/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab A "Dua Nampan Kue",
 * awal cerita Pasar Malam Kampung. Angka Story (kue cubit dua belas dan kue pukis delapan, selisih empat, lampion tujuh dan sepuluh,
 * es lilin enam ditambah lima sebelas; global lima belas dan sebelas, delapan dan sebelas, empat belas dan sepuluh) hanya dipakai di
 * Mind-map dan Infografis. Simulasi dan CPA memakai benda dan bilangan lain dan melanjutkan "Misi Pasar Malam" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-nampan-k1b6a.mjs.
 */
import type { LangkahDasar, Cara, Langkah, LangkahSoal, NampanSim, Rupa, SoalMisi, Tempat, TanyaBatang, TanyaGaris, TanyaPasang, TanyaSamakan } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar benda dagangan pasar malam (kunci = jenis). Hanya dipakai di Concrete. */
export const EMOJI: Record<string, string> = {
  jeruk: "\u{1F34A}",
  apel: "\u{1F34E}",
  pisang: "\u{1F34C}",
  donat: "\u{1F369}",
  kukis: "\u{1F36A}",
  permen: "\u{1F36C}",
  lolipop: "\u{1F36D}",
  katak: "\u{1F438}",
};
/** Warna alas tiap deret benda di tampah (Concrete): isi dan garis. */
export const WARNA_BENDA: Record<string, [string, string]> = {
  jeruk: ["#FED7AA", "#C2410C"],
  apel: ["#FECACA", "#B91C1C"],
  pisang: ["#FEF08A", "#A16207"],
  donat: ["#FBCFE8", "#BE185D"],
  kukis: ["#FDE68A", "#92400E"],
  permen: ["#DDD6FE", "#6D28D9"],
  lolipop: ["#BBF7D0", "#15803D"],
  katak: ["#D9F99D", "#4D7C0F"],
};
/** Nama benda untuk pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  jeruk: "jeruk",
  apel: "apel",
  pisang: "pisang",
  donat: "donat",
  kukis: "kukis",
  permen: "permen",
  lolipop: "lolipop",
  katak: "katak",
};

/* ------------------------------ Mind-map: untaian lampu bohlam (hanya poin pelajaran) ------------------------------ */
export const PUSAT_LAMPU = "Lebih dari, kurang dari, dan selisih";
export const KELOMPOK_LAMPU: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Untaian atas", ikon: "\u{2753}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di bohlam untaian atas." },
  metode: { nama: "Penyelesaian", letak: "Untaian tengah", ikon: "\u{1F4A1}", isi: "#FEF08A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di bohlam bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Untaian bawah", ikon: "\u{2705}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di bohlam untaian bawah." },
};
export const TEMPAT_LAMPU: Tempat[] = [
  tp("ms-1", "masalah", "Dua kumpulan beda banyaknya"),
  tp("ms-2", "masalah", "Mana yang lebih banyak?"),
  tp("ms-3", "masalah", "Berapa bedanya?"),
  tp("pn-1", "metode", "Pasangkan satu-satu", 1),
  tp("pn-2", "metode", "Cari lebihnya dan kurangnya", 2),
  tp("pn-3", "metode", "Besar dikurangi kecil", 3),
  tp("pn-4", "metode", "Menyamakan: tambah atau ambil", 4),
  tp("pn-5", "metode", "Model Batang", 5),
  tp("pn-6", "metode", "Selisih di Garis Bilangan", 6),
  tp("pn-7", "metode", "Lebihnya tambah, kurangnya kurang", 7),
  tp("hs-1", "hasil", "Lebihnya sama dengan kurangnya"),
  tp("hs-2", "hasil", "Selisih adalah beda banyaknya"),
  tp("hs-3", "hasil", "Tambah atau ambil sebanyak selisih"),
  tp("hs-4", "hasil", "Bilangan belum diketahui ketemu"),
];
export const PETUNJUK_URUT_LAMPU = "Warnanya sudah benar. Nomor bohlamnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_LAMPU =
  "Ini untaian lampu bohlam. Untaian atas berisi masalah. Tujuh bohlam bernomor berisi langkah yang berurutan, ikuti nomornya dari kiri ke kanan. Untaian bawah berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan menu kapur ------------------------------ */
export const KOLOM_MENU = ["Bilangan", "Hasil", "Catatan"] as const;
export const BARIS_MENU: { ikon: string; nama: string; bilangan: string; hasil: string; catatan: string }[] = [
  { ikon: "\u{1F9C1}", nama: "Dua nampan", bilangan: "12 dan 8", hasil: "selisih 4", catatan: "pasangkan, 4 tanpa pasangan" },
  { ikon: "\u{2696}\u{FE0F}", nama: "Menyamakan", bilangan: "8 jadi 12", hasil: "tambah 4", catatan: "atau ambil 4 dari 12" },
  { ikon: "\u{1F3EE}", nama: "Lampion", bilangan: "7 dan 10", hasil: "selisih 3", catatan: "batang: 3 kotak lebih" },
  { ikon: "\u{1F366}", nama: "Es lilin", bilangan: "6 dan lebihnya 5", hasil: "stroberi 11", catatan: "lebihnya, jadi tambah" },
  { ikon: "\u{1F4CF}", nama: "Garis bilangan", bilangan: "8 ke 11", hasil: "3 langkah", catatan: "meloncat ke kanan" },
];
export const TEMPAT_MENU: Tempat[] = BARIS_MENU.flatMap((b, i) => [tp(`p${i}-bilangan`, "bilangan", b.bilangan), tp(`p${i}-hasil`, "hasil", b.hasil), tp(`p${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_MENU: Record<string, string> = {
  bilangan: "Label ini bilangan yang dibandingkan. Tempelkan di kolom Bilangan.",
  hasil: "Label ini hasil membandingkan. Tempelkan di kolom Hasil.",
  catatan: "Label ini catatan caranya. Tempelkan di kolom Catatan.",
};
export const SUARA_MENU = "Ini papan menu kapur di tiang lapak, dari cerita dua nampan kue. Tiap baris satu perbandingan. Tempelkan bilangannya, hasilnya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Pasar Malam bagian satu, Meja Dua Nampan ------------------------------ */
/** Nampan di meja (berbeda dari Story). */
export const NAMPAN_SIM: readonly NampanSim[] = [
  { id: "donat", nama: "Donat", ikon: "\u{1F369}", isi: 17 },
  { id: "kukis", nama: "Kukis", ikon: "\u{1F36A}", isi: 9 },
  { id: "permen", nama: "Permen", ikon: "\u{1F36C}", isi: 15 },
  { id: "bakpao", nama: "Bakpao", ikon: "\u{1F95F}", isi: 9 },
];
export const MISI_NAMPAN =
  "Misi Pasar Malam: pilih dua nampan, pasangkan kuenya satu-satu, sorot selisih di batang, loncat di garis bilangan, lalu samakan banyaknya.";

/* ------------------------------ CPA: lanjutan Misi Pasar Malam ------------------------------ */
const pasang = (a: number, b: number, tanya: TanyaPasang, jenis = "titik", jenis2 = jenis): Langkah => ({ tipe: "pasang", a, b, tanya, jenis, jenis2 });
const batang = (a: number, b: number, tanya: TanyaBatang, jenis = "titik", jenis2 = jenis): Langkah => ({ tipe: "batang", a, b, tanya, jenis, jenis2 });
const garis = (a: number, b: number, tanya: TanyaGaris, jenis = "titik"): Langkah => ({ tipe: "garis", a, b, tanya, jenis });
const samakan = (a: number, b: number, tanya: TanyaSamakan, jenis = "titik", jenis2 = jenis, angka = true): Langkah => ({ tipe: "samakan", a, b, tanya, angka, jenis, jenis2 });
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
  C(1, "klik", "Misi Pasar Malam 2: tampah buah", "Mamah menata buah di atas tampah bambu. Bantu Igil membandingkan dan mencari selisihnya.", [
    salah(
      pasang(15, 8, "selisih", "jeruk", "apel"),
      "Abang",
      8,
      "Aku hitung mulai dari jeruk terakhir yang berpasangan, jadi ada delapan.",
      ["Abang benar, delapan jeruk tidak punya pasangan.", "Delapan apel sudah berpasangan dengan delapan jeruk, jadi yang tanpa pasangan hanya tujuh.", "Selisih artinya jumlah semua buah."],
      1,
      "Abang ikut menghitung satu jeruk yang sudah berpasangan. Hitung hanya jeruk yang tidak punya pasangan.",
    ),
    batang(8, 13, "tambah", "pisang"),
    garis(12, 17, "maju", "katak"),
    samakan(9, 14, "tambah", "kukis", "donat", false),
  ]),
  C(2, "kanvas", "Misi Pasar Malam 3: catatan Kaka", "Kaka mencatat isi tampah. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    pasang(7, 13, "lebih", "permen", "lolipop"),
    batang(15, 17, "selisih", "apel"),
    garis(9, 14, "selisih", "katak"),
    samakan(11, 17, "tambah", "donat", "kukis"),
  ]),
  C(3, "suara", "Misi Pasar Malam 4: panggilan Mamah", "Mamah memanggil dari seberang tampah. Jawab dengan suaramu.", [
    pasang(17, 8, "selisih", "jeruk", "pisang"),
    batang(17, 10, "kurang", "donat"),
    garis(18, 12, "mundur", "katak"),
    samakan(16, 8, "ambil", "apel", "jeruk"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Pasar Malam 5: taplak kotak-kotak", "Abang menggambar dua baris dan dua batang di taplak kotak-kotak.", [
    pasang(14, 9, "lebih"),
    salah(
      batang(6, 13, "selisih"),
      "Igil",
      19,
      "Dua batang digabung: enam dan tiga belas, jadi sembilan belas.",
      ["Igil benar, selisih artinya semua kotak digabung.", "Selisih itu beda panjang: hanya kotak yang melebihi batang pendek, yaitu tujuh.", "Selisih sama dengan panjang batang yang paling panjang."],
      1,
      "Igil menjumlahkan kedua batang. Selisih hanya kotak yang melebihi batang pendek.",
    ),
    garis(9, 15, "maju"),
    samakan(14, 8, "ambil"),
  ]),
  P(2, "kanvas", "Misi Pasar Malam 6: catatan di taplak", "Kaka menggambar titik, batang, dan garis polos. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    pasang(11, 6, "selisih"),
    batang(10, 18, "selisih"),
    garis(7, 9, "selisih"),
    samakan(8, 13, "tambah", "titik", "titik", false),
  ]),
  P(3, "suara", "Misi Pasar Malam 7: lapor ke Mamah", "Abang melaporkan hasilnya kepada Mamah. Sebutkan jawabanmu.", [
    pasang(5, 17, "selisih"),
    batang(12, 18, "tambah"),
    garis(19, 14, "mundur"),
    samakan(17, 8, "ambil"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Pasar Malam 8: kertas koran", "Pembungkus kue dari kertas koran hanya berisi kata dan angka.", [
    pasang(9, 16, "lebih"),
    batang(19, 13, "kurang"),
    salah(
      garis(12, 17, "selisih"),
      "Kaka",
      6,
      "Aku hitung bilangan dari dua belas sampai tujuh belas, ada enam, jadi selisihnya enam.",
      ["Kaka benar, enam bilangan dilewati.", "Selisih menghitung langkah, bukan bilangan: dari dua belas ke tujuh belas ada lima langkah.", "Selisih dua belas dan tujuh belas adalah jumlah keduanya."],
      1,
      "Kaka menghitung bilangan yang dilewati, padahal selisih menghitung langkahnya. Dua belas ditambah lima menjadi tujuh belas.",
    ),
    samakan(6, 15, "tambah"),
  ]),
  A(2, "kanvas", "Misi Pasar Malam 9: tulis di koran", "Kaka meminta Igil menulis jawabannya di kanvas.", [pasang(15, 8, "kurang"), batang(8, 10, "selisih"), garis(5, 13, "selisih"), samakan(16, 10, "ambil")]),
  A(3, "suara", "Misi Pasar Malam 10: pasar malam hampir tutup", "Pembeli terakhir menunggu. Bacakan jawaban untuk Abang.", [pasang(18, 6, "selisih"), batang(7, 17, "tambah"), garis(10, 19, "maju"), samakan(13, 14, "tambah")]),
];

export const POIN_PENTING = [
  "Pasangkan satu-satu. Yang tidak punya pasangan adalah lebihnya, dan yang kehabisan adalah kurangnya.",
  "Selisih adalah beda banyaknya. Cari dengan mengurangi bilangan besar dengan bilangan kecil: 12 dikurangi 8 sama dengan 4.",
  "Model Batang: kotak yang melebihi batang pendek adalah selisihnya.",
  "Garis bilangan: hitung langkah dari bilangan kecil ke bilangan besar.",
  "Menyamakan: tambah ke yang sedikit atau ambil dari yang banyak sebanyak selisihnya.",
  "Lebihnya diketahui, jadi menambah. Kurangnya diketahui, jadi mengurangi.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F34A}", nama: "Concrete", cara: "Buah dan kue di tampah bambu: pindahkan, ketuk, dan ucapkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Titik, batang, dan garis polos di taplak: pindahkan, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F4F0}", nama: "Abstract", cara: "Kata dan angka saja di koran: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_NAMPAN, PICTORIAL as PICTORIAL_NAMPAN, ABSTRACT as ABSTRACT_NAMPAN, TEMA_TAHAP as TEMA_NAMPAN };
