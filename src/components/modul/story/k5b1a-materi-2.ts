import type { AdeganStory } from "./logika-story";
import { E, G5, W, angka, angkaBilangan, bulat, emo, idTribun, judul, kotak, papanAngka, tabelKosong, tanah, teks, titik, tokoh, tribun } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k5b1a-bantu";

/*
 * Cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Kelas 5 Bab 1 Sub-Bab A), awal cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1a.md. Bagian ini: salah langkah Fajar (menulis 9.060 sebagai 960, nol penjaga hilang, taruhan menyapu tribun),
 * memeriksa nol penjaga, dan titik pemisah serta baca per periode (Tribun Selatan 18.705).
 */

/* ------------------------------ 4. Salah: nol penjaga hilang ------------------------------ */
const SUARA_F1 = "Tribun Timur dihuni sembilan ribu enam puluh penonton, dan Fajar menulis angkanya cepat-cepat.";
const SUARA_F2 = "Ia hanya menulis angka yang ia dengar, sembilan dan enam puluh, jadi hasilnya sembilan ratus enam puluh.";
const SUARA_F3 = "Kalau aku salah, aku menyapu seluruh tribun sendirian, katanya sambil menepuk dada.";

export const ADEGAN_SALAH_TULIS: AdeganStory = {
  id: "salah-tulis",
  judul: "Fajar salah menulis",
  sumber: "Materi: salah langkah menulis",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Tribun Timur"), ...tanah("tn", 150)),
      tambah("Timur", ...papanAngka("pp", 150, 30, 140, 60), teks("pt", 220, 82, "penonton Timur", 8, W.putih, { z: 3 })),
      tambah("sembilan", teks("bl", 220, 62, "9.060", 22, W.sorot, { z: 3 })),
      tambah("Fajar", ...tokoh("fj", 60, 184, "Fajar")),
      tambah("menulis", kotak("kr", 90, 104, 70, 50, W.putih, W.coklat, { rx: 2, tebal: 1.4, z: 1 })),
    ),
    k(
      SUARA_F2,
      tambah(idx(SUARA_F2, "sembilan", 1), teks("w9", 106, 126, "9", 14, W.biru, { z: 3 })),
      tambah(idx(SUARA_F2, "enam", 1), teks("w60", 138, 126, "60", 14, W.biru, { z: 3 })),
      tambah("hasilnya", teks("w960", 124, 146, "960", 16, W.merah, { z: 3 })),
      tambah("ratus", emo("sl", 176, 140, E.salah, 20, { z: 3 })),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Taruhan Fajar"), ...tanah("tn", 150), ...tribun("tr", 150, 50, 100)),
      tambah("Kalau", ...tokoh("fj", 60, 184, "Fajar"), teks("ks", 200, 106, "kalau salah:", 8.4, W.merah, { z: 3 })),
      tambah("menyapu", emo("sp", 124, 160, E.sapu, 22, { z: 3 }), teks("mn", 200, 122, "menyapu tribun", 9, W.coklat, { z: 3 })),
      tambah("menepuk", emo("kt", 96, 150, E.kuat, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Memeriksa nol penjaga ------------------------------ */
const SUARA_N1 = "Citra memasukkannya ke tabel: sembilan di ribuan, nol di ratusan, enam di puluhan, nol di satuan.";
const SUARA_N2 = "Dua nol itu penjaga tempat, sehingga bilangannya sembilan ribu enam puluh, bukan sembilan ratus enam puluh.";
const SUARA_N3 = "Fajar menyapu tribun sampai debu beterbangan, dan Pak Arif tertawa melihat topinya berdebu.";

export const ADEGAN_PERIKSA_NOL: AdeganStory = {
  id: "periksa-nol",
  judul: "Memeriksa nol penjaga",
  sumber: "Materi: nol penjaga tempat",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Memeriksa dengan Tabel"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("memasukkannya", teks("bl", 150, 40, "9.060", 16, W.merah, { z: 3 })),
      tambah(idx(SUARA_N1, "sembilan"), angka("tb", 1, "9")),
      tambah(idx(SUARA_N1, "nol", 1), angka("tb", 2, "0")),
      tambah(idx(SUARA_N1, "enam"), angka("tb", 3, "6")),
      tambah(idx(SUARA_N1, "nol", 2), angka("tb", 4, "0")),
    ),
    k(
      SUARA_N2,
      tambah("Dua", teks("d2", 150, 142, "2 nol = penjaga tempat", 9, W.merah, { z: 3 })),
      sorotkan("penjaga", "tb-c2", "tb-c4"),
      tambah("penjaga", teks("pj1", 150, 120, "penjaga", 8.4, W.merah, { z: 3 }), teks("pj2", 254, 120, "penjaga", 8.4, W.merah, { z: 3 })),
      tambah("sembilan@2", emo("ok", 196, 40, E.benar, 18)),
      tambah("bukan", teks("sl", 80, 128, "960", 14, W.merah, { z: 3 }), emo("sx", 108, 126, E.salah, 18)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Debu Beterbangan"), ...tanah("tn", 150), ...tribun("tr", 100, 50, 100)),
      tambah("Fajar", ...tokoh("fj", 60, 184, "Fajar"), emo("sp", 94, 160, E.sapu, 22, { z: 3 })),
      tambah("debu", ...[0, 1, 2, 3, 4].map((i) => bulat(`db${i}`, 70 + i * 12, 140 - (i % 2) * 8, 2.2, "#CBD5E1", "#94A3B8", { tebal: 0.8, z: 4 }))),
      tambah("Arif", ...tokoh("pa", 240, 184, "Pak Arif")),
      tambah("tertawa", emo("tw", 240, 138, E.tertawa, 20, { z: 3 })),
      tambah("berdebu.", emo("mt", 60, 128, E.mata, 16, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Titik pemisah dan baca per periode (18.705) ------------------------------ */
const SUARA_P1 = "Tribun Selatan dihuni delapan belas ribu tujuh ratus lima penonton.";
const SUARA_P2 = "Bima memberi titik setelah ribuan, supaya angkanya terbaca tiga-tiga dari kanan.";
const SUARA_P3 = "Bacanya delapan belas ribu tujuh ratus lima; nol di puluhan tidak terucap, tetapi tetap tertulis.";

export const ADEGAN_PERIODE: AdeganStory = {
  id: "periode",
  judul: "Titik dan periode",
  sumber: "Materi: titik pemisah dan periode",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tribun Selatan"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Tribun", ...tribun("tr", 100, 114, 100)),
      tambah("delapan", teks("bl", 150, 40, "18.705", 16, W.merah, { z: 3 })),
      tambah("penonton.", ...angkaBilangan("tb", 18705, G5)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idTribun("tr")),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("titik", titik("tk", 2, G5), teks("tkn", 124, 148, "titik", 8.4, W.merah, { z: 3 })),
      tambah("terbaca", kotak("gl", 20, 116, 104, 16, W.biruMuda, W.biru, { rx: 2, tebal: 1.2, z: 1 }), teks("pl", 72, 128, "periode kiri: 18", 8, W.biru, { z: 3 })),
      tambah("kanan.", kotak("gr", 124, 116, 156, 16, W.hijauMuda, W.hijauTua, { rx: 2, tebal: 1.2, z: 1 }), teks("pr", 202, 128, "periode kanan: 705", 8, W.hijauTua, { z: 3 })),
      tambah("tiga-tiga", teks("t3", 220, 148, "tiap 3 angka", 8.4, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_P3,
      hapus(0, "t3"),
      ubah(0, { id: "pl", isi: "delapan belas ribu" }, { id: "pr", isi: "tujuh ratus lima" }),
      tambah("nol", teks("nl", 206, 148, "nol tidak terucap", 8, W.merah, { z: 3 })),
      sorotkan("nol", "tb-c3"),
      tambah("tertulis.", teks("tl", 206, 162, "tetap tertulis", 8, W.merah, { z: 3 })),
    ),
  ],
};
