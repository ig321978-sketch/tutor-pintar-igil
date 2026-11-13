import type { AdeganStory, Obj } from "./logika-story";
import { ANIKE, CONTOH_A, CONTOH_B, W, emo, kartu, kotak, matriks, panah, susunanIso, tampak, teks } from "./k6b3b-gambar";
import { bersih, hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k6b3b-bantu";

const ambil = (objs: Obj[], ...ids: string[]) => objs.filter((o) => ids.includes(o.id));

/* ------------------------------ LB3. Occlusion Max Rule ------------------------------ */
const MX = matriks("m", 100, 40, 40, [[2, 1], [1, 3]]);
const MX_KECIL = matriks("m", 22, 44, 30, [[2, 1], [1, 3]]);
const TIGA = [".b", "bb", "bb"];

export const ADEGAN_LUAR_OKLUSI: AdeganStory = {
  id: "luarb3-oklusi",
  judul: "Occlusion Max Rule: yang terlihat adalah yang tertinggi",
  sumber: "Metode dari luar buku; contoh Buku Siswa hlm. 86–89",
  latar: "#EFFBF0",
  ketukan: [
    k(
      "Occlusion Max Rule: bila dua tumpukan sejajar dengan arah pandang, kubus yang lebih dekat menutupi kubus di belakangnya. Yang terlihat adalah tinggi maksimum, yaitu 3.",
      tambah(0, teks("jud", 150, 22, "Occlusion Max Rule", 12, W.ungu)),
      tambah("tumpukan", ...[0, 1, 2].map((i) => kotak(`jauh${i}`, 130, 70 + i * 20, 20, 20, "#FB923C", W.biru, { rx: 1 })), kotak("dekat0", 104, 110, 20, 20, "#60A5FA", W.biru, { rx: 1 }), teks("tj", 140, 146, "jauh: 3", 9, W.merah), teks("td", 114, 160, "dekat: 1", 9, W.merah)),
      tambah("pandang,", emo("mata", 38, 112, "👀", 30), panah("ap", 62, 120, 36, 0, W.merah, 2.5, { gambar: true })),
      tambah("menutupi", kotak("jauh2", 130, 110, 20, 20, "#FB923C", W.biru, { rx: 1, op: 0.25, putus: true }), teks("tm", 114, 100, "tertutup", 7, W.merah)),
      tambah("maksimum,", ...[0, 1, 2].map((i) => kotak(`lihat${i}`, 232, 70 + i * 20, 20, 20, "#FB923C", W.biru, { rx: 1 })), teks("tl", 242, 146, "terlihat: 3", 9, W.hijau)),
    ),
    k(
      "Contoh: matriks dua baris dua kolom. Baris depan bertinggi 2 dan 1, baris belakang bertinggi 1 dan 3. Totalnya 2 tambah 1 tambah 1 tambah 3, yaitu 7 kubus.",
      bersih(0),
      tambah(0, teks("mt", 140, 28, "matriks tinggi", 10, W.ungu)),
      tambah("depan", ambil(MX.objs, "m-00", "m-n00", "m-01", "m-n01"), teks("b0", 92, 64, "depan", 8.5, W.ungu, { anchor: "end" })),
      tambah("belakang", ambil(MX.objs, "m-10", "m-n10", "m-11", "m-n11"), teks("b1", 92, 104, "belakang", 8.5, W.ungu, { anchor: "end" })),
      tambah("Totalnya", teks("tt", 150, 150, "2 + 1 + 1 + 3 = 7 kubus", 13, W.merah, { garis: W.emas })),
    ),
    k(
      "Tampak depan memakai maksimum tiap kolom. Kolom kiri: 2 dan 1, maksimumnya 2. Kolom kanan: 1 dan 3, maksimumnya 3. Jadi tampak depan terdiri atas 5 kotak.",
      bersih(0),
      tambah(0, MX_KECIL.objs, teks("td", 52, 36, "tampak depan", 8.5, W.ungu)),
      sorotkan("kiri:", "m-00", "m-10"),
      tambah("maksimumnya", ...ambil(tampak("f", 170, 50, 26, TIGA).objs, "f-10", "f-20")),
      redamkan("kanan:", "m-00", "m-10"),
      sorotkan("kanan:", "m-01", "m-11"),
      tambah("maksimumnya@2", ...ambil(tampak("f", 170, 50, 26, TIGA).objs, "f-01", "f-11", "f-21")),
      tambah("5", teks("jm", 196, 150, "5 kotak", 12, W.merah)),
    ),
    k(
      "Tampak kanan memakai maksimum tiap baris. Baris depan: 2 dan 1, maksimumnya 2. Baris belakang: 1 dan 3, maksimumnya 3. Tampak kanan juga terdiri atas 5 kotak.",
      bersih(0),
      tambah(0, MX_KECIL.objs, teks("td", 52, 36, "tampak kanan", 8.5, W.ungu)),
      sorotkan("depan:", "m-00", "m-01"),
      tambah("maksimumnya", ...ambil(tampak("f", 170, 50, 26, TIGA.map((r) => r.replace(/b/g, "h"))).objs, "f-10", "f-20")),
      redamkan("belakang:", "m-00", "m-01"),
      sorotkan("belakang:", "m-10", "m-11"),
      tambah("maksimumnya@2", ...ambil(tampak("f", 170, 50, 26, TIGA.map((r) => r.replace(/b/g, "h"))).objs, "f-01", "f-11", "f-21")),
      tambah("5", teks("jm", 196, 150, "5 kotak", 12, W.merah)),
    ),
    k(
      "Kubus tersembunyi: ada 7 kubus, tetapi tampak depan hanya menunjukkan 5 kotak. Jadi 2 kubus tidak terlihat dari depan: satu di sel belakang kiri, dan satu di dasar tumpukan belakang kanan.",
      bersih(0),
      tambah(0, MX.objs.map((o) => ({ ...o, x: (o.x ?? 0) - 40 }))),
      tambah("tersembunyi:", emo("tp", 232, 70, "🙈", 30)),
      tambah("7", teks("a7", 232, 108, "7 kubus", 10.5, W.biru)),
      tambah("5", teks("a5", 232, 126, "5 kotak terlihat", 8.5, W.hijau)),
      tambah("2", teks("a2", 232, 146, "2 tersembunyi", 9.5, W.merah)),
      sorotkan("belakang", "m-10"),
      sorotkan("belakang@2", "m-11"),
    ),
  ],
};

/* ------------------------------ LB4. Reconstruction from Views ------------------------------ */
/**
 * Semua susunan sel 2 x 2 (tinggi 1) yang cocok dengan tampak depan dua kotak: tiap kolom terisi.
 * Bit: b0 belakang kiri, b1 belakang kanan, b2 depan kiri, b3 depan kanan; susunan 1 sampai 15 dalam urutan menaik.
 */
export const SUSUNAN_DEPAN: number[] = Array.from({ length: 15 }, (_, i) => i + 1).filter((m) => (m & 1 || m & 4) && (m & 2 || m & 8));
export const KANAN_BERISI = (m: number) => Boolean((m & 1 || m & 2) && (m & 4 || m & 8));
export const SUSUNAN_L = 13;

const mini = (n: number, x: number, y: number, c: number, m: number): Obj[] =>
  [0, 1, 2, 3].map((b) => kotak(`g${n}-${b}`, x + (b % 2) * c, y + Math.floor(b / 2) * c, c, c, m & (1 << b) ? "#FDE68A" : "#F8FAFC", m & (1 << b) ? "#92400E" : "#CBD5E1", { rx: 1, tebal: 1.1 }));
const galeri = (x0: number, y0: number, c: number, langkah: number): Obj[] => SUSUNAN_DEPAN.flatMap((m, n) => mini(n, x0 + (n % 3) * langkah, y0 + Math.floor(n / 3) * langkah, c, m));
const idGaleri = (n: number) => [0, 1, 2, 3].map((b) => `g${n}-${b}`);
const GAL = galeri(150, 40, 14, 44);

export const ADEGAN_LUAR_REKONSTRUKSI: AdeganStory = {
  id: "luarb3-rekonstruksi",
  judul: "Reconstruction from Views: dari tampak menjadi susunan",
  sumber: "Metode dari luar buku; contoh Buku Siswa hlm. 86–89",
  latar: "#F3F0FF",
  ketukan: [
    k(
      "Reconstruction from Views berarti menyusun kembali kubus dari tampaknya. Hasilnya bisa tepat satu susunan, atau beberapa susunan yang sama-sama cocok dengan semua tampak.",
      tambah(0, teks("jud", 150, 22, "Reconstruction from Views", 12, W.ungu)),
      tambah("tampaknya.", kartu("t1", 14, 44, 64, 28, W.putih, ["tampak depan"], 8), kartu("t2", 14, 78, 64, 28, W.putih, ["tampak kanan"], 8), kartu("t3", 14, 112, 64, 28, W.putih, ["tampak atas"], 8), panah("pa", 82, 92, 34, 0, W.hijau, 3, { gambar: true })),
      tambah("tepat", susunanIso("a", 150, 92, 14, ANIKE).objs, teks("at", 172, 128, "satu susunan", 8.5, W.hijau)),
      tambah("beberapa", susunanIso("b", 124, 168, 12, CONTOH_A).objs, susunanIso("c", 206, 168, 12, CONTOH_B).objs, teks("bt", 150, 190, "beberapa susunan cocok", 8.5, W.merah)),
    ),
    k(
      "Contoh Anike. Tampak atas: tiga sel berjajar, jadi matriksnya satu baris tiga kolom. Tampak depan bertinggi 1, 2, 1, jadi tiap sel terisi tepat setinggi itu. Hasilnya satu susunan, 4 kubus.",
      bersih(0),
      tambah("atas:", teks("ta", 54, 40, "tampak atas", 8.5, W.ungu), tampak("t", 24, 48, 24, ["kkk"]).objs),
      tambah("matriksnya", teks("tm", 218, 40, "matriks tinggi", 8.5, W.ungu), ...matriks("m", 182, 48, 24, [[1, 2, 1]]).objs),
      tambah("depan", teks("tdp", 54, 100, "tampak depan", 8.5, W.ungu), tampak("d", 24, 108, 24, [".b.", "bbb"]).objs),
      tambah("Hasilnya", teks("hs", 218, 130, "1 susunan", 14, W.merah, { garis: W.emas }), teks("hs2", 218, 152, "4 kubus", 14, W.merah)),
    ),
    k(
      "Sekarang bayangkan hanya diberi tampak depan: dua kotak berjajar, tinggi 1. Pada lantai 2 kali 2, ada 9 susunan yang cocok. Paling sedikit 2 kubus, paling banyak 4.",
      bersih(0),
      tambah("depan:", teks("tp", 42, 52, "tampak depan", 8.5, W.ungu), tampak("d", 14, 60, 28, ["bb"]).objs),
      tambah("tinggi", teks("t1", 42, 112, "tinggi 1", 9.5, W.merah)),
      tambah("lantai", teks("t2", 42, 130, "lantai 2 x 2", 9.5, W.merah)),
      tambah("9", GAL, teks("t9", 208, 24, "9 susunan cocok", 10.5, W.hijau)),
      tambah("sedikit", teks("mn", 42, 160, "paling sedikit 2", 8.5, W.biru)),
      tambah("banyak", teks("mk", 42, 176, "paling banyak 4", 8.5, W.biru)),
    ),
    k(
      "Tambahkan tampak kanan: kedua baris juga harus terisi. Dua susunan gugur, sehingga tinggal 7. Paling sedikit tetap 2 kubus, paling banyak 4.",
      bersih(0),
      tambah(0, tampak("d", 14, 60, 28, ["bb"]).objs, teks("tp", 42, 52, "tampak depan", 8.5, W.ungu), GAL),
      tambah("kanan:", tampak("r", 80, 60, 28, ["hh"]).objs, teks("tr", 108, 52, "tampak kanan", 8, W.ungu), teks("tr2", 108, 104, "2 baris terisi", 7.5, W.hijau)),
      ...SUSUNAN_DEPAN.flatMap((m, n) => (KANAN_BERISI(m) ? [] : [pudarkan("gugur", ...idGaleri(n))])),
      tambah("gugur,", teks("gg", 208, 24, "2 gugur, tinggal 7", 10.5, W.merah)),
      tambah("sedikit", teks("mn", 42, 160, "paling sedikit 2", 8.5, W.biru)),
      tambah("banyak", teks("mk", 42, 176, "paling banyak 4", 8.5, W.biru)),
    ),
    k(
      "Terakhir tampak atas. Pada contoh tinggi 1 ini, bila sel terisi diketahui, tinggal 1 susunan. Tampak atas berbentuk L dengan 3 sel hanya cocok dengan satu susunan.",
      bersih(0),
      tambah(0, GAL, teks("tg", 208, 24, "tinggi 1: 9 susunan cocok", 8.5, W.ungu)),
      tambah("atas", teks("ta", 42, 52, "tampak atas", 8.5, W.ungu), tampak("t", 16, 60, 26, ["k.", "kk"]).objs),
      ...SUSUNAN_DEPAN.flatMap((m, n) => (m === SUSUNAN_L ? [] : [pudarkan("tinggal", ...idGaleri(n))])),
      hapus("tinggal", "tg"),
      tambah("tinggal", teks("t1", 208, 24, "tinggal 1 susunan", 11, W.hijau)),
      sorotkan("berbentuk", ...idGaleri(SUSUNAN_DEPAN.indexOf(SUSUNAN_L))),
      tambah("3", teks("t3", 42, 130, "L: 3 sel", 9.5, W.merah)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb3-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar Sub-Bab B",
  latar: "#EEF4FF",
  ketukan: [
    k(
      "Ringkasan. Orthographic Projection: proyeksi tegak lurus. Height-Matrix Silhouette: tinggi tiap sel. Occlusion Max Rule: yang terlihat adalah yang tertinggi. Reconstruction from Views: susun dari tampak.",
      tambah(0, teks("jud", 150, 20, "Ringkasan empat metode", 12, W.ungu)),
      tambah("Orthographic", kartu("r1", 14, 30, 272, 34, "#FDE68A", ["Orthographic Projection: tegak lurus"], 9.2)),
      tambah("Height-Matrix", kartu("r2", 14, 70, 272, 34, "#FBCFE8", ["Height-Matrix Silhouette: tinggi tiap sel"], 9.2)),
      tambah("Occlusion", kartu("r3", 14, 110, 272, 34, "#BBF7D0", ["Occlusion Max Rule: terlihat yang tertinggi"], 9.2)),
      tambah("Reconstruction", kartu("r4", 14, 150, 272, 34, "#BFDBFE", ["Reconstruction from Views: susun dari tampak"], 9.2)),
    ),
    k(
      "Urutan kerjanya: tulis matriks tinggi, baca tampak depan dan kanan dengan aturan maksimum, tandai sel terisi untuk tampak atas, lalu cocokkan dengan gambar yang diberikan.",
      bersih(0),
      tambah("matriks", kartu("s1", 10, 70, 62, 50, "#FBCFE8", ["tulis", "matriks"], 9)),
      tambah("depan", panah("p1", 74, 95, 12, 0, W.biru, 2), kartu("s2", 88, 70, 62, 50, "#BFDBFE", ["baca depan", "dan kanan"], 8.4)),
      tambah("tandai", panah("p2", 152, 95, 12, 0, W.biru, 2), kartu("s3", 166, 70, 62, 50, "#FDE68A", ["tandai sel", "tampak atas"], 8.4)),
      tambah("cocokkan", panah("p3", 230, 95, 8, 0, W.biru, 2), emo("ok", 262, 108, "✅", 28), teks("okt", 262, 126, "cocokkan", 8, W.hijau)),
    ),
    k(
      "Ingat tiga pesan. Pertama, tampak tegak lurus tidak mengecilkan ukuran. Kedua, kubus yang lebih dekat menutupi kubus di belakangnya. Ketiga, makin banyak tampak, makin pasti susunannya. Dan lihatlah juga dari perspektif orang lain.",
      bersih(0),
      tambah("Pertama,", kartu("i1", 14, 28, 272, 36, "#FEF3C7", ["tampak tegak lurus: ukuran tetap"], 9.4)),
      tambah("Kedua,", kartu("i2", 14, 72, 272, 36, "#DCFCE7", ["yang dekat menutupi yang di belakang"], 9.4)),
      tambah("Ketiga,", kartu("i3", 14, 116, 272, 36, "#DBEAFE", ["makin banyak tampak, makin pasti"], 9.4)),
      tambah("perspektif", emo("mt", 132, 184, "👀", 24), teks("mtt", 215, 180, "perspektif orang lain", 8.5, W.ungu)),
    ),
  ],
};
