import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, GX, OWL, SATUAN, W, emo, hasil, judul, kartu, kotak, teks, ukur, ukurSalah, type Jenis } from "./k1b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ukurAksi } from "./k1b7B-bantu";

/* ------------------------------ 1. Panjang pita Malosi ------------------------------ */
const PITA = ukur("pu", "klip", 7, GX, 44, "pita Malosi", W.merahMuda);
const SUARA_P1 = "Malosi punya pita merah yang panjang. Igil, si burung hantu, bertanya, berapa panjang pita itu?";
const SUARA_P2 = "Kita bisa mengukurnya. Mengukur artinya membandingkan panjang benda dengan satuan, misalnya klip.";
const SUARA_P3 = "Klip kita taruh di sepanjang pita, mulai dari ujung. Garis merah ini adalah garis awal, tempat mulai mengukur.";
const SUARA_P4 = "Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_P5 = "Pita Malosi panjangnya tujuh klip. Hasil ukur ditulis dengan angka dan nama satuan.";

export const ADEGAN_PITA: AdeganStory = {
  id: "pita-malosi",
  judul: "Mengukur panjang pita Malosi",
  sumber: "Materi: mengukur panjang pita",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Panjang pita Malosi")),
      tambah("Malosi", emo("a-Malosi", 40, 160, ANAK_EMO, 30), teks("n-Malosi", 40, 182, "Malosi", 8.6)),
      tambah("pita", ...PITA.bar),
      tambah("Igil,", emo("a-Igil", 260, 160, OWL, 30), teks("n-Igil", 260, 182, "Igil", 8.6, W.ungu)),
    ),
    k(SUARA_P2, tambah("klip.", kotak("sk", 138, 104, SATUAN.klip.w, SATUAN.klip.h, SATUAN.klip.warna, W.biru, { rx: 2, tebal: 1.2 }), teks("skt", 150, 130, "klip", 10, W.ungu))),
    k(SUARA_P3, hapus(0, "sk", "skt"), tambah("Garis", PITA.garisAwal, teks("ga", GX, 114, "garis awal", 8.4, W.merah))),
    k(SUARA_P4, ...ukurAksi(SUARA_P4, PITA)),
    k(SUARA_P5, hapus(0, "tg", "ga"), tambah("tujuh", hasil("pu", "klip", 7, 150, 126, 14)), tambah("angka", ...kartu("hs", 60, 146, 180, 28, W.krem, ["angka + nama satuan"], 10))),
  ],
};

/* ------------------------------ 2. Satuan di layar ------------------------------ */
const JENIS: Jenis[] = ["klip", "stik", "kotak", "sedotan", "jepit"];
const barisY = (i: number): number => 36 + i * 30;
const contoh = (i: number): Obj[] => {
  const s = SATUAN[JENIS[i]];
  return [kotak(`sm${i}`, 130, barisY(i) + (20 - s.h) / 2, s.w, s.h, s.warna, W.biru, { rx: 2, tebal: 1.2 }), teks(`sn${i}`, 80, barisY(i) + 14, JENIS[i], 11, W.ungu)];
};
const SUARA_S1 = "Selain klip, ada satuan lain di layar kita. Satuan tidak baku adalah benda kecil yang dipakai untuk mengukur.";
const SUARA_S2 = "Ini klip dan ini stik. Stik lebih panjang dari klip.";
const SUARA_S3 = "Ini kotak satuan dan ini sedotan. Sedotan panjang dan tipis.";
const SUARA_S4 = "Yang terakhir adalah jepit. Jepit pendek dan lebar.";
const SUARA_S5 = "Satuan ini disebut tidak baku, karena panjangnya berbeda-beda. Satu stik tidak sama panjang dengan satu klip.";
const SUARA_S6 = "Untuk satu kali mengukur, kita memakai satu jenis satuan saja. Ayo kita lihat caranya.";

export const ADEGAN_SATUAN: AdeganStory = {
  id: "satuan-layar",
  judul: "Satuan tidak baku di layar",
  sumber: "Materi: satuan di layar",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Satuan di layar")), tambah("benda", emo("ow", 250, 100, OWL, 40))),
    k(SUARA_S2, tambah("klip", ...contoh(0)), tambah("stik", ...contoh(1))),
    k(SUARA_S3, tambah("kotak", ...contoh(2)), tambah("sedotan.", ...contoh(3))),
    k(SUARA_S4, hapus(0, "ow"), tambah("jepit.", ...contoh(4))),
    k(SUARA_S5, sorotkan("stik", "sm1", "sm0"), tambah("tidak", ...kartu("tb", 14, 178, 272, 22, W.emas, ["tidak baku: panjangnya berbeda"], 9.4))),
    k(SUARA_S6, hapus(0, "tb-k", "tb-t0"), tambah("satu", ...kartu("sj", 14, 178, 272, 22, W.hijauMuda, ["satu jenis satuan saja"], 9.4))),
  ],
};

/* ------------------------------ 3. Aturan pertama: mulai dari ujung ------------------------------ */
const U_SALAH = ukurSalah("xa", "ujung", "klip", 6, 144, GX, 34, "tali Kira", W.lavender);
const U_BENAR = ukur("ra", "klip", 6, GX, 112, "tali Kira", W.lavender);
const SUARA_U1 = "Aturan pertama, mulai dari ujung. Garis merah di ujung tali Kira adalah garis awal.";
const SUARA_U2 = "Klip pertama harus tepat di garis awal. Kalau klip mulai dari tengah, ada bagian tali yang tidak terukur. Itu salah.";
const SUARA_U3 = "Sekarang cara yang benar. Klip pertama tepat di garis awal.";
const SUARA_U4 = "Hitung klipnya. Satu, dua, tiga, empat, lima, enam. Tali Kira enam klip.";
const SUARA_U5 = "Ingat aturan pertama, mulai dari ujung, tepat di garis awal.";

export const ADEGAN_UJUNG: AdeganStory = {
  id: "mulai-ujung",
  judul: "Aturan pertama: mulai dari ujung",
  sumber: "Materi: aturan mulai dari ujung",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Mulai dari ujung")), tambah("tali", ...U_SALAH.bar, U_SALAH.garisAwal)),
    k(SUARA_U2, tambah("Kalau", ...U_SALAH.units), tambah("salah.", emo("sx", 262, 62, "❌", 22))),
    k(SUARA_U3, tambah(0, ...U_BENAR.bar, U_BENAR.garisAwal), tambah("tepat", U_BENAR.unit(0))),
    k(SUARA_U4, ...ukurAksi(SUARA_U4, U_BENAR, { setelah: "klipnya." }), tambah(idx(SUARA_U4, "klip"), hasil("ra", "klip", 6, 230, 150))),
    k(SUARA_U5, hapus(0, "tg"), tambah(0, ...kartu("ar", 14, 172, 272, 24, W.emas, ["aturan 1: mulai dari ujung"], 10))),
  ],
};

/* ------------------------------ 4. Aturan kedua: rapat ------------------------------ */
const R_SALAH = ukurSalah("xb", "celah", "sedotan", 4, 200, GX, 34, "meja Upe", W.krem);
const R_BENAR = ukur("rb", "sedotan", 5, GX, 112, "meja Upe", W.krem);
const SUARA_R1 = "Aturan kedua, satuan harus rapat. Upe mengukur panjang meja dengan sedotan.";
const SUARA_R2 = "Lihat, ada celah di antara sedotan. Celah membuat hasil ukurnya salah.";
const SUARA_R3 = "Cara yang benar, sedotan rapat, ujung ke ujung, tanpa celah.";
const SUARA_R4 = "Satu, dua, tiga, empat, lima. Panjang meja Upe lima sedotan.";
const SUARA_R5 = "Satuan yang rapat membuat hasil ukur tepat. Ingat aturan kedua, tanpa celah.";

export const ADEGAN_RAPAT: AdeganStory = {
  id: "satuan-rapat",
  judul: "Aturan kedua: satuan harus rapat",
  sumber: "Materi: aturan satuan rapat",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Satuan harus rapat")), tambah("Upe", ...R_SALAH.bar, R_SALAH.garisAwal)),
    k(SUARA_R2, tambah("Lihat,", ...R_SALAH.units), tambah("celah@2", emo("rx", 262, 62, "❌", 22))),
    k(SUARA_R3, tambah(0, ...R_BENAR.bar, R_BENAR.garisAwal), tambah("rapat,", R_BENAR.unit(0))),
    k(SUARA_R4, ...ukurAksi(SUARA_R4, R_BENAR), tambah(idx(SUARA_R4, "sedotan"), hasil("rb", "sedotan", 5, 262, 150))),
    k(SUARA_R5, hapus(0, "tg"), tambah(0, ...kartu("ar", 14, 172, 272, 24, W.emas, ["aturan 2: rapat, tanpa celah"], 10))),
  ],
};
