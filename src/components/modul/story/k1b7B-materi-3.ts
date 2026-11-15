import type { AdeganStory } from "./logika-story";
import { GX, W, emo, garis, hasil, judul, kartu, teks, ukur, petak } from "./k1b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah, ukurAksi } from "./k1b7B-bantu";

/* ------------------------------ 10. Menulis hasil ukur ------------------------------ */
const IKAN = ukur("th", "stik", 5, GX, 34, "ikan Halim", W.pink);
const SUARA_H1 = "Halim mengukur panjang ikannya dengan stik. Hasilnya ditulis dengan angka dan nama satuan.";
const SUARA_H2 = "Panjang ikan Halim lima stik. Angkanya lima, nama satuannya stik.";
const SUARA_H3 = "Kalau hanya ditulis lima, kita tidak tahu satuannya. Lima apa?";
const SUARA_H4 = "Jadi tulislah lengkap, angka dan nama satuan. Lima stik.";
const SUARA_H5 = "Ucapkan lagi mengikuti suara guru. Panjang ikan Halim lima stik.";

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-hasil",
  judul: "Menulis hasil ukur",
  sumber: "Materi: menulis hasil ukur",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Menulis hasil ukur")), tambah("ikannya", ...IKAN.bar, IKAN.garisAwal, ...IKAN.units)),
    k(
      SUARA_H2,
      tambah("lima", hasil("th", "stik", 5, 150, 112, 14)),
      tambah("Angkanya", ...kartu("ka", 30, 128, 110, 26, W.krem, ["angka: 5"], 10)),
      tambah("satuannya", ...kartu("kb", 160, 128, 110, 26, W.langit, ["satuan: stik"], 10)),
    ),
    k(SUARA_H3, hapus(0, "ka-k", "ka-t0", "kb-k", "kb-t0"), tambah("hanya", teks("bx", 150, 160, "5 ?", 18, W.merah)), tambah("apa?", emo("tq", 200, 160, "❌", 22))),
    k(SUARA_H4, hapus(0, "bx", "tq"), tambah("Lima", emo("ok", 150, 160, "✅", 24)), sorotkan("lengkap,", "thh")),
    k(SUARA_H5, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24)), tambah("Panjang", ...kartu("hz", 40, 170, 200, 24, W.emas, ["ikan Halim: 5 stik"], 10))),
  ],
};

/* ------------------------------ 11. Dua satuan, hasil berbeda ------------------------------ */
const T_KLIP = ukur("da", "klip", 10, GX, 30, "tali Kira", W.lavender);
const T_STIK = ukur("db", "stik", 5, GX, 104, "tali Kira", W.lavender);
const SUARA_D1 = "Kira mengukur satu tali dua kali. Pertama dengan klip, lalu dengan stik.";
const SUARA_D2 = "Dengan klip, satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Tali Kira sepuluh klip.";
const SUARA_D3 = "Dengan stik, satu, dua, tiga, empat, lima. Tali Kira lima stik.";
const SUARA_D4 = "Talinya sama, tetapi hasilnya berbeda. Sepuluh klip dan lima stik. Mengapa bisa berbeda?";
const SUARA_D5 = "Karena satu stik lebih panjang dari satu klip. Satuan yang lebih panjang membuat hasil ukur lebih sedikit.";
const SUARA_D6 = "Jadi, untuk membandingkan dua benda, pakailah satuan yang sama.";

export const ADEGAN_DUA_SATUAN: AdeganStory = {
  id: "dua-satuan",
  judul: "Satu tali, dua satuan, hasil berbeda",
  sumber: "Materi: satuan berbeda, hasil berbeda",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Satu tali, dua satuan")), tambah("tali", ...T_KLIP.bar, T_KLIP.garisAwal), tambah("stik.", ...T_STIK.bar, T_STIK.garisAwal)),
    k(SUARA_D2, ...ukurAksi(SUARA_D2, T_KLIP, { setelah: "klip," }), tambah(idx(SUARA_D2, "klip", 2), hasil("da", "klip", 10, 150, 92))),
    k(SUARA_D3, ...ukurAksi(SUARA_D3, T_STIK, { setelah: "stik,", tanganAda: true }), tambah(idx(SUARA_D3, "stik", 2), hasil("db", "stik", 5, 150, 166))),
    k(SUARA_D4, hapus(0, "tg"), sorotkan("Sepuluh", "dah"), sorotkan("lima", "dbh")),
    k(SUARA_D5, tambah("Karena", ...kartu("dk", 14, 176, 272, 22, W.emas, ["satuan panjang, hasil sedikit"], 9.4))),
    k(SUARA_D6, hapus(0, "dk-k", "dk-t0"), tambah("Jadi,", ...kartu("dl", 14, 176, 272, 22, W.hijauMuda, ["bandingkan: satuan yang sama"], 9.4))),
  ],
};

/* ------------------------------ 12. Mengukur di layar berpetak ------------------------------ */
const KERETA = ukur("pk", "kotak", 9, GX, 40, "kereta Upe", W.langit);
const SUARA_K1 = "Ini layar berpetak. Setiap petak sama besar, jadi petak bisa menjadi satuan.";
const SUARA_K2 = "Kereta Upe terletak di atas petak, mulai dari garis awal.";
const SUARA_K3 = "Kita warnai petak satu per satu dari ujung. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_K4 = "Kereta Upe panjangnya sembilan kotak. Ujungnya tepat di petak terakhir.";
const SUARA_K5 = "Petak berukuran sama, jadi hasilnya mudah dibandingkan. Hasil ukur ditulis sembilan kotak.";

export const ADEGAN_PETAK: AdeganStory = {
  id: "layar-berpetak",
  judul: "Mengukur di layar berpetak",
  sumber: "Materi: mengukur dengan kotak berpetak",
  latar: "#F8FAFC",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Layar berpetak")), tambah("petak", ...petak(GX, 68, 12, 3))),
    k(SUARA_K2, tambah("Kereta", ...KERETA.bar), tambah("garis", KERETA.garisAwal)),
    k(SUARA_K3, ...ukurAksi(SUARA_K3, KERETA, { setelah: "ujung." })),
    k(SUARA_K4, hapus(0, "tg"), tambah(idx(SUARA_K4, "sembilan"), hasil("pk", "kotak", 9, 150, 150, 14))),
    k(SUARA_K5, tambah(0, ...kartu("pz", 14, 166, 272, 24, W.emas, ["petak sama besar, mudah dibandingkan"], 9.4)), ubah("ditulis", { id: "pkh", u: 16 })),
  ],
};

/* ------------------------------ 13. Membandingkan dua panjang ------------------------------ */
const PITA_M = ukur("ba", "klip", 8, GX, 40, "pita Malosi", W.merahMuda);
const TALI_K = ukur("bb", "klip", 5, GX, 116, "tali Kira", W.lavender);
const SUARA_B1 = "Malosi dan Kira mengukur dengan klip. Mereka mulai dari garis awal yang sama.";
const SUARA_B2 = "Pita Malosi delapan klip. Tali Kira lima klip.";
const SUARA_B3 = "Delapan lebih dari lima. Jadi pita Malosi lebih panjang dari tali Kira.";
const SUARA_B4 = "Tali Kira lebih pendek dari pita Malosi. Lebih pendeknya tiga klip.";
const SUARA_B5 = "Ingat, garis awalnya harus sama. Benda yang ujungnya lebih jauh adalah benda yang lebih panjang.";

export const ADEGAN_BANDING_DUA: AdeganStory = {
  id: "banding-dua",
  judul: "Membandingkan dua panjang",
  sumber: "Materi: lebih panjang dan lebih pendek",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Lebih panjang, lebih pendek")), tambah("klip.", ...PITA_M.bar, PITA_M.garisAwal, ...PITA_M.units), tambah("garis", ...TALI_K.bar, TALI_K.garisAwal, ...TALI_K.units)),
    k(SUARA_B2, tambah("delapan", hasil("ba", "klip", 8, 262, 78)), tambah("lima", hasil("bb", "klip", 5, 262, 154))),
    k(SUARA_B3, sorotkan("pita", "bab"), tambah("Jadi", ...kartu("bk", 40, 172, 220, 24, W.hijauMuda, ["pita lebih panjang dari tali"], 9.4))),
    k(
      SUARA_B4,
      hapus(0, "bk-k", "bk-t0"),
      sorotkan("pendeknya", "bau5", "bau6", "bau7"),
      tambah("pendeknya", teks("bs", 150, 104, "selisih: 3 klip", 10, W.coklat)),
      tambah("Tali", ...kartu("bl", 40, 172, 220, 24, W.merahMuda, ["tali lebih pendek dari pita"], 9.4)),
    ),
    k(SUARA_B5, hapus(0, "bl-k", "bl-t0"), tambah("Ingat,", ...kartu("bm", 14, 168, 272, 28, W.emas, ["garis awal sama,", "ujung lebih jauh: lebih panjang"], 9)), tambah("Benda", emo("ow", 262, 100, "\u{1F989}", 22))),
  ],
};

/* ------------------------------ 14. Sama panjang ------------------------------ */
const TONGKAT_S = ukur("sa", "klip", 7, GX, 40, "tongkat Upe", W.hijauMuda);
const PITA_S = ukur("sb", "klip", 7, GX, 116, "pita Wei", W.pink);
const SUARA_S1 = "Upe dan Wei juga mengukur dengan klip. Mereka mulai dari garis awal yang sama.";
const SUARA_S2 = "Tongkat Upe tujuh klip. Pita Wei tujuh klip.";
const SUARA_S3 = "Ujung tongkat dan ujung pita sejajar. Jadi keduanya sama panjang.";
const SUARA_S4 = "Dua benda sama panjang kalau hasil ukurnya sama, dengan satuan yang sama.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama-panjang",
  judul: "Sama panjang",
  sumber: "Materi: sama panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Sama panjang")), tambah("klip.", ...TONGKAT_S.bar, TONGKAT_S.garisAwal, ...TONGKAT_S.units), tambah("garis", ...PITA_S.bar, PITA_S.garisAwal, ...PITA_S.units)),
    k(SUARA_S2, tambah("Tongkat", hasil("sa", "klip", 7, 262, 78)), tambah("Pita", hasil("sb", "klip", 7, 262, 154))),
    k(SUARA_S3, tambah("sejajar.", garis("sj", 198, 34, 0, 134, W.hijau, 1.6, { putus: true })), tambah("sama", teks("sjt", 198, 108, "sama", 9.4, W.hijau))),
    k(SUARA_S4, tambah("Dua", ...kartu("sm", 14, 172, 272, 24, W.emas, ["sama panjang: hasil ukur sama"], 9.6)), sorotkan("kalau", "sab", "sbb")),
  ],
};
