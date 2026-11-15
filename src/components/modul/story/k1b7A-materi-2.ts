import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, garisAwal, garisTinggi, hiasanV, judul, kartu, namaH, namaV, panjangH, pusatV, satuanH, satuanV, tanah, tinggiV } from "./k1b7A-gambar";
import { bersih, hapus, hitungSamping, idx, k, pindahBatang, redamkan, sorotkan, tambah, ubah } from "./k1b7A-bantu";

const POHON_EMO = "\u{1F333}";
/** Satu pohon: tumpukan kotak, gambar pohon di puncak, dan nama di bawah tanah. */
export const pohon = (s: string, xc: number, n: number, nama: string, warna: string = W.hijauMuda): Obj[] => [...satuanV(s, xc, n, warna), hiasanV(s, xc, n, POHON_EMO), namaV(s, xc, nama)];
const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

/* ------------------------------ 5. Tinggi pohon Malosi dan Upe ------------------------------ */
const SUARA_T1 = "Malosi dan Upe menanam pohon di taman. Kita lihat tinggi kedua pohon itu.";
const SUARA_T2 = "Garis cokelat di bawah adalah tanah. Kedua pohon berdiri di tanah yang sama. Tinggi pohon dihitung dari tanah ke ujung atas.";
const SUARA_T3 = "Kita hitung kotak pada pohon Malosi, dari bawah. Satu, dua, tiga, empat, lima, enam, tujuh, delapan. Tingginya delapan kotak.";
const SUARA_T4 = "Sekarang pohon Upe. Satu, dua, tiga, empat, lima. Tingginya lima kotak.";
const SUARA_T5 = "Pohon Malosi lebih tinggi dari pohon Upe. Pohon Upe lebih rendah dari pohon Malosi.";
const SUARA_T6 = "Pohon Malosi lebih tinggi tiga kotak dari pohon Upe. Tiga kotak itu adalah lebihnya.";
const SUARA_T7 = "Untuk tinggi, kita memakai kata lebih tinggi dan lebih rendah. Ingat, tinggi selalu dihitung dari tanah.";

export const ADEGAN_TINGGI: AdeganStory = {
  id: "tinggi-pohon",
  judul: "Tinggi pohon Malosi dan Upe",
  sumber: "Materi: lebih tinggi dan lebih rendah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tinggi pohon"), ...tanah()),
      tambah("taman.", ...pohon("va", 90, 8, "Pohon Malosi")),
      tambah("kedua", ...pohon("vb", 210, 5, "Pohon Upe")),
    ),
    k(SUARA_T2, ubah("tanah.", { id: "gd", tebal: 4.4 })),
    k(SUARA_T3, ...hitungSamping(SUARA_T3, "va", pusatV(90, 8), { setelah: "Malosi," }), tambah(idx(SUARA_T3, "delapan", 2), tinggiV("va", 90, 8, "8 kotak"))),
    k(SUARA_T4, ...hitungSamping(SUARA_T4, "vb", pusatV(210, 5), { setelah: "Upe." }), tambah(idx(SUARA_T4, "lima", 2), tinggiV("vb", 210, 5, "5 kotak"))),
    k(SUARA_T5, tambah("lebih", garisTinggi("gu", 101, 199, 5)), sorotkan("rendah", ...ids("vb", 0, 4))),
    k(
      SUARA_T6,
      redamkan(0, ...ids("vb", 0, 4)),
      ubah("tiga", ...ids("va", 5, 7).map((id) => ({ id, warna: W.emas }))),
      tambah("itu", ...kartu("kc", 110, 118, 70, 26, W.emas, ["lebihnya: 3"], 9)),
    ),
    k(SUARA_T7, hapus(0, "kc-k", "kc-t0"), tambah("Ingat,", ...kartu("kd", 112, 28, 86, 24, W.langit, ["mulai dari tanah"], 8.8))),
  ],
};

/* ------------------------------ 6. Sama tinggi ------------------------------ */
const SUARA_M1 = "Sekarang kita lihat pohon B dan pohon C. Kedua pohon berdiri di tanah yang sama.";
const SUARA_M2 = "Kita hitung pohon B. Satu, dua, tiga, empat, lima, enam. Tingginya enam kotak.";
const SUARA_M3 = "Sekarang pohon C. Satu, dua, tiga, empat, lima, enam. Tingginya juga enam kotak.";
const SUARA_M4 = "Ujung atas kedua pohon sejajar. Pohon B sama tinggi dengan pohon C. Keduanya enam kotak.";
const SUARA_M5 = "Ada satu pohon lagi, yaitu pohon A. Pohon A lebih tinggi dari pohon B dan pohon C. Lebihnya dua kotak.";

export const ADEGAN_SAMA_TINGGI: AdeganStory = {
  id: "sama-tinggi",
  judul: "Dua pohon sama tinggi",
  sumber: "Materi: sama tinggi",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Sama tinggi"), ...tanah()),
      tambah(idx(SUARA_M1, "B"), ...pohon("vb", 150, 6, "Pohon B")),
      tambah(idx(SUARA_M1, "C"), ...pohon("vc", 240, 6, "Pohon C")),
    ),
    k(SUARA_M2, ...hitungSamping(SUARA_M2, "vb", pusatV(150, 6), { setelah: "B." }), tambah(idx(SUARA_M2, "enam", 2), tinggiV("vb", 150, 6, "6 kotak"))),
    k(SUARA_M3, ...hitungSamping(SUARA_M3, "vc", pusatV(240, 6), { setelah: "C." }), tambah(idx(SUARA_M3, "enam", 2), tinggiV("vc", 240, 6, "6 kotak"))),
    k(SUARA_M4, tambah("Ujung", garisTinggi("gu", 139, 251, 6)), tambah("sama", ...kartu("ks", 100, 28, 100, 26, W.emas, ["sama tinggi"], 10))),
    k(
      SUARA_M5,
      tambah("Ada", ...pohon("va", 60, 8, "Pohon A", W.langit), tinggiV("va", 60, 8, "8 kotak")),
      ubah("Lebihnya", ...ids("va", 6, 7).map((id) => ({ id, warna: W.emas }))),
    ),
  ],
};

/* ------------------------------ 7. Paling panjang dan paling pendek ------------------------------ */
export const TALI = [
  { s: "ua", n: 5, y: 44, warna: W.merahMuda, nama: "Tali merah" },
  { s: "ub", n: 9, y: 82, warna: W.langit, nama: "Tali biru" },
  { s: "uc", n: 3, y: 120, warna: W.hijauMuda, nama: "Tali hijau" },
  { s: "ud", n: 7, y: 158, warna: W.krem, nama: "Tali kuning" },
];
const baris = (i: number, y: number = TALI[i].y): Obj[] => [namaH(TALI[i].s, y, TALI[i].nama), ...satuanH(TALI[i].s, y, TALI[i].n, TALI[i].warna)];
const panjang = (i: number, y: number = TALI[i].y): Obj => panjangH(TALI[i].s, y, TALI[i].n, `${TALI[i].n} kotak`);
const SUARA_L1 = "Sekarang ada empat tali, yaitu merah, biru, hijau, dan kuning. Semuanya mulai dari garis awal yang sama.";
const SUARA_L2 = "Tali merah panjangnya lima kotak. Tali biru sembilan kotak. Tali hijau tiga kotak. Tali kuning tujuh kotak.";
const SUARA_L3 = "Tali biru paling panjang. Ujungnya paling jauh dari garis awal.";
const SUARA_L4 = "Tali hijau paling pendek. Ujungnya paling dekat dengan garis awal.";
const SUARA_L5 = "Tali biru lebih panjang dari tali merah, tali kuning, dan tali hijau. Tali hijau lebih pendek dari tali merah, tali kuning, dan tali biru.";
const SUARA_L6 = "Ingat aturannya. Untuk dua benda, kita memakai kata lebih. Untuk tiga benda atau lebih, kita memakai kata paling.";

export const ADEGAN_PALING_PANJANG: AdeganStory = {
  id: "paling-panjang",
  judul: "Paling panjang dan paling pendek",
  sumber: "Materi: paling panjang, paling pendek",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Empat tali")),
      tambah(idx(SUARA_L1, "merah"), ...baris(0)),
      tambah(idx(SUARA_L1, "biru"), ...baris(1)),
      tambah(idx(SUARA_L1, "hijau"), ...baris(2)),
      tambah(idx(SUARA_L1, "kuning"), ...baris(3)),
      tambah("garis", ...garisAwal(36, 178)),
    ),
    k(
      SUARA_L2,
      tambah(idx(SUARA_L2, "lima"), panjang(0)),
      tambah(idx(SUARA_L2, "sembilan"), panjang(1)),
      tambah(idx(SUARA_L2, "tiga"), panjang(2)),
      tambah(idx(SUARA_L2, "tujuh"), panjang(3)),
    ),
    k(SUARA_L3, sorotkan(0, ...ids("ub", 0, 8)), tambah("jauh", emo("tr", 285, 94, "\u{1F3C6}", 18))),
    k(SUARA_L4, redamkan(0, ...ids("ub", 0, 8)), sorotkan("pendek.", ...ids("uc", 0, 2)), ubah("pendek.", { id: "tr", y: 132 })),
    k(
      SUARA_L5,
      redamkan(0, ...ids("uc", 0, 2)),
      sorotkan(idx(SUARA_L5, "biru"), ...ids("ub", 0, 8)),
      redamkan(idx(SUARA_L5, "hijau", 2), ...ids("ub", 0, 8)),
      sorotkan(idx(SUARA_L5, "hijau", 2), ...ids("uc", 0, 2)),
      hapus(idx(SUARA_L5, "hijau", 2), "tr"),
    ),
    k(
      SUARA_L6,
      bersih(0),
      tambah(0, judul("Aturan kata")),
      tambah("dua", ...kartu("ra", 14, 36, 272, 52, W.hijauMuda, ["dua benda: kata lebih", "pita Kira lebih panjang dari pita Upe"], 9.6)),
      tambah("tiga", ...kartu("rb", 14, 100, 272, 52, W.pink, ["tiga benda atau lebih: kata paling", "tali biru paling panjang"], 9.6)),
      tambah("paling.", emo("ow", 262, 180, OWL, 24)),
    ),
  ],
};

/* ------------------------------ 8. Mengurutkan tali ------------------------------ */
const SUARA_U1 = "Sekarang kita urutkan keempat tali, dari yang paling pendek ke yang paling panjang.";
const SUARA_U2 = "Pertama, cari tali yang paling pendek. Itu tali hijau, tiga kotak. Pindahkan tali hijau ke tempat paling atas.";
const SUARA_U3 = "Berikutnya tali merah, lima kotak. Tali merah sudah berada di tempat kedua, jadi tidak perlu pindah.";
const SUARA_U4 = "Lalu tali kuning, tujuh kotak. Tali kuning lebih pendek dari tali biru. Jadi tali kuning pindah ke atas tali biru.";
const SUARA_U5 = "Selesai! Dari yang paling pendek, urutannya tali hijau, tali merah, tali kuning, lalu tali biru. Semakin ke bawah, tali semakin panjang.";
const SUARA_U6 = "Kalau diurutkan dari yang paling panjang, urutannya terbalik. Tali biru paling panjang, dan tali hijau paling pendek.";
const BARIS_Y = [44, 82, 120, 158];

export const ADEGAN_URUTKAN: AdeganStory = {
  id: "urutkan",
  judul: "Mengurutkan empat tali",
  sumber: "Materi: mengurutkan panjang",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Urutkan tali")),
      tambah("keempat", ...[0, 1, 2, 3].flatMap((i) => [...baris(i), panjang(i)]), ...garisAwal(36, 178)),
    ),
    k(
      SUARA_U2,
      sorotkan("hijau,", ...ids("uc", 0, 2)),
      pindahBatang("Pindahkan", "uc", 3, BARIS_Y[0]),
      pindahBatang("Pindahkan", "ua", 5, BARIS_Y[1]),
      pindahBatang("Pindahkan", "ub", 9, BARIS_Y[2]),
    ),
    k(SUARA_U3, redamkan(0, ...ids("uc", 0, 2)), sorotkan("merah,", ...ids("ua", 0, 4))),
    k(SUARA_U4, redamkan(0, ...ids("ua", 0, 4)), sorotkan("kuning,", ...ids("ud", 0, 6)), pindahBatang("pindah", "ud", 7, BARIS_Y[2]), pindahBatang("pindah", "ub", 9, BARIS_Y[3])),
    k(SUARA_U5, redamkan(0, ...ids("ud", 0, 6)), tambah("Selesai!", emo("ok", 284, 196, "✅", 18))),
    k(
      SUARA_U6,
      bersih(0),
      tambah(0, judul("Dua cara mengurutkan")),
      tambah("paling@2", ...kartu("oa", 14, 36, 272, 52, W.hijauMuda, ["dari paling pendek:", "hijau, merah, kuning, biru"], 10)),
      tambah("terbalik.", ...kartu("ob", 14, 100, 272, 52, W.langit, ["dari paling panjang:", "biru, kuning, merah, hijau"], 10)),
    ),
  ],
};
