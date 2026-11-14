import type { AdeganStory, Obj } from "./logika-story";
import { BANGUN_LATIHAN, W, emo, garis, geser, judul, kartu, kotak, bingkai, panah, patokanDi, penandaSiku, poligon, skala, tabel, teks, titikPenggaris, type Titik } from "./k5b6a-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b6a-bantu";
import { bangun, lencana } from "./k5b6a-materi-3";
import { POJOK_BINGKAI } from "./k5b6a-materi-2";

/** Bangun Ayo Berlatih ke-i (0 sampai 5) diperbesar `s` kali dan berpusat di (cx, cy). */
export function taruh(i: number, s: number, cx: number, cy: number): Titik[] {
  const p = skala(BANGUN_LATIHAN[i], s);
  const xs = p.map((t) => t[0]);
  const ys = p.map((t) => t[1]);
  return geser(p, cx - (Math.min(...xs) + Math.max(...xs)) / 2, cy - (Math.min(...ys) + Math.max(...ys)) / 2);
}

/** Tanda silang di luar titik sudut ke-vi sebuah bangun bertitik mutlak p. */
export function silangDi(id: string, p: Titik[], vi: number): Obj {
  const mx = p.reduce((t, q) => t + q[0], 0) / p.length;
  const my = p.reduce((t, q) => t + q[1], 0) / p.length;
  const v = p[vi];
  const d = Math.hypot(v[0] - mx, v[1] - my) || 1;
  return teks(id, v[0] + ((v[0] - mx) / d) * 11, v[1] + ((v[1] - my) / d) * 11 + 3.5, "✗", 10, W.merah);
}

/** Patokan siku-siku berwarna jingga di titik sudut vi bangun p. Id memuat "pkP" bila pas (sudut 90) dan "pkG" bila ada celah, dipakai uji. */
export const patokan = (id: string, p: Titik[], vi: number, a = 34, b = 30): Obj => poligon(id, 0, 0, patokanDi(p, vi, a, b), W.jingga, W.coklat, { op: 0.75, tebal: 1.4 });

/** Garis penunjuk siku-siku di titik sudut vi bangun p. */
export const tandaDi = (id: string, p: Titik[], vi: number, s = 8): Obj => penandaSiku(id, p, vi, s);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const NAMA_METODE = ["Right Angle Benchmark", "Paper Fold Benchmark", "Angle Detective", "Quarter-Turn Test"];
const WARNA4 = [W.hijauMuda, W.langit, W.krem, W.pink];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Metode luar Subbab A: empat cara dan contoh bersama",
  sumber: "Metode luar · pembuka dan contoh bersama dari Buku Siswa hlm. 169",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ini video metode dari luar untuk Subbab A. Empat metode akan kita pakai: Right Angle Benchmark, Paper Fold Benchmark, Angle Detective, dan Quarter-Turn Test.",
      tambah(0, judul("Metode luar Subbab A")),
      ...NAMA_METODE.map((n, i) => tambah([13, 16, 19, 22][i], ...kartu(`lm${i}`, 10 + (i % 2) * 144, 40 + Math.floor(i / 2) * 44, 136, 34, WARNA4[i], [n], 8.6))),
      tambah("Subbab", teks("sa", 150, 160, "empat cara mengenali sudut siku-siku", 9.4, W.ungu)),
    ),
    k(
      "Semua contoh memakai enam bangun dari Ayo Berlatih di Buku Siswa halaman seratus enam puluh sembilan.",
      bersih(0),
      tambah(0, judul("Enam bangun dari buku")),
      tambah("enam", ...[0, 1, 2, 3, 4, 5].flatMap((i) => [bangun(i), ...lencana(i)])),
    ),
    k(
      "Untuk setiap metode, pertanyaannya sama: berapa sudut siku-siku pada tiap bangun? Metode boleh berbeda, tetapi kuncinya harus sama, yaitu empat, dua, nol, nol, empat, dan dua.",
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("pertanyaannya", ...kartu("pq", 20, 40, 260, 36, W.krem, ["Berapa sudut siku-siku pada tiap bangun?"], 9.6)),
      tambah("kuncinya", ...tabel("kj", 13, 100, [64, 36, 36, 36, 36, 36, 36], [["No.", "1", "2", "3", "4", "5", "6"], ["Kunci", "4", "2", "0", "0", "4", "2"]], 30, 10)),
    ),
    k(
      "Jadi, kita tidak menebak. Setiap metode harus bisa menunjukkan alasannya, lewat patokan, lipatan, catatan, atau putaran. Mari kita mulai dari metode pertama.",
      bersih(0),
      tambah(0, judul("Siap mencoba empat cara")),
      ...NAMA_METODE.map((n, i) => tambah([11, 12, 13, 15][i], ...kartu(`lq${i}`, 20, 38 + i * 36, 260, 28, WARNA4[i], [`${i + 1}. ${n}`], 9))),
      sorotkan("pertama.", "lq0-k", "lq0-t0"),
    ),
  ],
};

/* ------------------------------ 2. Right Angle Benchmark: konsep ------------------------------ */
const PENGGARIS: Titik[] = geser(titikPenggaris(70, 60), 50, 150);
const POJOK_PAS: Titik[] = geser([[0, 0], [70, 0], [0, -60]], 30, 150);
const POJOK_CELAH: Titik[] = geser([[0, 0], [80, 0], [-26, -56]], 170, 150);

export const ADEGAN_LUAR_BENCHMARK: AdeganStory = {
  id: "luar-benchmark",
  judul: "Right Angle Benchmark: patokan sudut siku-siku",
  sumber: "Metode luar · Right Angle Benchmark",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Right Angle Benchmark. Benchmark artinya patokan. Kita siapkan satu sudut siku-siku yang sudah pasti, lalu membandingkan sudut lain dengannya.",
      tambah(0, judul("Right Angle Benchmark")),
      tambah("artinya", teks("ar", 150, 40, "benchmark = patokan", 10, W.hijau)),
      tambah("siapkan", poligon("pkP0", 0, 0, PENGGARIS, W.jingga, W.coklat), penandaSiku("pt1", PENGGARIS, 0, 9), teks("pt", 90, 176, "patokan siku-siku", 9, W.coklat)),
      tambah("membandingkan", poligon("sd", 220, 150, [[0, 0], [60, 0], [-20, -52]], W.putih), teks("sdt", 230, 176, "sudut yang diperiksa", 9, W.biru)),
      tambah("dengannya.", panah("pn", 140, 120, 56, 0, W.merah, 3, { gambar: true })),
    ),
    k(
      "Cara kerjanya tiga langkah. Satu, letakkan patokan di pojok yang diperiksa. Dua, rapatkan satu sisi patokan pada satu sisi pojok. Tiga, lihat sisi patokan yang satunya.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("Satu,", ...kartu("l1", 14, 36, 272, 40, W.krem, ["1. Letakkan patokan di pojok", "yang diperiksa"], 8.8)),
      tambah("Dua,", ...kartu("l2", 14, 84, 272, 40, W.langit, ["2. Rapatkan satu sisi patokan", "pada satu sisi pojok"], 8.8)),
      tambah("Tiga,", ...kartu("l3", 14, 132, 272, 40, W.hijauMuda, ["3. Lihat sisi patokan", "yang satunya"], 8.8)),
    ),
    k(
      "Kalau sisi satunya juga pas, pojok itu siku-siku. Kalau ada celah, pojok itu bukan siku-siku.",
      bersih(0),
      tambah(0, judul("Pas atau ada celah")),
      tambah("pas,", poligon("sdA", 0, 0, POJOK_PAS, W.putih), poligon("pkP1", 0, 0, patokanDi(POJOK_PAS, 0, 48, 42), W.jingga, W.coklat, { op: 0.75 })),
      tambah("siku-siku.", teks("ya", 65, 178, "pas: siku-siku", 9.6, W.hijau)),
      tambah("celah,", poligon("sdB", 0, 0, POJOK_CELAH, W.putih), poligon("pkG1", 0, 0, patokanDi(POJOK_CELAH, 0, 48, 42), W.jingga, W.coklat, { op: 0.75 })),
      tambah("bukan", teks("tidak", 205, 178, "celah: bukan siku-siku", 9.6, W.merah)),
    ),
    k(
      "Kelebihannya, patokan yang sama bisa dipakai berulang pada semua pojok. Syaratnya, patokan itu sendiri harus benar-benar siku-siku.",
      bersih(0),
      tambah(0, judul("Kelebihan dan syarat")),
      tambah("Kelebihannya,", ...kartu("kl", 20, 44, 260, 44, W.hijauMuda, ["Kelebihan:", "satu patokan untuk semua pojok"], 9)),
      tambah("Syaratnya,", ...kartu("sy", 20, 106, 260, 44, W.krem, ["Syarat:", "patokan harus benar-benar siku-siku"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Right Angle Benchmark: contoh dari buku ------------------------------ */
const BINGKAI_PENGGARIS = patokanDi(POJOK_BINGKAI, 3, 50, 40);
const B2 = taruh(1, 2.2, 150, 100);
const B3 = taruh(2, 2, 150, 100);
const B5 = taruh(4, 1.8, 150, 98);

export const ADEGAN_LUAR_BENCHMARK_TERAPAN: AdeganStory = {
  id: "luar-benchmark-terapan",
  judul: "Right Angle Benchmark: contoh dari buku",
  sumber: "Metode luar · Right Angle Benchmark, contoh bingkai dan Ayo Berlatih nomor 2, 3, 5",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Kita terapkan pada bingkai di buku. Patokan kita ambil dari penggaris siku-siku. Pojok kiri bawah bingkai: sisi kiri dan sisi bawah sama-sama pas, jadi siku-siku.",
      tambah(0, judul("Patokan di pojok bingkai")),
      tambah(0, ...bingkai("bf", 80, 50, 140, 100)),
      tambah("penggaris", poligon("pkP2", 0, 0, BINGKAI_PENGGARIS, W.jingga, W.coklat, { op: 0.8 })),
      tambah("pas,", penandaSiku("bm", POJOK_BINGKAI, 3, 12), teks("ok", 150, 178, "pas: siku-siku", 9.8, W.hijau)),
    ),
    k(
      "Sekarang nomor dua. Di pojok kiri bawah patokan pas, jadi siku-siku. Di pojok kiri atas sisinya miring, ada celah, jadi bukan siku-siku.",
      bersih(0),
      tambah(0, judul("Nomor 2")),
      tambah(0, poligon("bg2", 0, 0, B2, W.hijauMuda)),
      tambah("bawah", poligon("pkP3", 0, 0, patokanDi(B2, 5, 38, 38), W.jingga, W.coklat, { op: 0.75 }), penandaSiku("bm2", B2, 5, 11)),
      tambah("atas", poligon("pkG3", 0, 0, patokanDi(B2, 0, 38, 38), W.jingga, W.coklat, { op: 0.75 }), teks("cl", 56, 80, "celah", 9, W.merah)),
      tambah("bukan", teks("ts", 150, 176, "dua pojok bawah pas: 2", 9.6, W.hijau)),
    ),
    k(
      "Nomor tiga, belah ketupat. Patokan diletakkan di pojok mana pun, selalu ada celah. Jadi tidak ada sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Nomor 3")),
      tambah(0, poligon("bg3", 0, 0, B3, W.krem)),
      tambah("Patokan", poligon("pkG4", 0, 0, patokanDi(B3, 0, 36, 32), W.jingga, W.coklat, { op: 0.75 })),
      tambah("selalu", silangDi("x30", B3, 0), silangDi("x31", B3, 1), silangDi("x32", B3, 2), silangDi("x33", B3, 3)),
      tambah("tidak", teks("nl", 150, 186, "0 sudut siku-siku", 9.6, W.merah)),
    ),
    k(
      "Nomor lima, persegi yang miring. Patokan ikut diputar mengikuti pojoknya. Di setiap pojok sisinya pas, jadi ada empat sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Nomor 5")),
      tambah(0, poligon("bg5", 0, 0, B5, W.jingga)),
      tambah("Patokan", poligon("pkP5", 0, 0, patokanDi(B5, 0, 34, 34), W.hijauMuda, W.coklat, { op: 0.8 })),
      tambah("setiap", penandaSiku("bm50", B5, 0, 10), penandaSiku("bm51", B5, 1, 10)),
      tambah("pas,", penandaSiku("bm52", B5, 2, 10), penandaSiku("bm53", B5, 3, 10)),
      tambah("empat", teks("em", 150, 188, "4 sudut siku-siku", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Paper Fold Benchmark: konsep ------------------------------ */
const LIPAT_AKHIR: Titik[] = [[0, 0], [78, 0], [82, -30], [68, -58], [0, -66]];

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Paper Fold Benchmark: patokan dari kertas lipat",
  sumber: "Metode luar · Paper Fold Benchmark",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Paper Fold Benchmark. Patokannya kita buat sendiri dengan melipat kertas, tanpa penggaris khusus.",
      tambah(0, judul("Paper Fold Benchmark")),
      tambah("Patokannya", emo("ks", 90, 100, "📄", 50)),
      tambah("melipat", panah("pn", 122, 98, 50, 0, W.hijau, 3, { gambar: true }), poligon("lt", 190, 130, LIPAT_AKHIR, W.putih)),
      tambah("khusus.", penandaSiku("pm", geser(LIPAT_AKHIR, 190, 130), 0, 11), teks("lb", 230, 160, "patokan buatan sendiri", 8.6, W.biru)),
    ),
    k(
      "Ambil kertas apa saja, lalu lipat sekali. Lipat lagi sampai tepi lipatan pertama menumpuk pada dirinya sendiri. Lipatan kedua itu tegak lurus pada yang pertama.",
      bersih(0),
      tambah(0, judul("Dua kali lipat")),
      tambah("kertas", poligon("sh", 30, 40, [[0, 0], [116, 5], [112, 80], [3, 76]], W.putih)),
      tambah("sekali.", garis("f1", 20, 80, 136, 0, W.merah, 2.4, { putus: true, gambar: true }), teks("t1", 88, 142, "lipatan pertama", 8.6, W.merah)),
      tambah("lagi", garis("f2", 90, 36, 0, 84, W.ungu, 2.4, { putus: true, gambar: true })),
      tambah("tegak", poligon("lt", 190, 130, LIPAT_AKHIR, W.putih), penandaSiku("pm", geser(LIPAT_AKHIR, 190, 130), 0, 11), teks("t2", 232, 154, "siku-siku", 9, W.hijau)),
    ),
    k(
      "Kelebihannya, murah dan bisa dibuat di mana saja, bahkan dari kertas bekas. Pojok lipatan kita tempelkan pada pojok benda, seperti memakai penggaris siku-siku.",
      bersih(0),
      tambah(0, judul("Kelebihan lipatan kertas")),
      tambah("murah", ...kartu("kb", 20, 44, 120, 40, W.hijauMuda, ["murah dan", "mudah dibuat"], 9)),
      tambah("kertas", ...kartu("kp", 160, 44, 120, 40, W.hijauMuda, ["bisa dari", "kertas bekas"], 9)),
      tambah("tempelkan", poligon("lt", 90, 160, LIPAT_AKHIR.map(([a, b]): Titik => [a * 0.7, b * 0.7]), W.putih), kotak("bd", 90, 110, 110, 50, W.langit, W.biru, { rx: 0 })),
    ),
    k(
      "Hati-hati, satu sisi lipatan harus berimpit dengan satu sisi benda. Lipatan juga harus rapi, supaya patokannya tetap siku-siku.",
      bersih(0),
      tambah(0, judul("Hati-hati")),
      tambah("berimpit", kotak("bd", 30, 50, 100, 70, W.langit, W.biru, { rx: 0 }), poligon("lt", 30, 120, LIPAT_AKHIR.map(([a, b]): Titik => [a * 0.8, b * 0.8]), W.putih), teks("ok", 80, 148, "sisi berimpit: benar", 9, W.hijau)),
      tambah("rapi,", poligon("rp", 176, 120, [[0, 0], [60, 0], [64, -26], [52, -48], [-10, -54]], W.putih), teks("sl", 216, 148, "lipatan miring: salah", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Paper Fold Benchmark: contoh dari buku ------------------------------ */
const L5 = taruh(4, 1.8, 150, 100);
const L6 = taruh(5, 2.2, 150, 100);
const L3 = taruh(2, 2, 150, 100);
const kertasDi = (id: string, p: Titik[], vi: number): Obj => poligon(id, 0, 0, patokanDi(p, vi, 32, 30), W.putih, W.coklat, { op: 0.9, tebal: 1.6 });

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Paper Fold Benchmark: contoh dari buku",
  sumber: "Metode luar · Paper Fold Benchmark, contoh Ayo Berlatih nomor 5, 6, 3",
  latar: "#E0F2FE",
  ketukan: [
    k(
      "Terapkan pada nomor lima, persegi yang miring. Lipatan kertas kita tempelkan di pojok pertama. Kedua sisinya berimpit, jadi pojok itu siku-siku.",
      tambah(0, judul("Nomor 5 dengan kertas lipat")),
      tambah(0, poligon("bg5", 0, 0, L5, W.jingga)),
      tambah("tempelkan", kertasDi("pkP6", L5, 0)),
      tambah("berimpit,", penandaSiku("bm60", L5, 0, 10)),
    ),
    k(
      "Putar kertas ke pojok berikutnya, dan berikutnya lagi. Keempat pojok pas, jadi nomor lima punya empat sudut siku-siku.",
      tambah("berikutnya,", kertasDi("pkP7", L5, 1), penandaSiku("bm61", L5, 1, 10)),
      tambah("lagi.", kertasDi("pkP8", L5, 2), penandaSiku("bm62", L5, 2, 10), kertasDi("pkP9", L5, 3), penandaSiku("bm63", L5, 3, 10)),
      tambah("empat@2", teks("em", 150, 190, "4 sudut siku-siku", 9.6, W.hijau)),
    ),
    k(
      "Nomor enam. Kertas pas di dua pojok bawah. Di pojok kiri atas kertas tidak pas, ada celah di bawah sisi miring. Jadi dua sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Nomor 6 dengan kertas lipat")),
      tambah(0, poligon("bg6", 0, 0, L6, W.merahMuda)),
      tambah("bawah.", kertasDi("pkP10", L6, 3), penandaSiku("bm64", L6, 3, 10), kertasDi("pkP11", L6, 2), penandaSiku("bm65", L6, 2, 10)),
      tambah("atas", kertasDi("pkG6", L6, 0), teks("cl", 62, 92, "celah", 9, W.merah)),
      tambah("Jadi", teks("dd", 150, 190, "2 sudut siku-siku", 9.6, W.hijau)),
    ),
    k(
      "Pada nomor tiga, belah ketupat, kertas lipat di pojok mana pun selalu menyisakan celah. Hasilnya nol, sama dengan kunci buku.",
      bersih(0),
      tambah(0, judul("Nomor 3 dengan kertas lipat")),
      tambah(0, poligon("bg3", 0, 0, L3, W.krem)),
      tambah("pojok", kertasDi("pkG7", L3, 1)),
      tambah("celah.", silangDi("x30", L3, 0), silangDi("x31", L3, 1), silangDi("x32", L3, 2), silangDi("x33", L3, 3)),
      tambah("nol,", teks("nl", 150, 190, "0 sudut siku-siku", 9.6, W.merah)),
    ),
  ],
};
