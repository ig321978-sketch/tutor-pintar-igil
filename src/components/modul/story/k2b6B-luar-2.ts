import type { AdeganStory } from "./logika-story";
import { BAGIAN, EMO_BAGIAN, OWL, W, barisKegiatan, barisLama, emo, judul, kartu, kegiatanBagian, kolomBagian, pilihKata } from "./k2b6B-gambar";
import { hapusKartu, idx, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b6B-luar-1";

/* ------------------------------ 4. Lama Kegiatan: perkirakan lama suatu kegiatan ------------------------------ */
const SUARA_Y1 = "Metode kedua bernama Lama Kegiatan. Perkirakan dulu lama suatu kegiatan.";
const SUARA_Y2 = "Cuci tangan paling sebentar, sekitar satu menit.";
const SUARA_Y3 = "Mandi kira-kira lima belas menit. Olahraga selama satu jam.";
const SUARA_Y4 = "Kita perkirakan dengan batang. Olahraga paling lama, dan cuci tangan paling sebentar.";
const SUARA_Y5 = "Ingat, kegiatan yang sebentar memakai menit, kegiatan yang lama memakai jam.";

export const ADEGAN_LUAR_LAMA: AdeganStory = {
  id: "luar-lama",
  judul: "Lama Kegiatan: perkirakan lamanya",
  sumber: "Metode luar: Lama Kegiatan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Y1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Y1, "Perkirakan"), ...kartu("kk", 30, 76, 240, 44, W.langit, ["perkirakan lamanya", "suatu kegiatan"], 11))),
    k(SUARA_Y2, { at: 0, hapus: ["kk-k", "kk-t0", "kk-t1"] }, tambah(idx(SUARA_Y2, "Cuci"), barisLama(1, 56, "Cuci tangan", 1, W.hijauMuda))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Mandi"), barisLama(2, 98, "Mandi", 15, W.langit)), tambah(idx(SUARA_Y3, "Olahraga"), barisLama(3, 140, "Olahraga", 60, W.pink))),
    k(SUARA_Y4, sorotkan(idx(SUARA_Y4, "Olahraga"), "lm3-b"), sorotkan(idx(SUARA_Y4, "cuci"), "lm1-b")),
    k(SUARA_Y5, ubah(0, { id: "lm3-b", sorot: false }, { id: "lm1-b", sorot: false }), sorotkan(idx(SUARA_Y5, "menit,"), "lm1-t", "lm2-t"), sorotkan(idx(SUARA_Y5, "jam."), "lm3-t")),
  ],
};

/* ------------------------------ 5. Lama Kegiatan: terapan ------------------------------ */
const SUARA_Z1 = "Sekarang giliranmu. Kira menyisir rambut sekitar dua menit dan mandi kira-kira lima belas menit.";
const SUARA_Z2 = "Mana yang lebih lama? Ketuk jawabanmu.";
const SUARA_Z3 = "Betul, mandi! Mandi lebih lama dari menyisir rambut.";
const SUARA_Z4 = "Jadi menyisir rambut lebih sebentar dari mandi.";

export const ADEGAN_LUAR_LAMA_TERAPAN: AdeganStory = {
  id: "luar-lama-terapan",
  judul: "Lama Kegiatan: mana lebih lama",
  sumber: "Metode luar: Lama Kegiatan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Z1, "menyisir"), barisLama(1, 56, "Menyisir rambut", 2, W.pink)), tambah(idx(SUARA_Z1, "mandi"), barisLama(2, 98, "Mandi", 15, W.langit))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Ketuk"), ...pilihKata(142, ["menyisir rambut", "mandi"], 11))),
    k(SUARA_Z3, sorotkan(idx(SUARA_Z3, "Betul"), "c2-k"), sorotkan(idx(SUARA_Z3, "Mandi", 2), "lm2-b")),
    k(SUARA_Z4, hapusKartu(0, 2), ubah(0, { id: "lm2-b", sorot: false }), sorotkan(idx(SUARA_Z4, "menyisir"), "lm1-b")),
  ],
};

/* ------------------------------ 6. Urutan Waktu Sehari: pagi, siang, sore, malam ------------------------------ */
const SUARA_V1 = "Metode ketiga bernama Urutan Waktu Sehari. Ingat urutannya: pagi, siang, sore, malam.";
const SUARA_V2 = "Kira sarapan di pagi hari. Kira makan siang di siang hari.";
const SUARA_V3 = "Kira bermain di sore hari. Kira tidur di malam hari.";
const SUARA_V4 = "Urutan waktu sehari selalu sama: pagi, siang, sore, lalu malam.";
const SUARA_V5 = "Dengan urutan ini, kita tahu kegiatan mana yang terjadi lebih dulu.";

export const ADEGAN_LUAR_URUTAN: AdeganStory = {
  id: "luar-urutan",
  judul: "Urutan Waktu Sehari: pagi, siang, sore, malam",
  sumber: "Metode luar: Urutan Waktu Sehari",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, ...kepala(2)),
      ...BAGIAN.map((b, j) => tambah(idx(SUARA_V1, [`pagi,`, `siang,`, `sore,`, `malam.`][j]), kolomBagian(j, 70, 30), emo(`bge${j}`, 42 + j * 72, 62, EMO_BAGIAN[b], 26, { z: 1 }))),
    ),
    k(SUARA_V2, tambah(idx(SUARA_V2, "sarapan"), kegiatanBagian(0, "Sarapan", 112)), tambah(idx(SUARA_V2, "makan"), kegiatanBagian(1, "Makan siang", 112))),
    k(SUARA_V3, tambah(idx(SUARA_V3, "bermain"), kegiatanBagian(2, "Bermain", 112)), tambah(idx(SUARA_V3, "tidur"), kegiatanBagian(3, "Tidur", 112))),
    k(SUARA_V4, ...BAGIAN.map((_, j) => sorotkan(idx(SUARA_V4, [`pagi,`, `siang,`, `sore,`, `malam.`][j]), `bg${j}-k`))),
    k(SUARA_V5, ...BAGIAN.map((_, j) => ubah(0, { id: `bg${j}-k`, sorot: false })), sorotkan(idx(SUARA_V5, "lebih"), "bg0-k", "bgk0-k")),
  ],
};

/* ------------------------------ 7. Urutan Waktu Sehari: terapan ------------------------------ */
const SUARA_T1 = "Sekarang giliranmu. Kira belajar pukul tujuh pagi dan bermain pukul empat sore.";
const SUARA_T2 = "Kegiatan mana yang lebih dulu? Ketuk jawabanmu.";
const SUARA_T3 = "Betul, belajar! Pagi datang lebih dulu daripada sore.";
const SUARA_T4 = "Jadi belajar pukul tujuh pagi lebih dulu daripada bermain pukul empat sore.";

export const ADEGAN_LUAR_URUTAN_TERAPAN: AdeganStory = {
  id: "luar-urutan-terapan",
  judul: "Urutan Waktu Sehari: mana lebih dulu",
  sumber: "Metode luar: Urutan Waktu Sehari, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(2)), tambah(idx(SUARA_T1, "belajar"), barisKegiatan(1, 0, 44, 40)), tambah(idx(SUARA_T1, "bermain"), barisKegiatan(3, 1, 44, 40))),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Ketuk"), ...pilihKata(142, ["belajar", "bermain"], 11))),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Betul"), "c1-k"), sorotkan(idx(SUARA_T3, "Pagi"), "kg1-k")),
    k(SUARA_T4, hapusKartu(0, 2), ubah(0, { id: "kg1-k", sorot: false }), sorotkan(idx(SUARA_T4, "belajar"), "kg1-k"), sorotkan(idx(SUARA_T4, "bermain"), "kg3-k")),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi tiga metode dari luar.";
const SUARA_R2 = "Membaca Jam: jarum pendek untuk jam, jarum panjang untuk menit.";
const SUARA_R3 = "Lama Kegiatan: perkirakan lama suatu kegiatan.";
const SUARA_R4 = "Urutan Waktu Sehari: pagi, siang, sore, malam.";
const SUARA_R5 = "Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan tiga metode")), tambah(idx(SUARA_R1, "ingat"), emo("ib", 150, 110, "\u{1F4DD}", 44))),
    k(SUARA_R2, { at: 0, hapus: ["ib"] }, tambah(idx(SUARA_R2, "Membaca"), ...kartu("r0", 14, 30, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "pendek untuk jam, panjang untuk menit"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Lama"), ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "perkirakan lama suatu kegiatan"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Urutan"), ...kartu("r2", 14, 126, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "pagi, siang, sore, malam"], 9.2))),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Terima"), emo("ow", 150, 190, OWL, 30))),
  ],
};
