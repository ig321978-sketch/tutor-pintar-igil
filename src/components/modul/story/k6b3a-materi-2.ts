import type { AdeganStory } from "./logika-story";
import { BAHAN, W, balokIso, emo, kotak, panah, susunKubus, teks } from "./k6b3a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b3a-bantu";

const P = (ox: number, oy: number, s = 20) => ({ s, ox, oy });
type Sel = [number, number, number][];

/* ------------------------------ 4. Eksplorasi 3.1: dua dan tiga kubus (hlm. 81 dan 82; Buku Panduan Guru hlm. 92 sampai 94) ------------------------------ */
const PASANG_A: Sel = [[0, 0, 0], [1, 0, 0]];
const PASANG_B: Sel = [[0, 0, 0], [0, 0, 1]];
const PASANG_C: Sel = [[0, 0, 0], [0, 1, 0]];
const LURUS: Sel = [[0, 0, 0], [1, 0, 0], [2, 0, 0]];
const SIKU: Sel = [[0, 0, 0], [1, 0, 0], [0, 1, 0]];
const SIKU_TEGAK: Sel = [[0, 0, 0], [1, 0, 0], [0, 0, 1]];
const MENARA: Sel = [[0, 0, 0], [0, 0, 1], [0, 0, 2]];

export const ADEGAN_EKSPLORASI31: AdeganStory = {
  id: "eksplorasi-31",
  judul: "Eksplorasi 3.1: menyusun dua dan tiga kubus",
  sumber: "Buku Siswa hlm. 81–82; Buku Panduan Guru hlm. 92–94",
  latar: "#FFF7ED",
  kutipan: ["Siapkan benda berbentuk kubus yang sama ukurannya", "Gambar (a) dan (c) sesungguhnya adalah susunan yang sama", "Gunakan tiga kubus"],
  ketukan: [
    k(
      "Eksplorasi 3.1. Siapkan kubus-kubus yang sama ukurannya. Mulai dengan dua kubus, yang boleh disusun berdampingan atau ditumpuk.",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 3.1", 13, W.ungu)),
      tambah("kubus-kubus", susunKubus("p", P(150, 90), [[0, 0, 0]], BAHAN.oranye).objs),
      hapus("dua", "p0-a", "p0-l", "p0-r"),
      tambah("dua", susunKubus("q", P(80, 96, 24), [[0, 0, 0]], BAHAN.oranye).objs, susunKubus("r", P(220, 96, 24), [[0, 0, 0]], BAHAN.oranye).objs),
      hapus("berdampingan", "q0-a", "q0-l", "q0-r"),
      tambah("berdampingan", susunKubus("qq", P(64, 96, 24), [[0, 0, 0], [1, 0, 0]], BAHAN.oranye).objs, teks("t1", 80, 160, "berdampingan", 10, W.hijau)),
      hapus("ditumpuk.", "r0-a", "r0-l", "r0-r"),
      tambah("ditumpuk.", susunKubus("rr", P(220, 112, 24), [[0, 0, 0], [0, 0, 1]], BAHAN.oranye).objs, teks("t2", 220, 160, "ditumpuk", 10, W.hijau)),
    ),
    k(
      "Gambar a dan gambar c sesungguhnya susunan yang sama, hanya dipandang dari arah berbeda. Apakah gambar b juga susunan yang sama?",
      bersih(0),
      tambah("a", susunKubus("a", P(54, 100), PASANG_A, BAHAN.oranye).objs, teks("la", 70, 40, "a", 12, W.ungu)),
      tambah("c", susunKubus("c", P(234, 100), PASANG_C, BAHAN.oranye).objs, teks("lc", 252, 40, "c", 12, W.ungu)),
      tambah("sama,", teks("sm", 150, 160, "sama, dilihat dari arah berbeda", 9.4, W.hijau)),
      tambah("b", susunKubus("b", P(150, 112), PASANG_B, BAHAN.oranye).objs, teks("lb", 150, 40, "b", 12, W.ungu)),
      tambah("juga", teks("qq", 150, 190, "sama juga?", 14, W.merah)),
    ),
    k(
      "Ternyata ya. Ketiganya sama-sama dua kubus yang menempel pada satu sisi, jadi cukup dianggap satu bentuk saja.",
      redamkan(0, "qq"),
      ubah("Ketiganya", { id: "qq", isi: "ketiganya satu bentuk", warna: W.hijau, u: 12 }),
      sorotkan("kubus", ...["a", "b", "c"].flatMap((p) => [`${p}0-a`, `${p}1-a`])),
      tambah("satu@2", emo("cek", 28, 196, "✅", 18)),
    ),
    k(
      "Sekarang tiga kubus untuk bangunan satu lantai. Ada dua kemungkinan: tiga kubus berjejer, atau dua kubus berjejer dan satu kubus lagi di belakangnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "tiga kubus, satu lantai", 12, W.ungu)),
      tambah("berjejer,", susunKubus("u", P(60, 100), LURUS, BAHAN.biru).objs, teks("tu", 80, 158, "berjejer", 9.4, W.hijau)),
      tambah("atau", teks("at", 150, 130, "atau", 11)),
      tambah("belakangnya.", susunKubus("v", P(200, 102), SIKU, BAHAN.hijau).objs, teks("tv", 225, 158, "dua berjejer + satu di belakang", 8, W.hijau)),
      tambah("dua@2", teks("dua", 150, 190, "dua kemungkinan", 13, W.merah)),
    ),
    k(
      "Bagaimana kalau boleh ada dua lantai? Hasilnya hanya satu bentuk, yaitu bentuk siku tadi yang diputar sehingga ada kubus yang berdiri di atas kubus lain.",
      bersih(0),
      tambah("dua", susunKubus("s", P(70, 104), SIKU, BAHAN.hijau).objs, teks("ts", 90, 160, "siku, satu lantai", 8.6)),
      tambah("diputar", panah("pr", 130, 100, 44, 0, W.merah, 3, { gambar: true }), teks("pt", 152, 90, "diputar", 9, W.merah)),
      tambah("sehingga", susunKubus("w", P(220, 104), SIKU_TEGAK, BAHAN.hijau).objs, teks("tw", 236, 160, "siku, dua lantai", 8.6)),
      tambah("satu", teks("sb", 150, 192, "tetap satu bentuk yang sama", 10, W.hijau)),
    ),
    k(
      "Untuk tiga lantai pun hanya satu bentuk, yaitu tiga kubus berjejer tadi yang ditegakkan. Jadi tiga kubus hanya menghasilkan dua bentuk yang berbeda.",
      bersih(0),
      tambah("tiga", susunKubus("m", P(70, 128), LURUS, BAHAN.biru).objs, teks("tm", 86, 178, "berjejer", 8.6)),
      tambah("ditegakkan.", panah("pm", 126, 112, 44, 0, W.merah, 3, { gambar: true }), susunKubus("n", P(220, 128), MENARA, BAHAN.biru).objs, teks("tn", 220, 172, "tiga lantai", 8.6)),
      tambah("hanya@2", teks("hs", 150, 197, "2 bentuk berbeda: lurus dan siku", 10, W.merah)),
    ),
    k(
      "Catatan dari Buku Panduan Guru: susunan yang menggantung tidak dihitung, karena bangunan seperti itu butuh penyangga tambahan demi keamanan.",
      bersih(0),
      tambah("susunan", susunKubus("x", P(150, 118), [[0, 0, 0], [1, 0, 0]], BAHAN.abu).objs, susunKubus("y", P(150, 118), [[0, 1, 1]], BAHAN.kuning).objs),
      tambah("menggantung", teks("tg", 150, 34, "kubus kuning menggantung", 10, W.merah), emo("sil", 235, 80, "❌", 26)),
      tambah("penyangga", kotak("pny", 160, 135, 22, 22, "#FEF9C3", W.hijau, { rx: 2, putus: true, op: 0.9 }), teks("pt", 150, 178, "butuh penyangga di bawahnya", 9.4, W.hijau)),
      tambah("keamanan.", emo("aman", 40, 190, "🦺", 18)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 3.1: dua balok dan pembahasan (hlm. 82 dan 83; Buku Panduan Guru hlm. 93 sampai 95) ------------------------------ */
const kotakBalok = (id: string, ox: number, oy: number, a: number, b: number, bahan: typeof BAHAN.biru) => balokIso(id, P(ox, oy, 20), 0, 0, 0, a, b, 1, bahan);

export const ADEGAN_BALOK: AdeganStory = {
  id: "dua-balok",
  judul: "Eksplorasi 3.1: dua balok dan pembahasan",
  sumber: "Buku Siswa hlm. 82–83; Buku Panduan Guru hlm. 93–95",
  latar: "#F0FDF4",
  kutipan: ["Selanjutnya gunakan dua balok", "Temukan semua susunan dua balok yang mungkin", "bangun ruang juga dapat digabungkan dan diuraikan", "tembok tersusun atas banyak batu bata"],
  ketukan: [
    k(
      "Selanjutnya gunakan dua balok. Balok-balok itu disusun membentuk bangunan satu tingkat. Apakah susunan a dan susunan b berbeda, atau sama?",
      tambah(0, teks("jud", 150, 22, "dua balok", 13, W.ungu)),
      tambah("dua", ...kotakBalok("bl1", 70, 70, 2, 1, BAHAN.biru), ...kotakBalok("bl2", 150, 70, 2, 1, BAHAN.hijau)),
      tambah("tingkat.", teks("sa", 150, 150, "tiap balok seperti dua kubus berderet", 9, W.hitam)),
      tambah("susunan", teks("la", 70, 190, "a", 14, W.ungu), teks("lb", 230, 190, "b", 14, W.ungu)),
      tambah("sama?", teks("qq", 150, 176, "berbeda atau sama?", 12, W.merah)),
    ),
    k(
      "Susunan a dan b berbeda. Pada a, kedua balok menempel di sisi yang berukuran dua kali satu. Pada b, kedua balok menempel di sisi yang berukuran satu kali satu.",
      bersih(0),
      tambah("Pada", susunKubus("a", P(76, 96), [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]], (n) => (n < 2 ? BAHAN.biru : BAHAN.hijau)).objs, teks("la", 76, 40, "a", 12, W.ungu)),
      tambah("berukuran", teks("sa", 76, 160, "menempel di sisi 2 x 1", 8.6, W.merah)),
      tambah("Pada@2", susunKubus("b", P(150, 86), [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]], (n) => (n < 2 ? BAHAN.biru : BAHAN.hijau)).objs, teks("lb", 230, 40, "b", 12, W.ungu)),
      tambah("satu@2", teks("sb", 230, 160, "menempel di sisi 1 x 1", 8.6, W.merah)),
      tambah("berbeda.", teks("bd", 150, 192, "a dan b: susunan yang berbeda", 10.5, W.hijau)),
    ),
    k(
      "Gambar kedua dan ketiga adalah susunan yang sama dengan a. Bagian yang mendatar menjadi tegak, karena dipandang dari arah yang berbeda.",
      bersih(0),
      tambah("kedua", susunKubus("a", P(60, 100), [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]], (n) => (n < 2 ? BAHAN.biru : BAHAN.hijau)).objs, teks("la", 60, 40, "susunan a", 9.4, W.ungu)),
      tambah("ketiga", susunKubus("c", P(220, 112), [[0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 1]], (n) => (n < 2 ? BAHAN.biru : BAHAN.hijau)).objs, teks("lc", 220, 40, "diputar: berdiri", 9.4, W.ungu)),
      tambah("mendatar", panah("pr", 112, 96, 48, 0, W.merah, 3, { gambar: true })),
      tambah("tegak,", teks("tg", 150, 170, "sama, hanya dipandang berbeda", 10, W.hijau)),
    ),
    k(
      "Saat bereksplorasi, mungkin ada teman yang belum menemukan semua kemungkinan. Lengkapi dengan berdiskusi, dan jelaskan bagaimana kalian menemukan tiap susunan.",
      bersih(0),
      tambah("teman", emo("e1", 70, 86, "🧒", 38), emo("e2", 230, 86, "👧", 38)),
      tambah("belum", balon1("bk", 76, "belum semua", 80)),
      tambah("Lengkapi", panah("lk", 108, 90, 84, 0, W.hijau, 3, { gambar: true }), panah("lk2", 192, 96, -84, 0, W.hijau, 3, { gambar: true })),
      tambah("jelaskan", balon1("jl", 202, "caraku begini", 84)),
      tambah("susunan.", teks("ss", 150, 168, "saling membandingkan hasil", 10, W.ungu)),
    ),
    k(
      "Bandingkan kubus dan balok. Keduanya sama-sama dapat digabungkan dan diuraikan. Bedanya, pada balok kita harus memperhatikan sisi mana yang disambungkan.",
      bersih(0),
      tambah("kubus", kotak("kb", 20, 38, 120, 100, "#DBEAFE", W.biru, { rx: 10 }), teks("kbt", 80, 56, "kubus", 11, W.biru), ...susunKubus("k", P(80, 120), [[0, 0, 0]], BAHAN.oranye).objs),
      tambah("balok.", kotak("bk", 160, 38, 120, 100, "#DCFCE7", W.hijau, { rx: 10 }), teks("bkt", 220, 56, "balok", 11, W.hijau), ...kotakBalok("b", 214, 112, 2, 1, BAHAN.hijau)),
      tambah("Keduanya", teks("sm", 150, 166, "sama: dapat digabung dan diurai", 9.6, W.hijau)),
      tambah("Bedanya,", teks("bd", 150, 190, "beda: balok, perhatikan sisi sambungan", 9.4, W.merah)),
    ),
    k(
      "Pembahasan buku: sama seperti bangun datar, bangun ruang juga dapat digabungkan dan diuraikan. Ingatlah bahwa tembok tersusun atas banyak batu bata.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Pembahasan", 12, W.ungu)),
      tambah("digabungkan", ...[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => kotak(`bt${r}${c}`, 70 + c * 40 + (r % 2) * 20, 130 - r * 20, 38, 18, "#FCA5A5", W.merah, { rx: 1, tebal: 1 })))),
      tambah("diuraikan.", ...[0, 1, 2].map((i) => emo(`bb${i}`, 86 + i * 64, 50, "🧱", 24))),
      tambah("tembok", teks("tk", 150, 176, "tembok tersusun dari banyak batu bata", 9.6, W.hitam)),
      sorotkan("batu", "bt00", "bt01", "bt02", "bt03"),
    ),
  ],
};

function balon1(id: string, cx: number, isi: string, lebar: number) {
  return [kotak(`${id}-k`, cx - lebar / 2, 126, lebar, 20, W.putih, W.biru, { rx: 6 }), teks(`${id}-t`, cx, 140, isi, 7.8)];
}
