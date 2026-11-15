import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, angkaBlok, bingkaiSepuluh, blok, emo, idBlok, judul, kartu, kartuAngka, namaBlok, teks } from "./k2b1C-gambar";
import { bersih, hapus, idf, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";
import { barisPenuh, kolomP, kolomS } from "./k2b1C-materi-2";

const ex = (isi: string, id = "ex", x = 150, y = 150, u = 20): Obj => teks(id, x, y, isi, u, W.merah);
const cap = (id: string, x: number, isi: string, y = 128): Obj => teks(id, x, y, isi, 8.6, W.biru);

/* ------------------------------ 1. Tukar sepuluh satuan menjadi satu puluhan ------------------------------ */
const SUARA_X1 = "Halim punya dua puluhan dan tiga satuan. Igil punya satu puluhan dan empat belas satuan.";
const SUARA_X2 = "Satuan Igil ada empat belas. Itu lebih dari sepuluh, jadi kita bisa menukar.";
const SUARA_X3 = "Sepuluh satuan ditukar menjadi satu puluhan.";
const SUARA_X4 = "Satu puluhan dan empat belas satuan menjadi dua puluhan dan empat satuan.";
const SUARA_X5 = "Jadi satu puluhan dan empat belas satuan sama dengan dua puluh empat.";
const SUARA_X6 = "Sekarang bandingkan. Dua puluh tiga dan dua puluh empat sama-sama dua puluhan, jadi lihat satuannya.";
const SUARA_X7 = "Tiga satuan lebih sedikit daripada empat satuan. Jadi dua puluh empat lebih besar daripada dua puluh tiga.";
const idSemuaB = [...idBlok("b", 1, 14, ["nm"]), "fr-k", "fr-t", "cpb"];

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar-puluhan",
  judul: "Tukar sepuluh satuan",
  sumber: "Materi: menukar sepuluh satuan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Banyak satuan")),
      tambah(idx(SUARA_X1, "Halim"), namaBlok("a", 44, 110, "Halim")),
      tambah(idx(SUARA_X1, "puluhan"), ...blok("a", 2, 3, 44, 110)),
      tambah(idx(SUARA_X1, "satuan"), cap("cpa", 88, "2 puluhan 3 satuan")),
      tambah(idx(SUARA_X1, "Igil"), namaBlok("b", 184, 110, "Igil")),
      tambah(idx(SUARA_X1, "puluhan", 2), ...blok("b", 1, 14, 184, 110)),
      tambah(idx(SUARA_X1, "satuan", 2), cap("cpb", 222, "1 puluhan 14 satuan")),
    ),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "empat"), ...idBlok("b", 1, 14)), redamkan(idx(SUARA_X2, "sepuluh"), ...idBlok("b", 1, 14)), tambah(idx(SUARA_X2, "sepuluh"), ...bingkaiSepuluh("fr", "b", 184, 110, 1))),
    k(SUARA_X3, sorotkan(idx(SUARA_X3, "ditukar"), "fr-k", "fr-t"), hapus(idx(SUARA_X3, "menjadi"), ...idSemuaB), tambah(idx(SUARA_X3, "menjadi"), namaBlok("c", 184, 110, "Igil"), ...blok("c", 2, 4, 184, 110))),
    k(SUARA_X4, sorotkan(idx(SUARA_X4, "menjadi"), ...idBlok("c", 2, 4)), tambah(idx(SUARA_X4, "menjadi"), cap("cpc", 222, "2 puluhan 4 satuan"))),
    k(SUARA_X5, redamkan(0, ...idBlok("c", 2, 4)), tambah(idx(SUARA_X5, "empat", 2), angkaBlok("c", 184, 110, "24"))),
    k(
      SUARA_X6,
      tambah(idx(SUARA_X6, "tiga"), angkaBlok("a", 44, 110, "23")),
      sorotkan(idx(SUARA_X6, "dua", 3), ...Array.from({ length: 2 }, (_, i) => [`ba-p${i}`, `bc-p${i}`]).flat()),
    ),
    k(
      SUARA_X7,
      redamkan(0, ...Array.from({ length: 2 }, (_, i) => [`ba-p${i}`, `bc-p${i}`]).flat()),
      sorotkan(0, ...Array.from({ length: 3 }, (_, i) => `ba-s${i}`), ...Array.from({ length: 4 }, (_, i) => `bc-s${i}`)),
      tambah(idx(SUARA_X7, "Jadi"), ex("24 > 23")),
    ),
  ],
};

/* ------------------------------ 2. Jangan membandingkan satuan lebih dulu ------------------------------ */
const SUARA_J1 = "Hati-hati! Ada kesalahan yang sering terjadi. Jangan membandingkan satuan lebih dulu.";
const SUARA_J2 = "Lihat sembilan belas dan dua puluh satu.";
const SUARA_J3 = "Sembilan satuan lebih banyak daripada satu satuan. Tetapi itu belum menentukan.";
const SUARA_J4 = "Puluhan lebih penting. Dua puluhan lebih banyak daripada satu puluhan.";
const SUARA_J5 = "Jadi dua puluh satu lebih besar daripada sembilan belas. Puluhan lebih berharga daripada satuan.";
const SUARA_J6 = "Ingat selalu, bandingkan puluhan dulu, baru satuan.";

export const ADEGAN_JANGAN_SATUAN: AdeganStory = {
  id: "jangan-satuan",
  judul: "Jangan satuan dulu",
  sumber: "Materi: puluhan lebih berharga dari satuan",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Hati-hati!")), tambah("kesalahan", emo("no", 150, 100, "\u{1F6AB}", 46)), tambah("Jangan", ...kartu("jg", 50, 140, 200, 28, W.merahMuda, ["jangan banding satuan dulu"], 10))),
    k(SUARA_J2, bersih(0), tambah(0, ...barisPenuh([1, 9], [2, 1]))),
    k(SUARA_J3, sorotkan("Sembilan", ...kolomS), tambah("lebih", ex("9 > 1"))),
    k(SUARA_J4, redamkan(0, ...kolomS), sorotkan("Dua", ...kolomP), ubah("lebih", { id: "ex", isi: "2 > 1" })),
    k(SUARA_J5, redamkan(0, ...kolomP), ubah("lebih", { id: "ex", isi: "21 > 19" })),
    k(SUARA_J6, tambah("Ingat", ...kartu("ig", 30, 172, 240, 24, W.krem, ["puluhan dulu, baru satuan"], 10))),
  ],
};

/* ------------------------------ 3. Tanda lebih besar, lebih kecil, dan sama dengan ------------------------------ */
const SUARA_G1 = "Untuk menulis perbandingan, kita punya tiga tanda.";
const SUARA_G2 = "Tanda lebih besar dipakai kalau bilangan pertama lebih besar. Tiga puluh dua lebih besar daripada dua puluh enam.";
const SUARA_G3 = "Tanda lebih kecil dipakai kalau bilangan pertama lebih kecil. Dua puluh enam lebih kecil daripada tiga puluh dua.";
const SUARA_G4 = "Tanda sama dengan dipakai kalau nilai kedua bilangan sama. Dua puluh enam sama dengan dua puluh enam.";
const SUARA_G5 = "Ingat, tandanya selalu menyesuaikan dengan urutan kedua bilangan itu.";
const TANDA = [">", "<", "="];
const KATA_TANDA = ["lebih besar", "lebih kecil", "sama dengan"];
const WARNA_TANDA = [W.hijauMuda, W.pink, W.langit];
const kartuTanda = (i: number): Obj[] => kartuAngka(`tg${i}`, 20 + 90 * i, 44, TANDA[i], WARNA_TANDA[i], 80, 64, 34);
const namaTanda = (i: number): Obj => teks(`tn${i}`, 60 + 90 * i, 124, KATA_TANDA[i], 9.4);

export const ADEGAN_TANDA: AdeganStory = {
  id: "tanda-banding",
  judul: "Tiga tanda perbandingan",
  sumber: "Materi: tiga tanda perbandingan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Tiga tanda")), tambah(idx(SUARA_G1, "tiga"), ...kartuTanda(0), ...kartuTanda(1), ...kartuTanda(2))),
    k(SUARA_G2, sorotkan(0, "tg0-k", "tg0-t"), tambah(0, namaTanda(0)), tambah(idx(SUARA_G2, "Tiga"), ex("32 > 26", "ex", 150, 165, 18))),
    k(SUARA_G3, redamkan(0, "tg0-k", "tg0-t"), sorotkan(0, "tg1-k", "tg1-t"), tambah(0, namaTanda(1)), ubah(idx(SUARA_G3, "Dua"), { id: "ex", isi: "26 < 32" })),
    k(SUARA_G4, redamkan(0, "tg1-k", "tg1-t"), sorotkan(0, "tg2-k", "tg2-t"), tambah(0, namaTanda(2)), ubah(idx(SUARA_G4, "Dua"), { id: "ex", isi: "26 = 26" })),
    k(SUARA_G5, hapus(0, "ex"), redamkan(0, "tg2-k", "tg2-t"), tambah("tandanya", ex("32 > 26", "xa", 78, 165, 15), ex("26 < 32", "xb", 222, 165, 15))),
  ],
};

/* ------------------------------ 4. Mengurutkan bilangan ------------------------------ */
export const SLOT_X = (s: number): number => 12 + 72 * s;
/** Nilai kartu Malosi menurut nomor kartu: 25, 12, 35, 21 (kartu pertama sampai keempat). */
export const KARTU_MALOSI = [25, 12, 35, 21];
const kartuUrut = (i: number, nilai: number, slot: number): Obj[] => kartuAngka(`od${i}`, SLOT_X(slot), 50, String(nilai), W.krem, 60, 44, 22);
const geser = (at: string | number, i: number, slot: number): Aksi => ubah(at, { id: `od${i}-k`, x: SLOT_X(slot) }, { id: `od${i}-t`, x: SLOT_X(slot) + 30 });
const semuaKartu = [0, 1, 2, 3].flatMap((i) => [`od${i}-k`, `od${i}-t`]);

const SUARA_R1 = "Malosi punya empat kartu bilangan: dua puluh lima, dua belas, tiga puluh lima, dan dua puluh satu.";
const SUARA_R2 = "Kita urutkan dari yang paling kecil. Mana yang paling kecil? Dua belas hanya punya satu puluhan, jadi dialah yang paling kecil.";
const SUARA_R3 = "Mana yang paling besar? Tiga puluh lima punya tiga puluhan, yang paling banyak. Jadi dialah yang paling besar.";
const SUARA_R4 = "Tinggal dua puluh satu dan dua puluh lima. Keduanya punya dua puluhan, jadi kita lihat satuannya.";
const SUARA_R5 = "Satu satuan lebih sedikit daripada lima satuan. Jadi dua puluh satu lebih kecil daripada dua puluh lima.";
const SUARA_R6 = "Urutan dari yang paling kecil adalah dua belas, dua puluh satu, dua puluh lima, lalu tiga puluh lima.";
const SUARA_R7 = "Kalau urut dari yang paling besar, kita balik urutannya: tiga puluh lima, dua puluh lima, dua puluh satu, lalu dua belas.";

export const ADEGAN_URUTKAN: AdeganStory = {
  id: "urutkan-kartu",
  judul: "Mengurutkan bilangan",
  sumber: "Materi: mengurutkan empat bilangan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Kartu Malosi")),
      tambah(idf(SUARA_R1, "dua puluh lima"), ...kartuUrut(0, 25, 0)),
      tambah(idf(SUARA_R1, "dua belas"), ...kartuUrut(1, 12, 1)),
      tambah(idf(SUARA_R1, "tiga puluh lima"), ...kartuUrut(2, 35, 2)),
      tambah(idf(SUARA_R1, "dua puluh satu"), ...kartuUrut(3, 21, 3)),
    ),
    k(SUARA_R2, sorotkan(idx(SUARA_R2, "Dua"), "od1-k", "od1-t")),
    k(SUARA_R3, redamkan(0, "od1-k", "od1-t"), sorotkan(idx(SUARA_R3, "Tiga"), "od2-k", "od2-t")),
    k(SUARA_R4, redamkan(0, "od2-k", "od2-t"), sorotkan(idx(SUARA_R4, "Tinggal"), "od0-k", "od0-t", "od3-k", "od3-t")),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Jadi"), ex("21 < 25", "ex", 150, 130, 18))),
    k(SUARA_R6, redamkan(0, ...semuaKartu), geser(idx(SUARA_R6, "adalah"), 1, 0), geser(idx(SUARA_R6, "adalah"), 3, 1), geser(idx(SUARA_R6, "adalah"), 0, 2), geser(idx(SUARA_R6, "adalah"), 2, 3), ubah(idx(SUARA_R6, "adalah"), { id: "ex", isi: "12 < 21 < 25 < 35" })),
    k(SUARA_R7, geser(idx(SUARA_R7, "balik"), 2, 0), geser(idx(SUARA_R7, "balik"), 0, 1), geser(idx(SUARA_R7, "balik"), 3, 2), geser(idx(SUARA_R7, "balik"), 1, 3), ubah(idx(SUARA_R7, "balik"), { id: "ex", isi: "35 > 25 > 21 > 12" })),
  ],
};
