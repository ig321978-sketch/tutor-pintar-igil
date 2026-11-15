import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BIRU, EMO_MERAH, W, angkaTabel, batangP, batangTabel, benda, emo, judul, kartu, kerangkaTabel, kotakSepuluh, kubusS, kubusTabel, labelBaris, nilaiV, titikPetak, type Kotak10 } from "./k2b2A-gambar";
import { bersih, hapus, idx, ids, k, redamkan, sorotkan, tambah } from "./k2b2A-bantu";

const rentang = (dari: number, sampai: number, buat: (i: number) => Obj): Obj[] => Array.from({ length: sampai - dari }, (_, q) => buat(dari + q));

/* ------------------------------ 6. Urutan boleh ditukar ------------------------------ */
const SUARA_U1 = "Dua belas ditambah enam sama dengan delapan belas. Sekarang kita tukar urutannya.";
const SUARA_U2 = "Sekarang enam ditambah dua belas sama dengan delapan belas. Hasilnya tidak berubah.";
const SUARA_U3 = "Mulai dari dua belas, kita hanya perlu enam loncatan. Mulai dari enam, perlu dua belas loncatan.";
const SUARA_U4 = "Jadi, mulailah dari bilangan yang lebih besar. Loncatannya lebih sedikit, jadi lebih cepat.";

export const ADEGAN_TUKAR_URUTAN: AdeganStory = {
  id: "tukar-urutan",
  judul: "Urutan boleh ditukar",
  sumber: "Materi: urutan penjumlahan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Urutan boleh ditukar")), tambah(idx(SUARA_U1, "ditambah"), ...kartu("e1", 50, 36, 200, 30, W.krem, ["12 + 6 = 18"], 14))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "ditambah"), ...kartu("e2", 50, 76, 200, 30, W.langit, ["6 + 12 = 18"], 14))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "perlu"), ...kartu("m1", 40, 118, 220, 26, W.hijauMuda, ["mulai 12: 6 loncatan"], 11)), tambah(idx(SUARA_U3, "perlu", 2), ...kartu("m2", 40, 152, 220, 26, W.pink, ["mulai 6: 12 loncatan"], 11))),
    k(SUARA_U4, sorotkan(idx(SUARA_U4, "besar."), "m1-k"), tambah(idx(SUARA_U4, "cepat."), emo("ok", 150, 198, "✅", 20))),
  ],
};

/* ------------------------------ 7. Sahabat sepuluh ------------------------------ */
const GB: Kotak10 = { x: 75, y: 50, c: 30 };
const merah = (i: number): Obj => benda("a", i, titikPetak(i, GB, 22).x, titikPetak(i, GB, 22).y, EMO_MERAH, 22);
const biru = (m: number, j: number): Obj => benda("b", j, titikPetak(m + j, GB, 22).x, titikPetak(m + j, GB, 22).y, EMO_BIRU, 22);
const SUARA_S1 = "Ada dua bilangan yang jumlahnya selalu sepuluh. Kita sebut keduanya sahabat sepuluh.";
const SUARA_S2 = "Empat dan enam adalah sahabat sepuluh. Empat ditambah enam sama dengan sepuluh.";
const SUARA_S3 = "Tujuh dan tiga juga sahabat sepuluh. Tujuh ditambah tiga sama dengan sepuluh.";
const SUARA_S4 = "Lima dan lima pun sahabat sepuluh. Lima ditambah lima sama dengan sepuluh.";
const SUARA_S5 = "Masih banyak sahabat sepuluh lainnya. Ada sembilan dan satu, juga delapan dan dua.";

export const ADEGAN_SAHABAT_SEPULUH: AdeganStory = {
  id: "sahabat-sepuluh",
  judul: "Sahabat sepuluh",
  sumber: "Materi: sahabat sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Sahabat sepuluh")), tambah(idx(SUARA_S1, "selalu"), ...kotakSepuluh("a", 0, GB)), tambah(idx(SUARA_S1, "sepuluh."), ...kartu("sb", 90, 130, 120, 26, W.emas, ["jumlahnya 10"], 11))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "Empat"), ...rentang(0, 4, merah)), tambah(idx(SUARA_S2, "enam"), ...rentang(0, 6, (j) => biru(4, j))), tambah(idx(SUARA_S2, "ditambah"), ...kartu("eq", 90, 166, 120, 26, W.krem, ["4 + 6 = 10"], 12))),
    k(SUARA_S3, hapus(0, ...ids("ea", 0, 3), ...ids("eb", 0, 5), "eq-k", "eq-t0"), tambah(idx(SUARA_S3, "Tujuh"), ...rentang(0, 7, merah)), tambah(idx(SUARA_S3, "tiga"), ...rentang(0, 3, (j) => biru(7, j))), tambah(idx(SUARA_S3, "ditambah"), ...kartu("eq", 90, 166, 120, 26, W.krem, ["7 + 3 = 10"], 12))),
    k(SUARA_S4, hapus(0, ...ids("ea", 0, 6), ...ids("eb", 0, 2), "eq-k", "eq-t0"), tambah(idx(SUARA_S4, "Lima"), ...rentang(0, 5, merah)), tambah(idx(SUARA_S4, "lima", 2), ...rentang(0, 5, (j) => biru(5, j))), tambah(idx(SUARA_S4, "ditambah"), ...kartu("eq", 90, 166, 120, 26, W.krem, ["5 + 5 = 10"], 12))),
    k(SUARA_S5, bersih(0), tambah(0, judul("Sahabat sepuluh lainnya")), tambah(idx(SUARA_S5, "sembilan"), ...kartu("s1", 70, 50, 160, 32, W.hijauMuda, ["9 + 1 = 10"], 14)), tambah(idx(SUARA_S5, "delapan"), ...kartu("s2", 70, 100, 160, 32, W.pink, ["8 + 2 = 10"], 14)), tambah(idx(SUARA_S5, "dua."), emo("ok", 150, 178, "✅", 30))),
  ],
};

/* ------------------------------ 8. Tukar sepuluh satuan jadi satu puluhan ------------------------------ */
const SUARA_X1 = "Kira punya delapan belas jambu air. Kita lihat dengan balok. Ada satu batang puluhan dan delapan kubus satuan.";
const SUARA_X2 = "Kira memetik lagi dua jambu. Dua kubus satuan ditambahkan.";
const SUARA_X3 = "Sekarang satuannya ada sepuluh. Delapan ditambah dua sama dengan sepuluh.";
const SUARA_X4 = "Sepuluh satuan bisa ditukar dengan satu puluhan. Lihat, sepuluh kubus berubah jadi satu batang!";
const SUARA_X5 = "Sekarang ada dua batang puluhan dan tidak ada kubus satuan. Dua puluhan sama dengan dua puluh.";
const SUARA_X6 = "Jadi delapan belas ditambah dua sama dengan dua puluh. Sepuluh satuan sama dengan satu puluhan.";
const label = (id: string, x: number, isi: string): Obj => ({ id, t: "teks", x, y: 108, isi, u: 9, warna: W.ungu });

export const ADEGAN_TUKAR_SEPULUH: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Sepuluh satuan jadi satu puluhan",
  sumber: "Materi: tukar sepuluh satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Balok puluhan dan satuan")),
      tambah(idx(SUARA_X1, "batang"), ...batangP("a", 0), label("lbp", 50, "puluhan")),
      tambah(idx(SUARA_X1, "kubus"), ...rentang(0, 8, (i) => kubusS("a", i)), label("lbs", 212, "satuan")),
      tambah(idx(SUARA_X1, "belas"), nilaiV("a", "18", 150, 128)),
    ),
    k(SUARA_X2, hapus(0, "va"), tambah(idx(SUARA_X2, "kubus"), ...rentang(8, 10, (i) => kubusS("a", i))), tambah(idx(SUARA_X2, "ditambahkan."), ...kartu("q2", 80, 140, 140, 26, W.krem, ["18 + 2 = ?"], 12))),
    k(SUARA_X3, hapus(0, "q2-k", "q2-t0"), sorotkan(idx(SUARA_X3, "sepuluh."), ...ids("sa", 0, 9)), tambah(idx(SUARA_X3, "ditambah"), ...kartu("q3", 80, 140, 140, 26, W.krem, ["8 + 2 = 10"], 12))),
    k(SUARA_X4, hapus(idx(SUARA_X4, "berubah"), ...ids("sa", 0, 9)), tambah(idx(SUARA_X4, "batang!"), ...batangP("a", 1))),
    k(SUARA_X5, hapus(0, "q3-k", "q3-t0"), sorotkan(idx(SUARA_X5, "dua"), "pa0-k", "pa1-k"), tambah(idx(SUARA_X5, "sama"), nilaiV("a", "20", 150, 128))),
    k(SUARA_X6, redamkan(0, "pa0-k", "pa1-k"), tambah(idx(SUARA_X6, "ditambah"), ...kartu("eq", 80, 152, 140, 28, W.emas, ["18 + 2 = 20"], 13))),
  ],
};

/* ------------------------------ 9. Tukar di tabel: 13 + 7 ------------------------------ */
const SUARA_Y1 = "Sekarang tiga belas ditambah tujuh sama dengan berapa? Tiga belas terdiri dari satu puluhan dan tiga satuan.";
const SUARA_Y2 = "Tujuh hanya punya tujuh satuan. Kita taruh tujuh kubus di baris kedua.";
const SUARA_Y3 = "Jumlahkan satuannya dulu. Tiga ditambah tujuh sama dengan sepuluh satuan. Puluhannya masih satu.";
const SUARA_Y4 = "Sepuluh satuan kita tukar dengan satu puluhan. Kubus satuan hilang, batang puluhan bertambah satu.";
const SUARA_Y5 = "Hasilnya dua puluhan dan nol satuan, yaitu dua puluh. Jadi tiga belas ditambah tujuh sama dengan dua puluh.";

export const ADEGAN_TUKAR_TABEL: AdeganStory = {
  id: "tukar-tabel",
  judul: "Tukar di tabel: tiga belas ditambah tujuh",
  sumber: "Materi: tukar di tabel nilai tempat",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Tukar di tabel")), tambah(idx(SUARA_Y1, "berapa?"), ...kerangkaTabel(3)), tambah(idx(SUARA_Y1, "Tiga", 2), labelBaris(0, "13"), batangTabel(0, 0), ...rentang(0, 3, (i) => kubusTabel(0, i)))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Tujuh"), labelBaris(1, "7")), tambah(idx(SUARA_Y2, "kubus"), ...rentang(0, 7, (i) => kubusTabel(1, i)))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "sepuluh"), ...rentang(0, 10, (i) => kubusTabel(2, i, W.merahMuda))), tambah(idx(SUARA_Y3, "masih"), batangTabel(2, 0)), tambah(idx(SUARA_Y3, "ditambah"), ...kartu("q1", 90, 176, 120, 24, W.krem, ["3 + 7 = 10"], 12))),
    k(SUARA_Y4, hapus(idx(SUARA_Y4, "hilang,"), ...ids("tb2s", 0, 9)), tambah(idx(SUARA_Y4, "bertambah"), batangTabel(2, 1))),
    k(SUARA_Y5, tambah(idx(SUARA_Y5, "puluhan"), angkaTabel(2, "dp", "2")), tambah(idx(SUARA_Y5, "nol"), angkaTabel(2, "ds", "0")), tambah(idx(SUARA_Y5, "yaitu"), labelBaris(2, "20")), hapus(idx(SUARA_Y5, "Jadi"), "q1-k", "q1-t0"), tambah(idx(SUARA_Y5, "ditambah"), ...kartu("eq", 60, 172, 180, 28, W.emas, ["13 + 7 = 20"], 13))),
  ],
};

/* ------------------------------ 10. Membuka satu puluhan ------------------------------ */
const SUARA_B1 = "Kebalikannya juga bisa. Satu batang puluhan dapat dibuka jadi sepuluh kubus satuan.";
const SUARA_B2 = "Lihat, batangnya dibuka. Sekarang ada sepuluh kubus satuan.";
const SUARA_B3 = "Nilainya tetap sama, yaitu sepuluh. Hanya bentuknya yang berbeda.";
const SUARA_B4 = "Jadi satu puluhan sama dengan sepuluh satuan. Kita bisa menukar ke dua arah.";

export const ADEGAN_BUKA_PULUHAN: AdeganStory = {
  id: "buka-puluhan",
  judul: "Membuka satu puluhan",
  sumber: "Materi: membuka satu puluhan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Membuka satu puluhan")), tambah(idx(SUARA_B1, "batang"), ...batangP("a", 0, 130, 46)), tambah(idx(SUARA_B1, "puluhan"), nilaiV("a", "10", 150, 128))),
    k(SUARA_B2, hapus(idx(SUARA_B2, "dibuka."), "pa0-k", "pa0-t", "va"), tambah(idx(SUARA_B2, "sepuluh"), ...rentang(0, 10, (i) => kubusS("a", i, 105, 50)))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "sepuluh."), nilaiV("a", "10", 150, 128)), sorotkan(idx(SUARA_B3, "sama,"), ...ids("sa", 0, 9))),
    k(SUARA_B4, redamkan(0, ...ids("sa", 0, 9)), tambah(idx(SUARA_B4, "sepuluh"), ...kartu("eq", 50, 148, 200, 28, W.emas, ["1 puluhan = 10 satuan"], 12)), tambah(idx(SUARA_B4, "arah."), emo("tk", 150, 196, "\u{1F501}", 22))),
  ],
};
