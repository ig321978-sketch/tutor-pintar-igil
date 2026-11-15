import type { AdeganStory, Obj } from "./logika-story";
import { W, angkaKotak, bagan, batangTabel, benda, emo, jumlahG, jalur, judul, kartu, kartuAngka, kerangkaTabel, kotakSepuluh, kubusTabel, labelBaris, letakKotak, namaG, pusatPetak, titikPetak } from "./k2b2A-gambar";
import { bersih, hapus, hitungAksi, idx, ids, k, redamkan, sorotkan, tambah, ubah } from "./k2b2A-bantu";

export const EMO_UPE = "\u{1F34E}";
export const EMO_KIRA = "\u{1F351}";
const rentang = (dari: number, sampai: number, buat: (i: number) => Obj): Obj[] => Array.from({ length: sampai - dari }, (_, q) => buat(dari + q));
/** Jambu Upe: benda ke-i `ea{i}` di petak i mod 10 pada kotak sepuluh i div 10 (kotak berderet dari kiri, tinggi y0). */
export const jambuUpe = (y0: number) => (i: number): Obj => {
  const p = titikPetak(i, letakKotak(Math.floor(i / 10), y0, 18), 15);
  return benda("a", i, p.x, p.y, EMO_UPE, 15);
};
/** Jambu Kira: benda ke-j `eb{j}` di petak j pada kotak sepuluh ketiga. */
export const jambuKira = (y0: number) => (j: number): Obj => {
  const p = titikPetak(j, letakKotak(2, y0, 18), 15);
  return benda("b", j, p.x, p.y, EMO_KIRA, 15);
};
const kotakKe = (key: string, f: number, y0: number): Obj[] => kotakSepuluh(key, f, letakKotak(f, y0, 18));

/* ------------------------------ 1. Jambu air di kebun ------------------------------ */
const Y_J = 64;
const SUARA_J1 = "Hari ini Upe dan Kira memetik jambu air di kebun. Lihat, jambunya merah dan segar!";
const SUARA_J2 = "Upe memetik dua belas jambu air. Ada satu bingkai penuh berisi sepuluh, dan dua jambu lagi.";
const SUARA_J3 = "Kira memetik enam jambu air. Jambunya ada di bingkai ketiga, belum penuh.";
const SUARA_J4 = "Upe dan Kira ingin tahu, ada berapa jambu air semuanya? Kita harus menggabung jambu mereka.";
const SUARA_J5 = "Menggabung berarti menjumlahkan. Dua belas ditambah enam sama dengan berapa? Ada tiga cara untuk mencarinya.";

export const ADEGAN_CERITA_JAMBU: AdeganStory = {
  id: "cerita-jambu",
  judul: "Jambu air di kebun",
  sumber: "Materi: masalah penjumlahan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Jambu air di kebun")), tambah(idx(SUARA_J1, "Lihat,"), emo("pj", 150, 112, "\u{1F333}", 64))),
    k(
      SUARA_J2,
      hapus(0, "pj"),
      tambah(idx(SUARA_J2, "jambu"), namaG("a", 8, 52, "Jambu Upe"), ...kotakKe("a", 0, Y_J), ...kotakKe("a", 1, Y_J)),
      tambah(idx(SUARA_J2, "sepuluh,"), ...rentang(0, 10, jambuUpe(Y_J)), angkaKotak("a", 0, "10", Y_J, 18)),
      tambah(idx(SUARA_J2, "lagi."), ...rentang(10, 12, jambuUpe(Y_J)), jumlahG("a", 102, 124, "12")),
    ),
    k(
      SUARA_J3,
      tambah(idx(SUARA_J3, "enam"), namaG("b", 204, 52, "Jambu Kira"), ...kotakKe("b", 2, Y_J)),
      tambah(idx(SUARA_J3, "ketiga,"), ...rentang(0, 6, jambuKira(Y_J))),
      tambah(idx(SUARA_J3, "penuh."), jumlahG("b", 249, 124, "6")),
    ),
    k(
      SUARA_J4,
      sorotkan(idx(SUARA_J4, "Upe"), ...ids("ea", 0, 11)),
      redamkan(idx(SUARA_J4, "Kira"), ...ids("ea", 0, 11)),
      sorotkan(idx(SUARA_J4, "Kira"), ...ids("eb", 0, 5)),
      sorotkan(idx(SUARA_J4, "menggabung"), ...ids("ea", 0, 11)),
      tambah(idx(SUARA_J4, "menggabung"), ...kartu("eq", 70, 146, 160, 28, W.emas, ["12 + 6 = ?"], 13)),
    ),
    k(
      SUARA_J5,
      redamkan(0, ...ids("ea", 0, 11), ...ids("eb", 0, 5)),
      tambah(idx(SUARA_J5, "tiga"), ...kartu("c1", 8, 176, 92, 22, W.hijauMuda, ["maju di jalur"], 8), ...kartu("c2", 104, 176, 92, 22, W.langit, ["pecah jadi sepuluh"], 8), ...kartu("c3", 200, 176, 92, 22, W.pink, ["tabel nilai tempat"], 8)),
    ),
  ],
};

/* ------------------------------ 2. Cara pertama: maju di jalur bilangan ------------------------------ */
export const YJ = 80;
export const JALUR_10_20 = Array.from({ length: 11 }, (_, i) => 10 + i);
export const petakX = (i: number): number => pusatPetak(11, i, YJ).x;
const SUARA_M1 = "Cara pertama, kita maju di jalur bilangan. Ini jalur bilangan dari sepuluh sampai dua puluh.";
const SUARA_M2 = "Kita mulai dari dua belas, bilangan yang pertama. Di sinilah kita berdiri.";
const SUARA_M3 = "Sekarang melompat enam langkah ke depan. Satu, dua, tiga, empat, lima, enam.";
const SUARA_M4 = "Kita berhenti di delapan belas. Jadi dua belas ditambah enam sama dengan delapan belas.";
const SUARA_M5 = "Banyak loncatan sama dengan bilangan yang ditambahkan. Di sini ada enam loncatan.";
const SUARA_M6 = "Mudah, ya? Kalau bilangan tambahannya kecil, maju di jalur bilangan itu cepat.";

export const ADEGAN_MAJU_JALUR: AdeganStory = {
  id: "maju-jalur",
  judul: "Cara pertama: maju di jalur bilangan",
  sumber: "Materi: maju di jalur bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Maju di jalur bilangan")), tambah(idx(SUARA_M1, "jalur", 2), ...jalur(JALUR_10_20, YJ))),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "dua"), "nl2-k"), tambah(idx(SUARA_M2, "berdiri."), emo("fg", petakX(2), 64, "\u{1F438}", 20))),
    k(SUARA_M3, ...hitungAksi(SUARA_M3, "nl", Array.from({ length: 7 }, (_, q) => pusatPetak(11, 2 + q, YJ)), { dari: 1, awal: 1, setelah: "depan", naik: 18, u: 10 })),
    k(SUARA_M4, redamkan(0, "nl2-k"), sorotkan(idx(SUARA_M4, "delapan"), "nl8-k"), ubah(idx(SUARA_M4, "delapan"), { id: "fg", x: petakX(8) }), tambah(idx(SUARA_M4, "ditambah"), ...kartu("eq", 60, 130, 180, 28, W.emas, ["12 + 6 = 18"], 13))),
    k(SUARA_M5, sorotkan(idx(SUARA_M5, "loncatan"), ...ids("nln", 1, 6)), tambah(idx(SUARA_M5, "enam"), ...kartu("lc", 90, 166, 120, 26, W.krem, ["6 loncatan"], 11))),
    k(SUARA_M6, redamkan(0, ...ids("nln", 1, 6)), tambah(idx(SUARA_M6, "Mudah,"), emo("ok", 262, 192, "✅", 20))),
  ],
};

/* ------------------------------ 3. Cara kedua: pecah jadi sepuluh dan sisa ------------------------------ */
const Y_P = 104;
const SUARA_P1 = "Cara kedua, kita pecah bilangan. Dua belas bisa dipecah jadi sepuluh dan dua.";
const SUARA_P2 = "Sepuluh jambu itu satu bingkai penuh. Dua jambu sisanya ada di bingkai kedua.";
const SUARA_P3 = "Kita jumlahkan sisanya dulu. Jambu Kira ada enam. Dua ditambah enam sama dengan delapan.";
const SUARA_P4 = "Lalu jumlahkan dengan sepuluh yang penuh. Sepuluh ditambah delapan sama dengan delapan belas.";
const SUARA_P5 = "Jadi dua belas ditambah enam sama dengan delapan belas. Hasilnya sama seperti cara pertama!";

export const ADEGAN_PECAH_SEPULUH: AdeganStory = {
  id: "pecah-sepuluh",
  judul: "Cara kedua: pecah jadi sepuluh dan sisa",
  sumber: "Materi: pecah jadi sepuluh dan sisa",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pecah jadi sepuluh dan sisa")), tambah(idx(SUARA_P1, "Dua"), ...bagan("bd", 150, 28, "12", "10", "2"))),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "Sepuluh"), ...kotakKe("a", 0, Y_P), ...kotakKe("a", 1, Y_P)),
      tambah(idx(SUARA_P2, "bingkai"), ...rentang(0, 10, jambuUpe(Y_P))),
      tambah(idx(SUARA_P2, "kedua."), ...rentang(10, 12, jambuUpe(Y_P))),
      sorotkan(idx(SUARA_P2, "Dua"), ...ids("ea", 10, 11)),
    ),
    k(
      SUARA_P3,
      redamkan(0, ...ids("ea", 10, 11)),
      tambah(idx(SUARA_P3, "Jambu"), ...kotakKe("b", 2, Y_P)),
      tambah(idx(SUARA_P3, "enam."), ...rentang(0, 6, jambuKira(Y_P))),
      sorotkan(idx(SUARA_P3, "Dua"), ...ids("ea", 10, 11), ...ids("eb", 0, 5)),
      tambah(idx(SUARA_P3, "ditambah"), ...kartu("q1", 90, 146, 120, 24, W.krem, ["2 + 6 = 8"], 12)),
    ),
    k(
      SUARA_P4,
      redamkan(0, ...ids("ea", 10, 11), ...ids("eb", 0, 5)),
      sorotkan(idx(SUARA_P4, "Sepuluh"), ...ids("ea", 0, 9)),
      tambah(idx(SUARA_P4, "ditambah"), ...kartu("q2", 90, 174, 120, 24, W.emas, ["10 + 8 = 18"], 12)),
    ),
    k(SUARA_P5, redamkan(0, ...ids("ea", 0, 9)), hapus(0, "q1-k", "q1-t0", "q2-k", "q2-t0"), tambah(idx(SUARA_P5, "ditambah"), ...kartu("eq", 60, 154, 180, 30, W.emas, ["12 + 6 = 18"], 14)), tambah(idx(SUARA_P5, "pertama!"), emo("ok", 262, 192, "✅", 20))),
  ],
};

/* ------------------------------ 4. Cara ketiga: tabel nilai tempat ------------------------------ */
const SUARA_T1 = "Cara ketiga memakai tabel nilai tempat. Tabel ini punya kolom puluhan dan kolom satuan.";
const SUARA_T2 = "Dua belas terdiri dari satu puluhan dan dua satuan. Kita taruh satu batang dan dua kubus.";
const SUARA_T3 = "Enam tidak punya puluhan. Enam hanya enam satuan, jadi kita taruh enam kubus.";
const SUARA_T4 = "Jumlahkan satuannya dulu. Dua ditambah enam sama dengan delapan.";
const SUARA_T5 = "Lalu jumlahkan puluhannya. Hanya ada satu puluhan, jadi hasilnya satu puluhan.";
const SUARA_T6 = "Satu puluhan dan delapan satuan itu delapan belas. Jadi dua belas ditambah enam sama dengan delapan belas.";

export const ADEGAN_TABEL_NILAI_TEMPAT: AdeganStory = {
  id: "tabel-nilai-tempat",
  judul: "Cara ketiga: tabel nilai tempat",
  sumber: "Materi: tabel nilai tempat",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tabel nilai tempat")), tambah(idx(SUARA_T1, "tabel", 2), ...kerangkaTabel(3)), sorotkan(idx(SUARA_T1, "puluhan"), "tbh0"), redamkan(idx(SUARA_T1, "satuan."), "tbh0"), sorotkan(idx(SUARA_T1, "satuan."), "tbh1")),
    k(SUARA_T2, redamkan(0, "tbh1"), tambah(idx(SUARA_T2, "Dua"), labelBaris(0, "12")), tambah(idx(SUARA_T2, "batang"), batangTabel(0, 0)), tambah(idx(SUARA_T2, "kubus."), kubusTabel(0, 0), kubusTabel(0, 1))),
    k(SUARA_T3, tambah(idx(SUARA_T3, "Enam"), labelBaris(1, "6")), tambah(idx(SUARA_T3, "kubus."), ...rentang(0, 6, (i) => kubusTabel(1, i)))),
    k(SUARA_T4, tambah(idx(SUARA_T4, "delapan."), ...rentang(0, 8, (i) => kubusTabel(2, i, W.merahMuda))), tambah(idx(SUARA_T4, "ditambah"), ...kartu("q1", 90, 176, 120, 24, W.krem, ["2 + 6 = 8"], 12))),
    k(SUARA_T5, tambah(idx(SUARA_T5, "hasilnya"), batangTabel(2, 0))),
    k(SUARA_T6, tambah(idx(SUARA_T6, "itu"), labelBaris(2, "18")), hapus(idx(SUARA_T6, "Jadi"), "q1-k", "q1-t0"), tambah(idx(SUARA_T6, "ditambah"), ...kartu("eq", 60, 172, 180, 28, W.emas, ["12 + 6 = 18"], 13))),
  ],
};

/* ------------------------------ 5. Tiga cara, satu hasil, dan pemeriksaan ------------------------------ */
const SUARA_H1 = "Kita sudah mencoba tiga cara. Cara pertama, maju di jalur bilangan, hasilnya delapan belas.";
const SUARA_H2 = "Cara kedua, pecah jadi sepuluh dan sisa, hasilnya juga delapan belas.";
const SUARA_H3 = "Cara ketiga, tabel nilai tempat, hasilnya tetap delapan belas.";
const SUARA_H4 = "Ketiga cara memberi hasil yang sama. Jadi jawabannya pasti betul.";
const SUARA_H5 = "Kita bisa memeriksanya. Delapan belas dikurangi enam sama dengan dua belas. Hasilnya kembali ke bilangan awal.";
const SUARA_H6 = "Delapan belas dikurangi dua belas sama dengan enam. Ini juga cocok. Penjumlahan dan pengurangan saling memeriksa.";

export const ADEGAN_TIGA_SATU_HASIL: AdeganStory = {
  id: "tiga-satu-hasil",
  judul: "Tiga cara, satu hasil",
  sumber: "Materi: tiga cara, satu hasil",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Tiga cara, satu hasil")), tambah(idx(SUARA_H1, "pertama,"), ...kartu("m1", 14, 30, 272, 34, W.hijauMuda, ["Maju di jalur", "12 + 6 = 18"], 9.4))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "kedua,"), ...kartu("m2", 14, 72, 272, 34, W.pink, ["Pecah jadi 10 dan sisa", "12 + 6 = 18"], 9.4))),
    k(SUARA_H3, tambah(idx(SUARA_H3, "ketiga,"), ...kartu("m3", 14, 114, 272, 34, W.langit, ["Tabel nilai tempat", "12 + 6 = 18"], 9.4))),
    k(SUARA_H4, sorotkan(idx(SUARA_H4, "sama."), "m1-k", "m2-k", "m3-k"), tambah(idx(SUARA_H4, "pasti"), ...kartuAngka("hs", 110, 156, "18", W.emas, 80, 40, 24))),
    k(SUARA_H5, bersih(0), tambah(0, judul("Periksa hasilnya")), tambah(idx(SUARA_H5, "dikurangi"), ...kartu("p1", 60, 60, 180, 32, W.krem, ["18 - 6 = 12"], 15))),
    k(SUARA_H6, tambah(idx(SUARA_H6, "dikurangi"), ...kartu("p2", 60, 108, 180, 32, W.langit, ["18 - 12 = 6"], 15)), tambah(idx(SUARA_H6, "cocok."), emo("ok", 150, 178, "✅", 30))),
  ],
};
