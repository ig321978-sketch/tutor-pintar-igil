import type { AdeganStory } from "./logika-story";
import { EMO, MIN, W, anak, buatSusun, emo, judul, kartu, teks } from "./k3b1E-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1E-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);
const baris = (id: string, y: number, isi: string, u = 14, warna: string = W.biru) => teks(id, 150, y, isi, u, warna);

/* ------------------------------ 10. Susun panjang: menguraikan ------------------------------ */
const SUARA_Y1 = "Ada cara lain yang disebut susun panjang. Susun panjang menguraikan bilangan menjadi puluhan dan satuan.";
const SUARA_Y2 = "Empat puluh lima diurai menjadi empat puluh ditambah lima.";
const SUARA_Y3 = "Sembilan belas diurai menjadi sepuluh ditambah sembilan.";
const SUARA_Y4 = "Lima lebih kecil dari sembilan, jadi empat puluh diurai lagi menjadi tiga puluh ditambah sepuluh.";
const SUARA_Y5 = "Sekarang empat puluh lima menjadi tiga puluh, sepuluh, dan lima. Sepuluh dan lima dijadikan satu, yaitu lima belas.";

export const ADEGAN_URAI: AdeganStory = {
  id: "urai",
  judul: "Susun panjang: menguraikan bilangan",
  sumber: "Materi: susun panjang",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Susun panjang")), tambah(idx(SUARA_Y1, "susun"), ...kartu("y0", 50, 32, 200, 26, W.emas, [`45 ${MIN} 19`], 13))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "diurai"), baris("u1", 86, "45 = 40 + 5"))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "diurai"), baris("u2", 112, "19 = 10 + 9"))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "lagi"), baris("u3", 138, "40 = 30 + 10", 14, W.merah))),
    k(SUARA_Y5, tambah(idx(SUARA_Y5, "menjadi"), baris("u4", 164, "45 = 30 + 10 + 5")), tambah(idx(SUARA_Y5, "yaitu"), baris("u5", 190, "10 + 5 = 15", 14, W.merah))),
  ],
};

/* ------------------------------ 11. Susun panjang: menghitung ------------------------------ */
const SUARA_H1 = "Kurangkan satuannya dahulu. Lima belas dikurangi sembilan sama dengan enam.";
const SUARA_H2 = "Kurangkan puluhannya. Tiga puluh dikurangi sepuluh sama dengan dua puluh.";
const SUARA_H3 = "Gabungkan kedua hasilnya. Dua puluh ditambah enam sama dengan dua puluh enam.";
const SUARA_H4 = "Hasil susun panjang sama dengan hasil susun pendek, yaitu dua puluh enam.";
const SUARA_H5 = "Susun pendek lebih ringkas, dan susun panjang lebih jelas. Kamu boleh memilih cara yang kamu suka.";

export const ADEGAN_HITUNG_PANJANG: AdeganStory = {
  id: "hitung-panjang",
  judul: "Susun panjang: mengurangkan",
  sumber: "Materi: susun panjang",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Susun panjang: kurangkan"), baris("rf1", 40, "45 = 30 + 10 + 5", 11, W.ungu), baris("rf2", 58, "19 = 10 + 9", 11, W.ungu)), tambah(idx(SUARA_H1, "Lima"), baris("q1", 92, `15 ${MIN} 9 = 6`, 14, W.merah))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "Tiga"), baris("q2", 120, `30 ${MIN} 10 = 20`, 14, W.merah))),
    k(SUARA_H3, tambah(idx(SUARA_H3, "Dua"), baris("q3", 148, "20 + 6 = 26", 14, W.merah))),
    k(SUARA_H4, tambah(idx(SUARA_H4, "panjang"), ...kartu("hp1", 14, 160, 134, 28, W.hijauMuda, ["susun panjang: 26"], 9)), tambah(idx(SUARA_H4, "pendek,"), ...kartu("hp2", 152, 160, 134, 28, W.langit, ["susun pendek: 26"], 9))),
    k(SUARA_H5, tambah(idx(SUARA_H5, "Susun"), emo("hk", 270, 40, "✅", 22)), tambah(idx(SUARA_H5, "memilih"), cap(`45 ${MIN} 19 = 26`))),
  ],
};

/* ------------------------------ 12. Periksa dengan penjumlahan ------------------------------ */
const SJ = buatSusun(26, 19, { op: "+" });
const SUARA_P1 = "Pengurangan dan penjumlahan saling berkaitan. Karena empat puluh lima dikurangi sembilan belas sama dengan dua puluh enam, maka dua puluh enam ditambah sembilan belas sama dengan empat puluh lima.";
const SUARA_P2 = "Kita periksa dengan susun. Satuan: enam ditambah sembilan sama dengan lima belas, catat lima dan simpan satu puluhan.";
const SUARA_P3 = "Puluhan: dua ditambah satu, lalu ditambah simpanan satu, sama dengan empat.";
const SUARA_P4 = "Hasilnya empat puluh lima, sama dengan bilangan semula. Jadi pekerjaan kita benar.";
const SUARA_P5 = "Jika hasilnya tidak sama, berarti ada langkah yang keliru. Kita periksa lagi dari satuan.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Periksa dengan penjumlahan",
  sumber: "Materi: memeriksa hasil",
  latar: "#F7FEE7",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Saling berkaitan")), tambah(idx(SUARA_P1, "dikurangi"), baris("pc1", 70, `45 ${MIN} 19 = 26`, 15)), tambah(idx(SUARA_P1, "maka"), emo("pa", 150, 98, "\u{1F501}", 22), baris("pc2", 140, "26 + 19 = 45", 15, W.merah))),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Periksa dengan susun")),
      tambah(idx(SUARA_P2, "susun"), ...SJ.kerangka(), ...SJ.atas(), ...SJ.bawah()),
      tambah(idx(SUARA_P2, "simpan"), SJ.puluhBaru()),
      tambah(idx(SUARA_P2, "belas,"), teks("pq", 215, 90, "6 + 9 = 15", 12, W.merah)),
      tambah(idx(SUARA_P2, "lima", 2), SJ.hasil0()),
    ),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Puluhan:"), "sg-a1", "sg-b1", "sg-p1"), tambah(idx(SUARA_P3, "empat."), SJ.hasil1())),
    k(SUARA_P4, redamkan(0, "sg-a1", "sg-b1", "sg-p1"), tambah(idx(SUARA_P4, "Jadi"), cap("26 + 19 = 45"))),
    k(SUARA_P5, tambah(idx(SUARA_P5, "keliru."), emo("cr", 200, 80, "\u{1F50D}", 30))),
  ],
};

/* ------------------------------ 13. Bunga Halim: satuan atas nol ------------------------------ */
const SN = buatSusun(80, 46);
const SUARA_N1 = "Halim punya delapan puluh bunga mawar di kebun. Empat puluh enam bunga ia berikan kepada Igil.";
const SUARA_N2 = "Kita susun delapan puluh di atas empat puluh enam. Satuan atas nol, dan nol lebih kecil dari enam.";
const SUARA_N3 = "Kita ambil satu puluhan dari delapan puluhan. Delapan puluhan tinggal tujuh puluhan.";
const SUARA_N4 = "Satu puluhan menjadi sepuluh satuan. Sepuluh satuan ditambah nol satuan sama dengan sepuluh satuan.";
const SUARA_N5 = "Satuan: sepuluh dikurangi enam sama dengan empat. Puluhan: tujuh dikurangi empat sama dengan tiga.";
const SUARA_N6 = "Sisa bunga Halim tiga puluh empat. Periksa: tiga puluh empat ditambah empat puluh enam sama dengan delapan puluh.";

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Bunga Halim: satuan atas nol",
  sumber: "Materi: contoh satuan atas nol",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Bunga Halim")),
      tambah(idx(SUARA_N1, "Halim"), ...anak("halim", 40, 80)),
      tambah(idx(SUARA_N1, "mawar"), emo("mw", 150, 100, EMO.mawar, 44)),
      tambah(idx(SUARA_N1, "puluh"), ...kartu("na", 10, 150, 90, 30, W.hijauMuda, ["80 bunga"], 11)),
      tambah(idx(SUARA_N1, "enam"), ...kartu("nb", 105, 150, 100, 30, W.merahMuda, ["diberikan 46"], 11)),
      tambah(idx(SUARA_N1, "Igil."), ...anak("igil", 260, 80)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Bunga Halim")),
      tambah(idx(SUARA_N2, "Kita"), ...SN.kerangka()),
      tambah(idx(SUARA_N2, "puluh"), ...SN.atas()),
      tambah(idx(SUARA_N2, "enam"), ...SN.bawah()),
      sorotkan(idx(SUARA_N2, "Satuan"), "sg-a0", "sg-b0"),
    ),
    k(SUARA_N3, redamkan(0, "sg-a0", "sg-b0"), tambah(idx(SUARA_N3, "ambil"), SN.coret()[0]), tambah(idx(SUARA_N3, "tinggal"), SN.puluhBaru())),
    k(SUARA_N4, tambah(idx(SUARA_N4, "sepuluh"), SN.coret()[1], SN.satuBaru()), tambah(idx(SUARA_N4, "sama"), cap(`10 + 0 = 10`))),
    k(SUARA_N5, ubah(idx(SUARA_N5, "sepuluh"), { id: "cp", isi: `10 ${MIN} 6 = 4` }), tambah(idx(SUARA_N5, "empat."), SN.hasil0()), tambah(idx(SUARA_N5, "tiga."), SN.hasil1())),
    k(SUARA_N6, ubah(idx(SUARA_N6, "Periksa:"), { id: "cp", isi: "34 + 46 = 80" }), sorotkan(idx(SUARA_N6, "Sisa"), "sg-r1", "sg-r0")),
  ],
};

/* ------------------------------ 14. Balon Igil: memilih cara ------------------------------ */
const SC = buatSusun(74, 38);
const SUARA_G1 = "Igil punya tujuh puluh empat balon. Tiga puluh delapan balon pecah ditiup angin.";
const SUARA_G2 = "Cara pertama, susun pendek. Empat kurang dari delapan, jadi kita ambil satu puluhan. Empat belas dikurangi delapan sama dengan enam.";
const SUARA_G3 = "Puluhan: enam dikurangi tiga sama dengan tiga. Jadi hasilnya tiga puluh enam.";
const SUARA_G4 = "Cara kedua, susun panjang. Tujuh puluh empat sama dengan enam puluh ditambah empat belas, dan tiga puluh delapan sama dengan tiga puluh ditambah delapan.";
const SUARA_G5 = "Empat belas dikurangi delapan sama dengan enam, dan enam puluh dikurangi tiga puluh sama dengan tiga puluh. Tiga puluh ditambah enam sama dengan tiga puluh enam.";
const SUARA_G6 = "Kedua cara hasilnya sama. Pilih cara yang paling kamu mengerti.";

export const ADEGAN_PILIH_CARA: AdeganStory = {
  id: "pilih-cara",
  judul: "Balon Igil: dua cara",
  sumber: "Materi: memilih cara mengurangkan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Balon Igil")),
      tambah(idx(SUARA_G1, "Igil"), ...anak("igil", 40, 80)),
      tambah(idx(SUARA_G1, "balon."), emo("bl", 150, 100, EMO.balon, 44)),
      tambah(idx(SUARA_G1, "empat"), ...kartu("ga", 10, 150, 90, 30, W.hijauMuda, ["74 balon"], 11)),
      tambah(idx(SUARA_G1, "delapan"), ...kartu("gb", 105, 150, 100, 30, W.merahMuda, ["pecah 38"], 11)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Cara pertama: susun pendek"), ...SC.kerangka(), ...SC.atas(), ...SC.bawah()),
      tambah(idx(SUARA_G2, "ambil"), ...SC.coret(), SC.puluhBaru(), SC.satuBaru()),
      tambah(idx(SUARA_G2, "enam."), SC.hasil0()),
    ),
    k(SUARA_G3, tambah(idx(SUARA_G3, "tiga", 2), SC.hasil1()), tambah(idx(SUARA_G3, "Jadi"), cap(`74 ${MIN} 38 = 36`))),
    k(SUARA_G4, bersih(0), tambah(0, judul("Cara kedua: susun panjang")), tambah(idx(SUARA_G4, "Tujuh"), baris("ur1", 60, "74 = 60 + 14")), tambah(idx(SUARA_G4, "delapan", 2), baris("ur2", 92, "38 = 30 + 8"))),
    k(SUARA_G5, tambah(idx(SUARA_G5, "Empat"), baris("ur3", 124, `14 ${MIN} 8 = 6`, 13, W.merah)), tambah(idx(SUARA_G5, "enam", 2), baris("ur4", 148, `60 ${MIN} 30 = 30`, 13, W.merah)), tambah(idx(SUARA_G5, "ditambah"), baris("ur5", 172, "30 + 6 = 36", 13, W.merah))),
    k(SUARA_G6, tambah(idx(SUARA_G6, "sama."), emo("gk", 150, 196, "✅", 22))),
  ],
};
