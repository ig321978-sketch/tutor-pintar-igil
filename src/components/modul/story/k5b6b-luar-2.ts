import type { AdeganStory, Obj } from "./logika-story";
import { SOAL1, W, jam, jenisDari, kartu, kartuMetode, kertasSiku, panah, pukul, sudut, sudutJam, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b6b-bantu";

/** Ganti bentuk sudut yang sudah ada (id `${id}-d` dan `${id}-b`) menjadi sudut dengan besar baru. */
const gantiSudut = (at: string | number | undefined, id: string, cx: number, cy: number, rot: number, besar: number, panjang: number) => {
  const baru = sudut(id, cx, cy, rot, besar, panjang);
  const d = baru.find((o) => o.id === `${id}-d`);
  const b = baru.find((o) => o.id === `${id}-b`);
  return ubah(at, { id: `${id}-d`, d: d?.d }, { id: `${id}-b`, x2: b?.x2, y2: b?.y2 });
};

/* ------------------------------ LB5. Angle as Rotation: konsep ------------------------------ */
export const ADEGAN_LUAR_ROT: AdeganStory = {
  id: "luarb-rot",
  judul: "Angle as Rotation: sudut sebagai besar putaran",
  sumber: "Metode luar; sudut sebagai putaran satu kaki",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Angle as Rotation memandang sudut sebagai besar putaran. Satu kaki tetap diam, dan kaki yang lain diputar dari kaki pertama.",
      tambah(0, teks("jud", 150, 22, "Angle as Rotation", 13, W.ungu)),
      tambah("tetap", ...sudut("rt", 110, 160, 0, 15, 100), teks("rta", 160, 180, "kaki tetap", 10, W.hijau)),
      tambah("diputar", teks("rtb", 248, 126, "kaki diputar", 10, W.merah)),
    ),
    k(
      "Makin jauh kaki itu diputar, makin lebar sudutnya. Putaran kecil menghasilkan sudut lancip.",
      gantiSudut("jauh", "rt", 110, 160, 0, 40, 100),
      tambah("lancip.", teks("rtl", 210, 60, "putaran kecil: lancip", 11, W.merah)),
    ),
    k(
      "Putar sampai tepat seperti pojok kertas, hasilnya sudut siku-siku. Putar lebih jauh lagi, hasilnya sudut tumpul.",
      gantiSudut("tepat", "rt", 110, 160, 0, 90, 100),
      tambah("tepat", kertasSiku("rtk", 110, 160, 0, 70, { op: 0.5, z: -1 }), tandaSiku("rts", 110, 160, 0, 10)),
      ubah("siku-siku.", { id: "rtl", isi: "tepat pojok: siku-siku" }),
      hapus("jauh", "rts", "rtk"),
      gantiSudut("jauh", "rt", 110, 160, 0, 135, 100),
      ubah("tumpul.", { id: "rtl", isi: "lebih jauh: tumpul" }),
    ),
    k(
      "Jadi gunting yang dibuka perlahan melewati tiga tahap: lancip, siku-siku, lalu tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Gunting dibuka perlahan", 12, W.ungu)),
      tambah("gunting", teks("gem", 150, 70, "✂️", 28, W.biru)),
      tambah("lancip,", ...sudut("g0", 30, 150, 0, 35, 70), teks("g0t", 55, 176, "lancip", 9.6, W.merah)),
      tambah("siku-siku,", panah("g1p", 100, 110, 24, 0, W.ungu, 2), ...sudut("g1", 132, 150, 0, 90, 60), tandaSiku("g1s", 132, 150, 0, 8), teks("g1t", 160, 176, "siku-siku", 9.6, W.merah)),
      tambah("tumpul.", panah("g2p", 196, 96, 24, 0, W.ungu, 2), ...sudut("g2", 244, 150, 20, 120, 46), teks("g2t", 244, 176, "tumpul", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ LB6. Angle as Rotation: jarum jam pukul satu sampai empat ------------------------------ */
export const JAM_ROT: Array<[number, number]> = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
];
const panelJam = (id: string, j: number, m: number): Obj[] => [
  ...jam(id, 88, 112, 50, j, m),
  ...kartu(`${id}n`, 164, 76, 120, 56, W.krem, [`pukul ${pukul(j, m)}`, jenisDari(sudutJam(j, m).theta)], 10.4),
];
const kecilJam = (id: string, cx: number, j: number, m: number): Obj[] => [
  ...jam(id, cx, 96, 30, j, m),
  teks(`${id}-wkt`, cx, 146, pukul(j, m), 8.6, W.biru),
  teks(`${id}-jns`, cx, 159, jenisDari(sudutJam(j, m).theta), 8.6, jenisDari(sudutJam(j, m).theta) === "tumpul" ? W.merah : W.hijau),
];

export const ADEGAN_LUAR_ROT_TERAPAN: AdeganStory = {
  id: "luarb-rot-terapan",
  judul: "Angle as Rotation diterapkan pada jarum jam",
  sumber: "Metode luar; penerapan pada jam analog Soal 2",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada jam. Jarum panjang tetap di angka dua belas sebagai kaki yang diam, dan jarum pendek sebagai kaki yang diputar. Pukul satu, putarannya kecil, jadi sudut lancip.",
      tambah(0, teks("jud", 150, 24, "Jarum jam berputar", 13, W.ungu)),
      tambah("Jarum", ...panelJam("r1", ...JAM_ROT[0])),
    ),
    k(
      "Pukul dua, putarannya lebih jauh tetapi masih lancip. Inilah contoh dari buku pada soal dua.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jarum jam berputar", 13, W.ungu)),
      tambah("Pukul", ...panelJam("r2", ...JAM_ROT[1])),
    ),
    k(
      "Pukul tiga, putarannya tepat seperti pojok kertas, jadi sudut siku-siku.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jarum jam berputar", 13, W.ungu)),
      tambah("Pukul", ...panelJam("r3", ...JAM_ROT[2])),
      tambah("pojok", tandaSiku("r3s", 88, 112, 0, 12)),
    ),
    k(
      "Pukul empat, putarannya sudah melewati pojok kertas, jadi sudut tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jarum jam berputar", 13, W.ungu)),
      tambah("Pukul", ...panelJam("r4", ...JAM_ROT[3])),
      tambah("melewati", teks("r4x", 224, 160, "lewat dari pojok", 9, W.merah)),
    ),
    k(
      "Urutannya: pukul satu dan dua lancip, pukul tiga siku-siku, pukul empat tumpul. Makin jauh jarum pendek berputar, makin lebar sudutnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Makin jauh, makin lebar", 12.5, W.ungu)),
      tambah("satu", ...kecilJam("u1", 40, ...JAM_ROT[0])),
      tambah("dua", ...kecilJam("u2", 115, ...JAM_ROT[1])),
      tambah("tiga", ...kecilJam("u3", 190, ...JAM_ROT[2])),
      tambah("empat", ...kecilJam("u4", 262, ...JAM_ROT[3])),
      tambah("Makin", panah("ua", 40, 184, 222, 0, W.ungu, 2)),
    ),
  ],
};

/* ------------------------------ LB7. Orientation Invariance Test: konsep ------------------------------ */
export const ADEGAN_LUAR_ORI: AdeganStory = {
  id: "luarb-ori",
  judul: "Orientation Invariance Test: posisi tidak mengubah jenis",
  sumber: "Metode luar; uji kesamaan jenis saat sudut diputar",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Orientation Invariance Test menguji bahwa jenis sudut tidak berubah ketika sudutnya diputar atau letaknya diubah. Yang menentukan jenis hanyalah lebar bukaan kedua kaki.",
      tambah(0, teks("jud", 150, 22, "Orientation Invariance Test", 11.5, W.ungu)),
      tambah("diputar", ...sudut("o1", 40, 150, 0, 40, 80)),
      tambah("letaknya", panah("op", 130, 120, 34, 0, W.ungu, 2.4), ...sudut("o2", 232, 70, 200, 40, 80)),
      tambah("lebar", teks("ot", 150, 188, "jenis tetap: lancip", 10, W.hijau)),
    ),
    k(
      "Caranya: putar kertas atau bukumu, lalu bandingkan lagi dengan pojok patokan. Kalau hasilnya sama di semua posisi, jenis sudutnya sudah pasti.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Putar lalu bandingkan", 12.5, W.ungu)),
      tambah("putar", ...sudut("c0", 38, 120, 0, 135, 36), ...sudut("c1", 112, 100, 90, 135, 36), ...sudut("c2", 190, 90, 200, 135, 36), ...sudut("c3", 262, 90, 300, 135, 36)),
      tambah("bandingkan", tanda("t0", 50, 160, true, 16), tanda("t1", 112, 160, true, 16)),
      tambah("sama", tanda("t2", 180, 160, true, 16), tanda("t3", 262, 160, true, 16)),
      tambah("pasti.", teks("ot", 150, 188, "posisi berbeda, jenis sama", 10, W.hijau)),
    ),
    k(
      "Tes ini membetulkan anggapan bahwa salah satu kaki harus selalu mendatar. Posisi boleh apa saja, jenis tetap sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kaki tidak harus mendatar", 12, W.ungu)),
      tambah("anggapan", ...kartu("w1", 20, 40, 260, 34, W.merahMuda, ["salah: satu kaki harus mendatar"], 9.4), tanda("w1c", 150, 100, false, 22)),
      tambah("Posisi", ...kartu("w2", 20, 118, 260, 34, W.hijauMuda, ["benar: posisi bebas, jenis tetap"], 9.4), tanda("w2c", 150, 176, true, 22)),
    ),
    k(
      "Jadi jangan menilai dari arah gambar. Nilailah dari lebar bukaan kedua kaki dibandingkan dengan pojok patokan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nilai lebar bukaan", 13, W.ungu)),
      tambah("arah", teks("n1", 82, 90, "arah gambar", 11, W.merah), tanda("n1c", 82, 120, false, 24)),
      tambah("lebar", teks("n2", 214, 90, "lebar bukaan", 11, W.hijau), tanda("n2c", 214, 120, true, 24)),
      tambah("patokan.", teks("n3", 150, 170, "bandingkan dengan patokan", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ LB8. Orientation Invariance Test: tiga sudut dari Soal 1 pada empat posisi ------------------------------ */
const BS_ = (h: string) => SOAL1.find((s) => s.h === h) ?? SOAL1[0];
export const ORIENTASI: Array<{ benda: string; besar: number; posisi: number[] }> = [
  { benda: "pojokan jendela", besar: BS_("f").besar, posisi: [0, 50, 130, 245] },
  { benda: "tangga rumah", besar: BS_("c").besar, posisi: [0, 200, 90, 300] },
  { benda: "gunting dibuka", besar: BS_("d").besar, posisi: [0, 80, 170, 250] },
];
const TITIK_ORI: Array<Array<[number, number]>> = [
  [[40, 130], [110, 120], [195, 120], [250, 100]],
  [[45, 120], [125, 100], [195, 110], [255, 100]],
  [[40, 120], [110, 110], [190, 110], [250, 100]],
];
const empatPosisi = (n: number, id: string): Obj[] =>
  ORIENTASI[n].posisi.flatMap((r, i) => [
    ...sudut(`${id}${i}`, TITIK_ORI[n][i][0], TITIK_ORI[n][i][1], r, ORIENTASI[n].besar, 42),
    tanda(`${id}${i}c`, TITIK_ORI[n][i][0] + 8, 180, true, 14),
  ]);

export const ADEGAN_LUAR_ORI_TERAPAN: AdeganStory = {
  id: "luarb-ori-terapan",
  judul: "Orientation Invariance Test diterapkan pada tiga benda soal satu",
  sumber: "Metode luar; penerapan pada Soal 1 bagian c, d, dan f",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapkan pada pojokan jendela, sudut siku-siku. Diputar ke empat posisi, kaki-kakinya tidak lagi mendatar, tetapi tetap pas dengan pojok lipatan kertas.",
      tambah(0, teks("jud", 150, 22, "Pojokan jendela diputar", 12.5, W.ungu)),
      tambah("Diputar", empatPosisi(0, "wa")),
      tambah("pas", teks("wt", 150, 200 - 6, "tetap siku-siku", 10, W.hijau)),
    ),
    k(
      "Tangga rumah memberi sudut tumpul. Diputar ke empat posisi, kaki sudutnya tetap lebih lebar dari pojok patokan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tangga rumah diputar", 12.5, W.ungu)),
      tambah("Diputar", empatPosisi(1, "wb")),
      tambah("lebar", teks("wt", 150, 200 - 6, "tetap tumpul", 10, W.hijau)),
    ),
    k(
      "Gunting dibuka juga begitu. Sudut lancip yang diputar ke empat posisi tetap lancip.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Gunting dibuka diputar", 12.5, W.ungu)),
      tambah("diputar", empatPosisi(2, "wc")),
      tambah("tetap", teks("wt", 150, 200 - 6, "tetap lancip", 10, W.hijau)),
    ),
    k(
      "Hasilnya: empat posisi untuk tiga jenis, jadi dua belas gambar, dan tidak satu pun berubah jenis.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dua belas gambar", 13, W.ungu)),
      tambah("tiga", ...kartu("x1", 14, 40, 84, 44, W.hijauMuda, ["siku-siku", "4 posisi"], 9), ...kartu("x2", 108, 40, 84, 44, W.merahMuda, ["tumpul", "4 posisi"], 9), ...kartu("x3", 202, 40, 84, 44, W.muda, ["lancip", "4 posisi"], 9)),
      tambah("dua", teks("xr", 150, 120, "4 x 3 = 12", 22, W.merah)),
      tambah("satu", teks("xs", 150, 156, "tidak ada yang berubah jenis", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan empat metode luar untuk sudut",
  sumber: "Ringkasan; empat metode luar Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar untuk sudut. Vertex-Ray Model: sudut punya satu titik sudut dan dua kaki, dan pojok melengkung bukan sudut.",
      tambah(0, teks("jud", 150, 20, "Ringkasan", 13, W.ungu)),
      tambah(7, kartuMetode("r1", 10, 30, "#FDE68A", ["Vertex-Ray", "Model"], "titik dan dua kaki")),
    ),
    k(
      "Acute-Right-Obtuse Classification: bandingkan dengan pojok kertas, lebih sempit lancip, sama siku-siku, lebih lebar tumpul. Angle as Rotation: makin jauh kaki diputar, makin lebar sudutnya.",
      tambah(0, kartuMetode("r2", 156, 30, "#FBCFE8", ["Acute-Right-Obtuse", "Classification"], "bandingkan patokan")),
      tambah(16, kartuMetode("r3", 10, 112, "#BBF7D0", ["Angle as", "Rotation"], "makin jauh makin lebar")),
    ),
    k(
      "Orientation Invariance Test: putar sudutnya, jenisnya tetap sama. Pakai keempat metode ini untuk memeriksa sudut dan menentukan jenisnya.",
      tambah(0, kartuMetode("r4", 156, 112, "#BFDBFE", ["Orientation", "Invariance Test"], "posisi tidak mengubah")),
    ),
    k(
      "Ingat, metode ini melengkapi isi buku. Tetap bandingkan dengan pojok lipatan kertas sebelum menyimpulkan.",
      tambah(0, teks("rk", 150, 196, "melengkapi isi buku", 10.4, W.hijau)),
      sorotkan(5, "r1-k", "r2-k", "r3-k", "r4-k"),
    ),
  ],
};
