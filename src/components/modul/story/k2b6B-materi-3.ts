import type { AdeganStory } from "./logika-story";
import {
  E,
  JAM_KANAN,
  JAM_KIRI,
  W,
  barisAnak,
  batangLama,
  bulat,
  emo,
  jalurJam,
  jam,
  judul,
  kartu,
  kotak,
  lampuLapangan,
  lapangan,
  langitLatar,
  panah,
  papanJadwal,
  peluit,
  taliTambang,
  teks,
  tokoh,
  type PosisiJam,
} from "./k2b6B-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/*
 * Cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Kelas 2 Bab 6 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k2b6b.md. Bagian ini: lebih lama dan lebih sebentar, jarum satu jam, penutup (akhir cerita bab).
 */

/* ------------------------------ 7. Lama dan sebentar ------------------------------ */
const SUARA_L1 = "Chacha bertanya, mana lebih lama, lompat tali atau tarik tambang?";
const SUARA_L2 = "Lompat tali lima belas menit, tarik tambang satu jam. Jadi tarik tambang lebih lama, lompat tali lebih sebentar.";
const SUARA_L3 = "Mencuci tangan sangat sebentar, tidur malam sangat lama. Kata ini membandingkan lama kegiatan.";

export const ADEGAN_LAMA_SEBENTAR: AdeganStory = {
  id: "lama-sebentar",
  judul: "Lompat tali atau tarik tambang",
  sumber: "Materi: lebih lama, lebih sebentar",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_L1,
      bersih(0),
      tambah(0, judul("Mana Lebih Lama?"), ...lapangan("rm", 150)),
      tambah("Chacha", ...tokoh("ch", 150, 178, "Chacha"), emo("tq", 182, 160, E.tanya, 22)),
      tambah("lompat", ...kartu("kl", 14, 46, 110, 24, W.hijauMuda, ["lompat tali"], 10), emo("ln", 70, 116, E.lari, 28), bulat("lt", 70, 112, 22, "none", W.merah, { tebal: 2.4, putus: true })),
      tambah("tarik", ...kartu("kt", 176, 46, 110, 24, W.merahMuda, ["tarik tambang"], 10), ...taliTambang("tt", 186, 118, 90)),
      sorotkan("tambang?", "kt-k", "tt"),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Bandingkan Lamanya")),
      tambah("Lompat", ...batangLama("b1", 46, "Lompat tali", 0.25, "15 menit", W.hijauMuda, 120, 96)),
      tambah("tarik", ...batangLama("b2", 86, "Tarik tambang", 1, "1 jam", W.merahMuda, 120, 96)),
      tambah("lama,", ...kartu("ka", 30, 128, 110, 24, W.emas, ["lebih lama"], 10)),
      sorotkan("lama,", "b2"),
      tambah("sebentar.", ...kartu("kb", 156, 128, 120, 24, W.krem, ["lebih sebentar"], 10)),
      sorotkan("sebentar.", "b1"),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Sangat Sebentar, Sangat Lama")),
      tambah("Mencuci", emo("sb", 70, 90, E.sabun, 34)),
      tambah("sebentar,", kotak("c1", 48, 112, 40, 14, W.hijauMuda, W.biru, { rx: 3 }), ...kartu("ks", 14, 134, 120, 24, W.hijauMuda, ["sangat sebentar"], 10)),
      tambah("tidur", emo("bl", 230, 90, E.bulan, 34)),
      tambah("lama.", kotak("c2", 166, 112, 120, 14, W.merahMuda, W.biru, { rx: 3 }), ...kartu("kk", 166, 134, 120, 24, W.merahMuda, ["sangat lama"], 10)),
      tambah("membandingkan", panah("pb", 136, 146, 26, 0, W.ungu, 2.4)),
    ),
  ],
};

/* ------------------------------ 8. Jarum satu jam ------------------------------ */
const SUARA_S1 = "Tarik tambang dimulai pukul empat sore, dan selesai pukul lima.";
const SUARA_S2 = "Nia melihat jam. Jarum pendek bergerak dari angka empat ke lima, itu satu jam.";
const SUARA_S3 = "Menghitung lama kegiatan berarti menghitung berapa jam jarum pendek bergerak.";

export const ADEGAN_JARUM_SATU_JAM: AdeganStory = {
  id: "jarum-satu-jam",
  judul: "Dari pukul empat sampai pukul lima",
  sumber: "Materi: jarum pendek satu jam",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_S1,
      bersih(0),
      tambah(0, judul("Tarik Tambang")),
      tambah("dimulai", ...jam("ja", JAM_KIRI, 4, 0)),
      tambah("empat", ...kartu("km", 26, 156, 104, 22, W.hijauMuda, ["mulai pukul 4"], 9.5)),
      tambah("selesai", ...jam("jb", JAM_KANAN, 5, 0)),
      tambah("lima.", ...kartu("ks", 170, 156, 112, 22, W.merahMuda, ["selesai pukul 5"], 9.5)),
    ),
    k(
      SUARA_S2,
      tambah("Nia", ...tokoh("ni", 150, 178, "Nia")),
      tambah("bergerak", panah("pg", 126, 106, 44, 0, W.ungu, 3)),
      sorotkan("empat", "ja-p"),
      sorotkan("lima,", "jb-p"),
      tambah("satu", ...kartu("sj", 112, 36, 76, 22, W.krem, ["1 jam"], 12)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Menghitung Lama Kegiatan"), ...lapangan("rm", 150)),
      tambah("Menghitung", ...taliTambang("tt", 80, 122, 140), ...barisAnak("al", 44, 126, 2, 22, 22), ...barisAnak("ar", 238, 126, 2, 22, 22)),
      tambah("kegiatan", ...kartu("lk", 80, 36, 140, 22, W.langit, ["lama kegiatan"], 10)),
      tambah("jam", ...jalurJam("jk", 90, 70, 3, 40, 22, W.hijauMuda)),
      ubah("bergerak.", { id: "jk0", warna: W.emas }, { id: "jk1", warna: W.emas }),
      tambah("bergerak.", teks("jt", 150, 112, "jarum pendek bergerak", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_P1 = "Semua lomba tepat waktu, dan lapangan penuh sorak gembira.";
const SUARA_P2 = "Dika merangkum. Jarum pendek menunjukkan jam, jarum panjang menit, setiap kegiatan punya bagian hari.";
const SUARA_P3 = "Tepat pukul tujuh malam, Chacha meniup peluit penutup. Menurutmu, kegiatan apa paling lama kamu lakukan hari ini? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Ratna!";

const JAM_P: PosisiJam = { cx: 150, cy: 70, r: 30 };
const MALAM = "#4338CA";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Peluit penutup pukul tujuh malam",
  sumber: "Materi: penutup, perayaan akhir cerita",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Lapangan Penuh Sorak", W.putih), langitLatar("lg", 150, MALAM), ...lapangan("rm", 150, "#86EFAC")),
      tambah("lomba", ...lampuLapangan("lp1", 26, 150, 84), ...lampuLapangan("lp2", 274, 150, 84)),
      tambah("tepat", ...jam("j", JAM_P, 7, 0, false)),
      tambah("sorak", ...barisAnak("an", 70, 178, 6, 32)),
      tambah("gembira.", emo("sr", 150, 128, E.sorak, 26), emo("tp", 70, 150, E.tepuk, 16)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Dika Merangkum"), ...papanJadwal("pp", 80, 34, 200, 106)),
      tambah("Dika", ...tokoh("dk", 40, 172, "Dika")),
      tambah("pendek", teks("p1", 180, 62, "jarum pendek = jam", 10, W.biru)),
      tambah("panjang", teks("p2", 180, 84, "jarum panjang = menit", 10, W.merah)),
      tambah("kegiatan", teks("p3", 180, 106, "kegiatan = bagian hari", 10, W.ungu)),
      tambah("hari.", emo("ct", 262, 128, E.catat, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Terima Kasih", W.putih), langitLatar("lg", 150, MALAM), ...lapangan("rm", 150, "#86EFAC"), ...lampuLapangan("lp1", 26, 150, 84), ...lampuLapangan("lp2", 274, 150, 84)),
      tambah("Tepat", ...jam("j", JAM_P, 7, 0, false), ...kartu("p7", 196, 36, 92, 22, W.krem, ["pukul 7 malam"], 9.5)),
      tambah("Chacha", ...tokoh("ch", 40, 172, "Chacha"), ...peluit("pl", 62, 164)),
      tambah("penutup.", emo("pt", 62, 140, E.bintang, 14)),
      tambah("Menurutmu,", emo("tq", 150, 134, E.tanya, 22)),
      tambah("Dika,", ...tokoh("dk", 95, 172, "Dika")),
      tambah("Nia,", ...tokoh("ni", 150, 172, "Nia")),
      tambah("Sari,", ...tokoh("bs", 205, 172, "Bu Sari")),
      tambah("Ratna!", ...tokoh("br", 260, 172, "Bu Ratna"), emo("pi", 262, 140, E.piala, 24)),
    ),
  ],
};
