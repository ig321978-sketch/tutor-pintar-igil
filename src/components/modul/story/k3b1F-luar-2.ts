import type { AdeganStory, Obj } from "./logika-story";
import { E, W, benda, busur, emo, garisBilangan, judul, kartu, lantai, rakKayu, tanda, teks, tokoh } from "./k3b1F-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1F-bantu";

/*
 * Cerita orisinal IGIL "Telur Bu Mirna" (Kelas 3 Bab 1 Sub-Bab F), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1f.md. Bagian ini: terapan Array, Skip Counting (Lompat Hitung) beserta terapannya, dan ringkasan.
 */

/** Garis bilangan nol sampai lima belas: titik v ada di x = 30 + 16 v, pada tinggi 120. */
const xl = (v: number): number => 30 + v * 16;

/* ------------------------------ Array: terapan ------------------------------ */
const SUARA_A1 = "Bima menata kaleng di rak: empat baris, tiap baris lima kaleng. Semuanya dua puluh.";
const SUARA_A2 = "Ia memutar susunan menjadi lima baris, tiap baris empat kaleng. Tetap dua puluh.";
const SUARA_A3 = "Cocok kalau barang bisa dijajarkan rapi seperti rak atau kursi.";
const SUARA_A4 = "Kurang cocok kalau barang berserakan atau tidak bisa dijajarkan.";

/** Dua puluh kaleng pada rak empat tingkat: baris r (0-3), kolom c (0-4); id `kr{r}_{c}`. */
const RAK_Y = [57, 89, 121, 153] as const;
const kalengRak = (r: number, c: number): Obj[] => benda(`kr${r}_${c}`, 100 + c * 25, RAK_Y[r], "kaleng", 6);
const SEMUA_RAK = [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3, 4].flatMap((c) => kalengRak(r, c)));

/** Dua puluh kaleng tanpa rak: empat baris lima kolom (awal), lalu lima baris empat kolom (diputar). Id `kn0`..`kn19`. */
const SK = 20;
const posEmpatLima = (i: number): [number, number] => [150 + ((i % 5) - 2) * SK, 95 + (Math.floor(i / 5) - 1.5) * SK];
const posLimaEmpat = (i: number): [number, number] => [150 + ((i % 4) - 1.5) * SK, 95 + (Math.floor(i / 4) - 2) * SK];
const knEmpatLima = (): Obj[] => Array.from({ length: 20 }, (_, i) => benda(`kn${i}`, posEmpatLima(i)[0], posEmpatLima(i)[1], "kaleng", 6.4)).flat();
const knLimaEmpat = (): Obj[] => Array.from({ length: 20 }, (_, i) => benda(`kn${i}`, posLimaEmpat(i)[0], posLimaEmpat(i)[1], "kaleng", 6.4)).flat();

const BERSERAKAN: [number, number, number][] = [
  [70, 82, 20],
  [118, 120, -35],
  [176, 78, 50],
  [222, 118, -15],
  [96, 150, 70],
  [150, 98, -60],
  [206, 150, 30],
  [58, 118, -80],
  [248, 84, 10],
];

export const ADEGAN_LUAR_SUSUNAN_TERAPAN: AdeganStory = {
  id: "luar-susunan-terapan",
  judul: "Array: kaleng Bima",
  sumber: "Metode global: Array (terapan)",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kaleng di Rak"), ...lantai("lt", 164), ...tokoh("bm", 40, 184, "Bima")),
      tambah("rak:", ...rakKayu("rk", 80, 34, 140, 128, 4)),
      tambah("baris,", teks("n4", 262, 100, "4 baris", 9, W.merah)),
      tambah("lima", teks("n5", 150, 28, "5 kaleng", 9, W.hijau)),
      tambah("kaleng@2", ...SEMUA_RAK),
      tambah("dua", teks("t20", 262, 140, "20", 20, W.merah)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Rak Diputar"), ...lantai("lt", 164), ...tokoh("bm", 40, 184, "Bima"), ...knEmpatLima()),
      tambah("susunan", emo("pt", 250, 150, E.putar, 24)),
      ubah("menjadi", ...knLimaEmpat().map((o) => ({ id: o.id, x: o.x, y: o.y }))),
      tambah("lima", teks("m5", 232, 95, "5 baris", 10, W.merah)),
      tambah("empat", teks("m4", 68, 95, "4 kaleng", 10, W.hijau)),
      tambah("dua", teks("m20", 150, 160, "20", 18, W.merah)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("barang", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["barang bisa dijajarkan"], 9)),
      tambah("rapi", ...[0, 1, 2, 3].flatMap((i) => [emo(`ks${i}`, 90 + i * 40, 90, "\u{1FA91}", 24), emo(`kt${i}`, 90 + i * 40, 124, "\u{1FA91}", 24)])),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("barang", ...BERSERAKAN.flatMap(([x, y, r], i) => benda(`bs${i}`, x, y, "kaleng", 6).map((o) => ({ ...o, rot: r })))),
      tambah("tidak", teks("bd", 150, 168, "tidak bisa dijajarkan", 11, W.merah), emo("pz", 262, 164, E.pusing, 22)),
    ),
  ],
};

/* ------------------------------ Skip Counting: konsep ------------------------------ */
const SUARA_L1 = "Cara ketiga, Skip Counting, atau Lompat Hitung.";
const SUARA_L2 = "Kita menghitung dengan melompat, misalnya lima, sepuluh, lima belas.";
const SUARA_L3 = "Tiap lompatan menambah bilangan yang sama besar.";
const SUARA_L4 = "Banyak lompatan sama dengan pengali, dan bilangan terakhir adalah hasilnya.";

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Skip Counting: Lompat Hitung",
  sumber: "Metode global: Skip Counting (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 3: Skip Counting"), garisBilangan("gb", 30, 270, 120), ...tanda("t0", xl(0), 120, "0", 10, W.biru)),
      tambah("Skip", emo("kt", xl(0), 104, "\u{1F438}", 22)),
      tambah("Lompat", teks("nm", 150, 160, "Lompat Hitung", 13, W.ungu)),
    ),
    k(
      SUARA_L2,
      tambah("melompat", teks("jl", 150, 70, "lompat +5", 11, W.hijau)),
      tambah("lima,", busur("b1", xl(0), xl(5), 118, 28), ...tanda("t5", xl(5), 120, "5")),
      tambah("sepuluh,", busur("b2", xl(5), xl(10), 118, 28), ...tanda("t10", xl(10), 120, "10")),
      tambah("belas.", busur("b3", xl(10), xl(15), 118, 28), ...tanda("t15", xl(15), 120, "15")),
    ),
    k(
      SUARA_L3,
      hapus(0, "jl"),
      tambah("menambah", teks("q1", 70, 100, "+5", 11, W.hijau), teks("q2", 150, 100, "+5", 11, W.hijau), teks("q3", 230, 100, "+5", 11, W.hijau)),
      tambah("sama", teks("sb", 150, 76, "sama besar", 11, W.hijau)),
      tambah("besar.", emo("ok", 150, 52, E.benar, 20)),
    ),
    k(
      SUARA_L4,
      hapus(0, "ok"),
      tambah("pengali,", teks("bl", 150, 52, "3 lompatan", 11, W.merah)),
      sorotkan("terakhir", "t15", "t15-n"),
      tambah("hasilnya.", teks("hs", 150, 182, "3 × 5 = 15", 18, W.merah)),
    ),
  ],
};

/* ------------------------------ Skip Counting: terapan ------------------------------ */
const SUARA_P1 = "Raka melompat tiga-tiga: tiga, enam, sembilan, dua belas, lima belas.";
const SUARA_P2 = "Lima lompatan sebesar tiga, jadi lima belas.";
const SUARA_P3 = "Cocok untuk mengingat perkalian dengan bilangan kecil.";
const SUARA_P4 = "Kurang cocok untuk bilangan besar, karena lompatannya terlalu banyak.";

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Skip Counting: lompat tiga-tiga Raka",
  sumber: "Metode global: Skip Counting (terapan)",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Lompat Tiga-Tiga"), garisBilangan("gb", 30, 270, 120), ...tanda("t0", xl(0), 120, "0", 10, W.biru)),
      tambah("Raka", ...tokoh("rk", 40, 184, "Raka")),
      tambah("tiga@2", busur("b1", xl(0), xl(3), 118, 20), ...tanda("t3", xl(3), 120, "3")),
      tambah("enam,", busur("b2", xl(3), xl(6), 118, 20), ...tanda("t6", xl(6), 120, "6")),
      tambah("sembilan,", busur("b3", xl(6), xl(9), 118, 20), ...tanda("t9", xl(9), 120, "9")),
      tambah("dua", busur("b4", xl(9), xl(12), 118, 20), ...tanda("t12", xl(12), 120, "12")),
      tambah("lima", busur("b5", xl(12), xl(15), 118, 20), ...tanda("t15", xl(15), 120, "15")),
    ),
    k(
      SUARA_P2,
      tambah("Lima", teks("l5", 150, 52, "5 lompatan", 11, W.merah)),
      tambah("sebesar", ...[0, 1, 2, 3, 4].map((i) => teks(`p${i}`, xl(1.5 + i * 3), 100, "+3", 10, W.hijau))),
      tambah("tiga,", teks("pg", 150, 76, "tiap lompatan 3", 9, W.hijau)),
      tambah("belas.", teks("hs", 182, 168, "5 × 3 = 15", 18, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150), ...tokoh("rk", 40, 184, "Raka")),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("perkalian", ...[3, 6, 9, 12, 15].flatMap((v, i) => kartu(`kr${i}`, 36 + i * 50, 70, 40, 34, W.krem, [String(v)], 15))),
      tambah("kecil.", teks("kc", 150, 128, "bilangan kecil", 11, W.hijau)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150), garisBilangan("gb", 14, 286, 120)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("besar,", teks("bs", 150, 70, "bilangan besar: 96", 11, W.merah)),
      tambah("lompatannya", ...Array.from({ length: 12 }, (_, i) => busur(`bj${i}`, 14 + i * 22.6, 14 + (i + 1) * 22.6, 118, 10))),
      tambah("terlalu", emo("pz", 150, 172, E.pusing, 24)),
      tambah("banyak.", teks("tb", 150, 148, "terlalu banyak lompatan", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung barangnya.";
const SUARA_R2 = "Barang dikemas dalam kotak, pakai Isi Sama. Barang bisa dijajarkan, pakai Susunan Baris Kolom.";
const SUARA_R3 = "Ingin menghafal, pakai Lompat Hitung. Apa pun caranya, isi tiap bagian harus sama dan hasilnya selalu tepat.";
const SUARA_R4 = "Menurutmu, untuk menghitung botol di rak, cara mana yang paling cepat?";

const RING_BOTOL: Obj[] = [0, 1, 2].flatMap((r) => Array.from({ length: 7 }, (_, c) => benda(`rb${r}_${c}`, 86 + c * 20, 64 + r * 33, "botol", 4.4)).flat());

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara menghitung",
  sumber: "Metode global: ringkasan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Pilih yang Pas")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("cara", ...kartu("r0", 14, 54, 88, 40, W.langit, ["Isi Sama"], 9.4), ...kartu("r1", 106, 54, 88, 40, W.hijauMuda, ["Susunan", "Baris Kolom"], 9.4), ...kartu("r2", 198, 54, 88, 40, W.pink, ["Lompat", "Hitung"], 9.4)),
      tambah("Mana", emo("tq", 150, 136, E.tanya, 36)),
    ),
    k(
      SUARA_R2,
      sorotkan("Isi", "r0-k"),
      tambah("Isi", ...[0, 1, 2].flatMap((i) => kotakIsi2(`ri${i}`, 24 + i * 22))),
      sorotkan("Susunan", "r1-k"),
      ubah("Susunan", { id: "r0-k", sorot: false }),
      tambah("Susunan", ...[0, 1, 2, 3, 4, 5].flatMap((i) => benda(`rs${i}`, 126 + (i % 3) * 16, 116 + Math.floor(i / 3) * 16, "kaleng", 5))),
    ),
    k(
      SUARA_R3,
      sorotkan("Lompat", "r2-k"),
      ubah("Lompat", { id: "r1-k", sorot: false }),
      tambah("Lompat", garisBilangan("rg", 206, 278, 120), busur("rj1", 206, 230, 118, 14), busur("rj2", 230, 254, 118, 14), busur("rj3", 254, 278, 118, 14)),
      tambah("sama", teks("sm", 150, 176, "isi tiap bagian sama", 10, W.hijau)),
      tambah("tepat.", emo("ok", 262, 176, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Mana yang Paling Cepat?"), ...rakKayu("rk", 60, 40, 180, 100, 3)),
      tambah("botol", ...RING_BOTOL),
      tambah("cara", ...kartu("p0", 14, 150, 88, 36, W.langit, ["Isi Sama"], 9), ...kartu("p1", 106, 150, 88, 36, W.hijauMuda, ["Susunan Baris", "Kolom"], 8.4), ...kartu("p2", 198, 150, 88, 36, W.pink, ["Lompat Hitung"], 9)),
      tambah("cepat?", emo("tg", 150, 34, E.pikir, 26)),
    ),
  ],
};

/** Kotak kecil berisi dua titik telur untuk ikon ringkasan: `${id}` dan `${id}-e0`, `${id}-e1`. */
function kotakIsi2(id: string, x: number): Obj[] {
  return [
    { id, t: "kotak", x, y: 112, w: 18, h: 13, warna: "#E9C98E", garis: "#A97B3F", rx: 3, tebal: 1.2, z: 1 },
    { id: `${id}-e0`, t: "bulat", x: x + 5.5, y: 118.5, r: 3, warna: "#D9A066", garis: "#8A4B1F", tebal: 0.8, z: 3 },
    { id: `${id}-e1`, t: "bulat", x: x + 12.5, y: 118.5, r: 3, warna: "#D9A066", garis: "#8A4B1F", tebal: 0.8, z: 3 },
  ];
}
