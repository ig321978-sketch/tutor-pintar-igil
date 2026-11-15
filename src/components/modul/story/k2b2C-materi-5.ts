import type { AdeganStory, Obj } from "./logika-story";
import { EMO, OWL, W, bendaDi, emo, jumlahG, judul, kartu, kotak, namaG, petakKosong, teks, titikBaris, titikPetak } from "./k2b2C-gambar";
import { bersih, hapus, idx, ids, k, pilihKata, pindahKe, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 138, u = 15): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ Latihan 1: balon Upe dan Igil (lebihnya) ------------------------------ */
const xB = (i: number): number => 46 + 22 * i;
const ptsUpe = titikBaris(7, 46, 66, 22);
const ptsIgilTujuh = titikBaris(7, 46, 112, 22);
const ptsIgilEmpat = titikBaris(4, xB(7), 112, 22);
const SUARA_L1 = "Latihan satu. Upe punya tujuh balon. Igil punya empat balon lebihnya dari Upe. Berapa balon Igil?";
const SUARA_L2 = "Ayo pilih jawaban yang benar untuk soal ini.";
const SUARA_L3 = "Igil punya lebih banyak dari Upe, jadi kita pilih tambah. Tujuh ditambah empat sama dengan sebelas.";
const SUARA_L4 = "Jawabannya pilihan kedua, yaitu sebelas. Balon Igil ada sebelas buah.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: balon Igil",
  sumber: "Materi: Latihan 1",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_L1, "Upe"), namaG("a", 6, 62, "Upe")),
      tambah(idx(SUARA_L1, "tujuh"), ...bendaDi("a", EMO.balon, ptsUpe, 17), jumlahG("a", 286, 64, "7")),
      tambah(idx(SUARA_L1, "Igil"), namaG("b", 6, 108, "Igil"), jumlahG("b", 286, 110, "?")),
      tambah(idx(SUARA_L1, "lebihnya"), ...bendaDi("b", EMO.balon, ptsIgilTujuh, 17), ...Array.from({ length: 4 }, (_, q) => petakKosong(`pk${7 + q}`, xB(7 + q), 112))),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "pilih"), ...pilihKata(156, ["3", "11", "12"], 14))),
    k(
      SUARA_L3,
      hapus(idx(SUARA_L3, "pilih"), ...ids("pk", 7, 10)),
      tambah(idx(SUARA_L3, "pilih"), ...ptsIgilEmpat.map((p, q) => emo(`eb${7 + q}`, p.x, p.y, EMO.balon, 17))),
      tambah(idx(SUARA_L3, "Tujuh"), ex("7 + 4 = 11")),
      ubah(idx(SUARA_L3, "sebelas"), { id: "eb-ln", isi: "11" }),
    ),
    k(SUARA_L4, sorotkan(idx(SUARA_L4, "kedua"), "c2-k", "c2-t"), tambah(idx(SUARA_L4, "Balon"), emo("ok", 262, 140, "✅", 18))),
  ],
};

/* ------------------------------ Latihan 2: kelereng Malosi (diberikan) ------------------------------ */
export const SLOT_MALOSI = titikPetak(17, 5, 26, 62, 30, 26);
export const PTS_WEI = titikPetak(8, 3, 226, 66, 26, 26);
const SUARA_M1 = "Latihan dua. Malosi punya tujuh belas kelereng. Malosi memberikan delapan kelereng kepada Wei.";
const SUARA_M2 = "Berapa kelereng Malosi sekarang? Ayo pilih jawabannya.";
const SUARA_M3 = "Kelereng yang diberikan akan berkurang, jadi kita pilih kurang.";
const SUARA_M4 = "Tujuh belas dikurangi delapan sama dengan sembilan. Jawabannya pilihan kedua.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kelereng Malosi",
  sumber: "Materi: Latihan 2",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_M1, "Malosi"), kotak("mb", 6, 28, 186, 118, W.langit, W.biru, { rx: 8, z: -1 }), namaG("m", 14, 44, "Malosi")),
      tambah(idx(SUARA_M1, "tujuh"), ...bendaDi("a", EMO.kelereng, SLOT_MALOSI.slice(0, 9), 17), ...bendaDi("b", EMO.kelereng, SLOT_MALOSI.slice(9, 17), 17), teks("tot", 134, 46, "17 kelereng", 10, W.merah)),
      tambah(idx(SUARA_M1, "Wei"), kotak("wb", 204, 28, 90, 118, W.hijauMuda, W.biru, { rx: 8, z: -1 }), namaG("w", 212, 44, "Wei")),
    ),
    k(SUARA_M2, tambah(idx(SUARA_M2, "pilih"), ...pilihKata(168, ["8", "9", "10"], 14))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "diberikan"), ...ids("eb", 0, 7)), pindahKe(idx(SUARA_M3, "berkurang"), "b", PTS_WEI, 0)),
    k(SUARA_M4, redamkan(0, ...ids("eb", 0, 7)), tambah(idx(SUARA_M4, "Tujuh"), ex("17 − 8 = 9", "ex", 150, 161, 14)), sorotkan(idx(SUARA_M4, "kedua"), "c2-k", "c2-t"), tambah(idx(SUARA_M4, "sembilan"), jumlahG("a", 176, 46, "9"))),
  ],
};

/* ------------------------------ Latihan 3: stiker tiga anak (tiga bilangan) ------------------------------ */
const ptsUpeS = titikBaris(6, 46, 58, 22);
const ptsWeiS = titikBaris(4, 46, 94, 22);
const ptsIgilS = titikBaris(9, 46, 130, 22);
const SUARA_N1 = "Latihan tiga. Upe punya enam stiker. Wei punya empat stiker. Igil punya sembilan stiker.";
const SUARA_N2 = "Berapa jumlah semua stiker? Ayo pilih jawabannya.";
const SUARA_N3 = "Enam dan empat adalah pasangan sepuluh. Kita jumlahkan dua itu dulu. Enam ditambah empat sama dengan sepuluh.";
const SUARA_N4 = "Lalu sepuluh ditambah sembilan sama dengan sembilan belas. Jawabannya pilihan ketiga.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: stiker tiga anak",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_N1, "Upe"), namaG("a", 6, 54, "Upe"), ...bendaDi("a", EMO.bintang, ptsUpeS, 17), jumlahG("a", 280, 56, "6")),
      tambah(idx(SUARA_N1, "Wei"), namaG("b", 6, 90, "Wei"), ...bendaDi("b", EMO.bintang, ptsWeiS, 17), jumlahG("b", 280, 92, "4")),
      tambah(idx(SUARA_N1, "Igil"), namaG("c", 6, 126, "Igil"), ...bendaDi("c", EMO.bintang, ptsIgilS, 17), jumlahG("c", 280, 128, "9")),
    ),
    k(SUARA_N2, tambah(idx(SUARA_N2, "pilih"), ...pilihKata(158, ["18", "20", "19"], 14))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "pasangan"), kotak("br", 3, 38, 294, 62, "#FEF3C7", W.merah, { rx: 6, tebal: 1.2, putus: true, z: -1 })), tambah(idx(SUARA_N3, "Enam", 2), ex("6 + 4 = 10", "ex", 150, 148))),
    k(SUARA_N4, ubah(idx(SUARA_N4, "Lalu"), { id: "br", h: 98 }, { id: "ex", isi: "10 + 9 = 19" }), sorotkan(idx(SUARA_N4, "ketiga"), "c3-k", "c3-t")),
  ],
};

/* ------------------------------ Penutup ------------------------------ */
const SUARA_E1 = "Hari ini kita sudah belajar soal cerita penjumlahan dan pengurangan. Kita mulai dengan empat kata kunci.";
const SUARA_E2 = "Kita selesaikan soal dengan empat langkah: diketahui, ditanya, solusi, dan kesimpulan.";
const SUARA_E3 = "Kita memeriksa jawaban dengan operasi lawan. Kalau tadi menambah, kita periksa dengan mengurangi.";
const SUARA_E4 = "Kita juga bisa mencari bilangan awal, menjumlahkan tiga bilangan, dan membuat soal cerita sendiri.";
const SUARA_E5 = "Kerja bagus! Sampai jumpa lagi di video berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan dan penutup",
  sumber: "Materi: ringkasan soal cerita",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Yang kita pelajari")), tambah(idx(SUARA_E1, "kata"), ...kartu("r1", 20, 34, 260, 32, W.hijauMuda, ["1. empat kata kunci"], 10))),
    k(SUARA_E2, tambah(idx(SUARA_E2, "langkah:"), ...kartu("r2", 20, 74, 260, 32, W.krem, ["2. diketahui, ditanya, solusi, jadi"], 10))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "operasi"), ...kartu("r3", 20, 114, 260, 32, W.pink, ["3. periksa dengan operasi lawan"], 10))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "bilangan"), ...kartu("r4", 20, 154, 260, 32, W.langit, ["4. bilangan awal, tiga bilangan, soal buatan"], 9.4))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Kerja bagus!")), tambah(0, emo("pe", 150, 110, "\u{1F389}", 54), emo("ow", 262, 170, OWL, 28))),
  ],
};
