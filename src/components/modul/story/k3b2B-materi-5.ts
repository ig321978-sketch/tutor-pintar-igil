import type { AdeganStory } from "./logika-story";
import { W, bagan, emo, judul, kartu, kalimat, teks } from "./k3b2B-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/** Pindahkan sekat bagan `p` (batang bawah) ke bagian kiri `fa`; ukuran sama dengan bagan() bawaan. */
const atur = (p: string, fa: number, x = 30, w = 240) => {
  const wa = Math.round(w * fa);
  return [{ id: `${p}_A`, w: wa }, { id: `${p}_An`, x: x + wa / 2 }, { id: `${p}_B`, x: x + wa, w: w - wa }, { id: `${p}_Bn`, x: x + wa + (w - wa) / 2 }];
};

/* ------------------------------ 14. Contoh: titik-titik di tengah ------------------------------ */
const B1 = bagan("bx", { y: 30, atas: "32", a: "?", b: "15", fa: 17 / 32 });
const B2 = bagan("by", { y: 30, atas: "56", a: "?", b: "24", fa: 32 / 56 });
const B3 = bagan("bz", { y: 30, atas: "53", a: "?", b: "32", fa: 21 / 53 });
const SUARA_A1 = "Mari berlatih dengan contoh. Pertama, tiga puluh dua kurang titik-titik sama dengan lima belas.";
const SUARA_A2 = "Titik-titik di tengah, jadi kita kurangi. Tiga puluh dua kurang lima belas sama dengan tujuh belas.";
const SUARA_A3 = "Contoh kedua. Lima puluh enam kurang titik-titik sama dengan dua puluh empat.";
const SUARA_A4 = "Kita kurangi lima puluh enam dengan dua puluh empat. Hasilnya tiga puluh dua.";
const SUARA_A5 = "Contoh ketiga. Lima puluh tiga kurang titik-titik sama dengan tiga puluh dua. Hasilnya dua puluh satu.";
const SUARA_A6 = "Kita periksa contoh pertama. Tiga puluh dua kurang tujuh belas sama dengan lima belas, jadi benar.";

export const ADEGAN_CONTOH_TENGAH: AdeganStory = {
  id: "contoh-tengah",
  judul: "Contoh titik-titik di tengah",
  sumber: "Materi: contoh titik-titik di tengah",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Contoh pertama"), ...B1.atas, ...B1.b), tambah("Pertama,", ...B1.a), tambah(idx(SUARA_A1, "puluh"), kalimat("ks", 136, "32 − … = 15", 22))),
    k(SUARA_A2, tambah(0, kalimat("hit", 172, "32 − 15 = 17", 24, W.merah)), ubah(idx(SUARA_A2, "tujuh"), { id: "bx_An", isi: "17", warna: W.biru })),
    k(SUARA_A3, bersih(0), tambah(0, judul("Contoh kedua"), ...B2.atas, ...B2.a, ...B2.b, kalimat("ks", 136, "56 − … = 24", 22))),
    k(SUARA_A4, tambah(0, kalimat("hit", 172, "56 − 24 = 32", 24, W.merah)), ubah(idx(SUARA_A4, "tiga"), { id: "by_An", isi: "32", warna: W.biru })),
    k(SUARA_A5, bersih(0), tambah(0, judul("Contoh ketiga"), ...B3.atas, ...B3.a, ...B3.b, kalimat("ks", 136, "53 − … = 32", 22)), tambah("Hasilnya", kalimat("hit", 172, "53 − 32 = 21", 24, W.merah)), ubah("Hasilnya", { id: "bz_An", isi: "21", warna: W.biru })),
    k(SUARA_A6, bersih(0), tambah(0, judul("Memeriksa"), kalimat("per", 100, "32 − 17 = 15", 30), emo("lp", 60, 168, "🔍", 36), emo("tu", 240, 168, "👍", 36)), tambah("benar.", emo("ok", 150, 168, "✅", 40))),
  ],
};

/* ------------------------------ 15. Contoh: titik-titik di depan ------------------------------ */
const C1 = bagan("cx", { y: 30, atas: "?", a: "12", b: "26", fa: 12 / 38 });
const C2 = bagan("cy", { y: 30, atas: "?", a: "23", b: "42", fa: 23 / 65 });
const C3 = bagan("cz", { y: 30, atas: "?", a: "41", b: "38", fa: 41 / 79 });
const SUARA_B1 = "Sekarang titik-titik di depan. Titik-titik kurang dua belas sama dengan dua puluh enam.";
const SUARA_B2 = "Titik-titik di depan, jadi kita tambahkan. Dua puluh enam tambah dua belas sama dengan tiga puluh delapan.";
const SUARA_B3 = "Contoh kedua. Titik-titik kurang dua puluh tiga sama dengan empat puluh dua.";
const SUARA_B4 = "Kita tambahkan empat puluh dua dengan dua puluh tiga. Hasilnya enam puluh lima.";
const SUARA_B5 = "Contoh ketiga. Titik-titik kurang empat puluh satu sama dengan tiga puluh delapan. Hasilnya tujuh puluh sembilan.";
const SUARA_B6 = "Kita periksa contoh pertama. Tiga puluh delapan kurang dua belas sama dengan dua puluh enam, jadi benar.";

export const ADEGAN_CONTOH_DEPAN: AdeganStory = {
  id: "contoh-depan",
  judul: "Contoh titik-titik di depan",
  sumber: "Materi: contoh titik-titik di depan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Contoh pertama"), ...C1.atas, ...C1.a, ...C1.b, kalimat("ks", 136, "… − 12 = 26", 22))),
    k(SUARA_B2, tambah(0, kalimat("hit", 172, "26 + 12 = 38", 24, W.merah)), ubah(idx(SUARA_B2, "tiga"), { id: "cx_Tn", isi: "38", warna: W.biru })),
    k(SUARA_B3, bersih(0), tambah(0, judul("Contoh kedua"), ...C2.atas, ...C2.a, ...C2.b, kalimat("ks", 136, "… − 23 = 42", 22))),
    k(SUARA_B4, tambah(0, kalimat("hit", 172, "42 + 23 = 65", 24, W.merah)), ubah(idx(SUARA_B4, "enam"), { id: "cy_Tn", isi: "65", warna: W.biru })),
    k(SUARA_B5, bersih(0), tambah(0, judul("Contoh ketiga"), ...C3.atas, ...C3.a, ...C3.b, kalimat("ks", 136, "… − 41 = 38", 22)), tambah("Hasilnya", kalimat("hit", 172, "38 + 41 = 79", 24, W.merah)), ubah("Hasilnya", { id: "cz_Tn", isi: "79", warna: W.biru })),
    k(SUARA_B6, bersih(0), tambah(0, judul("Memeriksa"), kalimat("per", 100, "38 − 12 = 26", 30), emo("lp", 60, 168, "🔍", 36), emo("tu", 240, 168, "👍", 36)), tambah("benar.", emo("ok", 150, 168, "✅", 40))),
  ],
};

/* ------------------------------ 16. Banyak kemungkinan ------------------------------ */
const KB = bagan("kb", { y: 40, atas: "100", a: "?", b: "?", fa: 0.5 });
const SUARA_C1 = "Kadang hanya bilangan awal yang kita ketahui. Contohnya, seorang pedagang punya seratus butir telur.";
const SUARA_C2 = "Telur itu ada yang terjual dan ada yang masih tersisa. Keduanya belum diketahui.";
const SUARA_C3 = "Banyak telur yang terjual dan sisanya bisa bermacam-macam, asal jumlahnya tetap seratus.";
const SUARA_C4 = "Misalnya terjual empat puluh lima dan sisa lima puluh lima.";
const SUARA_C5 = "Bisa juga terjual enam puluh dan sisa empat puluh. Jumlahnya tetap seratus.";
const SUARA_C6 = "Jadi ada banyak kemungkinan, selama jumlah kedua bagian sama dengan bilangan awal.";

export const ADEGAN_KEMUNGKINAN: AdeganStory = {
  id: "kemungkinan",
  judul: "Banyak kemungkinan",
  sumber: "Materi: banyak kemungkinan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Banyak kemungkinan"), emo("t1", 105, 90, "\u{1F95A}", 40), emo("t2", 150, 90, "\u{1F95A}", 40), emo("t3", 195, 90, "\u{1F95A}", 40)), tambah("seratus", teks("jt", 150, 140, "100 butir telur", 15, W.merah))),
    k(SUARA_C2, bersih(0), tambah(0, judul("Banyak kemungkinan"), ...KB.atas), tambah("terjual", ...KB.a), tambah("tersisa.", ...KB.b)),
    k(SUARA_C3, sorotkan("bermacam-macam,", "kb_A", "kb_B"), tambah("tetap", ...kartu("jm", 50, 130, 200, 26, W.emas, ["jumlah tetap 100"], 11))),
    k(SUARA_C4, redamkan(0, "kb_A", "kb_B"), ubah(0, ...atur("kb", 0.45), { id: "kb_An", isi: "45", warna: W.biru }, { id: "kb_Bn", isi: "55", warna: W.biru }), tambah("Misalnya", kalimat("hit", 182, "45 + 55 = 100", 22, W.merah))),
    k(SUARA_C5, ubah(0, ...atur("kb", 0.6), { id: "kb_An", isi: "60" }, { id: "kb_Bn", isi: "40" }, { id: "hit", isi: "60 + 40 = 100" })),
    k(SUARA_C6, sorotkan("banyak", "kb_T"), tambah("kemungkinan,", emo("ok", 262, 182, "✅", 24))),
  ],
};
