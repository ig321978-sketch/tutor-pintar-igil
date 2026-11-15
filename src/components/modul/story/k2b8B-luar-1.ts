import type { AdeganStory, Obj } from "./logika-story";
import { BULAT, OWL, W, diagram, emo, judul, kartu, kartuAngka, pilihan, teks, type Kat } from "./k2b8B-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah } from "./k2b8B-bantu";

export const NAMA_METODE_ID = ["Diagram Gambar", "Kunci Gambar", "Banding Kategori"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];
export const KUNING = "#EAB308";

/** Data balon warna untuk metode luar: merah enam, biru empat, kuning lima (jumlah lima belas). */
export const BALON: Kat[] = [
  { nama: "merah", n: 6, g: BULAT, warna: W.merah },
  { nama: "biru", n: 4, g: BULAT, warna: W.biruGambar },
  { nama: "kuning", n: 5, g: BULAT, warna: KUNING },
];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Buang judul diagram (judul adegan luar diganti kepala metode). */
export const tanpaJudul = (objs: Obj[]): Obj[] => objs.filter((o) => !/jd$/.test(o.id));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berbeda untuk membaca dan menyajikan data. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Diagram Gambar, Kunci Gambar, dan Banding Kategori.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana kita membaca data dari gambar dengan mudah dan benar?";
const SUARA_O4 = "Kita memakai balon warna di layar. Ada balon merah, balon biru, dan balon kuning.";
const SUARA_O5 = "Semua jumlahnya tidak lebih dari dua puluh. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membaca diagram",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah("Diagram", ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah("Kunci", ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah("Banding", ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F4CA}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana membaca data dari gambar", "dengan mudah dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Balon warna di layar")),
      tambah("merah,", teks("bm", 60, 112, BULAT, 44, W.merah)),
      tambah("biru,", teks("bb", 150, 112, BULAT, 44, W.biruGambar)),
      tambah("kuning.", teks("bk", 240, 112, BULAT, 44, KUNING)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai dua puluh")),
      ...[6, 4, 5, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 20 + i * 66, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink][i], 54, 36, 18))),
      tambah("dua", ...kartuAngka("ob4", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Diagram Gambar: konsep ------------------------------ */
const DW = diagram("dw", BALON, "Balon warna", "balon", { y0: 66, rowH: 30, ketY: 176 });
const SUARA_C1 = "Metode pertama bernama Diagram Gambar. Satu gambar mewakili satu benda, dan barisnya dibaca dari kiri ke kanan.";
const SUARA_C2 = "Balon merah ada enam, jadi enam lingkaran merah.";
const SUARA_C3 = "Biru ada empat, jadi empat lingkaran. Kuning ada lima, jadi lima lingkaran.";
const SUARA_C4 = "Semua lingkaran sama bentuk dan sama besar. Keterangan di bawah menjelaskan artinya.";
const SUARA_C5 = "Barisnya berjajar ke samping, jadi mudah melihat bahwa merah paling banyak.";

export const ADEGAN_LUAR_GAMBAR: AdeganStory = {
  id: "luar-gambar",
  judul: "Diagram Gambar: satu gambar satu benda",
  sumber: "Metode luar: Diagram Gambar",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("pertama", ...kepala(0)), tambah("Satu", ...tanpaJudul(DW.dasar)), tambah("benda,", DW.label(0), DW.label(1), DW.label(2))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "enam", 2), ...DW.gambar(0))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "empat", 2), ...DW.gambar(1)), tambah(idx(SUARA_C3, "lima", 2), ...DW.gambar(2))),
    k(SUARA_C4, sorotkan("Semua", ...DW.idSemua), redamkan("Keterangan", ...DW.idSemua), sorotkan("Keterangan", "dwk")),
    k(SUARA_C5, redamkan(0, "dwk"), sorotkan("merah", ...DW.idGambar(0))),
  ],
};

/* ------------------------------ 3. Diagram Gambar: terapan ------------------------------ */
const HIJAU: Kat[] = [{ nama: "hijau", n: 7, g: BULAT, warna: W.hijau }];
const DU = diagram("du", HIJAU, "Balon hijau", "balon", { y0: 72, rowH: 30, ketY: 176 });
const SUARA_D1 = "Terapkan pada balon hijau. Ada tujuh balon hijau di layar. Kita buat diagram gambarnya.";
const SUARA_D2 = "Berapa lingkaran yang harus dibuat? Ketuk jawabannya. Enam, tujuh, atau delapan?";
const SUARA_D3 = "Betul! Tujuh balon, tujuh lingkaran. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_D4 = "Tujuh lingkaran hijau sama dengan tujuh balon. Satu gambar untuk satu benda.";

export const ADEGAN_LUAR_GAMBAR_TERAPAN: AdeganStory = {
  id: "luar-gambar-terapan",
  judul: "Diagram Gambar: balon hijau",
  sumber: "Metode luar: Diagram Gambar, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(0)), tambah("diagram", ...tanpaJudul(DU.dasar), DU.label(0))),
    k(SUARA_D2, tambah("Berapa", ...pilihan(112, ["6", "7", "8"]))),
    k(SUARA_D3, sorotkan("Betul!", "c2-k"), ...hitungAksi(SUARA_D3, DU.gambar(0), { setelah: "lingkaran." }), tambah(idx(SUARA_D3, "tujuh", 3), DU.angka(0))),
    k(SUARA_D4, redamkan(0, "c2-k"), hapus(0, "c1-k", "c1-t", "c3-k", "c3-t"), tambah("Tujuh", emo("ok", 262, 80, "✅", 22)), sorotkan("Tujuh", ...DU.idGambar(0))),
  ],
};
