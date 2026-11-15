import type { AdeganStory } from "./logika-story";
import { GX, OWL, SATUAN, W, ANAK_EMO, emo, hasil, judul, kartu, kotak, teks, ukur, ukurSalah } from "./k1b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ukurAksi } from "./k1b7B-bantu";

/** Kartu aturan di bagian bawah. */
const aturan = (isi: string, warna: string = W.emas) => kartu("ar", 14, 172, 272, 24, warna, [isi], 10);

/* ------------------------------ 5. Aturan ketiga: tidak bertumpuk ------------------------------ */
const T_SALAH = ukurSalah("xc", "tumpuk", "stik", 4, 192, GX, 34, "tongkat Wei", W.hijauMuda);
const T_BENAR = ukur("rc", "stik", 4, GX, 112, "tongkat Wei", W.hijauMuda);
const SUARA_T1 = "Aturan ketiga, satuan tidak boleh bertumpuk. Wei mengukur tongkatnya dengan stik.";
const SUARA_T2 = "Lihat, stik yang satu menutupi stik yang lain. Bagian yang bertumpuk terhitung dua kali. Itu salah.";
const SUARA_T3 = "Cara yang benar, stik berjajar, ujung bertemu ujung.";
const SUARA_T4 = "Satu, dua, tiga, empat. Tongkat Wei empat stik.";
const SUARA_T5 = "Ingat aturan ketiga, satuan tidak bertumpuk.";

export const ADEGAN_TUMPUK: AdeganStory = {
  id: "tidak-bertumpuk",
  judul: "Aturan ketiga: tidak bertumpuk",
  sumber: "Materi: aturan tidak bertumpuk",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tidak bertumpuk")), tambah("Wei", ...T_SALAH.bar, T_SALAH.garisAwal)),
    k(SUARA_T2, tambah("Lihat,", ...T_SALAH.units), tambah("salah.", emo("tx", 262, 62, "❌", 22))),
    k(SUARA_T3, tambah(0, ...T_BENAR.bar, T_BENAR.garisAwal), tambah("berjajar,", T_BENAR.unit(0))),
    k(SUARA_T4, ...ukurAksi(SUARA_T4, T_BENAR), tambah(idx(SUARA_T4, "stik"), hasil("rc", "stik", 4, 262, 150))),
    k(SUARA_T5, hapus(0, "tg"), tambah(0, ...aturan("aturan 3: tidak bertumpuk"))),
  ],
};

/* ------------------------------ 6. Aturan keempat: tidak miring ------------------------------ */
const M_SALAH = ukurSalah("xd", "miring", "klip", 8, 192, GX, 34, "ikan Halim", W.pink);
const M_BENAR = ukur("rd", "klip", 8, GX, 112, "ikan Halim", W.pink);
const SUARA_M1 = "Aturan keempat, satuan tidak boleh miring. Halim mengukur ikannya dengan klip.";
const SUARA_M2 = "Lihat, klip ini miring. Klip yang miring tidak menutupi panjang ikan dengan pas. Itu salah.";
const SUARA_M3 = "Cara yang benar, klip lurus dan sejajar dengan ikan.";
const SUARA_M4 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan. Ikan Halim delapan klip.";
const SUARA_M5 = "Ingat aturan keempat, satuan tidak miring.";

export const ADEGAN_MIRING: AdeganStory = {
  id: "tidak-miring",
  judul: "Aturan keempat: tidak miring",
  sumber: "Materi: aturan tidak miring",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Tidak miring")), tambah("Halim", ...M_SALAH.bar, M_SALAH.garisAwal)),
    k(SUARA_M2, tambah("Lihat,", ...M_SALAH.units), tambah("salah.", emo("mx", 262, 62, "❌", 22))),
    k(SUARA_M3, tambah(0, ...M_BENAR.bar, M_BENAR.garisAwal), tambah("lurus", M_BENAR.unit(0))),
    k(SUARA_M4, ...ukurAksi(SUARA_M4, M_BENAR), tambah(idx(SUARA_M4, "klip."), hasil("rd", "klip", 8, 262, 150))),
    k(SUARA_M5, hapus(0, "tg"), tambah(0, ...aturan("aturan 4: tidak miring"))),
  ],
};

/* ------------------------------ 7. Aturan kelima: satu jenis satuan ------------------------------ */
const J_SALAH = ukurSalah("xe", "campur", "klip", 5, 192, GX, 34, "kereta Upe", W.langit);
const J_BENAR = ukur("re", "stik", 4, GX, 112, "kereta Upe", W.langit);
const SUARA_J1 = "Aturan kelima, pakai satu jenis satuan saja. Upe mengukur keretanya dengan klip dan stik sekaligus.";
const SUARA_J2 = "Lihat, ada klip dan ada stik. Satuannya campur, jadi hitungannya tidak bisa dipercaya.";
const SUARA_J3 = "Cara yang benar, pakai stik saja dari awal sampai akhir.";
const SUARA_J4 = "Satu, dua, tiga, empat. Kereta Upe empat stik.";
const SUARA_J5 = "Ingat aturan kelima, satu jenis satuan.";

export const ADEGAN_SATU_JENIS: AdeganStory = {
  id: "satu-jenis",
  judul: "Aturan kelima: satu jenis satuan",
  sumber: "Materi: aturan satu jenis satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Satu jenis satuan")), tambah("Upe", ...J_SALAH.bar, J_SALAH.garisAwal)),
    k(SUARA_J2, tambah("Lihat,", ...J_SALAH.units), tambah("campur,", emo("jx", 262, 62, "❌", 22))),
    k(SUARA_J3, tambah(0, ...J_BENAR.bar, J_BENAR.garisAwal), tambah("stik", J_BENAR.unit(0))),
    k(SUARA_J4, ...ukurAksi(SUARA_J4, J_BENAR), tambah(idx(SUARA_J4, "stik."), hasil("re", "stik", 4, 262, 150))),
    k(SUARA_J5, hapus(0, "tg"), tambah(0, ...aturan("aturan 5: satu jenis satuan"))),
  ],
};

/* ------------------------------ 8. Lima aturan emas ------------------------------ */
const ATURAN = ["mulai dari ujung", "satuan rapat", "tidak bertumpuk", "tidak miring", "satu jenis satuan"];
const WARNA = [W.hijauMuda, W.langit, W.krem, W.pink, W.lavender];
const kartuAturan = (i: number) => [...kartu(`la${i}`, 40, 30 + i * 30, 220, 24, WARNA[i], [ATURAN[i]], 10), emo(`lc${i}`, 274, 48 + i * 30, "✅", 18)];
const SUARA_L1 = "Mari kita ingat lima aturan emas mengukur panjang. Igil membantu kita menyebutnya satu per satu.";
const SUARA_L2 = "Pertama, mulai dari ujung. Kedua, satuan rapat tanpa celah.";
const SUARA_L3 = "Ketiga, satuan tidak bertumpuk. Keempat, satuan tidak miring.";
const SUARA_L4 = "Kelima, pakai satu jenis satuan saja dari awal sampai akhir.";
const SUARA_L5 = "Kalau kelima aturan ini kita patuhi, hasil ukur kita pasti benar.";

export const ADEGAN_LIMA: AdeganStory = {
  id: "lima-aturan",
  judul: "Lima aturan emas mengukur",
  sumber: "Materi: lima aturan emas",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Lima aturan emas")), tambah("Igil", emo("ow", 150, 112, OWL, 56))),
    k(SUARA_L2, hapus(0, "ow"), tambah("Pertama,", ...kartuAturan(0)), tambah("Kedua,", ...kartuAturan(1))),
    k(SUARA_L3, tambah("Ketiga,", ...kartuAturan(2)), tambah("Keempat,", ...kartuAturan(3))),
    k(SUARA_L4, tambah("Kelima,", ...kartuAturan(4))),
    k(SUARA_L5, sorotkan("Kalau", "la0-k", "la1-k", "la2-k", "la3-k", "la4-k"), tambah("benar.", emo("ow2", 262, 190, OWL, 20))),
  ],
};

/* ------------------------------ 9. Mengukur meja langkah demi langkah ------------------------------ */
const MEJA = ukur("um", "sedotan", 6, GX, 40, "meja", W.krem);
const langkah = (isi: string) => kartu("st", 14, 150, 272, 28, W.emas, [isi], 10);
const SUARA_G1 = "Sekarang kita mengukur dari awal sampai akhir. Malosi mau mengukur panjang sebuah meja.";
const SUARA_G2 = "Langkah pertama, pilih satu satuan. Malosi memilih sedotan.";
const SUARA_G3 = "Langkah kedua, taruh sedotan pertama tepat di garis awal.";
const SUARA_G4 = "Langkah ketiga, taruh sedotan berikutnya rapat dan lurus, ujung bertemu ujung. Satu, dua, tiga, empat, lima, enam.";
const SUARA_G5 = "Langkah keempat, tulis hasilnya dengan angka dan nama satuan. Panjang meja enam sedotan.";
const SUARA_G6 = "Hebat! Malosi sudah mengukur dengan cara yang benar.";

export const ADEGAN_UKUR_MEJA: AdeganStory = {
  id: "ukur-meja",
  judul: "Mengukur meja langkah demi langkah",
  sumber: "Materi: mengukur meja langkah demi langkah",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Mengukur meja")), tambah("Malosi", emo("a-Malosi", 40, 120, ANAK_EMO, 28), teks("n-Malosi", 40, 140, "Malosi", 8.4)), tambah("meja.", ...MEJA.bar)),
    k(SUARA_G2, tambah(0, ...langkah("langkah 1: pilih satu satuan")), tambah("sedotan.", kotak("sk", 130, 100, SATUAN.sedotan.w, SATUAN.sedotan.h, SATUAN.sedotan.warna, W.biru, { rx: 2, tebal: 1.2 }), teks("skt", 150, 124, "sedotan", 10, W.ungu))),
    k(SUARA_G3, hapus(0, "sk", "skt", "st-k", "st-t0"), tambah(0, ...langkah("langkah 2: mulai di garis awal")), tambah("tepat", MEJA.garisAwal, MEJA.unit(0))),
    k(SUARA_G4, hapus(0, "st-k", "st-t0"), tambah(0, ...langkah("langkah 3: rapat, lurus, sejenis")), ...ukurAksi(SUARA_G4, MEJA, { setelah: "bertemu" })),
    k(SUARA_G5, hapus(0, "st-k", "st-t0", "tg"), tambah(0, ...langkah("langkah 4: tulis angka + satuan")), tambah(idx(SUARA_G5, "sedotan"), hasil("um", "sedotan", 6, 150, 112, 14))),
    k(SUARA_G6, sorotkan("Hebat!", "umh"), tambah("benar.", emo("ok", 262, 124, "✅", 24))),
  ],
};
