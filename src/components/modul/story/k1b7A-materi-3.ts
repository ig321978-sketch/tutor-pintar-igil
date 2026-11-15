import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, garisAwal, garisTinggi, hiasanV, judul, kartu, namaH, namaV, panjangH, satuanH, satuanV, tanah, tinggiV } from "./k1b7A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k1b7A-bantu";
import { pohon } from "./k1b7A-materi-2";

const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

/* ------------------------------ 9. Paling tinggi dan paling pendek ------------------------------ */
const SUARA_T1 = "Sekarang ada empat pohon, yaitu pohon A, pohon B, pohon C, dan pohon D. Semuanya berdiri di tanah yang sama.";
const SUARA_T2 = "Pohon A paling tinggi. Pohon A lebih tinggi dari pohon B, pohon C, dan pohon D.";
const SUARA_T3 = "Pohon D paling pendek. Pohon D lebih pendek dari pohon A, pohon B, dan pohon C.";
const SUARA_T4 = "Pohon B sama tinggi dengan pohon C. Ujung atas keduanya sejajar.";
const SUARA_T5 = "Urutan dari yang paling tinggi adalah pohon A, pohon B, pohon C, lalu pohon D. Boleh juga pohon A, pohon C, pohon B, lalu pohon D, karena pohon B dan pohon C sama tinggi.";
const POHON = [
  { s: "va", xc: 45, n: 8, nama: "Pohon A", warna: W.langit },
  { s: "vb", xc: 115, n: 6, nama: "Pohon B", warna: W.hijauMuda },
  { s: "vc", xc: 185, n: 6, nama: "Pohon C", warna: W.hijauMuda },
  { s: "vd", xc: 255, n: 4, nama: "Pohon D", warna: W.krem },
];
const pohonKe = (i: number): Obj[] => [...pohon(POHON[i].s, POHON[i].xc, POHON[i].n, POHON[i].nama, POHON[i].warna)];
const tinggiKe = (i: number): Obj => tinggiV(POHON[i].s, POHON[i].xc, POHON[i].n, `${POHON[i].n} kotak`);

export const ADEGAN_PALING_TINGGI: AdeganStory = {
  id: "paling-tinggi",
  judul: "Paling tinggi dan paling pendek",
  sumber: "Materi: paling tinggi, paling pendek",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Empat pohon"), ...tanah(false)),
      tambah(idx(SUARA_T1, "A"), ...pohonKe(0)),
      tambah(idx(SUARA_T1, "B"), ...pohonKe(1)),
      tambah(idx(SUARA_T1, "C"), ...pohonKe(2)),
      tambah(idx(SUARA_T1, "D"), ...pohonKe(3)),
      tambah("Semuanya", ...[0, 1, 2, 3].map(tinggiKe)),
    ),
    k(SUARA_T2, sorotkan(0, ...ids("va", 0, 7))),
    k(SUARA_T3, redamkan(0, ...ids("va", 0, 7)), sorotkan(0, ...ids("vd", 0, 3))),
    k(SUARA_T4, redamkan(0, ...ids("vd", 0, 3)), sorotkan("sama", ...ids("vb", 0, 5), ...ids("vc", 0, 5)), tambah("Ujung", garisTinggi("gu", 104, 196, 6))),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Urutan pohon")),
      tambah("adalah", ...kartu("ua", 14, 36, 272, 52, W.hijauMuda, ["dari paling tinggi:", "A, B, C, D"], 10.4)),
      tambah("Boleh", ...kartu("ub", 14, 100, 272, 52, W.langit, ["boleh juga:", "A, C, B, D"], 10.4)),
      tambah("karena", emo("ow", 262, 180, OWL, 24)),
    ),
  ],
};

/* ------------------------------ 10. Kupu-kupu terbang ------------------------------ */
const SUARA_K1 = "Di taman ada tiga kupu-kupu, yaitu kuning, merah, dan hijau. Tinggi tiang kotak menunjukkan seberapa tinggi mereka terbang.";
const SUARA_K2 = "Kupu-kupu kuning terbang setinggi tiga kotak. Kupu-kupu merah setinggi lima kotak. Kupu-kupu hijau setinggi delapan kotak.";
const SUARA_K3 = "Kupu-kupu kuning terbang paling rendah. Kupu-kupu hijau terbang paling tinggi.";
const SUARA_K4 = "Kupu-kupu merah terbang lebih tinggi dari kupu-kupu kuning. Kupu-kupu merah terbang lebih rendah dari kupu-kupu hijau.";
const SUARA_K5 = "Posisi benda memakai kata lebih tinggi, lebih rendah, paling tinggi, dan paling rendah. Kupu-kupu hijau terbang lebih tinggi tiga kotak dari kupu-kupu merah.";
const KUPU = [
  { s: "va", xc: 60, n: 3, nama: "Kupu-kupu kuning", warna: W.krem },
  { s: "vb", xc: 150, n: 5, nama: "Kupu-kupu merah", warna: W.merahMuda },
  { s: "vc", xc: 240, n: 8, nama: "Kupu-kupu hijau", warna: W.hijauMuda },
];
const kupuKe = (i: number): Obj[] => [...satuanV(KUPU[i].s, KUPU[i].xc, KUPU[i].n, KUPU[i].warna), hiasanV(KUPU[i].s, KUPU[i].xc, KUPU[i].n, "\u{1F98B}"), namaV(KUPU[i].s, KUPU[i].xc, KUPU[i].nama)];

export const ADEGAN_KUPU: AdeganStory = {
  id: "kupu-kupu",
  judul: "Kupu-kupu terbang",
  sumber: "Materi: tinggi dan rendah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kupu-kupu terbang"), ...tanah(false)),
      tambah(idx(SUARA_K1, "kuning,"), ...kupuKe(0)),
      tambah(idx(SUARA_K1, "merah,"), ...kupuKe(1)),
      tambah(idx(SUARA_K1, "hijau."), ...kupuKe(2)),
    ),
    k(
      SUARA_K2,
      tambah(idx(SUARA_K2, "tiga"), tinggiV("va", 60, 3, "3 kotak")),
      tambah(idx(SUARA_K2, "lima"), tinggiV("vb", 150, 5, "5 kotak")),
      tambah(idx(SUARA_K2, "delapan"), tinggiV("vc", 240, 8, "8 kotak")),
    ),
    k(SUARA_K3, sorotkan("rendah.", ...ids("va", 0, 2)), sorotkan("tinggi.", ...ids("vc", 0, 7))),
    k(SUARA_K4, redamkan(0, ...ids("va", 0, 2), ...ids("vc", 0, 7)), sorotkan("tinggi", ...ids("vb", 0, 4)), tambah("lebih", garisTinggi("gu", 71, 229, 5))),
    k(
      SUARA_K5,
      hapus(0, "gu"),
      redamkan(0, ...ids("vb", 0, 4)),
      tambah("Posisi", ...kartu("kp", 104, 30, 92, 26, W.langit, ["tinggi dan rendah"], 8.8)),
      ubah("tiga", ...ids("vc", 5, 7).map((id) => ({ id, warna: W.emas }))),
    ),
  ],
};

/* ------------------------------ 11. Detektif panjang ------------------------------ */
const SUARA_D1 = "Sekarang Igil, si burung hantu, mengajak kita berpikir seperti detektif. Pita hijau lebih pendek dari pita merah. Pita merah lebih pendek dari pita biru.";
const SUARA_D2 = "Pita apa yang paling panjang? Pilih: hijau, merah, atau biru. Ketuk kartu yang tepat.";
const SUARA_D3 = "Betul! Pita biru paling panjang, karena lebih panjang dari pita merah, dan pita merah lebih panjang dari pita hijau.";
const SUARA_D4 = "Kita buktikan dengan kotak satuan. Pita hijau panjangnya empat kotak, pita merah enam kotak, dan pita biru delapan kotak.";
const SUARA_D5 = "Pita biru paling panjang. Pita biru lebih panjang dari pita merah dan pita hijau. Detektif hebat!";
const PITA = [
  { s: "ua", n: 4, y: 60, warna: W.hijauMuda, nama: "Pita hijau" },
  { s: "ub", n: 6, y: 100, warna: W.merahMuda, nama: "Pita merah" },
  { s: "uc", n: 8, y: 140, warna: W.langit, nama: "Pita biru" },
];
const pitaKe = (i: number): Obj[] => [namaH(PITA[i].s, PITA[i].y, PITA[i].nama), ...satuanH(PITA[i].s, PITA[i].y, PITA[i].n, PITA[i].warna)];
const pitaLn = (i: number): Obj => panjangH(PITA[i].s, PITA[i].y, PITA[i].n, `${PITA[i].n} kotak`);

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Detektif panjang",
  sumber: "Materi: petunjuk perbandingan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Detektif panjang"), emo("dm", 262, 70, "\u{1F50D}", 26)),
      tambah(idx(SUARA_D1, "hijau"), ...kartu("da", 14, 34, 220, 40, W.hijauMuda, ["pita hijau lebih pendek", "dari pita merah"], 9.6)),
      tambah(idx(SUARA_D1, "biru"), ...kartu("db", 14, 82, 220, 40, W.merahMuda, ["pita merah lebih pendek", "dari pita biru"], 9.6)),
    ),
    k(SUARA_D2, tambah("Pilih:", ...pilihKata(140, ["hijau", "merah", "biru"])), sorotkan("Ketuk", "c3-k")),
    k(SUARA_D3, tambah("Betul!", emo("ok", 150, 196, "✅", 20))),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Buktikan dengan kotak")),
      tambah("hijau", ...pitaKe(0), ...garisAwal(52, 162)),
      tambah("merah", ...pitaKe(1)),
      tambah("biru", ...pitaKe(2)),
      tambah(idx(SUARA_D4, "empat"), pitaLn(0)),
      tambah(idx(SUARA_D4, "enam"), pitaLn(1)),
      tambah(idx(SUARA_D4, "delapan"), pitaLn(2)),
    ),
    k(SUARA_D5, sorotkan(0, ...ids("uc", 0, 7)), tambah("Detektif", emo("ow", 262, 196, OWL, 20))),
  ],
};
