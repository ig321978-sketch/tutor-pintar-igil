import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BIRU, EMO_MERAH, OWL, W, bagan, batangP, benda, emo, kartu, kotakSepuluh, kubusS, letakKotak, nilaiV, titikPetak } from "./k2b2A-gambar";
import { hapus, idx, ids, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b2A-bantu";
import { kepala } from "./k2b2A-luar-1";

const rentang = (dari: number, sampai: number, buat: (i: number) => Obj): Obj[] => Array.from({ length: sampai - dari }, (_, q) => buat(dari + q));
const PILIHAN = ["c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t"];

/* ------------------------------ 5. Pasangan Bilangan: bingkai sepuluh dan bagan ------------------------------ */
const Y_F = 70;
const kotakKe = (f: number): Obj[] => kotakSepuluh("a", f, letakKotak(f, Y_F, 18));
const petak = (f: number, p: number): { x: number; y: number } => titikPetak(p, letakKotak(f, Y_F, 18), 15);
/** Apel merah ke-i di bingkai pertama (petak i). */
const merah = (i: number): Obj => benda("a", i, petak(0, i).x, petak(0, i).y, EMO_MERAH, 15);
/** Apel biru ke-j di bingkai kedua (petak j). */
const biru = (j: number): Obj => benda("b", j, petak(1, j).x, petak(1, j).y, EMO_BIRU, 15);
/** Apel biru ke-j dipindah ke petak p pada bingkai pertama. */
const pindahKe = (j: number, p: number) => ({ id: `eb${j}`, x: petak(0, p).x, y: petak(0, p).y });

const SUARA_P1 = "Metode kedua bernama Pasangan Bilangan. Kita pecah bilangan jadi pasangan yang mudah.";
const SUARA_P2 = "Contohnya delapan ditambah lima sama dengan berapa? Ini delapan apel merah dan lima apel biru.";
const SUARA_P3 = "Pecah lima jadi dua dan tiga. Dua itu pas untuk melengkapi delapan jadi sepuluh.";
const SUARA_P4 = "Pindahkan dua apel biru ke bingkai merah. Delapan ditambah dua sama dengan sepuluh.";
const SUARA_P5 = "Tinggal tiga apel biru. Sepuluh ditambah tiga sama dengan tiga belas.";
const SUARA_P6 = "Jadi delapan ditambah lima sama dengan tiga belas. Pecah dulu, lalu bentuk sepuluh!";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Pasangan Bilangan: bentuk sepuluh",
  sumber: "Metode luar: Pasangan Bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah(idx(SUARA_P1, "pecah"), ...kartu("pc", 50, 90, 200, 34, W.krem, ["pecah jadi pasangan"], 12))),
    k(
      SUARA_P2,
      hapus(0, "pc-k", "pc-t0"),
      tambah(idx(SUARA_P2, "ditambah"), ...kartu("eq", 60, 126, 140, 24, W.krem, ["8 + 5 = ?"], 12)),
      tambah(idx(SUARA_P2, "Ini"), ...kotakKe(0), ...kotakKe(1)),
      tambah(idx(SUARA_P2, "delapan", 2), ...rentang(0, 8, merah)),
      tambah(idx(SUARA_P2, "lima", 2), ...rentang(0, 5, biru)),
    ),
    k(SUARA_P3, tambah(idx(SUARA_P3, "Pecah"), ...bagan("bd", 248, 60, "5", "2", "3")), sorotkan(idx(SUARA_P3, "Dua"), "eb0", "eb1"), tambah(idx(SUARA_P3, "sepuluh."), ...kartu("pp", 60, 156, 140, 24, W.krem, ["pas jadi 10"], 12))),
    k(SUARA_P4, hapus(0, "pp-k", "pp-t0"), redamkan(0, "eb0", "eb1"), ubah(idx(SUARA_P4, "Pindahkan"), pindahKe(0, 8), pindahKe(1, 9)), tambah(idx(SUARA_P4, "ditambah"), ...kartu("q1", 60, 156, 140, 24, W.hijauMuda, ["8 + 2 = 10"], 12))),
    k(SUARA_P5, hapus(0, "q1-k", "q1-t0"), sorotkan(idx(SUARA_P5, "tiga"), "eb2", "eb3", "eb4"), tambah(idx(SUARA_P5, "ditambah"), ...kartu("q2", 60, 156, 140, 24, W.hijauMuda, ["10 + 3 = 13"], 12))),
    k(SUARA_P6, redamkan(0, "eb2", "eb3", "eb4"), hapus(0, "q2-k", "q2-t0", "eq-k", "eq-t0"), tambah(idx(SUARA_P6, "ditambah"), ...kartu("eq", 50, 136, 150, 30, W.emas, ["8 + 5 = 13"], 14)), tambah(idx(SUARA_P6, "sepuluh!"), emo("ok", 262, 192, "✅", 20))),
  ],
};

/* ------------------------------ 6. Pasangan Bilangan: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada tujuh ditambah lima sama dengan berapa? Ini tujuh apel merah dan lima apel biru.";
const SUARA_Q2 = "Lima dipecah jadi tiga dan dua. Tiga itu pas untuk melengkapi tujuh jadi sepuluh.";
const SUARA_Q3 = "Pindahkan tiga apel biru ke bingkai merah. Tujuh ditambah tiga sama dengan sepuluh.";
const SUARA_Q4 = "Pilih jawabannya. Sepuluh ditambah dua sama dengan berapa? Ketuk bilangan yang tepat.";
const SUARA_Q5 = "Betul! Tujuh ditambah lima sama dengan dua belas. Hebat!";

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan Bilangan: tujuh ditambah lima",
  sumber: "Metode luar: Pasangan Bilangan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_Q1, "ditambah"), ...kartu("eq", 60, 126, 140, 24, W.krem, ["7 + 5 = ?"], 12)),
      tambah(idx(SUARA_Q1, "Ini"), ...kotakKe(0), ...kotakKe(1)),
      tambah(idx(SUARA_Q1, "tujuh", 2), ...rentang(0, 7, merah)),
      tambah(idx(SUARA_Q1, "lima", 2), ...rentang(0, 5, biru)),
    ),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "dipecah"), ...bagan("bd", 248, 60, "5", "3", "2")), sorotkan(idx(SUARA_Q2, "Tiga"), "eb0", "eb1", "eb2"), tambah(idx(SUARA_Q2, "sepuluh."), ...kartu("pp", 60, 156, 140, 24, W.krem, ["pas jadi 10"], 12))),
    k(SUARA_Q3, hapus(0, "pp-k", "pp-t0"), redamkan(0, "eb0", "eb1", "eb2"), ubah(idx(SUARA_Q3, "Pindahkan"), pindahKe(0, 7), pindahKe(1, 8), pindahKe(2, 9)), tambah(idx(SUARA_Q3, "ditambah"), ...kartu("q1", 60, 156, 140, 24, W.hijauMuda, ["7 + 3 = 10"], 12))),
    k(SUARA_Q4, hapus(0, "q1-k", "q1-t0", "eq-k", "eq-t0"), tambah(idx(SUARA_Q4, "ditambah"), ...kartu("q2", 60, 126, 140, 24, W.krem, ["10 + 2 = ?"], 12)), tambah(idx(SUARA_Q4, "jawabannya."), ...pilihKata(158, ["11", "12", "13"])), sorotkan(idx(SUARA_Q4, "Ketuk"), "c2-k")),
    k(SUARA_Q5, hapus(0, "q2-k", "q2-t0", ...PILIHAN), tambah(idx(SUARA_Q5, "ditambah"), ...kartu("eq", 50, 136, 150, 30, W.emas, ["7 + 5 = 12"], 14)), tambah(idx(SUARA_Q5, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};

/* ------------------------------ 7. Balok Dienes dan Menyimpan ------------------------------ */
const kubusWarna = (i: number, warna: string): Obj => ({ ...kubusS("a", i, 170, 56), warna });
const SUARA_E1 = "Metode ketiga bernama Balok Dienes dan Menyimpan. Sepuluh kubus satuan kita simpan jadi satu batang puluhan.";
const SUARA_E2 = "Contohnya sembilan ditambah enam sama dengan berapa? Ini sembilan kubus kuning dan enam kubus merah muda.";
const SUARA_E3 = "Sekarang ada lima belas kubus satuan. Sepuluh di antaranya bisa disimpan jadi satu puluhan.";
const SUARA_E4 = "Sepuluh kubus kita simpan jadi satu batang. Lihat, kubusnya berkurang dan batangnya muncul!";
const SUARA_E5 = "Satu puluhan dan lima satuan itu lima belas. Nilainya tidak berubah.";
const SUARA_E6 = "Jadi sembilan ditambah enam sama dengan lima belas. Sepuluh kubus disimpan jadi satu batang.";

export const ADEGAN_LUAR_DIENES: AdeganStory = {
  id: "luar-dienes",
  judul: "Balok Dienes dan Menyimpan: simpan sepuluh",
  sumber: "Metode luar: Balok Dienes dan Menyimpan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah(0, ...kepala(2)), tambah(idx(SUARA_E1, "simpan"), ...kartu("sm", 50, 96, 200, 34, W.krem, ["10 kubus jadi 1 batang"], 12))),
    k(
      SUARA_E2,
      hapus(0, "sm-k", "sm-t0"),
      tambah(idx(SUARA_E2, "ditambah"), ...kartu("eq", 100, 126, 140, 24, W.krem, ["9 + 6 = ?"], 12)),
      tambah(idx(SUARA_E2, "sembilan", 2), ...rentang(0, 9, (i) => kubusWarna(i, W.emas))),
      tambah(idx(SUARA_E2, "enam", 2), ...rentang(9, 15, (i) => kubusWarna(i, W.merahMuda))),
    ),
    k(SUARA_E3, tambah(idx(SUARA_E3, "kubus"), nilaiV("a", "15", 56, 80)), sorotkan(idx(SUARA_E3, "Sepuluh"), ...ids("sa", 0, 9))),
    k(SUARA_E4, redamkan(0, ...ids("sa", 0, 9)), hapus(idx(SUARA_E4, "berkurang"), ...ids("sa", 0, 9)), tambah(idx(SUARA_E4, "muncul!"), ...batangP("a", 0, 100, 48))),
    k(SUARA_E5, sorotkan(idx(SUARA_E5, "Satu"), "pa0-k"), redamkan(idx(SUARA_E5, "dan"), "pa0-k"), sorotkan(idx(SUARA_E5, "dan"), ...ids("sa", 10, 14))),
    k(SUARA_E6, redamkan(0, ...ids("sa", 10, 14)), hapus(0, "eq-k", "eq-t0"), tambah(idx(SUARA_E6, "ditambah"), ...kartu("eq", 100, 126, 140, 28, W.emas, ["9 + 6 = 15"], 13))),
  ],
};

/* ------------------------------ 8. Balok Dienes dan Menyimpan: terapan ------------------------------ */
const SUARA_G1 = "Terapkan pada enam ditambah delapan sama dengan berapa? Kita susun enam kubus, lalu delapan kubus.";
const SUARA_G2 = "Ada empat belas kubus satuan. Sepuluh di antaranya bisa disimpan jadi satu batang puluhan.";
const SUARA_G3 = "Kita simpan sepuluh kubus jadi satu batang. Sisanya empat kubus satuan.";
const SUARA_G4 = "Pilih jawabannya. Satu puluhan dan empat satuan itu berapa? Ketuk bilangan yang tepat.";
const SUARA_G5 = "Betul! Enam ditambah delapan sama dengan empat belas. Hebat!";

export const ADEGAN_LUAR_DIENES_TERAPAN: AdeganStory = {
  id: "luar-dienes-terapan",
  judul: "Balok Dienes dan Menyimpan: enam ditambah delapan",
  sumber: "Metode luar: Balok Dienes, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_G1, "ditambah"), ...kartu("eq", 100, 126, 140, 24, W.krem, ["6 + 8 = ?"], 12)),
      tambah(idx(SUARA_G1, "enam", 2), ...rentang(0, 6, (i) => kubusWarna(i, W.emas))),
      tambah(idx(SUARA_G1, "delapan", 2), ...rentang(6, 14, (i) => kubusWarna(i, W.merahMuda))),
    ),
    k(SUARA_G2, tambah(idx(SUARA_G2, "kubus"), nilaiV("a", "14", 56, 80)), sorotkan(idx(SUARA_G2, "Sepuluh"), ...ids("sa", 0, 9)), tambah(idx(SUARA_G2, "batang"), ...kartu("sm", 50, 158, 200, 28, W.krem, ["10 kubus jadi 1 batang"], 12))),
    k(SUARA_G3, hapus(0, "sm-k", "sm-t0"), redamkan(0, ...ids("sa", 0, 9)), hapus(idx(SUARA_G3, "kubus"), ...ids("sa", 0, 9)), tambah(idx(SUARA_G3, "batang."), ...batangP("a", 0, 100, 48))),
    k(SUARA_G4, hapus(0, "va"), tambah(idx(SUARA_G4, "jawabannya."), ...pilihKata(154, ["13", "14", "15"])), sorotkan(idx(SUARA_G4, "Ketuk"), "c2-k")),
    k(SUARA_G5, hapus(0, "eq-k", "eq-t0", ...PILIHAN), tambah(idx(SUARA_G5, "ditambah"), ...kartu("eq", 100, 126, 140, 28, W.emas, ["6 + 8 = 14"], 13)), tambah(idx(SUARA_G5, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};
