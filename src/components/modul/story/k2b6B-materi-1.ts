import type { AdeganStory } from "./logika-story";
import {
  E,
  W,
  barisAnak,
  emo,
  garis,
  jam,
  judul,
  kartu,
  lapangan,
  langitLatar,
  matahari,
  panah,
  peluit,
  setJam,
  spanduk,
  teks,
  tiangBendera,
  tokoh,
  type PosisiJam,
} from "./k2b6B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/*
 * Cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Kelas 2 Bab 6 Sub-Bab B, waktu dan jam), akhir cerita Hari Olahraga Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b6b.md. Bagian ini: jam di lapangan, salah membaca jarum, pukul tepat.
 */

/** Jam dinding besar di tiang lapangan (adegan pertama). */
const JAM_TIANG: PosisiJam = { cx: 228, cy: 66, r: 32 };

/* ------------------------------ 1. Jam lapangan ------------------------------ */
const SUARA_J1 = "Hari Olahraga tiba! Bu Ratna, juru acara, menggantung jam besar di tiang lapangan.";
const SUARA_J2 = "Bu Sari berkata, jam menolong kita tahu kapan lomba mulai. Kalau terlambat, lomba bertabrakan!";
const SUARA_J3 = "Bu Ratna memberi peluit kepada Chacha. Kamu yang meniup peluit tepat waktu, ya!";

export const ADEGAN_JAM_LAPANGAN: AdeganStory = {
  id: "jam-lapangan",
  judul: "Jam besar di tiang lapangan",
  sumber: "Materi: jam besar di lapangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, judul("Hari Olahraga"), langitLatar("lg", 150, "#E0F2FE"), ...lapangan("rm")),
      tambah("Olahraga", ...spanduk("sp", 14, 34, 130, "HARI OLAHRAGA", 10)),
      tambah("Ratna,", ...tokoh("br", 50, 172, "Bu Ratna")),
      tambah("menggantung", garis("tg", 228, 150, 0, -52, "#6B7280", 3)),
      tambah("jam", ...jam("j", JAM_TIANG, 6, 0, false)),
      sorotkan("tiang", "j-w"),
    ),
    k(
      SUARA_J2,
      ubah(0, { id: "j-w", sorot: false }),
      tambah("Sari", ...tokoh("bs", 110, 172, "Bu Sari")),
      sorotkan("menolong", "j-w"),
      tambah("lomba", panah("pa", 30, 104, 40, 0, W.merah, 2.6), panah("pb", 160, 104, -40, 0, W.biru, 2.6)),
      ubah("terlambat,", { id: "j-w", sorot: false }),
      tambah("bertabrakan!", emo("sr", 100, 100, E.seru, 24), ...kartu("tb", 36, 56, 128, 22, W.merahMuda, ["Lomba bertabrakan"], 9)),
    ),
    k(
      SUARA_J3,
      hapus(0, "tb-k", "tb-t0", "sr", "pa", "pb"),
      tambah("peluit", ...peluit("pl", 74, 160)),
      tambah("Chacha.", ...tokoh("ch", 170, 172, "Chacha")),
      ubah("meniup", { id: "pl", x: 160, y: 166 }, { id: "pl-c", x: 150, y: 164 }),
      sorotkan("tepat", "ch"),
      tambah("waktu,", emo("ok", 215, 150, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 2. Salah jarum ------------------------------ */
const SUARA_S1 = "Jarum panjang menunjuk angka dua belas! Chacha meniup peluit, berteriak, sekarang pukul dua belas!";
const SUARA_S2 = "Dika menggeleng. Lihat jarum pendeknya, Chacha. Jarum pendek di angka enam, jadi pukul enam.";
const SUARA_S3 = "Matahari baru terbit, dan penjaga sekolah yang mengantuk jatuh dari kursinya!";

export const ADEGAN_SALAH_JARUM: AdeganStory = {
  id: "salah-jarum",
  judul: "Chacha salah membaca jam",
  sumber: "Materi: salah membaca jarum",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      bersih(0),
      tambah(0, judul("Jam Pukul Berapa?"), langitLatar("lg", 150, "#FEF3C7"), ...lapangan("rm")),
      tambah("Jarum", ...jam("j", { cx: 150, cy: 100, r: 52 }, 6, 0)),
      sorotkan("panjang", "j-m"),
      tambah("Chacha", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("meniup", ...peluit("pl", 62, 160)),
      tambah("berteriak,", garis("s1", 74, 150, 10, -6, W.merah, 2), garis("s2", 74, 156, 12, 0, W.merah, 2), garis("s3", 74, 162, 10, 6, W.merah, 2)),
      tambah("sekarang", ...kartu("pq", 214, 34, 80, 22, W.merahMuda, ["pukul 12?"], 10)),
    ),
    k(
      SUARA_S2,
      ubah(0, { id: "j-m", sorot: false }),
      tambah("Dika", ...tokoh("dk", 260, 172, "Dika")),
      tambah("menggeleng.", emo("x1", 262, 128, E.salah, 22)),
      sorotkan("pendeknya,", "j-p"),
      ubah("enam,", { id: "pq-t0", isi: "pukul 6!" }, { id: "pq-k", warna: W.hijauMuda }),
      hapus("jadi", "x1"),
      tambah("enam@2", emo("ok", 262, 128, E.benar, 22)),
    ),
    k(
      SUARA_S3,
      ubah(0, { id: "j-p", sorot: false }),
      tambah("Matahari", ...matahari("mt", 36, 48, 13)),
      ubah("terbit,", { id: "lg", warna: "#FEF9C3" }),
      tambah("penjaga", emo("pj", 206, 170, E.penjaga, 26), emo("kr", 228, 172, E.kursi, 20)),
      tambah("mengantuk", emo("tz", 214, 142, E.tidur, 18)),
      ubah("jatuh", { id: "pj", x: 192, y: 186, rot: 80 }),
      tambah("kursinya!", emo("ks", 250, 140, E.kaget, 20)),
    ),
  ],
};

/* ------------------------------ 3. Pukul tepat ------------------------------ */
const SUARA_P1 = "Jarum pendek menunjukkan jam, jarum panjang menunjukkan menit.";
const SUARA_P2 = "Jarum panjang di angka dua belas berarti pukul tepat. Jarum pendek di angka tujuh, pukul tujuh tepat.";
const SUARA_P3 = "Tepat pukul tujuh, bendera naik dan pembukaan dimulai.";

export const ADEGAN_PUKUL_TEPAT: AdeganStory = {
  id: "pukul-tepat",
  judul: "Jarum panjang di dua belas, pukul tepat",
  sumber: "Materi: pukul tepat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Dua Jarum Jam"), ...jam("j", { cx: 150, cy: 112, r: 58 }, 10, 10)),
      tambah("pendek", ...kartu("kp", 6, 52, 78, 22, W.lavender, ["jarum pendek"], 9), panah("ap", 84, 63, 36, 20, W.ungu, 2.2)),
      sorotkan("pendek", "j-p"),
      tambah("jam,", teks("tj", 45, 94, "= jam", 11, W.biru)),
      tambah("panjang", ...kartu("kq", 216, 52, 78, 22, W.merahMuda, ["jarum panjang"], 9), panah("aq", 216, 63, -26, 14, W.merah, 2.2)),
      ubah("panjang", { id: "j-p", sorot: false }),
      sorotkan("panjang", "j-m"),
      tambah("menit.", teks("tm", 255, 94, "= menit", 11, W.merah)),
    ),
    k(
      SUARA_P2,
      ubah(0, { id: "j-m", sorot: false }),
      hapus(0, "kp-k", "kp-t0", "ap", "tj", "kq-k", "kq-t0", "aq", "tm"),
      ubah("dua", ...setJam("j", 10, 0)),
      sorotkan("belas", "j-m"),
      tambah("tepat.", ...kartu("pt", 6, 40, 86, 22, W.hijauMuda, ["pukul tepat"], 9)),
      ubah("pendek", { id: "j-m", sorot: false }),
      ubah("tujuh,", ...setJam("j", 7, 0)),
      sorotkan("tujuh,", "j-p"),
      tambah("tepat.@2", ...kartu("p7", 208, 40, 86, 22, W.krem, ["pukul 7 tepat"], 9)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Pembukaan Hari Olahraga"), langitLatar("lg", 150, "#E0F2FE"), ...lapangan("rm")),
      tambah("Tepat", ...kartu("pj", 10, 30, 82, 22, W.krem, ["pukul 7"], 10)),
      tambah("bendera", ...tiangBendera("tb", 150, 150, 100, 4)),
      ubah("naik", { id: "tb-b", y: 52 }),
      tambah("pembukaan", ...barisAnak("an", 72, 178, 6, 30)),
      tambah("dimulai.", ...spanduk("sp", 188, 34, 100, "PEMBUKAAN", 10), emo("tp", 120, 168, E.tepuk, 16)),
    ),
  ],
};
