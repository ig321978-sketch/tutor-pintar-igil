import type { AdeganStory } from "./logika-story";
import { W, bulat, deret, emo, fmt, garis, garisBil, judul, kartu, kotak, panah, teks, xGaris } from "./k4b1c-gambar";
import { bersih, hapus, idx, k, tambah, ubah } from "./k4b1c-bantu";

export const NAMA_METODE = ["Compare Leftmost", "Number Line Order", "Ordering Sets", "Bar Model Compare"];
export const NAMA_METODE_ID = ["Banding dari Kiri", "Urutan Garis Bilangan", "Mengurutkan Himpunan", "Banding Batang"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔎", "📏", "🗂", "📊"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ Dua bilangan sejajar per tempat (Banding dari Kiri) ------------------------------ */
export const LX = 102;
export const LG = 26;
export const LY = [88, 118] as const;
const TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"];
/** Dua bilangan sejajar: id deret `${id}a` dan `${id}b` (angka `-t{0..3}`), judul kolom `${id}-lab{c}`. */
export const pasangL = (id: string, a: number, b: number) => [
  ...TEMPAT.map((t, c) => teks(`${id}-lab${c}`, LX + c * LG, 63, t, 6, W.hijau)),
  ...deret(`${id}a`, LX, LY[0], a, LG, 22),
  ...deret(`${id}b`, LX, LY[1], b, LG, 22),
];
/** Kotak sorot setinggi dua deret pada kolom `c`. Id `${id}`. */
export const kolomL = (id: string, c: number, warna: string = W.arsir) => kotak(id, LX + c * LG - LG / 2, 70, LG, 54, warna, W.merah, { rx: 4, tebal: 1.2, z: -1 });
const tandaDari = (a: number, b: number) => (a > b ? ">" : a < b ? "<" : "=");

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita memutuskan bilangan mana yang lebih besar, lalu mengurutkannya? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari pelajaran kita.";
const SUARA_O2 = "Empat metode itu: Compare Leftmost, Number Line Order, Ordering Sets, dan Bar Model Compare.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Banding dari Kiri, Urutan Garis Bilangan, Mengurutkan Himpunan, dan Banding Batang.";
const SUARA_O4 = "Semuanya menjawab dua pertanyaan: mana yang lebih besar, dan bagaimana urutannya. Ada yang membaca dari kiri, memakai garis, memilih satu per satu, atau mengukur panjang batang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membandingkan dan mengurutkan",
  sumber: "Metode luar: empat cara membandingkan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("bilangan", teks("po1", 90, 78, "8.750", 20), teks("po2", 150, 78, "?", 22, W.merah), teks("po3", 210, 78, "7.500", 20)),
      tambah("berbagai", emo("gl", 150, 130, "🌍", 40)),
      tambah("empat", ...kartu("pk4", 60, 160, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(i === 3 ? idx(SUARA_O2, "Compare", 2) : ["Leftmost,", "Order,", "Sets,"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Banding", "Urutan", "Mengurutkan", "Banding"][i], i === 3 ? 2 : 1), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Dua pertanyaan, empat cara")),
      tambah("membaca", emo("i1", 45, 76, IKON_METODE[0], 32), teks("i1t", 45, 106, "dari kiri", 8.4, W.biru)),
      tambah("memakai", emo("i2", 112, 76, IKON_METODE[1], 32), teks("i2t", 112, 106, "garis", 8.4, W.biru)),
      tambah("memilih", emo("i3", 188, 76, IKON_METODE[2], 32), teks("i3t", 188, 106, "satu per satu", 8.4, W.biru)),
      tambah("mengukur", emo("i4", 258, 76, IKON_METODE[3], 32), teks("i4t", 258, 106, "batang", 8.4, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 30, 130, 240, 44, W.emas, ["1. mana yang lebih besar?", "2. bagaimana urutannya?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Compare Leftmost: konsep ------------------------------ */
const SUARA_L1 = "Metode pertama, Compare Leftmost, atau Banding dari Kiri. Sejajarkan kedua bilangan tempat demi tempat, lalu baca mulai dari angka paling kiri, tempat dengan nilai terbesar.";
const SUARA_L2 = "Pindai ke kanan. Selama angkanya sama, geser satu tempat ke kanan. Berhenti di tempat pertama yang angkanya berbeda.";
const SUARA_L3 = "Angka yang lebih besar pada tempat berbeda pertama itu menentukan hasil. Angka di tempat sesudahnya tidak diperhatikan lagi, berapa pun besarnya.";
const SUARA_L4 = "Kalau semua tempat sama, kedua bilangan sama. Jadi hasilnya hanya tiga kemungkinan: lebih dari, kurang dari, atau sama dengan.";

export const ADEGAN_LUAR_KIRI: AdeganStory = {
  id: "luar-kiri",
  judul: "Compare Leftmost: baca dari angka paling kiri",
  sumber: "Metode luar: Compare Leftmost",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Metode 1 dari 4")),
      tambah("pertama,", ...kepala(0)),
      tambah("Sejajarkan", ...pasangL("lk", 4352, 4365)),
      tambah(idx(SUARA_L1, "kiri", 2), kolomL("lk-b0", 0), teks("lk-n", 150, 150, "mulai dari kiri", 11, W.merah)),
    ),
    k(
      SUARA_L2,
      hapus(0, "lk-n", "lk-b0"),
      tambah("Selama", kolomL("lk-s0", 0, W.hijauMuda)),
      tambah("geser", kolomL("lk-s1", 1, W.hijauMuda), panah("lk-p", LX, 140, LG, 0, W.hijau, 1.6)),
      tambah("berbeda.", kolomL("lk-h", 2), teks("lk-t", 150, 160, "tempat pertama yang berbeda: puluhan", 8.8, W.merah)),
    ),
    k(
      SUARA_L3,
      hapus(0, "lk-t", "lk-p"),
      tambah("menentukan", teks("lk-r", 150, 150, "4.352 < 4.365", 16, W.merah)),
      ubah("sesudahnya", { id: "lka-t3", op: 0.3 }, { id: "lkb-t3", op: 0.3 }),
      tambah("diperhatikan", teks("lk-x", 150, 174, "satuan tidak dipakai", 8.8, W.coklat)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Metode 1 dari 4")),
      tambah(0, ...kepala(0)),
      tambah("lebih", ...kartu("lq1", 14, 64, 84, 60, W.hijauMuda, [">", "lebih dari"], 11)),
      tambah("kurang", ...kartu("lq2", 108, 64, 84, 60, W.langit, ["<", "kurang dari"], 11)),
      tambah("sama@3", ...kartu("lq3", 202, 64, 84, 60, W.krem, ["=", "sama dengan"], 11)),
      tambah("tiga", teks("lq4", 150, 150, "hanya tiga kemungkinan", 10.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Compare Leftmost: penerapan pada soal latihan ------------------------------ */
const SUARA_M1 = "Delapan ribu tujuh ratus lima puluh dan tujuh ribu lima ratus. Angka paling kiri langsung berbeda: delapan lawan tujuh, jadi yang pertama lebih besar.";
const SUARA_M2 = "Lima ribu enam ratus empat belas dan lima ribu tiga ratus enam puluh delapan. Kiri sama, ratusan enam lawan tiga, jadi yang pertama lebih besar.";
const SUARA_M3 = "Tujuh ribu seratus dua puluh empat dan tujuh ribu seratus sembilan puluh tujuh. Dua tempat pertama sama, puluhan dua lawan sembilan, jadi yang kedua lebih besar.";
const SUARA_M4 = "Sembilan ribu sembilan ratus sembilan puluh sembilan dan sembilan ribu sembilan ratus sembilan puluh delapan. Tiga tempat pertama sama, satuan sembilan lawan delapan, jadi yang pertama lebih besar.";

/** Kolom pertama yang berbeda antara dua bilangan empat angka (-1 bila sama). */
const kolomBeda = (a: number, b: number): number => String(a).split("").findIndex((d, c) => d !== String(b)[c]);
/** Satu ketukan penerapan: pasangan muncul pada kata "dan", kolom sama pada kata "sama", kolom berbeda pada "lawan", hasil pada "jadi". */
function ketukanKiri(suara: string, id: string, a: number, b: number) {
  const c = kolomBeda(a, b);
  return k(
    suara,
    bersih(0),
    tambah(0, judul(`${fmt(a)} dan ${fmt(b)}`), ...kepala(0)),
    tambah("dan", ...pasangL(id, a, b)),
    ...(c > 0 ? [tambah("sama", ...Array.from({ length: c }, (_, i) => kolomL(`${id}-s${i}`, i, W.hijauMuda)))] : []),
    tambah("lawan", kolomL(`${id}-h`, c)),
    tambah("jadi", teks(`${id}-r`, 150, 158, `${fmt(a)} ${tandaDari(a, b)} ${fmt(b)}`, 16, W.merah)),
  );
}
export const ADEGAN_LUAR_KIRI_TERAPAN: AdeganStory = {
  id: "luar-kiri-terapan",
  judul: "Compare Leftmost pada soal latihan",
  sumber: "Metode luar: Compare Leftmost",
  latar: "#ECFDF5",
  ketukan: [ketukanKiri(SUARA_M1, "ma", 8750, 7500), ketukanKiri(SUARA_M2, "mb", 5614, 5368), ketukanKiri(SUARA_M3, "mc", 7124, 7197), ketukanKiri(SUARA_M4, "md", 9999, 9998)],
};

/* ------------------------------ 4. Number Line Order: konsep ------------------------------ */
/** Garis bilangan konsep: 0 sampai 10.000 dari x 20 ke 280 di y 120; tanda tiap seribu. */
export const GK = { x0: 20, x1: 280, y: 120, dari: 0, sampai: 10000, langkah: 1000 } as const;
const titikGK = (id: string, n: number) => [bulat(`${id}`, xGaris(n, GK.x0, GK.x1, GK.dari, GK.sampai), GK.y, 4.4, W.merah, W.biru), teks(`${id}-l`, xGaris(n, GK.x0, GK.x1, GK.dari, GK.sampai), GK.y - 13, fmt(n), 8.8, W.merah)];

const SUARA_N1 = "Metode kedua, Number Line Order, atau Urutan Garis Bilangan. Letakkan setiap bilangan sebagai sebuah titik pada garis bilangan.";
const SUARA_N2 = "Aturannya: makin ke kanan, makin besar bilangannya, dan makin ke kiri, makin kecil.";
const SUARA_N3 = "Untuk membandingkan, tandai kedua titik. Titik yang lebih ke kanan adalah bilangan yang lebih besar, tanpa menghitung angka demi angka.";
const SUARA_N4 = "Mengurutkan juga mudah. Baca titik dari kiri ke kanan untuk urutan terkecil ke terbesar, dan dari kanan ke kiri untuk urutan terbesar ke terkecil.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Order: lebih kanan berarti lebih besar",
  sumber: "Metode luar: Number Line Order",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Metode 2 dari 4")),
      tambah("kedua,", ...kepala(1)),
      tambah("garis", ...garisBil("gk", GK.x0, GK.x1, GK.y, GK.dari, GK.sampai, GK.langkah, 6.4)),
      tambah("titik", ...titikGK("gp", 4352)),
    ),
    k(
      SUARA_N2,
      tambah("kanan,", panah("gr", 150, 160, 100, 0, W.hijau, 2), teks("grt", 215, 176, "lebih besar", 9.4, W.hijau)),
      tambah("kiri,", panah("gl", 150, 160, -100, 0, W.merah, 2), teks("glt", 85, 176, "lebih kecil", 9.4, W.merah)),
    ),
    k(
      SUARA_N3,
      hapus(0, "gp", "gp-l", "gr", "gl", "grt", "glt"),
      tambah("tandai", ...titikGK("g1", 7500), ...titikGK("g2", 8750)),
      tambah("kanan", teks("gc", 150, 164, "8.750 > 7.500", 16, W.merah)),
    ),
    k(
      SUARA_N4,
      hapus(0, "gc"),
      tambah("kiri", panah("gn", 40, 150, 220, 0, W.hijau, 2), teks("gnt", 150, 164, "terkecil ke terbesar", 9.4, W.hijau)),
      tambah("kanan@2", panah("gm", 260, 176, -220, 0, W.merah, 2), teks("gmt", 150, 190, "terbesar ke terkecil", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Number Line Order: penerapan pada gunung dan Ayo Berlatih ------------------------------ */
const SUARA_P1 = "Sinabung, Semeru, dan Rinjani ditandai pada garis dari dua ribu sampai empat ribu. Sinabung, dua ribu empat ratus enam puluh, paling kiri.";
const SUARA_P2 = "Semeru, tiga ribu enam ratus tujuh puluh enam, jauh di kanan. Rinjani, tiga ribu tujuh ratus dua puluh enam, sedikit lebih kanan lagi, jadi lebih besar daripada Semeru.";
const SUARA_P3 = "Baca dari kiri: Sinabung, Semeru, Rinjani. Itulah urutan dari terkecil ke terbesar, sama dengan hasil tadi: dua ribu empat ratus enam puluh, tiga ribu enam ratus tujuh puluh enam, tiga ribu tujuh ratus dua puluh enam.";
const SUARA_P4 = "Garis bilangan untuk soal latihan: tandai tujuh ribu lima ratus tujuh puluh, lima ribu dua ratus empat puluh, tiga ribu empat puluh satu, dan sembilan ribu sembilan ratus empat puluh satu.";

/** Garis dua ribu sampai empat ribu untuk tinggi gunung, x 30 ke 270 di y 120, tanda tiap lima ratus. */
export const GG = { x0: 30, x1: 270, y: 120, dari: 2000, sampai: 4000, langkah: 500 } as const;
const xg = (n: number) => xGaris(n, GG.x0, GG.x1, GG.dari, GG.sampai);
/** Titik gunung pada garis; label bilangan digeser ke `lx` dengan garis penunjuk, nama di atasnya. Id titik `${id}`. */
const titikGunung = (id: string, n: number, nama: string, lx: number) => [
  bulat(id, xg(n), GG.y, 4.4, W.merah, W.biru),
  garis(`${id}-p`, lx, 104, xg(n) - lx, 12, W.merah, 1),
  teks(`${id}-l`, lx, 100, fmt(n), 8.8, W.merah),
  teks(`${id}-m`, lx, 90, nama, 8, W.coklat),
];
/** Garis bilangan Ayo Berlatih: nol sampai sepuluh ribu, tanda tiap seribu, dari x 20 ke 280. */
const xl = (n: number) => xGaris(n, GK.x0, GK.x1, GK.dari, GK.sampai);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Order pada tinggi gunung dan soal latihan",
  sumber: "Metode luar: Number Line Order",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tinggi gunung pada garis")),
      tambah(0, ...kepala(1)),
      tambah("garis", ...garisBil("gg", GG.x0, GG.x1, GG.y, GG.dari, GG.sampai, GG.langkah, 7)),
      tambah(idx(SUARA_P1, "puluh", 1), ...titikGunung("gs", 2460, "Sinabung", 85)),
    ),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "enam", 2), ...titikGunung("gm", 3676, "Semeru", 212)),
      tambah(idx(SUARA_P2, "enam", 3), ...titikGunung("gr", 3726, "Rinjani", 258)),
    ),
    k(
      SUARA_P3,
      tambah("Itulah", teks("gu1", 150, 160, "Sinabung < Semeru < Rinjani", 11, W.merah)),
      tambah("hasil", teks("gu2", 150, 180, "2.460 < 3.676 < 3.726", 11, W.merah)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Garis bilangan soal latihan")),
      tambah(0, ...kepala(1)),
      tambah("tandai", ...garisBil("gl", GK.x0, GK.x1, GK.y, GK.dari, GK.sampai, GK.langkah, 6.4)),
      ...[7570, 5240, 3041, 9941].map((n, i) => tambah(i === 0 ? idx(SUARA_P4, "puluh", 1) : i === 1 ? idx(SUARA_P4, "puluh", 2) : i === 2 ? idx(SUARA_P4, "satu", 1) : idx(SUARA_P4, "satu", 2), bulat(`lp${n}`, xl(n), GK.y, 4.4, W.merah, W.biru), teks(`lp${n}-l`, xl(n), GK.y - 13, fmt(n), 8.8, W.merah))),
    ),
  ],
};
