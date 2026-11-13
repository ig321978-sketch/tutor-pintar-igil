import type { AdeganStory, Obj } from "./logika-story";
import { ANIKE, W, emo, kartu, kotak, matriks, panah, susunanIso, tampak, teks } from "./k6b3b-gambar";
import { bersih, k, redamkan, sorotkan, tambah } from "./k6b3b-bantu";

const ambil = (objs: Obj[], ...ids: string[]) => objs.filter((o) => ids.includes(o.id));
const T_DEPAN = [".h.", "bmk"];

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string) => [kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }), ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 22 + i * 12, b, 8.6)), teks(`${id}-a`, x + 67, y + 26 + baris.length * 12, arti, 7, W.ungu)];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb3-pembuka",
  judul: "Empat metode luar untuk melihat dan menggambar tampak",
  sumber: "Metode dari luar buku; contoh dari Buku Siswa hlm. 85–90",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas metode dari luar buku untuk Sub-Bab B. Metode ini membantu kita membaca dan menggambar tampak bangun ruang dengan lebih rapi.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Sub-Bab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Sub-Bab B", 9)),
      tambah("rapi.", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Ada empat metode luar. Pertama, Orthographic Projection, yaitu memproyeksikan bangun ruang secara tegak lurus ke bidang gambar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah("Orthographic", kartuMetode("m1", 10, 30, "#FDE68A", ["Orthographic", "Projection"], "proyeksi tegak lurus")),
    ),
    k(
      "Kedua, Height-Matrix Silhouette, yaitu menuliskan tinggi tumpukan kubus pada tiap sel lantai, lalu membaca siluetnya dari matriks itu.",
      tambah("Height-Matrix", kartuMetode("m2", 156, 30, "#FBCFE8", ["Height-Matrix", "Silhouette"], "tulis tinggi tiap sel")),
    ),
    k(
      "Ketiga, Occlusion Max Rule: dari satu arah, yang terlihat adalah tinggi maksimum, sebab kubus yang segaris saling menutupi. Keempat, Reconstruction from Views, yaitu menyusun kembali kubus dari tampaknya.",
      tambah("Occlusion", kartuMetode("m3", 10, 112, "#BBF7D0", ["Occlusion", "Max Rule"], "yang terlihat: maksimum")),
      tambah("Reconstruction", kartuMetode("m4", 156, 112, "#BFDBFE", ["Reconstruction", "from Views"], "susun dari tampak")),
    ),
  ],
};

/* ------------------------------ LB1. Orthographic Projection ------------------------------ */
const sil = (p: string, x: number, y: number, c: number, baris: string[], warna: string): Obj[] => {
  const objs: Obj[] = [];
  baris.forEach((b, r) => [...b].forEach((ch, kk) => ch !== "." && objs.push(kotak(`${p}-${r}${kk}`, x + kk * c, y + r * c, c, c, warna, "#475569", { rx: 1, tebal: 1 }))));
  return objs;
};
const ROW = (id: string, x: number, y: number, isi: string[], warna: string) => kartu(id, x, y, 168, 34, warna, isi, 8.6);

export const ADEGAN_LUAR_PROYEKSI: AdeganStory = {
  id: "luarb3-proyeksi",
  judul: "Orthographic Projection: proyeksi tegak lurus",
  sumber: "Metode dari luar buku; contoh susunan Anike, Buku Siswa hlm. 86",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Orthographic Projection berarti memproyeksikan tegak lurus. Bayangkan sinar sejajar dari satu arah, yang jatuh ke layar di belakang bangun ruang.",
      tambah(0, teks("jud", 150, 22, "Orthographic Projection", 12, W.ungu)),
      tambah("memproyeksikan", tampak("o", 112, 70, 20, T_DEPAN).objs, teks("ot", 142, 140, "benda", 8.5)),
      tambah("sinar", panah("s1", 30, 78, 76, 0, W.merah, 2, { gambar: true }), panah("s2", 30, 98, 76, 0, W.merah, 2, { gambar: true }), panah("s3", 30, 118, 76, 0, W.merah, 2, { gambar: true }), teks("st", 68, 62, "sinar sejajar", 8.5, W.merah)),
      tambah("layar", kotak("ly", 196, 52, 92, 96, "#E2E8F0", "#64748B", { rx: 4 }), sil("bay", 214, 76, 20, T_DEPAN, "#64748B"), teks("lt", 242, 162, "layar: bayangan", 8.5)),
    ),
    k(
      "Setiap proyeksi menghapus satu arah. Tampak depan menghapus kedalaman, tampak kanan menghapus lebar, dan tampak atas menghapus tinggi.",
      bersih(0),
      tambah(0, susunanIso("a", 16, 122, 20, ANIKE).objs),
      tambah("depan", ROW("r1", 118, 34, ["tampak depan", "hilang: kedalaman"], "#BFDBFE")),
      tambah("kanan", ROW("r2", 118, 80, ["tampak kanan", "hilang: lebar"], "#BBF7D0")),
      tambah("atas", ROW("r3", 118, 126, ["tampak atas", "hilang: tinggi"], "#FDE68A")),
    ),
    k(
      "Pada susunan Anike, lebar 3, tinggi 2, dan kedalaman 1. Maka tampak depan berukuran 3 kali 2 kotak, tampak kanan 1 kali 2, dan tampak atas 3 kali 1.",
      bersih(0),
      tambah(0, susunanIso("a", 18, 114, 20, ANIKE).objs),
      tambah("lebar", teks("dl", 60, 160, "lebar 3", 9, W.merah)),
      tambah("tinggi", teks("dt", 32, 60, "tinggi 2", 9, W.merah)),
      tambah("kedalaman", teks("dk", 60, 176, "kedalaman 1", 9, W.merah)),
      tambah("depan", ROW("r1", 120, 34, ["tampak depan", "3 x 2 kotak"], "#BFDBFE")),
      tambah("kanan", ROW("r2", 120, 80, ["tampak kanan", "1 x 2 kotak"], "#BBF7D0")),
      tambah("atas", ROW("r3", 120, 126, ["tampak atas", "3 x 1 kotak"], "#FDE68A")),
    ),
    k(
      "Bedanya dengan foto: pada foto, benda yang lebih jauh tampak lebih kecil. Pada tampak ortografis, ukuran tidak berubah, jadi dua kubus sama besar tetap sama besar.",
      bersih(0),
      tambah("foto:", teks("fj", 78, 34, "foto", 12, W.ungu), kotak("fp", 20, 44, 116, 110, W.putih, W.biru, { rx: 8 })),
      tambah("jauh", kotak("f1", 38, 80, 40, 40, "#FB923C", W.biru, { rx: 2 }), kotak("f2", 90, 92, 24, 24, "#FB923C", W.biru, { rx: 2 }), teks("ft", 78, 142, "jauh: kecil", 8.5, W.merah)),
      tambah("ortografis,", teks("oj", 222, 34, "tampak ortografis", 11, W.ungu), kotak("op", 164, 44, 116, 110, W.putih, W.biru, { rx: 8 })),
      tambah("sama", kotak("o1", 180, 80, 40, 40, "#FB923C", W.biru, { rx: 2 }), kotak("o2", 232, 80, 40, 40, "#FB923C", W.biru, { rx: 2 }), teks("ot", 222, 142, "jauh: tetap sama", 8.5, W.hijau)),
    ),
    k(
      "Karena ukurannya terjaga, gambar teknik memakai tampak depan, samping, dan atas. Lebar dan tinggi dapat dibaca langsung dari gambar, seperti pesan arsitek di buku.",
      bersih(0),
      tambah("teknik", emo("pa", 46, 70, "📐", 34)),
      tambah("depan,", tampak("o", 120, 62, 26, T_DEPAN).objs),
      tambah("Lebar", panah("pl", 120, 142, 78, 0, W.merah, 2.5, { gambar: true }), teks("tl", 159, 160, "lebar", 9, W.merah)),
      tambah("tinggi", panah("pt", 108, 114, 0, -52, W.merah, 2.5, { gambar: true }), teks("tt", 92, 90, "tinggi", 9, W.merah)),
      tambah("langsung", emo("ok", 250, 100, "✅", 28), teks("okt", 250, 120, "terbaca langsung", 8.5, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB2. Height-Matrix Silhouette ------------------------------ */
const MX_CONTOH = matriks("g", 90, 52, 36, [[0, 1, 0], [2, 0, 1]]);
const MX_ANIKE = matriks("m", 150, 80, 36, [[1, 2, 1]]);
const MX_L5 = matriks("m", 100, 44, 34, [[2, 1], [1, 0]]);
const baris = (objs: Obj[], r: number) => objs.filter((o) => o.id.startsWith(`m-${r}`) || o.id.startsWith(`m-n${r}`));
const kolomAnike = (n: number) => ambil(MX_ANIKE.objs, `m-0${n}`, `m-n0${n}`);

export const ADEGAN_LUAR_MATRIKS: AdeganStory = {
  id: "luarb3-matriks",
  judul: "Height-Matrix Silhouette: matriks tinggi",
  sumber: "Metode dari luar buku; contoh Anike (hlm. 86) dan Latihan 3.2 nomor 5 (hlm. 89)",
  latar: "#FFF1F6",
  ketukan: [
    k(
      "Height-Matrix Silhouette: tulis tinggi tumpukan kubus pada tiap sel lantai. Sel yang kosong bertinggi 0. Tabel angka ini kita sebut matriks tinggi.",
      tambah(0, teks("jud", 150, 22, "Height-Matrix Silhouette", 12, W.ungu)),
      tambah("tumpukan", MX_CONTOH.objs),
      tambah("kosong", teks("kt", 150, 148, "sel kosong: tinggi 0", 10, W.merah)),
      sorotkan("kosong", "g-00", "g-02", "g-11"),
      tambah("matriks", teks("mt", 150, 176, "matriks tinggi", 11, W.ungu)),
    ),
    k(
      "Susunan Anike hanya satu baris dan tiga kolom, dengan tinggi 1, 2, dan 1. Kubus hijau yang menumpuk membuat kolom tengah bertinggi 2.",
      bersih(0),
      tambah(0, susunanIso("a", 18, 120, 20, ANIKE).objs, teks("mt", 225, 62, "matriks tinggi", 10, W.ungu)),
      tambah("1,", kolomAnike(0)),
      tambah("2,", kolomAnike(1)),
      tambah("1@2", kolomAnike(2)),
      sorotkan("hijau", "a3-k", "a3-r", "a3-a"),
      redamkan("tengah", "a3-k", "a3-r", "a3-a"),
      tambah("tengah", ubahSorot("m-01")),
    ),
    k(
      "Tampak atas: tandai setiap sel yang tingginya lebih dari 0. Ada 3 sel terisi, jadi tampak atas berupa tiga kotak berjajar.",
      bersih(0),
      tambah(0, MX_ANIKE.objs.map((o) => ({ ...o, y: (o.y ?? 0) - 30 }))),
      tambah("tandai", teks("tz", 150, 100, "tinggi > 0: terisi", 10, W.merah), tampak("t", 150, 112, 36, ["kkk"]).objs),
      tambah("Ada", teks("tj", 150, 176, "3 sel terisi", 13, W.hijau)),
    ),
    k(
      "Tampak depan: ambil tinggi terbesar pada tiap kolom, hasilnya 1, 2, 1, yaitu huruf T. Tampak kanan: ambil tinggi terbesar pada tiap baris, hasilnya 2.",
      bersih(0),
      tambah(0, MX_ANIKE.objs.map((o) => ({ ...o, x: (o.x ?? 0) - 40, y: (o.y ?? 0) - 56 }))),
      tambah("depan", teks("dl", 76, 86, "tampak depan", 9, W.ungu)),
      tambah("1,", tampak("d", 40, 94, 24, [".b.", "bbb"]).objs.filter((o) => o.id === "d-10")),
      tambah("2,", tampak("d", 40, 94, 24, [".b.", "bbb"]).objs.filter((o) => o.id === "d-01" || o.id === "d-11")),
      tambah("1@2", tampak("d", 40, 94, 24, [".b.", "bbb"]).objs.filter((o) => o.id === "d-12")),
      tambah("huruf", teks("hf", 76, 156, "bentuk T", 10, W.merah)),
      tambah("kanan:", teks("kt", 216, 82, "tampak kanan", 9, W.ungu)),
      tambah("2@2", tampak("r", 204, 94, 24, ["h", "h"]).objs),
    ),
    k(
      "Contoh lain: nomor 5 tadi. Baris depan bertinggi 2 dan 1, baris belakang bertinggi 1 dan 0. Tampak depan memakai tinggi terbesar tiap kolom, yaitu 2 dan 1.",
      bersih(0),
      tambah(0, teks("mt", 134, 30, "matriks tinggi, nomor 5", 10, W.ungu)),
      tambah("depan", baris(MX_L5.objs, 0), teks("b0", 92, 66, "depan", 8.5, W.ungu, { anchor: "end" })),
      tambah("belakang", baris(MX_L5.objs, 1), teks("b1", 92, 100, "belakang", 8.5, W.ungu, { anchor: "end" })),
      tambah("terbesar", tampak("v", 204, 60, 26, ["b.", "bb"]).objs, teks("vt", 230, 54, "tampak depan", 8.5, W.ungu)),
    ),
    k(
      "Tampak kanan memakai tinggi terbesar tiap baris: 2 lalu 1. Tampak atas menandai sel terisi, ada 3 sel. Jumlah semua tinggi, 2 tambah 1 tambah 1 tambah 0, adalah 4 kubus.",
      bersih(0),
      tambah(0, MX_L5.objs.map((o) => ({ ...o, x: (o.x ?? 0) - 78, y: (o.y ?? 0) - 8 }))),
      tambah("kanan", tampak("v", 134, 52, 22, ["h.", "hh"]).objs, teks("vt", 156, 46, "tampak kanan", 8.5, W.ungu)),
      tambah("atas", tampak("w", 222, 52, 22, ["k.", "kk"]).objs, teks("wt", 244, 46, "tampak atas", 8.5, W.ungu), teks("wn", 244, 112, "3 sel terisi", 8.5, W.merah)),
      tambah("Jumlah", teks("jm", 150, 160, "2 + 1 + 1 + 0 = 4 kubus", 12, W.merah, { garis: W.emas })),
    ),
  ],
};
function ubahSorot(id: string): Obj[] {
  return ambil(MX_ANIKE.objs, id).map((o) => ({ ...o, warna: "#FDE68A", tebal: 3 }));
}
