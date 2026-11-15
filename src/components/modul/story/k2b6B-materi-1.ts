import type { AdeganStory } from "./logika-story";
import { BAGIAN, EMO_BAGIAN, JAM_BESAR, JAM_KIRI, JAM_TIGA, W, angkaJam, digital, emo, jarumPanjang, jarumPendek, jam, judul, kolomBagian, kartu, mukaJam, pita, porosJam, teks } from "./k2b6B-gambar";
import { hapus, idx, k, putarJam, sorotkan, tambah, ubah, ubahDigital } from "./k2b6B-bantu";

/* ------------------------------ 2. Bagian-bagian jam ------------------------------ */
const SUARA_A1 = "Lihat jam di layar ini. Jam milik Igil membantu kita mengetahui waktu sepanjang hari.";
const SUARA_A2 = "Jam ini punya angka satu sampai dua belas. Angka itu tersusun melingkar.";
const SUARA_A3 = "Ada dua jarum pada jam. Jarum yang pendek menunjukkan jam.";
const SUARA_A4 = "Jarum yang panjang menunjukkan menit pada jam.";
const SUARA_A5 = "Jarum pendek di angka lima dan jarum panjang di angka dua belas. Jadi jam ini menunjukkan pukul lima tepat.";

export const ADEGAN_BAGIAN_JAM: AdeganStory = {
  id: "bagian-jam",
  judul: "Bagian-bagian jam analog",
  sumber: "Materi: bagian-bagian jam",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Bagian-bagian jam")), tambah(idx(SUARA_A1, "jam", 1), mukaJam("j1", JAM_BESAR), porosJam("j1", JAM_BESAR))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "angka"), angkaJam("j1", JAM_BESAR))),
    k(SUARA_A3, tambah(idx(SUARA_A3, "pendek"), jarumPendek("j1", JAM_BESAR, 5, 0)), tambah(idx(SUARA_A3, "menunjukkan"), ...pita("zz", "jarum pendek: jam", W.langit))),
    k(SUARA_A4, tambah(idx(SUARA_A4, "panjang"), jarumPanjang("j1", JAM_BESAR, 0)), hapus(idx(SUARA_A4, "menunjukkan"), "zz-k", "zz-t0"), tambah(idx(SUARA_A4, "menunjukkan"), ...pita("zy", "jarum panjang: menit", W.merahMuda))),
    k(
      SUARA_A5,
      sorotkan(idx(SUARA_A5, "pendek"), "j1-p"),
      sorotkan(idx(SUARA_A5, "panjang"), "j1-m"),
      hapus(idx(SUARA_A5, "Jadi"), "zy-k", "zy-t0"),
      tambah(idx(SUARA_A5, "pukul"), ...pita("zx", "pukul 5 tepat", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Pukul tepat ------------------------------ */
const SUARA_B1 = "Malosi melihat jam di layar. Kalau jarum panjang di angka dua belas, kita baca jamnya dari jarum pendek.";
const SUARA_B2 = "Sekarang jarum pendek di angka enam. Jadi ini pukul enam tepat.";
const SUARA_B3 = "Kita putar jamnya. Sekarang jarum pendek di angka tujuh, jadi ini pukul tujuh tepat.";
const SUARA_B4 = "Kita putar lagi. Sekarang kedua jarum sama-sama di angka dua belas. Itu pukul dua belas tepat.";
const SUARA_B5 = "Ingat, pada pukul tepat jarum panjang selalu di angka dua belas. Jarum pendeknya yang berganti-ganti.";

export const ADEGAN_PUKUL_TEPAT: AdeganStory = {
  id: "pukul-tepat",
  judul: "Membaca pukul tepat",
  sumber: "Materi: membaca pukul tepat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Pukul tepat")), tambah(0, jam("j1", JAM_BESAR, 6, 0)), sorotkan(idx(SUARA_B1, "panjang"), "j1-m")),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "pendek"), "j1-p"), ubah(idx(SUARA_B2, "pendek"), { id: "j1-m", sorot: false }), tambah(idx(SUARA_B2, "pukul"), ...pita("zz", "pukul 6 tepat", W.emas))),
    k(SUARA_B3, putarJam(idx(SUARA_B3, "putar"), "j1", { h: 6, m: 0 }, { h: 7, m: 0 }), ubah(idx(SUARA_B3, "pukul"), { id: "zz-t0", isi: "pukul 7 tepat" })),
    k(SUARA_B4, putarJam(idx(SUARA_B4, "putar"), "j1", { h: 7, m: 0 }, { h: 12, m: 0 }), ubah(idx(SUARA_B4, "pukul"), { id: "zz-t0", isi: "pukul 12 tepat" }), sorotkan(idx(SUARA_B4, "kedua"), "j1-m")),
    k(SUARA_B5, ubah(idx(SUARA_B5, "panjang"), { id: "j1-m", sorot: true }), ubah(idx(SUARA_B5, "Jarum", 2), { id: "j1-p", sorot: true }, { id: "j1-m", sorot: false })),
  ],
};

/* ------------------------------ 4. Jam digital ------------------------------ */
const SUARA_C1 = "Upe punya jam lain yang disebut jam digital. Jam digital memakai angka, bukan jarum.";
const SUARA_C2 = "Pukul lima tepat ditulis nol lima titik nol nol pada jam digital.";
const SUARA_C3 = "Dua angka di depan titik untuk jam. Dua angka di belakang titik untuk menit.";
const SUARA_C4 = "Sekarang jam menunjukkan pukul enam tepat. Jam digital menulis nol enam titik nol nol.";
const SUARA_C5 = "Pukul dua belas tepat ditulis dua belas titik nol nol.";

export const ADEGAN_JAM_DIGITAL: AdeganStory = {
  id: "jam-digital",
  judul: "Jam digital dan jam analog",
  sumber: "Materi: jam digital",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Jam digital")), tambah(0, jam("j1", JAM_KIRI, 5, 0)), tambah(idx(SUARA_C1, "digital", 2), digital(156, 84, 5, 0, 132))),
    k(SUARA_C2, sorotkan(idx(SUARA_C2, "nol"), "dg-k"), sorotkan(idx(SUARA_C2, "tepat"), "j1-p")),
    k(
      SUARA_C3,
      ubah(0, { id: "dg-k", sorot: false }, { id: "j1-p", sorot: false }),
      tambah(idx(SUARA_C3, "depan"), teks("dg-lj", 206, 140, "jam", 10, W.hijau)),
      tambah(idx(SUARA_C3, "belakang"), teks("dg-lm", 240, 156, "menit", 10, W.merah)),
    ),
    k(SUARA_C4, putarJam(idx(SUARA_C4, "Sekarang"), "j1", { h: 5, m: 0 }, { h: 6, m: 0 }), ubahDigital(idx(SUARA_C4, "menulis"), 6, 0)),
    k(SUARA_C5, putarJam(idx(SUARA_C5, "Pukul"), "j1", { h: 6, m: 0 }, { h: 12, m: 0 }), ubahDigital(idx(SUARA_C5, "dua", 2), 12, 0)),
  ],
};

/* ------------------------------ 4b. Membaca tiga jam ------------------------------ */
const SUARA_T1 = "Sekarang kita latihan membaca tiga buah jam. Lihat jam pertama, milik Upe.";
const SUARA_T2 = "Jarum pendek di angka lima. Jarum panjang di angka dua belas. Jadi Upe bangun pukul lima pagi.";
const SUARA_T3 = "Jam kedua milik Halim. Jarum pendek di angka dua dan jarum panjang di angka dua belas.";
const SUARA_T4 = "Halim pulang pukul dua siang. Siang itu matahari masih tinggi.";
const SUARA_T5 = "Jam ketiga milik Malosi. Jarum pendek di angka tujuh, jadi Malosi makan malam pukul tujuh malam.";

export const ADEGAN_TIGA_JAM: AdeganStory = {
  id: "tiga-jam",
  judul: "Membaca tiga jam",
  sumber: "Materi: membaca tiga jam",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tiga jam")), tambah(idx(SUARA_T1, "pertama,"), jam("j1", JAM_TIGA[0], 5, 0, false), teks("n1", 52, 152, "Upe", 11, W.ungu))),
    k(SUARA_T2, sorotkan(idx(SUARA_T2, "pendek"), "j1-p"), sorotkan(idx(SUARA_T2, "panjang"), "j1-m"), ubah(idx(SUARA_T2, "Jadi"), { id: "j1-p", sorot: false }, { id: "j1-m", sorot: false })),
    k(SUARA_T3, tambah(idx(SUARA_T3, "kedua"), jam("j2", JAM_TIGA[1], 2, 0, false), teks("n2", 150, 152, "Halim", 11, W.ungu))),
    k(SUARA_T4, sorotkan(idx(SUARA_T4, "pulang"), "j2-p"), tambah(idx(SUARA_T4, "Siang", 2), emo("lg", 268, 40, EMO_BAGIAN.siang, 22, { z: 0 }))),
    k(SUARA_T5, ubah(0, { id: "j2-p", sorot: false }), tambah(idx(SUARA_T5, "ketiga"), jam("j3", JAM_TIGA[2], 7, 0, false), teks("n3", 248, 152, "Malosi", 11, W.ungu)), hapus(idx(SUARA_T5, "ketiga"), "lg")),
  ],
};

/* ------------------------------ 5. Empat bagian hari ------------------------------ */
const SUARA_D1 = "Satu hari punya empat bagian. Mari kita kenali satu per satu.";
const SUARA_D2 = "Bagian pertama adalah pagi. Matahari baru terbit.";
const SUARA_D3 = "Bagian kedua adalah siang. Matahari ada di tempat yang paling tinggi.";
const SUARA_D4 = "Bagian ketiga adalah sore. Matahari mulai turun.";
const SUARA_D5 = "Bagian keempat adalah malam. Langit gelap dan kita beristirahat.";
const NAMA_URUT = ["pertama", "kedua", "ketiga", "keempat"];

export const ADEGAN_EMPAT_BAGIAN: AdeganStory = {
  id: "empat-bagian",
  judul: "Empat bagian hari",
  sumber: "Materi: pagi, siang, sore, malam",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Satu hari")), tambah(idx(SUARA_D1, "empat"), ...kartu("zz", 30, 150, 240, 30, W.krem, ["pagi, siang, sore, malam"], 11))),
    ...[SUARA_D2, SUARA_D3, SUARA_D4, SUARA_D5].map((s, j) =>
      k(s, tambah(idx(s, NAMA_URUT[j]), kolomBagian(j, 86, 30)), tambah(idx(s, BAGIAN[j]), emo(`bge${j}`, 42 + j * 72, 74, EMO_BAGIAN[BAGIAN[j]], 30, { z: 1 }))),
    ),
  ],
};
