import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BIRU, EMO_TAS, W, angkaKotak, batangP, bendaDi, benda, emo, jumlahG, judul, kartu, kotakSepuluh, kubusS, letakKotak, namaG, nilaiV, pusatBenda, teks, titikGrid, titikKotak, type Titik } from "./k2b1A-gambar";
import { bersih, hapus, hitungAksi, idx, ids, isiAksi, k, redamkan, sorotkan, tambah } from "./k2b1A-bantu";

/** Tas di rak toko Upe: dua puluh enam tas dalam tiga baris (sepuluh, sepuluh, enam). */
export const N_TAS = 26;
export const titikTas = (): Titik[] => titikGrid(N_TAS, 28, 66, 27, 30);
export const tasObjs = (): Obj[] => [namaG("a", 4, 36, "Tas"), ...bendaDi("a", EMO_TAS, titikTas())];
const idsTas = (dari: number, sampai: number): string[] => ids("ea", dari, sampai);

/* ------------------------------ 1. Tas di rak toko ------------------------------ */
const SUARA_T1 = "Hari ini Upe menata tas di rak tokonya. Lihat, tasnya berbaris rapi!";
const SUARA_T2 = "Kira ingin tahu, ada berapa banyak tas di rak ini? Wah, banyak sekali!";
const SUARA_T3 = "Menurut Kira, tasnya lebih dari sepuluh. Betulkah begitu? Kita buktikan dengan menghitung.";
const SUARA_T4 = "Caranya mudah. Sentuh tiap tas satu kali sambil menyebut bilangannya. Ayo kita mulai!";

export const ADEGAN_RAK_TAS: AdeganStory = {
  id: "rak-tas",
  judul: "Tas di rak toko",
  sumber: "Materi: banyak benda di rak",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tas di rak toko")), tambah(idx(SUARA_T1, "Lihat,"), ...tasObjs())),
    k(SUARA_T2, tambah(idx(SUARA_T2, "berapa"), emo("q", 150, 168, "❓", 28))),
    k(SUARA_T3, hapus(0, "q"), tambah(idx(SUARA_T3, "sepuluh"), ...kartu("tk", 70, 150, 160, 28, W.krem, ["lebih dari 10?"], 11)), sorotkan(idx(SUARA_T3, "sepuluh"), ...idsTas(0, 9))),
    k(SUARA_T4, redamkan(0, ...idsTas(0, 9)), hapus(0, "tk-k", "tk-t0"), tambah(idx(SUARA_T4, "Sentuh"), emo("tg", 150, 176, "\u{1F446}", 26))),
  ],
};

/* ------------------------------ 2. Hitung satu per satu ------------------------------ */
const SUARA_H1 = "Sekarang kita hitung tas itu satu per satu. Kita mulai dari baris pertama.";
const SUARA_H2 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Baris pertama berisi sepuluh tas.";
const SUARA_H3 = "Lanjut ke baris kedua. Sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.";
const SUARA_H4 = "Sekarang baris ketiga. Dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima, dua puluh enam.";
const SUARA_H5 = "Jadi ada dua puluh enam tas di rak itu.";
const SUARA_H6 = "Ingat, setiap tas hanya dihitung satu kali. Bilangan yang terakhir kita sebut adalah banyaknya.";
const pusatTas = (): Titik[] => pusatBenda(titikTas());

export const ADEGAN_HITUNG_SATU: AdeganStory = {
  id: "hitung-satu",
  judul: "Menghitung tas satu per satu",
  sumber: "Materi: menghitung satu per satu",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hitung satu per satu")), tambah(idx(SUARA_H1, "tas"), ...tasObjs())),
    k(SUARA_H2, ...hitungAksi(SUARA_H2, "ea", pusatTas().slice(0, 10), {})),
    k(SUARA_H3, ...hitungAksi(SUARA_H3, "ea", pusatTas().slice(0, 20), { dari: 11, awal: 10, setelah: "kedua." })),
    k(SUARA_H4, ...hitungAksi(SUARA_H4, "ea", pusatTas(), { dari: 21, awal: 20, setelah: "ketiga." })),
    k(SUARA_H5, tambah(idx(SUARA_H5, "enam"), jumlahG("a", 150, 164, "26", 18))),
    k(SUARA_H6, sorotkan(idx(SUARA_H6, "terakhir"), "ea-ln")),
  ],
};

/* ------------------------------ 3. Kotak sepuluh ------------------------------ */
const Y_K = 40;
const SUARA_K1 = "Kalau bendanya banyak, menghitung satu per satu bisa lama. Ada cara yang lebih cepat.";
const SUARA_K2 = "Kita kelompokkan setiap sepuluh benda ke dalam satu kotak sepuluh. Kotak ini punya sepuluh petak.";
const SUARA_K3 = "Isi petaknya sambil menghitung. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Kotaknya penuh!";
const SUARA_K4 = "Sepuluh benda dalam satu kotak penuh kita sebut satu puluhan.";
const SUARA_K5 = "Dua kotak penuh adalah dua puluh. Tiga kotak penuh adalah tiga puluh.";
const SUARA_K6 = "Empat kotak penuh adalah empat puluh. Lima kotak penuh adalah lima puluh. Lima puluh adalah bilangan terbesar di pelajaran ini.";
const biru = (i: number): Obj => benda("a", i, titikKotak(i, Y_K).x, titikKotak(i, Y_K).y, EMO_BIRU, 15);
const kotakKe = (f: number): Obj[] => kotakSepuluh("a", f, letakKotak(f, Y_K));
const isiKotak = (dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari }, (_, q) => biru(dari + q));

export const ADEGAN_KOTAK_SEPULUH: AdeganStory = {
  id: "kotak-sepuluh",
  judul: "Kelompok sepuluh dalam satu kotak",
  sumber: "Materi: kelompok sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kelompok sepuluh")), tambah(idx(SUARA_K1, "lama."), emo("kl", 90, 130, "\u{1F422}", 34)), tambah(idx(SUARA_K1, "cepat."), emo("kc", 210, 130, "\u{1F407}", 34))),
    k(SUARA_K2, bersih(0), tambah(0, judul("Kotak sepuluh")), tambah(idx(SUARA_K2, "kotak", 1), ...kotakKe(0)), tambah(idx(SUARA_K2, "petak."), ...kartu("pt", 90, 150, 120, 26, W.krem, ["10 petak"], 11))),
    k(SUARA_K3, ...isiAksi(SUARA_K3, 0, 10, biru), tambah(idx(SUARA_K3, "penuh!"), angkaKotak("a", 0, "10", Y_K))),
    k(SUARA_K4, hapus(0, "pt-k", "pt-t0"), tambah(idx(SUARA_K4, "puluhan."), ...kartu("sp", 50, 150, 200, 26, W.emas, ["1 puluhan = 10 benda"], 10.4)), sorotkan(idx(SUARA_K4, "puluhan."), "fra0")),
    k(
      SUARA_K5,
      tambah(idx(SUARA_K5, "kotak", 1), ...kotakKe(1)),
      tambah(idx(SUARA_K5, "penuh", 1), ...isiKotak(10, 20)),
      tambah(idx(SUARA_K5, "puluh.", 1), angkaKotak("a", 1, "20", Y_K)),
      tambah(idx(SUARA_K5, "kotak", 2), ...kotakKe(2)),
      tambah(idx(SUARA_K5, "penuh", 2), ...isiKotak(20, 30)),
      tambah(idx(SUARA_K5, "puluh.", 2), angkaKotak("a", 2, "30", Y_K)),
    ),
    k(
      SUARA_K6,
      redamkan(0, "fra0"),
      hapus(0, "sp-k", "sp-t0"),
      tambah(idx(SUARA_K6, "kotak", 1), ...kotakKe(3)),
      tambah(idx(SUARA_K6, "penuh", 1), ...isiKotak(30, 40)),
      tambah(idx(SUARA_K6, "puluh.", 1), angkaKotak("a", 3, "40", Y_K)),
      tambah(idx(SUARA_K6, "kotak", 2), ...kotakKe(4)),
      tambah(idx(SUARA_K6, "penuh", 2), ...isiKotak(40, 50)),
      tambah(idx(SUARA_K6, "puluh.", 2), angkaKotak("a", 4, "50", Y_K)),
    ),
  ],
};

/* ------------------------------ 4. Sepuluh, sepuluh, enam ------------------------------ */
const Y_S = 50;
const SUARA_P1 = "Sekarang kita hitung tas tadi dengan kotak sepuluh. Kotak pertama diisi sepuluh tas.";
const SUARA_P2 = "Kotak kedua juga diisi sepuluh tas. Jadi dua kotak penuh berisi dua puluh tas.";
const SUARA_P3 = "Sisanya masuk ke kotak ketiga. Kotak ketiga berisi enam tas. Kotak ini belum penuh.";
const SUARA_P4 = "Dua puluh ditambah enam sama dengan dua puluh enam. Hasilnya sama seperti hitungan satu per satu.";
const SUARA_P5 = "Menghitung per sepuluh lebih cepat dan tidak mudah salah. Hasilnya tetap dua puluh enam tas.";
const tas = (i: number): Obj => benda("a", i, titikKotak(i, Y_S).x, titikKotak(i, Y_S).y, EMO_TAS, 15);
const isiTas = (dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari }, (_, q) => tas(dari + q));

export const ADEGAN_SEPULUH_ENAM: AdeganStory = {
  id: "sepuluh-sepuluh-enam",
  judul: "Sepuluh, sepuluh, dan enam",
  sumber: "Materi: menghitung per sepuluh",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Tas dalam kotak sepuluh")), tambah(idx(SUARA_P1, "kotak", 1), namaG("a", 4, 36, "Tas"), ...[0, 1, 2].flatMap((f) => kotakSepuluh("a", f, letakKotak(f, Y_S)))), tambah(idx(SUARA_P1, "diisi"), ...isiTas(0, 10)), tambah(idx(SUARA_P1, "sepuluh", 2), angkaKotak("a", 0, "10", Y_S))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "juga"), ...isiTas(10, 20)), tambah(idx(SUARA_P2, "puluh"), angkaKotak("a", 1, "20", Y_S))),
    k(SUARA_P3, tambah(idx(SUARA_P3, "masuk"), ...isiTas(20, 26)), tambah(idx(SUARA_P3, "enam"), angkaKotak("a", 2, "26", Y_S))),
    k(SUARA_P4, tambah(idx(SUARA_P4, "ditambah"), ...kartu("eq", 60, 128, 180, 28, W.emas, ["20 + 6 = 26"], 13))),
    k(SUARA_P5, tambah(idx(SUARA_P5, "enam"), jumlahG("a", 150, 176, "26", 16))),
  ],
};

/* ------------------------------ 5. Puluhan dan satuan ------------------------------ */
const SUARA_U1 = "Sekarang kita lihat bilangan dengan balok. Satu batang berisi sepuluh kubus kecil. Itulah satu puluhan.";
const SUARA_U2 = "Kira menyusun dua batang puluhan. Dua batang puluhan berarti dua puluh.";
const SUARA_U3 = "Sisanya enam kubus satuan. Satu kubus adalah satu satuan.";
const SUARA_U4 = "Jadi dua puluh enam itu dua puluhan dan enam satuan.";
const SUARA_U5 = "Dua puluhan artinya dua puluh. Enam satuan artinya enam. Dua puluh ditambah enam sama dengan dua puluh enam.";
const label = (id: string, x: number, isi: string): Obj => teks(id, x, 108, isi, 9, W.ungu);

export const ADEGAN_PULUHAN_SATUAN: AdeganStory = {
  id: "puluhan-satuan",
  judul: "Puluhan dan satuan",
  sumber: "Materi: puluhan dan satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Batang puluhan")), tambah(idx(SUARA_U1, "batang"), ...batangP("a", 0)), tambah(idx(SUARA_U1, "puluhan."), label("lbp", 50, "puluhan"))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "batang"), ...batangP("a", 1)), tambah(idx(SUARA_U2, "berarti"), ...kartu("dp", 20, 134, 120, 26, W.krem, ["2 puluhan = 20"], 10.4))),
    k(SUARA_U3, tambah(idx(SUARA_U3, "enam"), ...Array.from({ length: 6 }, (_, i) => kubusS("a", i))), tambah(idx(SUARA_U3, "satuan."), label("lbs", 212, "satuan"))),
    k(SUARA_U4, tambah(idx(SUARA_U4, "itu"), nilaiV("a", "26", 150, 112)), tambah(idx(SUARA_U4, "dan"), ...kartu("ps", 160, 134, 124, 26, W.pink, ["2 puluhan 6 satuan"], 9.4))),
    k(SUARA_U5, hapus(0, "dp-k", "dp-t0", "ps-k", "ps-t0"), tambah(idx(SUARA_U5, "ditambah"), ...kartu("eq", 60, 150, 180, 28, W.emas, ["20 + 6 = 26"], 13))),
  ],
};
